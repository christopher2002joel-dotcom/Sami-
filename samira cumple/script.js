/* =========================================
   VARIABLES Y ESTADOS GLOBALES
========================================= */
let currentScreen = 1;
const birthdayMusic = document.getElementById("birthdayMusic");
const coldplayMusic = document.getElementById("coldplayMusic");
const flashOverlay = document.getElementById("flash-overlay");
let confettiInterval; 

/* =========================================
   SISTEMA DE PARTÍCULAS
========================================= */
function createParticle() {
    const container = document.getElementById('particles-container');
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    particle.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 4 + 2; 
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    const duration = Math.random() * 10 + 5; 
    particle.style.animationDuration = duration + 's';
    
    container.appendChild(particle);
    setTimeout(() => { particle.remove(); }, duration * 1000);
}
setInterval(createParticle, 300);

/* =========================================
   SISTEMA DE ESTRELLAS FUGACES
========================================= */
function createShootingStarsBatch() {
    const container = document.getElementById('shooting-stars-container');
    const starCount = Math.floor(Math.random() * 3) + 3; 

    for(let i = 0; i < starCount; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            star.style.top = Math.random() * (window.innerHeight / 2) + 'px';
            star.style.left = Math.random() * window.innerWidth + 200 + 'px';
            
            container.appendChild(star);
            setTimeout(() => { star.remove(); }, 1500);
        }, i * 200); 
    }
}
setInterval(createShootingStarsBatch, 5000); 

/* =========================================
   NAVEGACIÓN DE PANTALLAS
========================================= */
function nextScreen(screenNumber) {
    document.querySelector(".screen.active").classList.remove("active");
    document.getElementById("screen" + screenNumber).classList.add("active");
    currentScreen = screenNumber;

    if (screenNumber === 6) fadeOutBirthdayMusic();
    if (screenNumber === 10) setTimeout(startStarAnimation, 1500); 
    if (screenNumber === 11) startInfiniteConfetti(); 
}

function startStory() {
    birthdayMusic.volume = 0.5;
    let playPromise = birthdayMusic.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => { console.log("Auto-play prevenido."); });
    }
    nextScreen(2);
}

function goToScreen9() {
    const speechAudio = document.querySelector('.special-audio');
    if(speechAudio) speechAudio.pause();
    
    coldplayMusic.volume = 0.6;
    coldplayMusic.play();
    nextScreen(9);
}

/* =========================================
   LÍNEA DE TIEMPO DEFINITIVA
========================================= */
const timelineData = [
    { date: "📍 Octubre / Noviembre 2023", text: "Una conversación improvisada.<br>Y un susto que todavía recuerdas. 😂" },
    { date: "📍 Sábados de Inglés", text: "Luchando con todas nuestras fuerzas por no dormirnos en clases. 😂" },
    { date: "📍 Caminos separados", text: "Sabíamos que no era el momento. Estábamos en otros caminos, hubo peleas y otras personas... pero la amistad seguía ahí." },
    { date: "📍 Diciembre 2025", text: "Me armé de valor para pedir una oportunidad." },
    { date: "📍 Distancias", text: "Hubo momentos donde dejamos de hablar. Más de una vez." },
    { date: "📍 Reencuentros", text: "Pero por alguna razón siempre volvíamos a encontrarnos." },
    { date: "📍 Hace dos semanas", text: "Todo el tiempo de espera y las pruebas valieron la pena.<br>Volví a preguntar si podíamos intentarlo... y dijiste que sí. ✨" }
];

let currentTimelineIndex = 0;
const timelineContainer = document.getElementById("cinematicTimeline");
const btnTimelineStep = document.getElementById("btnTimelineStep");
const btnTimelineNext = document.getElementById("btnTimelineNext");

function advanceTimeline() {
    if (currentTimelineIndex < timelineData.length) {
        const item = timelineData[currentTimelineIndex];
        const stepDiv = document.createElement("div");
        stepDiv.className = "timeline-step";
        stepDiv.innerHTML = `<div class="timeline-date">${item.date}</div><div class="timeline-text">${item.text}</div>`;
        
        timelineContainer.appendChild(stepDiv);
        
        setTimeout(() => stepDiv.classList.add("visible"), 50);
        setTimeout(() => { stepDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 100);

        currentTimelineIndex++;

        if (currentTimelineIndex === timelineData.length) {
            btnTimelineStep.classList.add("hidden");
            setTimeout(() => {
                triggerFlash(300); 
                btnTimelineNext.classList.remove("hidden");
            }, 1000);
        }
    }
}

/* =========================================
   ANIMACIÓN DE ESTRELLAS (PANTALLA 10)
========================================= */
function startStarAnimation() {
    const starSamira = document.getElementById("starSamira");
    const starChris = document.getElementById("starChris");
    const mergedStar = document.getElementById("mergedStar");
    const btnToFinal = document.getElementById("btnToFinal");

    starSamira.classList.add("merge-center-left");
    starChris.classList.add("merge-center-right");

    setTimeout(() => {
        triggerFlash(800); 
        
        setTimeout(() => {
            starSamira.classList.add("hidden");
            starChris.classList.add("hidden");
            mergedStar.classList.remove("hidden");
        }, 400);

        setTimeout(() => {
            btnToFinal.classList.remove("hidden");
        }, 1200);

    }, 3500); 
}

function triggerFlash(duration = 500) {
    flashOverlay.style.transitionDuration = (duration / 2) + "ms";
    flashOverlay.classList.add("flash-active");
    setTimeout(() => { flashOverlay.classList.remove("flash-active"); }, duration / 2);
}

/* =========================================
   GENERAR TARJETAS 3D CON FRASES
========================================= */
const qualitiesData = [
    { title: "Tu fortaleza", desc: "Porque siempre encuentras la manera de levantarte y seguir adelante." },
    { title: "Tu valentía", desc: "Porque no te rindes, incluso cuando las circunstancias son difíciles." },
    { title: "Tu dedicación", desc: "Admiro profundamente cómo luchas por tus metas todos los días." },
    { title: "Tu corazón", desc: "Porque detrás de esa fuerza, hay una bondad y sensibilidad enorme." },
    { title: "Tu sonrisa", desc: "Tiene el poder de iluminar mis días más grises." },
    { title: "Tu inteligencia", desc: "Me encanta tu forma de ver el mundo y aprender cosas nuevas." },
    { title: "Tu perseverancia", desc: "Porque las excusas no existen en tu diccionario." },
    { title: "Tu bondad", desc: "Siempre estás dispuesta a ayudar sin esperar nada a cambio." },
    { title: "Tu empatía", desc: "Tienes el don de entender cómo se sienten los demás." },
    { title: "Tu sentido del humor", desc: "Nadie me hace reír como tú lo haces." },
    { title: "Tu madurez", desc: "La forma en la que enfrentas y asumes tus responsabilidades." },
    { title: "Tu forma de cuidarme", desc: "Esa manera tan tuya de hacerme sentir que no estoy solo." },
    { title: "Tu paciencia", desc: "Especialmente conmigo, por saber esperar el momento correcto." },
    { title: "Tu luz propia", desc: "Brillas sin necesidad de apagar la luz de nadie más." },
    { title: "Ser tú misma", desc: "Porque no cambiaría absolutamente nada de tu esencia." }
];

const cardsGrid = document.getElementById("cardsGrid");
qualitiesData.forEach(q => {
    cardsGrid.innerHTML += `
        <div class="flip-card">
            <div class="flip-inner">
                <div class="flip-front">${q.title}</div>
                <div class="flip-back">${q.desc}</div>
            </div>
        </div>
    `;
});

/* =========================================
   CONTADORES MATEMÁTICAMENTE EXACTOS (UTC-5)
========================================= */
function updateCounters() {
    // Calculamos la hora de Ecuador/Bogotá (UTC-5) de forma matemática e infalible
    const localNow = new Date();
    const utcTime = localNow.getTime() + (localNow.getTimezoneOffset() * 60000);
    const now = new Date(utcTime - (3600000 * 5)); // Restamos 5 horas al reloj universal

    const currentYear = now.getFullYear();

    // === CÁLCULO DEL BESO ===
    // 15 de Marzo (mes 2), 20:00 hrs
    const kissDate = new Date(2026, 2, 15, 20, 0, 0); 
    const diffKiss = now.getTime() - kissDate.getTime();
    
    if(diffKiss > 0) {
        const d = Math.floor(diffKiss / (1000 * 60 * 60 * 24));
        const h = Math.floor((diffKiss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diffKiss % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diffKiss % (1000 * 60)) / 1000);
        document.getElementById("kissCounter").innerHTML = `❤️ ${d} días <br> ⏰ ${h} horas <br> ⌛ ${m} minutos <br> ✨ ${s} segundos`;
    }

    // === CÁLCULO DEL CUMPLEAÑOS ===
    // 2 de Junio (mes 5), 00:00 hrs
    let bday = new Date(currentYear, 5, 2, 0, 0, 0); 
    
    // Si ya pasó el cumple de este año y además pasaron 24h, apuntamos al próximo año
    if(now.getTime() > bday.getTime() && now.getTime() - bday.getTime() > 86400000) {
        bday = new Date(currentYear + 1, 5, 2, 0, 0, 0);
    }
    
    const diffBday = bday.getTime() - now.getTime();
    
    // Si estamos en el día exacto (entre 00:00 y 23:59 del 2 de Junio)
    if (diffBday <= 0 && diffBday > -86400000) {
        document.getElementById("birthdayCountdown").innerHTML = `<br>✨ ¡ES HOY! Feliz cumpleaños ❤️🎂 ✨`;
        document.getElementById("birthdayCountdown").style.fontSize = "1.8rem";
    } else {
        const bd = Math.floor(diffBday / (1000 * 60 * 60 * 24));
        const bh = Math.floor((diffBday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const bm = Math.floor((diffBday % (1000 * 60 * 60)) / (1000 * 60));
        const bs = Math.floor((diffBday % (1000 * 60)) / 1000);
        
        // Ahora mostrará la precisión exacta (ej: 1 día, 2h, 30m) así se entiende por qué no dice 2 días.
        document.getElementById("birthdayCountdown").innerHTML = `Faltan:<br>🎂 ${bd} días, ${bh}h, ${bm}m, ${bs}s`;
    }
}
setInterval(updateCounters, 1000);
updateCounters();

/* =========================================
   UTILIDADES (Música y Confeti Infinito)
========================================= */
function fadeOutBirthdayMusic() {
    let fade = setInterval(() => {
        if(birthdayMusic.volume > 0.05) birthdayMusic.volume -= 0.05;
        else { birthdayMusic.pause(); birthdayMusic.volume = 0.5; clearInterval(fade); }
    }, 200);
}

function spawnConfettiBatch() {
    const container = document.getElementById("confetti-container");
    const colors = ['#ff4da6', '#9c6dff', '#ffd166', '#ffffff', '#ff85c0'];
    
    for(let i=0; i<15; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        
        if(Math.random() > 0.5) confetti.classList.add("circle");
        else confetti.classList.add("ribbon");
        
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 3 + 3;
        confetti.style.animationDuration = duration + "s";
        
        container.appendChild(confetti);
        
        setTimeout(() => { confetti.remove(); }, duration * 1000);
    }
}

function startInfiniteConfetti() {
    spawnConfettiBatch(); 
    confettiInterval = setInterval(spawnConfettiBatch, 800); 
}

function restartExperience() {
    clearInterval(confettiInterval);
    
    for(let i=0; i<10; i++) spawnConfettiBatch(); 
    
    setTimeout(() => {
        coldplayMusic.pause(); coldplayMusic.currentTime = 0;
        birthdayMusic.pause(); birthdayMusic.currentTime = 0;

        timelineContainer.innerHTML = "";
        currentTimelineIndex = 0;
        btnTimelineStep.classList.remove("hidden");
        btnTimelineNext.classList.add("hidden");

        const sSamira = document.getElementById("starSamira");
        const sChris = document.getElementById("starChris");
        sSamira.className = "star-item left-star";
        sChris.className = "star-item right-star";
        document.getElementById("mergedStar").className = "merged-star hidden";
        document.getElementById("btnToFinal").className = "premium-btn hidden";
        
        void sSamira.offsetWidth;
        void sChris.offsetWidth;

        document.getElementById("confetti-container").innerHTML = "";

        nextScreen(1);
    }, 2500);
}