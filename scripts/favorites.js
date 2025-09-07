// Favorites functionality
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Toggle like status
function toggleLike(trackId, element) {
    const heartIcon = element.querySelector('i');
    heartIcon.classList.toggle('far');
    heartIcon.classList.toggle('fas');
    heartIcon.classList.toggle('liked');
    
    // Update favorites array
    const track = [...musicData.recommended, ...musicData.popular].find(t => t.id == trackId);
    
    if (track) {
        const index = favorites.findIndex(fav => fav.id == trackId);
        
        if (index === -1) {
            // Add to favorites
            favorites.push(track);
        } else {
            // Remove from favorites
            favorites.splice(index, 1);
        }
        
        // Save to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

// Check if a track is favorited
function isFavorited(trackId) {
    return favorites.some(fav => fav.id == trackId);
}

// Initialize favorite status on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update heart icons for popular tracks
    setTimeout(() => {
        document.querySelectorAll('.like-track').forEach(button => {
            const trackId = button.getAttribute('data-id');
            if (isFavorited(trackId)) {
                const heartIcon = button.querySelector('i');
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas', 'liked');
            }
        });
    }, 100);
});
