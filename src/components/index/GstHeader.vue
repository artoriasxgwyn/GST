<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="brand" @click.prevent="goHome">
        <img :src="darkMode ? logoWhite : logoColor" alt="Logo Gst" class="logo">
      </router-link>
      <div class="actions">
        <!-- Botón Carrito -->
        <router-link to="/carrito#start" class="btn-cart" :title="'Ver carrito'">
          <i class="bi bi-cart-fill"></i>
          <span class="cart-badge" v-if="cartCount > 0">{{ cartCount }}</span>
        </router-link>
        
        <!-- Botón Iniciar Sesión -->
        
        <!-- Dark mode toggle -->
        <button class="btn-dark-toggle" @click="$emit('toggle-dark')" :title="darkMode ? 'Modo claro' : 'Modo oscuro'">
          <i :class="darkMode ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
        </button>
        
        <!-- Menú hamburguesa -->
        <button class="btn-icon" @click="$emit('toggle-menu')">
          <i class="bi bi-list"></i>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import logoColor from '@/assets/logoGST.png'
import logoWhite from '@/assets/GSTBlanco.png'

defineProps({ darkMode: Boolean })
defineEmits(['toggle-menu', 'toggle-dark'])

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

// Número de items en el carrito
const cartCount = computed(() => cartStore.totalItems)

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
  .logo-sub {
    display: block;
  }
}

@media (min-width: 1440px) {
  .logo {
    height: 5vh;
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ===== BOTÓN CARRITO ===== */
.btn-cart {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 0.5rem;
  background: var(--border-soft);
  border: 1px solid var(--border);
  color: var(--accent);
  font-size: 1.1rem;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-cart:hover {
  background: var(--border);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.btn-cart i {
  color: var(--accent);
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--accent);
  color: var(--accent-text);
  font-size: 0.65rem;
  font-weight: 700;
  min-width: 1.2rem;
  height: 1.2rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.2rem;
  border: 1px solid var(--bg-card);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* ===== BOTÓN INICIAR SESIÓN ===== */



/* ===== BOTÓN DARK MODE ===== */
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

/* ===== BOTÓN MENÚ ===== */
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

/* Responsive para móviles */
@media (max-width: 480px) {
  .btn-cart {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }
  
  .cart-badge {
    font-size: 0.6rem;
    min-width: 1rem;
    height: 1rem;
  }
}
</style>