const messageSection = document.getElementById("messageSection");
const typedMessage = document.getElementById("typedMessage");
const typingCursor = document.getElementById("typingCursor");
const cake = document.getElementById("birthdayCake");
const cakeScene = document.getElementById("cakeScene");
const cakeTip = document.getElementById("cakeTip");
const cutCakeBtn = document.getElementById("cutCakeBtn");
const cakeSparkles = document.getElementById("cakeSparkles");
const confettiLayer = document.getElementById("confettiLayer");
const cakeFireworksLayer = document.getElementById("cakeFireworksLayer");
const balloonLayer = document.getElementById("balloonLayer");
const finalCelebration = document.getElementById("finalCelebration");
const finalWish = document.getElementById("finalWish");
const worldSwipeShell = document.getElementById("worldSwipeShell");
const worldSwipeFill = document.getElementById("worldSwipeFill");
const worldSwipeThumb = document.getElementById("worldSwipeThumb");
const surpriseWorld = document.getElementById("surpriseWorld");
const surpriseWorldLayer = document.getElementById("surpriseWorldLayer");
const surpriseWorldClose = document.getElementById("surpriseWorldClose");

const introOverlay = document.getElementById("introOverlay");
const introFloatingLayer = document.getElementById("introFloatingLayer");
const swipeShell = document.getElementById("swipeShell");
const swipeFill = document.getElementById("swipeFill");
const swipeThumb = document.getElementById("swipeThumb");
const introCinematic = document.getElementById("introCinematic");
const introGoldParticles = document.getElementById("introGoldParticles");
const mainExperience = document.getElementById("mainExperience");
const floatingLayer = document.getElementById("floatingLayer");

const birthdayMessage =
  "Bhanu, on your birthday I just want to remind you how special you are. " +
  "You make ordinary moments feel magical, and your smile lights up every room. " +
  "May this year bring you peace, love, laughter, and all the dreams your heart quietly holds.";

let typingStarted = false;
let typingIndex = 0;
let typingTimer = null;
let candlesLit = false;
let cakeCut = false;
let balloonsCreated = false;

let swipeProgress = 0;
let swipeDragging = false;
let swipeCompleted = false;
let worldSwipeProgress = 0;
let worldSwipeDragging = false;
let worldSwipeCompleted = false;
let surpriseWorldParticlesReady = false;

function createFloatingParticles(layer, baseClass, items) {
  if (!layer) {
    return;
  }

  items.forEach((type) => {
    for (let i = 0; i < type.count; i += 1) {
      const particle = document.createElement("span");
      particle.className = `${baseClass} ${type.className}`;
      if (type.symbol) {
        particle.textContent = type.symbol;
      }

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.setProperty("--size", `${10 + Math.random() * 22}px`);
      particle.style.setProperty("--drift", `${-45 + Math.random() * 90}px`);
      particle.style.setProperty("--duration", `${8 + Math.random() * 10}s`);
      particle.style.setProperty("--delay", `${-Math.random() * 18}s`);
      layer.appendChild(particle);
    }
  });
}

function initFloatingLayers() {
  const mainItems = [
    { symbol: "❤", className: "heart", count: 20 },
    { symbol: "✦", className: "sparkle", count: 18 },
    { symbol: "", className: "glow", count: 16 }
  ];
  const introItems = [
    { symbol: "❤", className: "heart", count: 18 },
    { symbol: "✦", className: "sparkle", count: 16 },
    { symbol: "", className: "glow", count: 14 }
  ];

  createFloatingParticles(floatingLayer, "float-item", mainItems);
  createFloatingParticles(introFloatingLayer, "intro-particle", introItems);
}

function initSurpriseWorldParticles() {
  if (!surpriseWorldLayer || surpriseWorldParticlesReady) {
    return;
  }

  const worldItems = [
    { symbol: "❤", className: "heart", count: 24 },
    { symbol: "✦", className: "sparkle", count: 20 },
    { symbol: "", className: "glow", count: 16 }
  ];

  createFloatingParticles(surpriseWorldLayer, "world-float", worldItems);
  surpriseWorldParticlesReady = true;
}

function startTyping() {
  if (typingStarted || !typedMessage || !typingCursor) {
    return;
  }

  typingStarted = true;
  typedMessage.textContent = "";

  typingTimer = window.setInterval(() => {
    typedMessage.textContent += birthdayMessage.charAt(typingIndex);
    typingIndex += 1;

    if (typingIndex >= birthdayMessage.length) {
      window.clearInterval(typingTimer);
      typingCursor.style.display = "none";
    }
  }, 26);
}

function revealOnScroll() {
  const revealSections = document.querySelectorAll(".reveal-on-scroll");
  if (!("IntersectionObserver" in window)) {
    revealSections.forEach((section) => section.classList.add("visible"));
    startTyping();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealSections.forEach((section) => observer.observe(section));

  if (!messageSection) {
    return;
  }

  const messageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startTyping();
          messageObserver.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  messageObserver.observe(messageSection);
}

function createCakeSparkles(count) {
  if (!cakeSparkles) {
    return;
  }

  for (let i = 0; i < count; i += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "mini-sparkle";
    sparkle.style.left = `${36 + Math.random() * 28}%`;
    sparkle.style.top = `${32 + Math.random() * 32}%`;
    sparkle.style.setProperty("--x", `${-95 + Math.random() * 190}px`);
    sparkle.style.setProperty("--y", `${-105 + Math.random() * 145}px`);
    sparkle.style.animationDelay = `${Math.random() * 0.2}s`;
    cakeSparkles.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), 980);
  }
}

function burstConfetti() {
  if (!confettiLayer) {
    return;
  }

  const colors = ["#ffd96d", "#ff7dbc", "#b388ff", "#92f2ff", "#ffffff", "#ff9f71", "#ffc35c"];

  for (let i = 0; i < 72; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.setProperty("--x", `${-240 + Math.random() * 480}px`);
    piece.style.setProperty("--y", `${90 + Math.random() * 250}px`);
    piece.style.setProperty("--rot", `${Math.random() * 720 - 360}deg`);
    piece.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
    confettiLayer.appendChild(piece);
    window.setTimeout(() => piece.remove(), 1600);
  }
}

function burstCakeFireworks(totalBursts) {
  if (!cakeFireworksLayer) {
    return;
  }

  const colors = ["#ffd96d", "#ff87c0", "#b388ff", "#92f2ff", "#ffffff", "#ff9f71"];

  for (let i = 0; i < totalBursts; i += 1) {
    window.setTimeout(() => {
      const burst = document.createElement("span");
      burst.className = "cake-firework-burst";
      burst.style.left = `${14 + Math.random() * 72}%`;
      burst.style.top = `${8 + Math.random() * 48}%`;
      burst.style.setProperty("--fw-scale", `${0.78 + Math.random() * 0.7}`);
      burst.style.setProperty("--fw-rot", `${Math.random() * 45 - 22.5}deg`);
      burst.style.setProperty("--fw-color", colors[Math.floor(Math.random() * colors.length)]);
      cakeFireworksLayer.appendChild(burst);
      window.setTimeout(() => burst.remove(), 1100);
    }, i * 120);
  }
}

function showBalloons() {
  if (balloonsCreated || !balloonLayer) {
    return;
  }

  const balloonColors = ["#ff8ecf", "#ffa4db", "#c594ff", "#ff738f", "#f4afff", "#ffcf70"];

  for (let i = 0; i < 10; i += 1) {
    const balloon = document.createElement("span");
    balloon.className = "balloon";
    balloon.style.left = `${2 + i * 10 + Math.random() * 4}%`;
    balloon.style.setProperty("--balloon-color", balloonColors[i % balloonColors.length]);
    balloon.style.setProperty("--duration", `${4.4 + Math.random() * 1.9}s`);
    balloon.style.setProperty("--delay", `${Math.random() * 1.3}s`);
    balloonLayer.appendChild(balloon);
  }

  balloonsCreated = true;
  balloonLayer.classList.add("visible");
}

function triggerFinalCelebration() {
  if (!finalCelebration || !finalWish) {
    return;
  }

  finalCelebration.classList.add("active");
  finalCelebration.setAttribute("aria-hidden", "false");

  finalWish.classList.add("visible");
  window.setTimeout(() => {
    finalWish.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 350);

  window.setTimeout(() => {
    finalCelebration.classList.remove("active");
    finalCelebration.setAttribute("aria-hidden", "true");
  }, 5800);
}

function lightCandles() {
  if (candlesLit || !cakeScene || !cakeTip || !cutCakeBtn) {
    return;
  }

  candlesLit = true;
  cakeScene.classList.add("lit");
  cakeTip.textContent = "Candles are glowing. Make your wish under the golden lights ✨";
  createCakeSparkles(26);

  cutCakeBtn.hidden = false;
  window.requestAnimationFrame(() => {
    cutCakeBtn.classList.add("show");
  });
}

function cutCake() {
  if (!candlesLit || cakeCut || !cakeScene || !cakeTip || !cutCakeBtn) {
    return;
  }

  cakeCut = true;
  cutCakeBtn.disabled = true;
  cakeTip.textContent = "A magical slice for a magical birthday...";
  cakeScene.classList.add("cutting");
  createCakeSparkles(30);
  burstCakeFireworks(6);
  window.setTimeout(() => burstCakeFireworks(5), 320);

  window.setTimeout(() => {
    cakeScene.classList.remove("cutting");
    cakeScene.classList.add("cut");
    burstConfetti();
    burstCakeFireworks(8);
    showBalloons();
    cakeTip.textContent = "Happy Birthday Bhanu! Let the celebration bloom 🎉";
    triggerFinalCelebration();
  }, 950);
}

function getSwipeMaxTravel() {
  if (!swipeShell || !swipeThumb) {
    return 0;
  }

  return Math.max(0, swipeShell.clientWidth - swipeThumb.offsetWidth - 10);
}

function setSwipeProgress(progress, animate) {
  if (!swipeThumb || !swipeFill || !swipeShell || !introOverlay) {
    return;
  }

  swipeProgress = Math.min(1, Math.max(0, progress));
  const travel = getSwipeMaxTravel();

  swipeThumb.style.transition = animate ? "transform 0.24s ease" : "none";
  swipeFill.style.transition = animate ? "width 0.24s ease" : "none";

  swipeThumb.style.transform = `translateX(${travel * swipeProgress}px)`;
  swipeFill.style.width = `${swipeProgress * 100}%`;
  swipeShell.setAttribute("aria-valuenow", String(Math.round(swipeProgress * 100)));

  if (!swipeCompleted) {
    introOverlay.style.transform = `scale(${1 + swipeProgress * 0.015})`;
  }
}

function updateSwipeByClientX(clientX) {
  if (!swipeShell || !swipeThumb) {
    return;
  }

  const rect = swipeShell.getBoundingClientRect();
  const thumbWidth = swipeThumb.offsetWidth;
  const maxTravel = getSwipeMaxTravel();
  const localX = clientX - rect.left - thumbWidth / 2 - 5;
  const nextTravel = Math.min(Math.max(localX, 0), maxTravel);

  setSwipeProgress(maxTravel > 0 ? nextTravel / maxTravel : 0, false);
}

function createIntroBurst(x, y, count, spreadX = 240, spreadY = 180) {
  if (!introOverlay) {
    return;
  }

  for (let i = 0; i < count; i += 1) {
    const burst = document.createElement("span");
    burst.className = "intro-burst";
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    burst.style.setProperty("--x", `${-(spreadX / 2) + Math.random() * spreadX}px`);
    burst.style.setProperty("--y", `${-spreadY + Math.random() * spreadY}px`);
    burst.style.animationDelay = `${Math.random() * 0.12}s`;
    introOverlay.appendChild(burst);
    window.setTimeout(() => burst.remove(), 940);
  }
}

function spawnIntroGoldParticles(count) {
  if (!introGoldParticles) {
    return;
  }

  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement("span");
    dot.className = "intro-gold-dot";
    const size = 4 + Math.random() * 7;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${15 + Math.random() * 70}%`;
    dot.style.setProperty("--x", `${-110 + Math.random() * 220}px`);
    dot.style.setProperty("--y", `${-180 + Math.random() * 200}px`);
    dot.style.setProperty("--dur", `${1.1 + Math.random() * 0.9}s`);
    introGoldParticles.appendChild(dot);
    window.setTimeout(() => dot.remove(), 2200);
  }
}

function showMainPage() {
  if (mainExperience) {
    mainExperience.classList.add("entered");
  }

  document.body.classList.remove("intro-pending");

  if (introOverlay) {
    introOverlay.classList.add("fade-out");
    window.setTimeout(() => {
      introOverlay.remove();
    }, 900);
  }
}

function startCinematicTransition() {
  if (!introOverlay || !introCinematic) {
    showMainPage();
    return;
  }

  introOverlay.classList.add("transitioning");
  introCinematic.classList.add("active");
  introCinematic.setAttribute("aria-hidden", "false");

  spawnIntroGoldParticles(56);
  window.setTimeout(() => spawnIntroGoldParticles(42), 520);

  window.setTimeout(() => {
    showMainPage();
  }, 2000);
}

function completeSwipe() {
  if (swipeCompleted || !swipeShell || !swipeThumb || !introOverlay) {
    return;
  }

  swipeCompleted = true;
  swipeShell.classList.add("completed");
  introOverlay.style.transform = "";
  setSwipeProgress(1, true);
  introOverlay.classList.add("swiped");

  const thumbRect = swipeThumb.getBoundingClientRect();
  const overlayRect = introOverlay.getBoundingClientRect();
  const burstX = thumbRect.left + thumbRect.width / 2 - overlayRect.left;
  const burstY = thumbRect.top + thumbRect.height / 2 - overlayRect.top;
  createIntroBurst(burstX, burstY, 28);

  window.setTimeout(startCinematicTransition, 360);
}

function setupIntroSwipe() {
  if (!introOverlay || !swipeShell || !swipeThumb || !swipeFill) {
    showMainPage();
    return;
  }

  setSwipeProgress(0, true);

  swipeShell.addEventListener("pointerdown", (event) => {
    if (swipeCompleted) {
      return;
    }

    swipeDragging = true;
    swipeShell.classList.add("dragging");
    swipeShell.setPointerCapture(event.pointerId);
    updateSwipeByClientX(event.clientX);
  });

  swipeShell.addEventListener("pointermove", (event) => {
    if (!swipeDragging || swipeCompleted) {
      return;
    }

    updateSwipeByClientX(event.clientX);
    if (Math.random() < 0.18 && introOverlay && swipeThumb) {
      const thumbRect = swipeThumb.getBoundingClientRect();
      const overlayRect = introOverlay.getBoundingClientRect();
      const x = thumbRect.left + thumbRect.width / 2 - overlayRect.left;
      const y = thumbRect.top + thumbRect.height / 2 - overlayRect.top;
      createIntroBurst(x, y, 3, 60, 70);
    }
  });

  const endSwipeDrag = () => {
    if (!swipeDragging || swipeCompleted) {
      return;
    }

    swipeDragging = false;
    swipeShell.classList.remove("dragging");

    if (swipeProgress >= 0.92) {
      completeSwipe();
    } else {
      setSwipeProgress(0, true);
    }
  };

  swipeShell.addEventListener("pointerup", endSwipeDrag);
  swipeShell.addEventListener("pointercancel", endSwipeDrag);

  swipeThumb.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && !swipeCompleted) {
      event.preventDefault();
      completeSwipe();
    }
  });

  window.addEventListener("resize", () => {
    setSwipeProgress(swipeProgress, true);
  });
}

function getWorldSwipeMaxTravel() {
  if (!worldSwipeShell || !worldSwipeThumb) {
    return 0;
  }

  return Math.max(0, worldSwipeShell.clientWidth - worldSwipeThumb.offsetWidth - 12);
}

function setWorldSwipeProgress(progress, animate) {
  if (!worldSwipeShell || !worldSwipeThumb || !worldSwipeFill) {
    return;
  }

  worldSwipeProgress = Math.min(1, Math.max(0, progress));
  const travel = getWorldSwipeMaxTravel();

  worldSwipeThumb.style.transition = animate ? "transform 0.24s ease" : "none";
  worldSwipeFill.style.transition = animate ? "width 0.24s ease" : "none";

  worldSwipeThumb.style.transform = `translateX(${travel * worldSwipeProgress}px)`;
  worldSwipeFill.style.width = `${worldSwipeProgress * 100}%`;
  worldSwipeShell.setAttribute("aria-valuenow", String(Math.round(worldSwipeProgress * 100)));
}

function updateWorldSwipeByClientX(clientX) {
  if (!worldSwipeShell || !worldSwipeThumb) {
    return;
  }

  const rect = worldSwipeShell.getBoundingClientRect();
  const thumbWidth = worldSwipeThumb.offsetWidth;
  const maxTravel = getWorldSwipeMaxTravel();
  const localX = clientX - rect.left - thumbWidth / 2 - 6;
  const nextTravel = Math.min(Math.max(localX, 0), maxTravel);

  setWorldSwipeProgress(maxTravel > 0 ? nextTravel / maxTravel : 0, false);
}

function createWorldSwipeBurst(x, y, count, spreadX = 180, spreadY = 120) {
  if (!worldSwipeShell) {
    return;
  }

  for (let i = 0; i < count; i += 1) {
    const burst = document.createElement("span");
    burst.className = "world-swipe-burst";
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    burst.style.setProperty("--x", `${-(spreadX / 2) + Math.random() * spreadX}px`);
    burst.style.setProperty("--y", `${-spreadY + Math.random() * spreadY}px`);
    worldSwipeShell.appendChild(burst);
    window.setTimeout(() => burst.remove(), 930);
  }
}

function openSurpriseWorld() {
  if (!surpriseWorld) {
    return;
  }

  initSurpriseWorldParticles();
  surpriseWorld.classList.add("active");
  surpriseWorld.setAttribute("aria-hidden", "false");
  document.body.classList.add("surprise-open");
}

function resetWorldSwipe() {
  if (!worldSwipeShell) {
    return;
  }

  worldSwipeCompleted = false;
  worldSwipeDragging = false;
  worldSwipeShell.classList.remove("completed", "dragging");
  setWorldSwipeProgress(0, true);
}

function closeSurpriseWorld() {
  if (!surpriseWorld) {
    return;
  }

  surpriseWorld.classList.remove("active");
  surpriseWorld.setAttribute("aria-hidden", "true");
  document.body.classList.remove("surprise-open");

  window.setTimeout(() => {
    resetWorldSwipe();
  }, 240);
}

function completeWorldSwipe() {
  if (worldSwipeCompleted || !worldSwipeShell || !worldSwipeThumb) {
    return;
  }

  worldSwipeCompleted = true;
  worldSwipeShell.classList.add("completed");
  setWorldSwipeProgress(1, true);

  const thumbRect = worldSwipeThumb.getBoundingClientRect();
  const shellRect = worldSwipeShell.getBoundingClientRect();
  const burstX = thumbRect.left + thumbRect.width / 2 - shellRect.left;
  const burstY = thumbRect.top + thumbRect.height / 2 - shellRect.top;
  createWorldSwipeBurst(burstX, burstY, 26, 220, 150);

  window.setTimeout(() => {
    openSurpriseWorld();
  }, 300);
}

function setupWorldSwipe() {
  if (!worldSwipeShell || !worldSwipeFill || !worldSwipeThumb || !surpriseWorld) {
    return;
  }

  setWorldSwipeProgress(0, true);

  worldSwipeShell.addEventListener("pointerdown", (event) => {
    if (worldSwipeCompleted) {
      return;
    }

    worldSwipeDragging = true;
    worldSwipeShell.classList.add("dragging");
    worldSwipeShell.setPointerCapture(event.pointerId);
    updateWorldSwipeByClientX(event.clientX);
  });

  worldSwipeShell.addEventListener("pointermove", (event) => {
    if (!worldSwipeDragging || worldSwipeCompleted) {
      return;
    }

    updateWorldSwipeByClientX(event.clientX);
    if (Math.random() < 0.15) {
      const thumbRect = worldSwipeThumb.getBoundingClientRect();
      const shellRect = worldSwipeShell.getBoundingClientRect();
      const x = thumbRect.left + thumbRect.width / 2 - shellRect.left;
      const y = thumbRect.top + thumbRect.height / 2 - shellRect.top;
      createWorldSwipeBurst(x, y, 2, 54, 64);
    }
  });

  const endWorldSwipeDrag = () => {
    if (!worldSwipeDragging || worldSwipeCompleted) {
      return;
    }

    worldSwipeDragging = false;
    worldSwipeShell.classList.remove("dragging");

    if (worldSwipeProgress >= 0.9) {
      completeWorldSwipe();
    } else {
      setWorldSwipeProgress(0, true);
    }
  };

  worldSwipeShell.addEventListener("pointerup", endWorldSwipeDrag);
  worldSwipeShell.addEventListener("pointercancel", endWorldSwipeDrag);

  worldSwipeThumb.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && !worldSwipeCompleted) {
      event.preventDefault();
      completeWorldSwipe();
    }
  });

  if (surpriseWorldClose) {
    surpriseWorldClose.addEventListener("click", closeSurpriseWorld);
  }

  surpriseWorld.addEventListener("click", (event) => {
    if (event.target === surpriseWorld) {
      closeSurpriseWorld();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && surpriseWorld.classList.contains("active")) {
      closeSurpriseWorld();
    }
  });

  window.addEventListener("resize", () => {
    setWorldSwipeProgress(worldSwipeProgress, true);
  });
}

function setupMainInteractions() {
  if (cake) {
    cake.addEventListener("click", lightCandles);
    cake.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        lightCandles();
      }
    });
  }

  if (cutCakeBtn) {
    cutCakeBtn.addEventListener("click", cutCake);
  }
}

function init() {
  initFloatingLayers();
  revealOnScroll();
  setupMainInteractions();
  setupIntroSwipe();
  setupWorldSwipe();
}

init();
