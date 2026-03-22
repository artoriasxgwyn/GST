<template>
  <div :class="['app', darkMode ? 'dark' : 'light']">
    <GstHeader :dark-mode="darkMode" @toggle-menu="menuOpen = !menuOpen" @toggle-dark="toggleDarkMode" class="header" />
    <router-view :dark-mode="darkMode" @toggle-form="toggleForm" />
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

/* MODO CLARO - Mejorado para accesibilidad */
.light {
  /* Surfaces */
  --bg: #fafbfc;
  --bg-alt: #f1f5f9;
  --bg-card: #ffffff;
  --bg-elevated: #ffffff;

  /* Textos con contraste WCAG 4.5:1+ */
  --text: #0f172a;           /* slate-900 - 15.3:1 */
  --text-secondary: #334155; /* slate-700 - 11.8:1 */
  --text-muted: #475569;     /* slate-600 - 7.5:1 */
  --text-soft: #64748b;      /* slate-500 - 5.7:1 */

  /* Colores de acento - Blue optimizado */
  --accent: #0ea5e9;         /* sky-500 - mejor contraste */
  --accent-hover: #0284c7;   /* sky-600 */
  --accent-soft: rgba(14, 165, 233, 0.1);
  --accent-glow: rgba(14, 165, 233, 0.25);

  /* Estados semánticos */
  --success: #10b981;
  --success-bg: rgba(16, 185, 129, 0.08);
  --error: #dc2626;
  --error-bg: rgba(220, 38, 38, 0.08);
  --warning: #f59e0b;

  /* Bordes */
  --border: rgba(148, 163, 184, 0.3);
  --border-soft: rgba(148, 163, 184, 0.15);
  --border-light: rgba(148, 163, 184, 0.08);

  /* Elevación y sombras */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-glow: 0 0 20px var(--accent-glow);

  /* Header */
  --header-bg: rgba(250, 251, 252, 0.92);

  /* Título hero */
  --title: #0f172a;
  --num-color: var(--accent);
  --num-opacity: 0.55;

  /* Texto sobre acento */
  --accent-text: #ffffff;
}

/* MODO OSCURO - Optimizado para legibilidad */
.dark {
  /* Surfaces */
  --bg: #0f172a;
  --bg-alt: #1e293b;
  --bg-card: #1e293b;
  --bg-elevated: #334155;

  /* Textos con contraste mejorado */
  --text: #f8fafc;           /* slate-50 - 18.9:1 */
  --text-secondary: #e2e8f0; /* slate-200 - 14.8:1 */
  --text-muted: #94a3b8;     /* slate-400 - 7.2:1 */
  --text-soft: #64748b;      /* slate-500 - 4.6:1 */

  /* Colores de acento - Emerald para dark mode */
  --accent: #34d399;         /* emerald-400 */
  --accent-hover: #6ee7b7;   /* emerald-300 */
  --accent-soft: rgba(52, 211, 153, 0.1);
  --accent-glow: rgba(52, 211, 153, 0.3);

  /* Estados semánticos */
  --success: #34d399;
  --success-bg: rgba(52, 211, 153, 0.1);
  --error: #f87171;
  --error-bg: rgba(248, 113, 113, 0.1);
  --warning: #fbbf24;

  /* Bordes */
  --border: rgba(148, 163, 184, 0.2);
  --border-soft: rgba(148, 163, 184, 0.1);
  --border-light: rgba(148, 163, 184, 0.05);

  /* Elevación */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 30px var(--accent-glow);

  /* Header */
  --header-bg: rgba(15, 23, 42, 0.95);

  /* Título hero */
  --title: #f8fafc;
  --num-color: var(--accent);
  --num-opacity: 0.4;

  /* Texto sobre acento */
  --accent-text: #0f172a;
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
  padding-bottom: var(--space-20);
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  overflow-x: hidden;
  box-shadow: var(--shadow-lg);
}

.header {
  position: relative;
}

@media (min-width: 768px) {
  .app {
    padding-bottom: 0;
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

.wompiForm {
  position: absolute;
}

/* Animista slide-in-bottom */
.slide-in-bottom {
  -webkit-animation: slide-in-bottom 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-bottom 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
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
  transition: all var(--transition-slow);
  will-change: transform, opacity;
}

.gst-toast-msg i {
  color: var(--accent);
  font-size: var(--text-lg);
  flex-shrink: 0;
}

.gst-toast-msg:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
  border-color: var(--accent);
}

/* Animaciones optimizadas para GPU */
.gst-toast-enter-active,
.gst-toast-leave-active {
  transition: opacity var(--transition-slow), transform var(--transition-slow);
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}

.gst-toast-enter-from,
.gst-toast-leave-to {
  opacity: 0;
  transform: translateY(-1rem) scale(0.95);
}

/* ===== UTILIDADES DE ACCESIBILIDAD ===== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Ocultar visualmente pero mantener para screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .app {
    padding-bottom: var(--space-20);
  }

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