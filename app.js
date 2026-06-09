const state = {
  activeView: "home",
  objectiveFilter: "all",
  points: 1280,
  streak: 7,
  missions: [
    { id: "stairs", title: "Sube 6 pisos por escaleras", detail: "Evita el elevador entre clases", points: 120, done: false },
    { id: "walk", title: "Camina a tu siguiente edificio", detail: "Biblioteca a cafeteria sin usar carro", points: 90, done: true },
    { id: "break", title: "Pausa activa de 8 minutos", detail: "Estira o camina antes de estudiar", points: 70, done: false }
  ],
  challenges: [
    { title: "Racha sin elevador", detail: "Usa escaleras 5 dias seguidos en campus.", progress: 72, tag: "Activo" },
    { title: "Semana caminable", detail: "Completa 8 traslados caminando entre edificios.", progress: 48, tag: "Equipo" },
    { title: "Tour campus", detail: "Visita 4 puntos del campus durante la semana.", progress: 30, tag: "Nuevo" }
  ],
  objectives: [
    { type: "stairs", title: "Subir al 4to piso", detail: "Usa escaleras al llegar a tu clase.", time: "6 pisos", level: "Diario", points: "+120" },
    { type: "walk", title: "Caminar entre edificios", detail: "Ve de biblioteca a cafeteria sin carro.", time: "9 min", level: "Campus", points: "+90" },
    { type: "habit", title: "Pausa activa de estudio", detail: "Camina o estira entre bloques de tarea.", time: "8 min", level: "Ligero", points: "+70" },
    { type: "walk", title: "Ruta larga despues de clase", detail: "Rodea el jardin central antes de salir.", time: "12 min", level: "Opcional", points: "+110" }
  ],
  friends: [
    { name: "Ana", score: 2410, streak: 9 },
    { name: "Marco", score: 2180, streak: 8 },
    { name: "Tu", score: 1960, streak: 7, me: true },
    { name: "Sofia", score: 1880, streak: 6 },
    { name: "Leo", score: 1710, streak: 5 }
  ]
};

const icons = {
  check: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.2 16.6-4-4 1.4-1.4 2.6 2.6 8.2-8.2L18.8 7z"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22a2.4 2.4 0 0 0 2.3-1.8H9.7A2.4 2.4 0 0 0 12 22zm7-5-1.5-2.2V10a5.5 5.5 0 0 0-4-5.3V3a1.5 1.5 0 0 0-3 0v1.7a5.5 5.5 0 0 0-4 5.3v4.8L5 17z"/></svg>`,
  play: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`,
  flame: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2s1 4-2 7c-2.2 2.2-3.5 4.3-3.5 6.5A4.5 4.5 0 0 0 12 20a4.5 4.5 0 0 0 4.5-4.5c0-2.8-1.8-4.3-3-5.5.2 2-1.1 3.5-2.5 4 .8-2.5.6-4.5 2-7z"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 2-8 12h6l-1 8 9-13h-6z"/></svg>`,
  steps: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 13.5c1.7 0 3 1.1 3 2.7 0 1.9-1.5 3.8-3.7 3.8-1.7 0-3.3-1.1-3.3-2.9 0-1.9 1.8-3.6 4-3.6zm8.2-9.5c1.6 0 3.1 1.1 3.1 2.9 0 1.9-1.7 3.6-3.9 3.6-1.7 0-3-1.1-3-2.7 0-1.9 1.6-3.8 3.8-3.8z"/></svg>`,
  medal: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2h8l-2 6h-4zm4 7a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 3-1.1 2.1-2.3.3 1.7 1.6-.4 2.3 2.1-1.1 2.1 1.1-.4-2.3 1.7-1.6-2.3-.3z"/></svg>`,
  stairs: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h5v-4h5v-4h6v8h-2v-6h-5v4H8v4H4zM5 8.5A2.5 2.5 0 1 1 10 8.5 2.5 2.5 0 0 1 5 8.5zm5.3 2.8 1.4-1.4 2.8 2.8-1.4 1.4z"/></svg>`,
  map: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 6 2 5-2v16l-5 2-6-2-5 2V6zm1.5 3v10.8l3 1V8zm-5 1v10.8l3-1V7zm9.5.2V19l3-1.2V7z"/></svg>`,
  group: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm7-1a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20a6.5 6.5 0 0 1 13 0zm12.4 0a7.8 7.8 0 0 0-2.1-4.9A5.5 5.5 0 0 1 22 18.6V20z"/></svg>`
};

const app = document.querySelector("#app");
const tabButtons = [...document.querySelectorAll(".tab-button")];
let toastTimer;

function totalCompletedPoints() {
  return state.missions.filter((mission) => mission.done).reduce((sum, mission) => sum + mission.points, 0);
}

function dailyProgress() {
  return Math.round((state.missions.filter((mission) => mission.done).length / state.missions.length) * 100);
}

function topbar(title, eyebrow = "Campus Activo") {
  return `
    <header class="topbar">
      <div>
        <span class="eyebrow">${eyebrow}</span>
        <h1>${title}</h1>
      </div>
      <button class="icon-button" type="button" aria-label="Notificaciones">${icons.bell}</button>
    </header>
  `;
}

function ring(percent) {
  const offset = 339 - (339 * percent) / 100;
  return `
    <div class="progress-ring" style="--offset:${offset}">
      <svg viewBox="0 0 128 128" aria-hidden="true">
        <circle class="track" cx="64" cy="64" r="54"></circle>
        <circle class="value" cx="64" cy="64" r="54"></circle>
      </svg>
      <div class="ring-label">
        <strong>${percent}%</strong>
        <span>del dia</span>
      </div>
    </div>
  `;
}

function renderHome() {
  const progress = dailyProgress();
  return `
    ${topbar("Hola alumno", "Tu campus hoy")}
    <section class="hero-card">
      <div class="hero-copy">
        <h2>Muevete entre clases</h2>
        <p>Completa objetivos simples del campus, conserva tu racha y comparate con tus amigos.</p>
        <div class="hero-actions">
          <button class="primary-button" data-view-link="goals" type="button">${icons.stairs} Ver objetivos</button>
          <button class="ghost-button" data-view-link="friends" type="button" aria-label="Ver amigos">${icons.group}</button>
        </div>
      </div>
    </section>

    <section class="metrics" aria-label="Resumen">
      <article class="metric">
        <div class="metric-icon green">${icons.flame}</div>
        <strong>${state.streak}</strong>
        <span>dias de racha</span>
      </article>
      <article class="metric">
        <div class="metric-icon cyan">${icons.bolt}</div>
        <strong>${state.points}</strong>
        <span>puntos activos</span>
      </article>
      <article class="metric">
        <div class="metric-icon gold">${icons.stairs}</div>
        <strong>18</strong>
        <span>pisos esta semana</span>
      </article>
    </section>

    <div class="section-row">
      <div>
        <h2>Objetivo diario</h2>
        <p>${totalCompletedPoints()} pts ganados hoy</p>
      </div>
      ${ring(progress)}
    </div>

    <section class="mission-list">
      ${state.missions.map((mission) => `
        <article class="mission-card ${mission.done ? "is-done" : ""}">
          <button class="mission-check" data-mission="${mission.id}" type="button" aria-label="Completar ${mission.title}">
            ${mission.done ? icons.check : icons.stairs}
          </button>
          <div>
            <h3>${mission.title}</h3>
            <p>${mission.detail}</p>
          </div>
          <span class="points-pill">+${mission.points}</span>
        </article>
      `).join("")}
    </section>
  `;
}

function renderGoals() {
  const filtered = state.objectiveFilter === "all"
    ? state.objectives
    : state.objectives.filter((objective) => objective.type === state.objectiveFilter);

  return `
    ${topbar("Objetivos", "Campus diario")}
    <div class="segmented" role="tablist" aria-label="Filtro de objetivos">
      ${[
        ["all", "Todo"],
        ["stairs", "Escaleras"],
        ["walk", "Caminar"]
      ].map(([id, label]) => `
        <button class="${state.objectiveFilter === id ? "is-selected" : ""}" data-filter="${id}" type="button">${label}</button>
      `).join("")}
    </div>

    <div class="section-row">
      <div>
        <h2>Pequenos cambios de campus</h2>
        <p>Objetivos cotidianos para moverte sin apartar tiempo extra.</p>
      </div>
    </div>

    <section class="routine-list">
      ${filtered.map((objective) => `
        <article class="routine-card">
          <div>
            <div class="routine-head">
              <div>
                <h3>${objective.title}</h3>
                <p>${objective.detail}</p>
              </div>
              <span class="points-pill">${objective.points}</span>
            </div>
            <div class="routine-meta">
              <span>${objective.time}</span>
              <span>${objective.level}</span>
            </div>
          </div>
          <button class="action" type="button" data-start="${objective.title}" aria-label="Iniciar ${objective.title}">${icons.play}</button>
        </article>
      `).join("")}
    </section>
  `;
}

function renderChallenges() {
  return `
    ${topbar("Retos", "Rachas")}
    <section class="hero-card">
      <div class="hero-copy">
        <h2>Liga de amigos</h2>
        <p>Estas a 220 puntos del top 2. Completa dos objetivos del campus para subir.</p>
        <div class="hero-actions">
          <button class="primary-button" data-view-link="goals" type="button">${icons.bolt} Ganar puntos</button>
        </div>
      </div>
    </section>

    <div class="section-row">
      <div>
        <h2>Retos activos</h2>
        <p>Metas semanales para usar menos elevador y caminar mas.</p>
      </div>
    </div>

    <section class="challenge-list">
      ${state.challenges.map((challenge) => `
        <article class="challenge-card">
          <div class="challenge-head">
            <div>
              <h3>${challenge.title}</h3>
              <p>${challenge.detail}</p>
            </div>
            <span class="tag">${challenge.tag}</span>
          </div>
          <div class="progress-bar" aria-label="${challenge.progress}% completado">
            <span style="--w:${challenge.progress}%"></span>
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function renderFriends() {
  return `
    ${topbar("Amigos", "Comparate")}
    <section class="profile-card">
      <div class="challenge-head">
        <div>
          <h2>Tu grupo de clase</h2>
          <p class="subtle">Compara rachas, pisos subidos y puntos activos para motivarse entre ustedes.</p>
        </div>
        <span class="reward-art">${icons.group}</span>
      </div>
    </section>

    <div class="section-row">
      <div>
        <h2>Ranking semanal</h2>
        <p>Basado en objetivos completados dentro del campus.</p>
      </div>
    </div>

    <section class="leaderboard">
      ${state.friends.map((friend, index) => `
        <article class="leader-card ${friend.me ? "me" : ""}">
          <span class="rank">#${index + 1}</span>
          <span class="mini-avatar">${friend.name.slice(0, 1)}</span>
          <div>
            <h3>${friend.name}</h3>
            <p class="subtle">${friend.streak} dias de racha</p>
          </div>
          <span class="points-pill">${friend.score}</span>
        </article>
      `).join("")}
    </section>
  `;
}

function renderProfile() {
  return `
    ${topbar("Perfil", "Nivel campus")}
    <section class="profile-card">
      <div class="profile-main">
        <div class="profile-avatar">A</div>
        <div>
          <h2>Alumno</h2>
          <p class="subtle">Racha activa · 18 objetivos completados este mes</p>
        </div>
      </div>
      <div class="metrics">
        <article class="metric">
          <strong>64</strong>
          <span>pisos subidos</span>
        </article>
        <article class="metric">
          <strong>12.8k</strong>
          <span>pts totales</span>
        </article>
        <article class="metric">
          <strong>86%</strong>
          <span>constancia</span>
        </article>
      </div>
    </section>

    <div class="section-row">
      <div>
        <h2>Logros</h2>
        <p>Insignias por elegir escaleras, caminar y mantener rachas.</p>
      </div>
    </div>

    <section class="profile-card">
      <div class="achievement-row" aria-label="Logros">
        <span class="achievement">${icons.flame}</span>
        <span class="achievement">${icons.stairs}</span>
        <span class="achievement">${icons.map}</span>
        <span class="achievement">${icons.group}</span>
      </div>
    </section>
  `;
}

const renderers = {
  home: renderHome,
  goals: renderGoals,
  challenges: renderChallenges,
  friends: renderFriends,
  profile: renderProfile
};

function setView(view) {
  state.activeView = view;
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });
  app.innerHTML = renderers[view]();
  app.scrollTop = 0;
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

document.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-view]");
  if (tab) {
    setView(tab.dataset.view);
    return;
  }

  const viewLink = event.target.closest("[data-view-link]");
  if (viewLink) {
    setView(viewLink.dataset.viewLink);
    return;
  }

  const missionButton = event.target.closest("[data-mission]");
  if (missionButton) {
    const mission = state.missions.find((item) => item.id === missionButton.dataset.mission);
    mission.done = !mission.done;
    state.points += mission.done ? mission.points : -mission.points;
    setView("home");
    showToast(mission.done ? `Objetivo completado: +${mission.points} pts` : "Objetivo marcado como pendiente");
    return;
  }

  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) {
    state.objectiveFilter = filterButton.dataset.filter;
    setView("goals");
    return;
  }

  const startButton = event.target.closest("[data-start]");
  if (startButton) {
    showToast(`Objetivo iniciado: ${startButton.dataset.start}`);
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

setView("home");
