const elephant = document.getElementById('elephant');
const container = document.getElementById('container');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startRecording');
const stopButton = document.getElementById('stopRecording');
const switchButton = document.getElementById('switchEffect');

let posX = 0;
let posY = 0;
let speedX = 3;
let speedY = 3;
let mediaRecorder;
let recordedChunks = [];
let effectMode = 'bounce'; // Options: 'bounce', 'particles'
let particles = [];

// Set canvas size
function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Create a random color for particles
function getRandomColor() {
    const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Create a particle
function createParticle() {
    const elephantWidth = elephant.offsetWidth;
    const elephantHeight = elephant.offsetHeight;
    
    // Create particle at elephant's center
    return {
        x: posX + elephantWidth / 2,
        y: posY + elephantHeight / 2,
        size: Math.random() * 10 + 5,
        color: getRandomColor(),
        opacity: 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2
    };
}

function animate() {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const elephantWidth = elephant.offsetWidth;
    const elephantHeight = elephant.offsetHeight;

    // Update position
    posX += speedX;
    posY += speedY;

    // Check for collision with edges
    if (posX + elephantWidth > containerWidth || posX < 0) {
        speedX = -speedX;
    }
    if (posY + elephantHeight > containerHeight || posY < 0) {
        speedY = -speedY;
    }

    // Apply new position for regular elephant
    elephant.style.left = posX + 'px';
    elephant.style.top = posY + 'px';

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Handle different effects
    if (effectMode === 'particles') {
        // Show the elephant
        elephant.style.display = 'block';
        
        // Add new particles occasionally
        if (Math.random() > 0.7) {
            particles.push(createParticle());
        }
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Update particle
            p.opacity -= 0.01;
            p.size -= 0.1;
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Remove faded particles
            if (p.opacity <= 0 || p.size <= 0) {
                particles.splice(i, 1);
                i--;
                continue;
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0');
            ctx.fill();
        }
    } else {
        // Regular bounce mode
        elephant.style.display = 'block';
    }
    
    // Draw the elephant on the canvas (for recording)
    ctx.drawImage(elephant, posX, posY, elephantWidth, elephantHeight);

    requestAnimationFrame(animate);
}

// Recording setup
async function setupRecording() {
    const stream = canvas.captureStream(30); // 30 FPS
    mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
    });

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, {
            type: 'video/webm'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bouncing-elephant.webm';
        a.click();
        URL.revokeObjectURL(url);
        recordedChunks = [];
    };
}

// Add event listener for the switch effect button
switchButton.addEventListener('click', () => {
    // Toggle between bounce and particles only
    if (effectMode === 'bounce') {
        effectMode = 'particles';
        switchButton.textContent = 'Switch to Bounce';
        // Clear any existing particles
        particles = [];
    } else {
        effectMode = 'bounce';
        switchButton.textContent = 'Switch to Particles';
    }
});

// Event listeners for recording controls
startButton.addEventListener('click', () => {
    if (!mediaRecorder) {
        setupRecording();
    }
    recordedChunks = [];
    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
});

// Start the animation
animate(); 