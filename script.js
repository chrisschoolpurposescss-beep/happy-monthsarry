// --- 1. Floating Hearts Animation ---
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    heart.style.animationDuration = Math.random() * 4 + 4 + "s"; 
    
    document.getElementById("heart-container").appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

setInterval(createHeart, 400);

// --- 2. Envelope Toggle ---
function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    envelope.classList.toggle('open');
}

// --- 3. Spotify Music Player Logic ---
const audio = document.getElementById('spotify-audio');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');

function togglePlay() {
    if (audio.paused) {
        audio.play().catch(err => console.log("Playback error: ", err));
        playBtn.innerHTML = '❚❚';
    } else {
        audio.pause();
        playBtn.innerHTML = '▶';
    }
}

// Update progress bar & timers
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        const currentMins = Math.floor(audio.currentTime / 60);
        const currentSecs = Math.floor(audio.currentTime % 60);
        const durationMins = Math.floor(audio.duration / 60);
        const durationSecs = Math.floor(audio.duration % 60);

        currentTimeEl.innerText = `${currentMins}:${currentSecs < 10 ? '0' : ''}${currentSecs}`;
        durationTimeEl.innerText = `${durationMins}:${durationSecs < 10 ? '0' : ''}${durationSecs}`;
    }
});

// Seek by clicking on progress bar
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    if (audio.duration) {
        audio.currentTime = (clickX / width) * audio.duration;
    }
});

// Toggle Lyrics Box
function toggleLyrics() {
    const lyricsBox = document.getElementById('lyrics-box');
    lyricsBox.classList.toggle('open');
}

// --- 4. Photo Booth Lightbox Zoom ---
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightboxImg.src = element.querySelector('img').src;
    lightboxCaption.innerText = element.querySelector('.caption').innerText;
    
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}