// Particles background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 20 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0.3; }
            25% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
            50% { transform: translateY(-40px) translateX(0); opacity: 0.3; }
            75% { transform: translateY(-20px) translateX(-10px); opacity: 0.5; }
            100% { transform: translateY(0) translateX(0); opacity: 0.3; }
        }
    `;
    document.head.appendChild(style);
}

// Modal functionality
document.getElementById('open-terms').addEventListener('click', function() {
    document.getElementById('terms-modal').style.display = 'flex';
});

document.getElementById('close-terms').addEventListener('click', function() {
    document.getElementById('terms-modal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('terms-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize particles on load
window.addEventListener('load', createParticles);
