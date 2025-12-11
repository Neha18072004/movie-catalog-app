// API Base URL
const API_BASE_URL = 'https://movie-catalog-app-ve4d.onrender.com';

// State management
let movies = [];
let isEditMode = false;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadMovies();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    const movieForm = document.getElementById('movieForm');
    movieForm.addEventListener('submit', handleFormSubmit);
}

// Load all movies
async function loadMovies() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/movies`);
        const data = await response.json();
        
        if (data.success) {
            movies = data.data;
            displayMovies(movies);
        } else {
            showToast('Error loading movies', 'error');
        }
    } catch (error) {
        console.error('Error loading movies:', error);
        showToast('Failed to load movies', 'error');
    } finally {
        hideLoading();
    }
}

// Display movies in grid
function displayMovies(moviesToDisplay) {
    const moviesGrid = document.getElementById('moviesGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (moviesToDisplay.length === 0) {
        moviesGrid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }
    
    moviesGrid.classList.remove('hidden');
    emptyState.classList.add('hidden');
    
    moviesGrid.innerHTML = moviesToDisplay.map(movie => `
        <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
            <div class="bg-gradient-to-r from-gray-700 to-gray-800 h-48 flex items-center justify-center">
                <svg class="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                </svg>
            </div>
            <div class="p-5">
                <h3 class="text-xl font-bold text-gray-800 mb-2 truncate" title="${movie.title}">${movie.title}</h3>
                <p class="text-gray-600 text-sm mb-1">
                    <span class="font-semibold">Director:</span> ${movie.director}
                </p>
                <div class="flex items-center justify-between mb-3">
                    <span class="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                        ${movie.genre}
                    </span>
                    <span class="text-gray-600 text-sm font-medium">${movie.release_year}</span>
                </div>
                <div class="flex items-center mb-4">
                    <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span class="text-gray-800 font-bold text-lg">${movie.rating}</span>
                    <span class="text-gray-500 text-sm ml-1">/ 10</span>
                </div>
                <div class="flex space-x-2">
                    <button 
                        onclick="editMovie(${movie.id})" 
                        class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 font-semibold flex items-center justify-center"
                    >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit
                    </button>
                    <button 
                        onclick="deleteMovie(${movie.id}, '${movie.title.replace(/'/g, "\\'")}')" 
                        class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 font-semibold flex items-center justify-center"
                    >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Search functionality
let searchTimeout;
function handleSearch() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        
        if (searchTerm === '') {
            displayMovies(movies);
        } else {
            const filtered = movies.filter(movie => 
                movie.title.toLowerCase().includes(searchTerm) ||
                movie.director.toLowerCase().includes(searchTerm) ||
                movie.genre.toLowerCase().includes(searchTerm)
            );
            displayMovies(filtered);
        }
    }, 300);
}

// Open add modal
function openAddModal() {
    isEditMode = false;
    document.getElementById('modalTitle').textContent = 'Add New Movie';
    document.getElementById('movieForm').reset();
    document.getElementById('movieId').value = '';
    document.getElementById('movieModal').classList.remove('hidden');
}

// Edit movie
async function editMovie(id) {
    isEditMode = true;
    const movie = movies.find(m => m.id === id);
    
    if (!movie) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Movie';
    document.getElementById('movieId').value = movie.id;
    document.getElementById('title').value = movie.title;
    document.getElementById('director').value = movie.director;
    document.getElementById('genre').value = movie.genre;
    document.getElementById('release_year').value = movie.release_year;
    document.getElementById('rating').value = movie.rating;
    
    document.getElementById('movieModal').classList.remove('hidden');
}

// Close modal
function closeModal() {
    document.getElementById('movieModal').classList.add('hidden');
    document.getElementById('movieForm').reset();
}

// Handle form submit
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const movieData = {
        title: document.getElementById('title').value,
        director: document.getElementById('director').value,
        genre: document.getElementById('genre').value,
        release_year: parseInt(document.getElementById('release_year').value),
        rating: parseFloat(document.getElementById('rating').value)
    };
    
    try {
        let response;
        if (isEditMode) {
            const id = document.getElementById('movieId').value;
            response = await fetch(`${API_BASE_URL}/movies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData)
            });
        } else {
            response = await fetch(`${API_BASE_URL}/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData)
            });
        }
        
        const data = await response.json();
        
        if (data.success) {
            showToast(isEditMode ? 'Movie updated successfully!' : 'Movie added successfully!', 'success');
            closeModal();
            loadMovies();
        } else {
            showToast(data.message || 'Error saving movie', 'error');
        }
    } catch (error) {
        console.error('Error saving movie:', error);
        showToast('Failed to save movie', 'error');
    }
}

// Delete movie
async function deleteMovie(id, title) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('Movie deleted successfully!', 'success');
            loadMovies();
        } else {
            showToast('Error deleting movie', 'error');
        }
    } catch (error) {
        console.error('Error deleting movie:', error);
        showToast('Failed to delete movie', 'error');
    }
}

// Show loading spinner
function showLoading() {
    document.getElementById('loadingSpinner').classList.remove('hidden');
    document.getElementById('moviesGrid').classList.add('hidden');
}

// Hide loading spinner
function hideLoading() {
    document.getElementById('loadingSpinner').classList.add('hidden');
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');
    
    toastMessage.textContent = message;
    
    if (type === 'success') {
        toast.className = 'fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg transform transition-transform duration-300 z-50 bg-green-500 text-white';
        toastIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>';
    } else {
        toast.className = 'fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg transform transition-transform duration-300 z-50 bg-red-500 text-white';
        toastIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
    }
    
    toast.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        toast.style.transform = 'translateX(150%)';
    }, 3000);
}
