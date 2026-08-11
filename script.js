/* ==========================================================================
   HAPPY MONTHSARY INTERACTIVE EXPERIENCE - SCRIPT.JS
   ========================================================================== */

// Configurable Passcode
const CORRECT_PIN = "0612";

// Global Variables
let currentPin = "";
let fireworksAnimationId = null;
let isLetterOpened = false;

// Letter Text for Typewriter Effect
const LETTER_TEXT = "Happy Monthsary, myheart! Thank you for the endless laughter and our journey starting from the kargador serye. Here is our little interactive photo booth and music player (I know this isn't much, but I tried my best to develop this website for you, my dear beloved!). I love you so much, babytwin!";

document.addEventListener("DOMContentLoaded", () => {
    initVaultPin();
    initKeyboardSupport();
    initAudioPlayer();
});

/* ==========================================================================
   STEP NAVIGATION
   ========================================================================== */
function goToStep(stepId) {
    const steps = document.querySelectorAll(".intro-step");
    steps.forEach((step) => step.classList.remove("active"));

    const targetStep = document.getElementById(stepId);
    if (targetStep) targetStep.classList.add("active");
}

/* ==========================================================================
   STEP 1: PASSCODE VAULT
   ========================================================================== */
function initVaultPin() {
    const pinInput = document.getElementById("pin-input");
    if (pinInput) {
        pinInput.focus();
        pinInput.addEventListener("input", (e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 4);
            currentPin = val;
            updatePinDots();
            if (currentPin.length === 4) setTimeout(checkPin, 150);
        });
    }
}

function pressKey(digit) {
    if (currentPin.length < 4) {
        currentPin += digit;
        updatePinDots();
        const pinInput = document.getElementById("pin-input");
        if (pinInput) pinInput.value = currentPin;

        if (currentPin.length === 4) setTimeout(checkPin, 200);
    }
}

function clearPin() {
    currentPin = "";
    updatePinDots();
    const pinInput = document.getElementById("pin-input");
    if (pinInput) pinInput.value = "";
    const errorMsg = document.getElementById("lock-error");
    if (errorMsg) errorMsg.textContent = "";
}

function updatePinDots() {
    for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (dot) {
            dot.classList.toggle("filled", i < currentPin.length);
        }
    }
}

function checkPin() {
    const vaultCard = document.getElementById("vault-card");
    const errorMsg = document.getElementById("lock-error");

    if (currentPin === CORRECT_PIN) {
        if (errorMsg) errorMsg.textContent = "Access Granted! ❤️";
        setTimeout(() => {
            goToStep("step-fireworks");
            startFireworksShow();
        }, 400);
    } else {
        if (vaultCard) {
            vaultCard.classList.add("shake");
            setTimeout(() => vaultCard.classList.remove("shake"), 400);
        }
        if (errorMsg) errorMsg.textContent = "Incorrect Passcode!";
        setTimeout(clearPin, 800);
    }
}

function initKeyboardSupport() {
    document.addEventListener("keydown", (e) => {
        const lockStep = document.getElementById("step-lock");
        if (!lockStep || !lockStep.classList.contains("active")) return;

        if (e.key >= "0" && e.key <= "9") pressKey(e.key);
        else if (e.key === "Backspace" && currentPin.length > 0) {
            currentPin = currentPin.slice(0, -1);
            updatePinDots();
        } else if (e.key === "Enter") checkPin();
    });
}

/* ==========================================================================
   STEP 2: FIREWORKS & SPIDER-MAN WEB TRANSITION REVEAL
   ========================================================================== */
function startFireworksShow() {
    const canvas = document.getElementById("fireworks-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const fireworks = [];
    const particles = [];
    const colors = ["#f43f5e", "#e11d48", "#facc15", "#a855f7", "#ec4899", "#ffffff"];

    class Firework {
        constructor() {
            this.x = Math.random() * (width - 100) + 50;
            this.y = height;
            this.targetY = Math.random() * (height * 0.4) + height * 0.1;
            this.speed = Math.random() * 3 + 7;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.explode();
                return false;
            }
            return true;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        explode() {
            for (let i = 0; i < 40; i++) particles.push(new Particle(this.x, this.y, this.color));
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x; this.y = y; this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 1;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.015;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05;
            this.alpha -= this.decay;
            return this.alpha > 0;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    let frameCount = 0;
    function loop() {
        ctx.fillStyle = "rgba(5, 5, 8, 0.2)";
        ctx.fillRect(0, 0, width, height);

        if (frameCount % 12 === 0) fireworks.push(new Firework());

        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].draw();
            if (!fireworks[i].update()) fireworks.splice(i, 1);
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].draw();
            if (!particles[i].update()) particles.splice(i, 1);
        }

        frameCount++;
        fireworksAnimationId = requestAnimationFrame(loop);
    }

    loop();

    setTimeout(() => {
        if (fireworksAnimationId) cancelAnimationFrame(fireworksAnimationId);
        triggerSpideyWebPull();
    }, 3200);
}

function triggerSpideyWebPull() {
    const spideyOverlay = id("spidey-web-overlay");
    const mainSite = id("main-site");
    const introOverlay = id("intro-overlay");

    if (spideyOverlay) spideyOverlay.classList.remove("hidden");
    if (mainSite) mainSite.classList.remove("hidden");

    // Pull main site up into view
    setTimeout(() => {
        if (mainSite) {
            mainSite.classList.remove("spidey-pull-initial");
            mainSite.classList.add("spidey-pulled");
        }
        initFloatingHearts();
    }, 400);

    // Clean up intro overlay after transition
    setTimeout(() => {
        if (introOverlay) introOverlay.style.display = "none";
    }, 1600);
}

/* ==========================================================================
   BLUE LILIES ART EXHIBIT LOGIC
   ========================================================================== */
function presentFlower() {
    // Generate floating blue petals across the screen
    const petalEmojis = ["🪻", "💙", "🌸", "✨", "💙"];
    
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            const petal = document.createElement("div");
            petal.className = "blue-petal";
            petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
            petal.style.left = Math.random() * 100 + "vw";
            petal.style.fontSize = Math.random() * 20 + 16 + "px";
            
            const duration = Math.random() * 3 + 3;
            petal.style.animationDuration = duration + "s";

            document.body.appendChild(petal);
            setTimeout(() => petal.remove(), duration * 1000);
        }, i * 80);
    }
}

function swapExhibitImage(cardElement, title, desc) {
    const mainImg = id("main-exhibit-img");
    const plaqueTitle = document.querySelector(".museum-plaque h3");
    const plaqueDesc = document.querySelector(".exhibit-desc");

    const clickedImg = cardElement.querySelector("img");
    if (mainImg && clickedImg) {
        mainImg.style.opacity = "0.3";
        setTimeout(() => {
            mainImg.src = clickedImg.src;
            mainImg.style.opacity = "1";
        }, 200);
    }

    if (plaqueTitle && title) plaqueTitle.textContent = title;
    if (plaqueDesc && desc) plaqueDesc.textContent = desc;
}

/* ==========================================================================
   ENVELOPE & LIVE HANDWRITTEN TYPING ANIMATION
   ========================================================================== */
function openEnvelope() {
    const envelope = id("envelope");
    if (!envelope) return;

    envelope.classList.toggle("open");

    if (envelope.classList.contains("open") && !isLetterOpened) {
        isLetterOpened = true;
        setTimeout(() => {
            typeWriter(LETTER_TEXT, "typed-text", 40);
        }, 1000);
    }
}

function typeWriter(text, elementId, speed = 40) {
    let index = 0;
    const target = id(elementId);
    if (!target) return;
    target.textContent = "";

    function typeNextChar() {
        if (index < text.length) {
            target.textContent += text.charAt(index);
            index++;
            setTimeout(typeNextChar, speed);
        }
    }
    typeNextChar();
}

/* ==========================================================================
   SPOTIFY AUDIO PLAYER & LIGHTBOX
   ========================================================================== */
function initAudioPlayer() {
    const audio = id("spotify-audio");
    const progressBar = id("progress-bar");
    const progressContainer = id("progress-container");
    const currentTimeElem = id("current-time");
    const durationTimeElem = id("duration-time");

    if (!audio) return;

    audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            if (progressBar) progressBar.style.width = `${progressPercent}%`;
            if (currentTimeElem) currentTimeElem.textContent = formatTime(audio.currentTime);
            if (durationTimeElem) durationTimeElem.textContent = formatTime(audio.duration);
        }
    });

    if (progressContainer) {
        progressContainer.addEventListener("click", (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            if (audio.duration) audio.currentTime = (clickX / width) * audio.duration;
        });
    }
}

function togglePlay() {
    const audio = id("spotify-audio");
    const playBtn = id("play-btn");
    if (!audio || !playBtn) return;

    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

function toggleLyrics() {
    const lyricsBox = id("lyrics-box");
    if (lyricsBox) lyricsBox.classList.toggle("active");
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function openLightbox(cardElement) {
    const lightbox = id("lightbox");
    const lightboxImg = id("lightbox-img");
    const lightboxCaption = id("lightbox-caption");

    if (!lightbox || !lightboxImg) return;

    const img = cardElement.querySelector("img");
    const caption = cardElement.querySelector(".caption");

    if (img) lightboxImg.src = img.src;
    if (caption && lightboxCaption) lightboxCaption.textContent = caption.textContent;

    lightbox.classList.add("active");
}

function closeLightbox() {
    const lightbox = id("lightbox");
    if (lightbox) lightbox.classList.remove("active");
}

function initFloatingHearts() {
    const heartContainer = id("heart-container");
    if (!heartContainer) return;

    const heartSymbols = ["❤️", "💖", "💕", "💗", "💓", "🌸"];

    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 18 + 14 + "px";

        const duration = Math.random() * 4 + 4;
        heart.style.animationDuration = duration + "s";

        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000);
    }, 450);
}

function id(elementId) {
    return document.getElementById(elementId);
}
