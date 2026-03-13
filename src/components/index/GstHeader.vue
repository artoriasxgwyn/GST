<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="brand" @click.prevent="goHome">
        <img :src="darkMode ? logoWhite : logoColor" alt="Logo Gst" class="logo">
      </router-link>
      <div class="actions">
        <button class="btn-ghost">Iniciar Sesión</button>
        <button class="btn-dark-toggle" @click="$emit('toggle-dark')" :title="darkMode ? 'Modo claro' : 'Modo oscuro'">
          <i :class="darkMode ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
        </button>
        <button class="btn-icon" @click="$emit('toggle-menu')">
          <i class="bi bi-list"></i>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logoColor from '@/assets/logoGST.png'
import logoWhite from '@/assets/GSTBlanco.png'

 defineProps({ darkMode: Boolean })
defineEmits(['toggle-menu', 'toggle-dark'])

const router = useRouter()
const route  = useRoute()

const goHome = () => {
  if (route.path === '/') {
    document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push('/').then(() => {
      setTimeout(() => {
        document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    })
  }
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--header-bg);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
  transition: background 0.35s ease, border-color 0.35s ease;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.logo {
  height: 6vh;
  transition: opacity 0.35s ease;
}

.logo-sub {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: none;
}

@media (min-width: 640px) {
  .logo-sub { display: block; }
}

@media (min-width: 1440px) {
  .logo { height: 5vh; }
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-ghost {
  display: none;
  background: transparent;
  border: none;
  color: var(--accent);
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-ghost:hover { background: var(--border-soft); }

@media (min-width: 768px) {
  .btn-ghost { display: inline-block; }
}

.btn-dark-toggle {
  background: var(--border-soft);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--accent);
  font-size: 1rem;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}

.btn-dark-toggle:hover {
  background: var(--border);
  transform: rotate(15deg);
}

.btn-icon {
  background: transparent;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: var(--text);
  line-height: 1;
  display: flex;
  align-items: center;
}
</style>