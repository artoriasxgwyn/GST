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

/* MODO CLARO */
.light {
  --bg: #ffffff;
  --bg-alt: #eaf8f8;
  --bg-card: #ffffff;
  --header-bg: rgba(255, 255, 255, 0.88);
  --text: #0f172a;
  --text-muted: #64748b;
  --text-soft: #475569;
  --border: rgba(18, 112, 182, 0.3);
  --border-soft: rgba(18, 112, 182, 0.15);
  --border-light: rgba(18, 112, 182, 0.1);
  --accent: #1270b6;
  --accent-text: #ffffff;
  --accent-glow: rgba(18, 112, 182, 0.3);
  --num-color: #1270b6;
  --num-opacity: 0.55;
  --shadow: 0 4px 24px rgba(18, 112, 182, 0.12);
  --shadow-sm: 0 2px 12px rgba(18, 112, 182, 0.08);
  --shadow-lg: 0 8px 32px rgba(18, 112, 182, 0.2);
  --success: #10b981;
  --error: #ef4444;
  --error-bg: rgba(239, 68, 68, 0.05);
  --success-bg: rgba(16, 185, 129, 0.1);
}

/* MODO OSCURO */
.dark {
  --bg: #1D1D1B;
  --bg-alt: #151514;
  --bg-card: #262624;
  --text: #f0f0ef;
  --text-muted: #8a9aaa;
  --text-soft: #a0aec0;
  --border: rgba(80, 238, 173, 0.2);
  --border-soft: rgba(80, 238, 173, 0.08);
  --border-light: rgba(80, 238, 173, 0.05);
  --accent: #50EEAD;
  --accent-text: #1D1D1B;
  --accent-glow: rgba(80, 238, 173, 0.4);
  --num-color: #50EEAD;
  --num-opacity: 0.4;
  --header-bg: rgba(29, 29, 27, 0.9);
  --shadow: 0 4px 28px rgba(0, 0, 0, 0.4);
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
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  transition: background 0.35s ease, color 0.35s ease;
  padding-bottom: 4.5rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  overflow-x: hidden;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
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
</style>