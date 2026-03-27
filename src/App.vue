<template>
  <div :class="['app', darkMode ? 'dark' : 'light']">
    <GstHeader :dark-mode="darkMode" @toggle-menu="menuOpen = !menuOpen" @toggle-dark="toggleDarkMode" class="header" />
    <router-view v-slot="{ Component, route }">
      <transition v-if="route.path !== '/carrito'" name="page-fade" mode="out-in">
        <component :is="Component" :key="route.fullPath" :dark-mode="darkMode" @toggle-form="toggleForm" />
      </transition>
      <!-- Sin transición para el carrito -->
      <component v-else :is="Component" :key="route.fullPath" :dark-mode="darkMode" @toggle-form="toggleForm" />
    </router-view>
    <GstFooter :dark-mode="darkMode" />
    <WompiForm :dark-mode="darkMode" class="wompiForm" v-show="isForm" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import WompiForm from './components/Pays/WompiForm.vue'
import GstHeader from './components/index/GstHeader.vue'
//import GstBottomNav from './components/index/GstBottomNav.vue'
import GstFooter from './components/index/GstFooter.vue'

const isForm = ref(false)
const menuOpen = ref(false)
const darkMode = ref(false)

const toggleForm = () => { isForm.value = !isForm.value }


onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode !== null) {
    darkMode.value = savedDarkMode === 'true'
  }
})

watch(darkMode, (newValue) => { localStorage.setItem('darkMode', newValue) })
const toggleDarkMode = () => { darkMode.value = !darkMode.value }
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

/* ========================================
   TOKENS SEMÁNTICOS DE COLOR
   ======================================== */

/* MODO CLARO */
.light {
  --bg: #ffffff;
  --bg-alt: #eaf8f8;
  --bg-card: #ffffff;
  --bg-elevated: #f5f9fc;
  --header-bg: rgba(255, 255, 255, 0.88);
  --text: #0f172a;
  --text-secondary: #334155;
  --text-muted: #64748b;
  --text-soft: #475569;
  --border: rgba(18, 112, 182, 0.3);
  --border-soft: rgba(18, 112, 182, 0.15);
  --border-light: rgba(18, 112, 182, 0.1);
  --accent: #1270b6;
  --accent-hover: #0e5a8a;
  --accent-text: #ffffff;
  --accent-glow: rgba(18, 112, 182, 0.3);
  --accent-soft: rgba(18, 112, 182, 0.1);
  --num-color: #1270b6;
  --num-opacity: 0.55;
  --shadow: 0 4px 24px rgba(18, 112, 182, 0.12);
  --shadow-sm: 0 2px 12px rgba(18, 112, 182, 0.08);
  --shadow-md: 0 6px 20px rgba(18, 112, 182, 0.15);
  --shadow-lg: 0 8px 32px rgba(18, 112, 182, 0.2);
  --success: #10b981;
  --error: #ef4444;
  --error-bg: rgba(239, 68, 68, 0.05);
  --success-bg: rgba(16, 185, 129, 0.1);
  --warning: #f59e0b;
  --title: #59a1e0;
}

/* MODO OSCURO */
.dark {
  --bg: #1D1D1B;
  --bg-alt: #151514;
  --bg-card: #262624;
  --bg-elevated: #2a2a28;
  --title: #f0f0ef;
  --text: #f0f0ef;
  --text-secondary: #d0d0d0;
  --text-muted: #eaf8f8;
  --text-soft: #a0aec0;
  --border: rgba(80, 238, 173, 0.2);
  --border-soft: rgba(80, 238, 173, 0.08);
  --border-light: rgba(80, 238, 173, 0.05);
  --accent: #50EEAD;
  --accent-hover: #75f5bd;
  --accent-text: #1D1D1B;
  --accent-glow: rgba(80, 238, 173, 0.4);
  --accent-soft: rgba(80, 238, 173, 0.1);
  --num-color: #50EEAD;
  --num-opacity: 0.4;
  --header-bg: rgba(29, 29, 27, 0.9);
  --shadow: 0 4px 28px rgba(0, 0, 0, 0.4);
  --shadow-sm: 0 2px 16px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 6px 24px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.6);
  --success: #10b981;
  --error: #ef4444;
  --error-bg: rgba(239, 68, 68, 0.1);
  --success-bg: rgba(16, 185, 129, 0.1);
  --warning: #f59e0b;
}

/* ========================================
   TOKENS TIPOGRÁFICOS - Escala 1.25 (Major Third)
   ======================================== */
.light, .dark {
  /* Tipografía */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Tamaños fluidos */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem);   /* 12-13px */
  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 0.9375rem); /* 14-15px */
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);     /* 16-18px */
  --text-lg: clamp(1.125rem, 1rem + 0.65vw, 1.25rem);     /* 18-20px */
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);     /* 20-24px */
  --text-2xl: clamp(1.5rem, 1.2rem + 1.5vw, 2rem);        /* 24-32px */
  --text-3xl: clamp(1.875rem, 1.5rem + 1.9vw, 2.5rem);    /* 30-40px */
  --text-4xl: clamp(2.25rem, 1.8rem + 2.25vw, 3rem);      /* 36-48px */

  /* Pesos tipográficos */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;

  /* Interlineado */
  --leading-tight: 1.2;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;

  /* Espaciado - Sistema 4pt base */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */

  /* Radios de borde */
  --radius-sm: 0.375rem;
  --radius-base: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-2xl: 2rem;
  --radius-full: 9999px;

  /* Transiciones */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Z-index scale */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
  --z-toast: 9999;
}

/*
  : pseudo-clase — estado del elemento  →  button:hover { }  input:focus { }
  :: pseudo-elemento — parte del elemento →  p::first-line { }  div::before { }
*/

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  height: 100%;
  background-color: black;
}

body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  background: var(--bg);
  display: flex;
  justify-content: center;
  transition: background 0.35s ease;
}

#app {
  width: 100%;
  display: flex;
  justify-content: center;
}

.app {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
  line-height: var(--leading-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  min-height: 100vh;
  min-height: 100dvh; /* Mobile viewport height */
  transition: background-color var(--transition-slow), color var(--transition-slow);
  
  width: 100%;
  max-width: 2560px;
  margin: 0 auto;
  overflow-x: hidden;
  box-shadow: var(--shadow-lg);
}

@media (min-width: 2560px) {
  .app {
    max-width: 2560px;
  }
}


.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: transparent;
  touch-action: manipulation; /* Elimina delay de 300ms en touch */
}

/* Focus visible para accesibilidad */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Eliminar outline solo para mouse clicks */
:focus:not(:focus-visible) {
  outline: none;
}

/* ===== BOTONES BASE ===== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
  min-height: 44px; /* Touch target mínimo */
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Botón primario */
.btn-primary {
  background: var(--accent);
  color: var(--accent-text);
  box-shadow: var(--shadow), 0 0 0 0 var(--accent-glow);
}

.btn-primary:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md), var(--shadow-glow);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow);
}

/* Botón outline */
.btn-outline {
  background: transparent;
  color: var(--text);
  border: 1.5px solid var(--border);
}

.btn-outline:hover:not(:disabled) {
  background: var(--bg-elevated);
  border-color: var(--accent);
  color: var(--accent);
}

.btn-outline:active:not(:disabled) {
  background: var(--accent-soft);
}

/* Botón fantasma */
.btn-ghost {
  background: transparent;
  color: var(--text-muted);
}

.btn-ghost:hover:not(:disabled) {
  background: var(--bg-alt);
  color: var(--text);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ══ TRANSICION ENTRE VISTAS ══ */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.wompiForm {
  position: absolute;
}


/* ===== TOAST GLOBAL ===== */
.gst-toast-msg {
  position: fixed;
  top: var(--space-20);
  right: var(--space-6);
  left: auto;
  transform: none;
  background: var(--bg-elevated);
  color: var(--text);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
  z-index: var(--z-toast);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  white-space: nowrap;
  transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}

@media (max-width:425px) {
  .gst-toast-msg {
    height: min-content;
  }
}

.gst-toast-msg i {
  color: var(--accent);
  font-size: var(--text-lg);
  flex-shrink: 0;
}

.gst-toast-msg:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--accent);
}

/* Animaciones optimizadas para GPU */
.gst-toast-enter-active,
.gst-toast-leave-active {
  transition: opacity 0.35s ease;
}

.gst-toast-enter-from,
.gst-toast-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {


  .gst-toast-msg {
    top: var(--space-16);
    right: var(--space-4);
    padding: var(--space-3) var(--space-5);
    font-size: var(--text-sm);
  }
}

@media (max-width: 480px) {
  .gst-toast-msg {
    top: var(--space-16);
    bottom: auto;
    right: var(--space-4);
    left: var(--space-4);
    width: auto;
    white-space: normal;
    text-align: center;
    justify-content: center;
    padding: var(--space-3) var(--space-4);
  }
}
</style>