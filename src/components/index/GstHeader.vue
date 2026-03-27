<template>
  <header class="header">
    <nav class="nav" aria-label="Navegación principal">
      <router-link to="/" class="brand" @click.prevent="goHome" aria-label="GST - Inicio">
        <img :src="darkMode ? logoWhite : logoColor" alt="GST Logo" class="logo" width="120" height="40">
      </router-link>

      <div class="actions">
        <!-- Botón Carrito - Mejorado para accesibilidad -->
        <router-link
          to="/carrito#start"
          class="btn-icon btn-cart"
          :aria-label="`Ver carrito, ${cartCount} items`"
        >
          <i class="bi bi-cart-fill" aria-hidden="true"></i>
          <span
            v-if="cartCount > 0"
            class="cart-badge"
            aria-hidden="true"
          >{{ cartCount }}</span>
        </router-link>

        <!-- Dark mode toggle - Mejorado para accesibilidad -->
        <button
          class="btn-icon btn-dark-toggle"
          @click="$emit('toggle-dark')"
          :aria-label="darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
          :aria-pressed="darkMode"
        >
          <i
            :class="darkMode ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"
            aria-hidden="true"
          ></i>
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
/* ===== HEADER ===== */
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: var(--header-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--border-soft);
  transition: background-color var(--transition-slow), border-color var(--transition-slow);
}

.nav {
  max-width: 1700px;
  margin: 0 auto;
  padding: 0 var(--space-6);
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.logo {
  height: 6vh;
  max-height: 2.5rem;
  width: auto;
  object-fit: contain;
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

@media (max-width: 480px) {
  .logo {
    height: auto;
    height: 2rem;
  }
}

@media (min-width: 640px) {
  .logo-sub {
    display: block;
  }
}

@media (min-width: 1440px) {
  .logo {
    height: 3vh;
    max-height: 2.5rem;
  }
}

@media (min-width: 2560px) {
  .logo {
    height: 2vh;
    max-height: 3rem;
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* ===== BOTÓN ICONO BASE - Touch target 44x44px mínimo ===== */
.btn-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  min-width: 44px;
  min-height: 44px;
  border-radius: var(--radius-md);
  background: var(--bg-alt);
  border: 1px solid var(--border-soft);
  color: var(--text-secondary);
  font-size: var(--text-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.btn-icon:hover {
  background: var(--bg-elevated);
  border-color: var(--border);
  color: var(--text);
  transform: translateY(-1px);
}

.btn-icon:active {
  transform: scale(0.95);
  background: var(--accent-soft);
}

.btn-icon:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* ===== BOTÓN CARRITO ===== */
.btn-cart {
  color: var(--accent);
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.btn-cart:hover {
  transform: scale(1.08);
  background: var(--bg-elevated);
  border-color: var(--border);
}

.btn-cart i {
  color: var(--accent);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-cart:hover i {
  transform: scale(1.1);
}

/* ===== BADGE DEL CARRITO ===== */
.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--accent);
  color: var(--accent-text);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 var(--space-1);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.2rem;
  border: 1px solid var(--bg-card);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  animation: pulse-badge 2s ease-in-out infinite;
  z-index: 2;
}

@keyframes pulse-badge {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

@keyframes badge-pop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-dark-toggle:hover {
  transform: scale(1.08);
  background: var(--bg-elevated);
  border-color: var(--border);
}

.btn-dark-toggle i {
  color: var(--accent);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-dark-toggle:hover i {
  transform: scale(1.1);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .nav {
    height: 4rem;
    padding: 0 var(--space-4);
  }

  .logo {
    max-height: 2rem;
  }

  .btn-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
}

@media (max-width: 480px) {
  .nav {
    padding: 0 var(--space-3);
  }

  .actions {
    gap: var(--space-2);
  }

  .btn-icon {
    width: 2.25rem;
    height: 2.25rem;
    font-size: var(--text-base);
  }

  .cart-badge {
    min-width: 1.1rem;
    height: 1.1rem;
    font-size: 0.65rem;
    top: -2px;
    right: -2px;
  }
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  .btn-icon,
  .logo,
  .brand {
    transition: none;
  }

  .cart-badge {
    animation: none;
  }
}

/* ===== ALTO CONTRASTE ===== */
@media (prefers-contrast: high) {
  .header {
    border-bottom-width: 2px;
  }

  .btn-icon {
    border-width: 2px;
  }
}
</style>