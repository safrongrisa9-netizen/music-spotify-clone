// Mock data for music tracks
const musicData = {
    recommended: [
        { id: 1, title: "Summer Vibes", artist: "DJ Sunshine", album: "Summer Hits", duration: "3:45", cover: "https://via.placeholder.com/300/1DB954/FFFFFF?text=Summer+Vibes" },
        { id: 2, title: "Night Drive", artist: "Midnight Cruisers", album: "City Lights", duration: "4:20", cover: "https://via.placeholder.com/300/1DB954/FFFFFF?text=Night+Drive" },
        { id: 3, title: "Mountain Top", artist: "Nature Sounds", album: "Peaceful Moments", duration: "5:15", cover: "https://via.placeholder.com/300/1DB954/FFFFFF?text=Mountain+Top" },
        { id: 4, title: "Urban Jungle", artist: "City Beats", album: "Metropolis", duration: "3:30", cover: "https://via.placeholder.com/300/1DB954/FFFFFF?text=Urban+Jungle" },
        { id: 5, title: "Ocean Waves", artist: "Beach Club", album: "Seaside", duration: "4:10", cover: "https://via.placeholder.com/300/1DB954/FFFFFF?text=Ocean+Waves" },
        { id: 6, title: "Desert Wind", artist: "Sandy Dunes", album: "Oasis", duration: "3:55", cover: "https://via.placeholder.com/300/1DB954/FFFFFF?text=Desert+Wind" }
    ],
    popular: [
        { id: 7, title: "Dance Floor", artist: "Party People", album: "Weekend", duration: "3:20", cover: "https://via.placeholder.com/56/1DB954/FFFFFF?text=DF" },
        { id: 8, title: "Chill Lounge", artist: "Relaxation Station", album: "Calm", duration: "4:45", cover: "https://via.placeholder.com/56/1DB954/FFFFFF?text=CL" },
        { id: 9, title: "Energy Boost", artist: "Workout Motivation", album: "Fitness", duration: "2:50", cover: "https://via.placeholder.com/56/1DB954/FFFFFF?text=EB" },
        { id: 10, title: "Focus Mode", artist: "Study Help", album: "Concentration", duration: "5:30", cover: "https://via.placeholder.com/56/1DB954/FFFFFF?text=FM" },
        { id: 11, title: "Dreamscape", artist: "Sleep Well", album: "Good Night", duration: "6:15", cover: "https://via.placeholder.com/56/1DB954/FFFFFF?text=DS" }
    ]
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderRecommendedMusic();
    renderPopularTracks();
    initPlayer();
});

// Render recommended music cards
function renderRecommendedMusic() {
    const musicGrid = document.getElementById('music-grid');
    musicGrid.innerHTML = '';
    
    musicData.recommended.forEach(track => {
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
}

// Render popular tracks list
function renderPopularTracks() {
    const tracksList = document.getElementById('tracks-list');
    tracksList.innerHTML = '';
    
    musicData.popular.forEach(track => {
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
            const track = musicData.popular[index];
            playTrack(track);
        });
    });
}

// Initialize player
function initPlayer() {
    // Volume control
    const volumeContainer = document.querySelector('.volume-container');
    const volumeBar = document.getElementById('volume-bar');
    
    volumeContainer.addEventListener('click', function(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const volume = clickX / width;
        volumeBar.style.width = `${volume * 100}%`;
        // Here you would set the actual volume on the audio element
    });
    
    // Progress bar
    const progressContainer = document.querySelector('.progress-container');
    const progress = document.getElementById('progress');
    
    progressContainer.addEventListener('click', function(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const percent = clickX / width;
        progress.style.width = `${percent * 100}%`;
        // Here you would set the current time of the audio element
        updateTimeDisplay(percent);
    });
}

// Play a track
function playTrack(track) {
    const playBtn = document.getElementById('play-btn');
    const currentTrackImg = document.getElementById('current-track-img');
    const currentTrackName = document.getElementById('current-track-name');
    const currentTrackArtist = document.getElementById('current-track-artist');
    const timeEnd = document.getElementById('time-end');
    
    // Update player UI
    currentTrackImg.src = track.cover;
    currentTrackName.textContent = track.title;
    currentTrackArtist.textContent = track.artist;
    timeEnd.textContent = track.duration;
    
    // Change play button to pause
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playBtn.setAttribute('data-playing', 'true');
    
    // Reset progress
    document.getElementById('progress').style.width = '0%';
    document.getElementById('time-start').textContent = '0:00';
    
    // Simulate playback progress
    simulatePlayback();
}

// Toggle like status
function toggleLike(trackId, element) {
    const heartIcon = element.querySelector('i');
    heartIcon.classList.toggle('far');
    heartIcon.classList.toggle('fas');
    heartIcon.classList.toggle('liked');
    
    // Here you would update the liked status in your data store
}

// Update time display
function updateTimeDisplay(percent) {
    const timeStart = document.getElementById('time-start');
    const timeEnd = document.getElementById('time-end');
    
    // Parse duration (format: "m:ss")
    const durationParts = timeEnd.textContent.split(':');
    const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
    
    const currentSeconds = Math.floor(totalSeconds * percent);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    
    timeStart.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Simulate playback progress
function simulatePlayback() {
    const progress = document.getElementById('progress');
    const timeStart = document.getElementById('time-start');
    const timeEnd = document.getElementById('time-end');
    const playBtn = document.getElementById('play-btn');
    
    // Clear any existing interval
    if (window.playbackInterval) {
        clearInterval(window.playbackInterval);
    }
    
    // Parse duration (format: "m:ss")
    const durationParts = timeEnd.textContent.split(':');
    const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
    
    let currentSeconds = 0;
    
    window.playbackInterval = setInterval(() => {
        if (playBtn.getAttribute('data-playing') !== 'true') {
            clearInterval(window.playbackInterval);
            return;
        }
        
        currentSeconds++;
        if (currentSeconds > totalSeconds) {
            clearInterval(window.playbackInterval);
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.setAttribute('data-playing', 'false');
            progress.style.width = '0%';
            timeStart.textContent = '0:00';
            return;
        }
        
        const progressPercent = (currentSeconds / totalSeconds) * 100;
        progress.style.width = `${progressPercent}%`;
        
        const minutes = Math.floor(currentSeconds / 60);
        const seconds = currentSeconds % 60;
        timeStart.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Play/pause button functionality
document.getElementById('play-btn').addEventListener('click', function() {
    const isPlaying = this.getAttribute('data-playing') === 'true';
    
    if (isPlaying) {
        this.innerHTML = '<i class="fas fa-play"></i>';
        this.setAttribute('data-playing', 'false');
        if (window.playbackInterval) {
            clearInterval(window.playbackInterval);
        }
    } else {
        this.innerHTML = '<i class="fas fa-pause"></i>';
        this.setAttribute('data-playing', 'true');
        
        // If no track is selected, play the first popular track
        if (document.getElementById('current-track-name').textContent === 'Выберите трек') {
            playTrack(musicData.popular[0]);
        } else {
            // Resume playback
            simulatePlayback();
        }
    }
});

// Like button functionality
document.getElementById('like-btn').addEventListener('click', function() {
    this.classList.toggle('liked');
    const icon = this.querySelector('i');
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
});
