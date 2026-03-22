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
  max-width: 1200px;
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
  gap: var(--space-2);
  padding: var(--space-2);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
  flex-shrink: 0;
}

.brand:hover {
  background: var(--bg-alt);
}

.brand:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.logo {
  height: auto;
  width: auto;
  max-height: 2.5rem;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
  object-fit: contain;
}

.brand:hover .logo {
  transform: scale(1.02);
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
}

.btn-cart:hover {
  background: var(--accent-soft);
  border-color: var(--accent);
}

.btn-cart::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: var(--radius-lg);
  opacity: 0;
  transition: opacity var(--transition-fast);
  pointer-events: none;
}

.btn-cart:active::after {
  background: var(--accent);
  opacity: 0.1;
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
  border: 2px solid var(--bg);
  box-shadow: var(--shadow-sm);
  animation: badge-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
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
.btn-dark-toggle:hover i {
  transform: rotate(15deg);
}

.btn-dark-toggle i {
  transition: transform var(--transition-slow);
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