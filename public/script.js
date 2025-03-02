const elephant = document.getElementById('elephant');
const container = document.getElementById('container');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startRecording');
const stopButton = document.getElementById('stopRecording');

let posX = 0;
let posY = 0;
let speedX = 3;
let speedY = 3;
let mediaRecorder;
let recordedChunks = [];

// Set canvas size
function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

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

    // Apply new position
    elephant.style.left = posX + 'px';
    elephant.style.top = posY + 'px';

    // Draw frame to canvas for recording
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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