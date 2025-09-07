// Search functionality
document.getElementById('search-input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm.length < 2) {
        renderRecommendedMusic();
        renderPopularTracks();
        return;
    }
    
    // Filter recommended music
    const filteredRecommended = musicData.recommended.filter(track => 
        track.title.toLowerCase().includes(searchTerm) || 
        track.artist.toLowerCase().includes(searchTerm)
    );
    
    // Filter popular tracks
    const filteredPopular = musicData.popular.filter(track => 
        track.title.toLowerCase().includes(searchTerm) || 
        track.artist.toLowerCase().includes(searchTerm)
    );
    
    // Render filtered results
    renderFilteredMusic(filteredRecommended, filteredPopular);
});

// Render filtered music
function renderFilteredMusic(recommended, popular) {
    const musicGrid = document.getElementById('music-grid');
    musicGrid.innerHTML = '';
    
    if (recommended.length === 0 && popular.length === 0) {
        musicGrid.innerHTML = '<div class="no-results"><h3>Ничего не найдено</h3><p>Попробуйте другой запрос</p></div>';
        document.getElementById('tracks-list').innerHTML = '';
        return;
    }
    
    // Render recommended section if there are results
    if (recommended.length > 0) {
        recommended.forEach(track => {
            const card = document.createElement('div');
            card.className = 'music-card';
            card.innerHTML = `
                <img src="${track.cover}" alt="${track.title}">
                <h3>${track.title}</h3>
                <p>${track.artist}</p>
            `;
            card.addEventListener('click', () => playTrack(track));
            musicGrid.appendChild(card);
        });
    } else {
        musicGrid.innerHTML = '<div class="no-results"><h3>В рекомендациях ничего не найдено</h3></div>';
    }
    
    // Render popular tracks section if there are results
    const tracksList = document.getElementById('tracks-list');
    tracksList.innerHTML = '';
    
    if (popular.length > 0) {
        popular.forEach(track => {
            const trackItem = document.createElement('div');
            trackItem.className = 'track-item';
            trackItem.innerHTML = `
                <img src="${track.cover}" alt="${track.title}">
                <div class="track-info">
                    <span class="track-name">${track.title}</span>
                    <span class="artist-name">${track.artist}</span>
                </div>
                <span class="track-duration">${track.duration}</span>
                <div class="track-actions">
                    <button class="like-track" data-id="${track.id}"><i class="far fa-heart"></i></button>
                    <button class="play-track" data-id="${track.id}"><i class="fas fa-play"></i></button>
                </div>
            `;
            tracksList.appendChild(trackItem);
        });
        
        // Add event listeners to like buttons
        document.querySelectorAll('.like-track').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const trackId = this.getAttribute('data-id');
                toggleLike(trackId, this);
            });
        });
        
        // Add event listeners to play buttons
        document.querySelectorAll('.play-track').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const trackId = this.getAttribute('data-id');
                const track = [...musicData.recommended, ...musicData.popular].find(t => t.id == trackId);
                if (track) playTrack(track);
            });
        });
        
        // Add event listeners to track items
        document.querySelectorAll('.track-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                const track = popular[index];
                playTrack(track);
            });
        });
    }
}
