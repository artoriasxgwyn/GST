<template>
  <section class="cart" id="start">
    <div class="container">

      <!-- Header -->
      <div class="cart-header">
        <div class="badge"><i class="bi bi-cart3"></i> Carrito de Compra</div>
        <h1 class="cart-title">Tu Carrito</h1>
        <p class="cart-subtitle">Revisa y ajusta tu selección antes de continuar</p>
      </div>

      <!-- Empty state -->
      <div v-if="!cart.plan && !cart.storage" class="empty-state">
        <i class="bi bi-cart-x"></i>
        <h2>Tu carrito está vacío</h2>
        <p>Selecciona un plan o almacenamiento adicional para continuar.</p>
        <button class="btn-primary" @click="goToPlans">
          <i class="bi bi-arrow-left"></i> Ver planes
        </button>
      </div>

      <!-- Cart content -->
      <div v-else class="cart-layout">

        <!-- Items -->
        <div class="cart-items">

          <!-- Plan GST -->
          <div v-if="cart.plan" class="cart-card">
            <div class="cart-card-header">
              <div class="cart-card-icon">
                <i :class="['bi', cart.plan.icon]"></i>
              </div>
              <div class="cart-card-info">
                <span class="cart-card-tag">Plan GST</span>
                <h3 class="cart-card-name">{{ cart.plan.name }}</h3>
                <p class="cart-card-price">${{ cart.plan.price }} USD <span>/ mes</span></p>
              </div>
              <button class="btn-remove" @click="cart.removePlan()" title="Eliminar">
                <i class="bi bi-trash3"></i>
              </button>
            </div>

            <ul class="cart-features">
              <li v-for="f in cart.plan.features" :key="f">
                <i class="bi bi-check-circle-fill"></i> {{ f }}
              </li>
            </ul>

            <div class="months-row">
              <label class="months-label"><i class="bi bi-calendar3"></i> Meses de suscripción</label>
              <div class="months-control">
                <button class="month-btn" @click="cart.updatePlanMonths(Math.max(1, cart.plan.months - 1))">
                  <i class="bi bi-dash"></i>
                </button>
                <span class="month-val">{{ cart.plan.months }}</span>
                <button class="month-btn" @click="cart.updatePlanMonths(Math.min(24, cart.plan.months + 1))">
                  <i class="bi bi-plus"></i>
                </button>
              </div>
              <span class="months-subtotal">${{ (cart.plan.price * cart.plan.months).toFixed(2) }} USD</span>
            </div>
          </div>

          <!-- Almacenamiento -->
          <div v-if="cart.storage" class="cart-card">
            <div class="cart-card-header">
              <div class="cart-card-icon">
                <i class="bi bi-hdd-stack-fill"></i>
              </div>
              <div class="cart-card-info">
                <span class="cart-card-tag">Almacenamiento adicional</span>
                <h3 class="cart-card-name">{{ cart.storage.size }} TB adicional</h3>
                <p class="cart-card-price">${{ cart.storage.price }} USD <span>/ mes</span></p>
              </div>
              <button class="btn-remove" @click="cart.removeStorage()" title="Eliminar">
                <i class="bi bi-trash3"></i>
              </button>
            </div>

            <div class="months-row">
              <label class="months-label"><i class="bi bi-calendar3"></i> Meses</label>
              <div class="months-control">
                <button class="month-btn" @click="cart.updateStorageMonths(Math.max(1, cart.storage.months - 1))">
                  <i class="bi bi-dash"></i>
                </button>
                <span class="month-val">{{ cart.storage.months }}</span>
                <button class="month-btn" @click="cart.updateStorageMonths(Math.min(24, cart.storage.months + 1))">
                  <i class="bi bi-plus"></i>
                </button>
              </div>
              <span class="months-subtotal">${{ (cart.storage.price * cart.storage.months).toFixed(2) }} USD</span>
            </div>
          </div>

          <!-- Aviso un solo plan -->
          <div class="info-note">
            <i class="bi bi-info-circle-fill"></i>
            <span>Solo puedes tener <strong>un plan GST</strong> activo a la vez. Agregar un nuevo plan reemplazará el actual.</span>
          </div>

        </div>

        <!-- Resumen -->
        <div class="cart-summary">
          <div class="summary-card">
            <h3 class="summary-title">Resumen del pedido</h3>

            <div class="summary-lines">
              <div v-if="cart.plan" class="summary-line">
                <span>{{ cart.plan.name }} × {{ cart.plan.months }} mes{{ cart.plan.months > 1 ? 'es' : '' }}</span>
                <span>${{ (cart.plan.price * cart.plan.months).toFixed(2) }}</span>
              </div>
              <div v-if="cart.storage" class="summary-line">
                <span>Almacenamiento {{ cart.storage.size }} TB × {{ cart.storage.months }} mes{{ cart.storage.months > 1 ? 'es' : '' }}</span>
                <span>${{ (cart.storage.price * cart.storage.months).toFixed(2) }}</span>
              </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-total">
              <span>Total</span>
              <span class="total-price">${{ cart.totalMonthly.toFixed(2) }} <small>USD</small></span>
            </div>

            <p class="summary-note">
              <i class="bi bi-whatsapp"></i>
              Serás redirigido a WhatsApp para confirmar tu pedido con nuestro equipo.
            </p>

            <a :href="`https://api.whatsapp.com/send/?phone=573015739461&text=${cart.whatsappMessage}&type=phone_number`"
              target="_blank" class="btn-checkout">
              <i class="bi bi-whatsapp"></i> Solicitar por WhatsApp
            </a>

            <button class="btn-clear" @click="cart.clearCart()">
              <i class="bi bi-trash3"></i> Vaciar carrito
            </button>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { defineProps, onMounted, nextTick } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useRouter, useRoute } from 'vue-router'

defineProps({ darkMode: Boolean })

const cart   = useCartStore()
const router = useRouter()
const route  = useRoute()

const goToPlans = () => {
  router.push('/').then(() => {
    setTimeout(() => {
      document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  })
}

onMounted(() => {
  cart.loadFromStorage()
  nextTick(() => {
    if (route.hash) {
      const el = document.querySelector(route.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  })
})
</script>

<style scoped>
.cart {
  min-height: 100vh;
  background: var(--bg);
  padding: 5rem 0 4rem;
  transition: background 0.35s;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ══ HEADER ══ */
.cart-header {
  text-align: center;
  margin-bottom: 3rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: var(--border-soft);
  border: 1px solid var(--border);
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.cart-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-bottom: 0.5rem;
  transition: color 0.35s;
}

.cart-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  transition: color 0.35s;
}

/* ══ EMPTY ══ */
.empty-state {
  text-align: center;
  padding: 5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-state > i {
  font-size: 4rem;
  color: var(--border);
}

.empty-state h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text);
  transition: color 0.35s;
}

.empty-state p {
  color: var(--text-muted);
  font-size: 0.95rem;
  transition: color 0.35s;
}

/* ══ LAYOUT ══ */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 2rem;
  align-items: flex-start;
}

@media (max-width: 900px) {
  .cart-layout { grid-template-columns: 1fr; }
}

/* ══ CART ITEMS ══ */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.cart-card {
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  border-radius: 1.25rem;
  padding: 1.5rem;
  transition: background 0.35s, border-color 0.35s;
}

.cart-card-header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.cart-card-icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  background: var(--border-soft);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: var(--accent);
  transition: background 0.35s;
}

.cart-card-info { flex: 1; }

.cart-card-tag {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
}

.cart-card-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text);
  margin: 0.2rem 0 0.25rem;
  transition: color 0.35s;
}

.cart-card-price {
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--accent);
  letter-spacing: -0.03em;
}

.cart-card-price span {
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--text-muted);
}

.btn-remove {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  color: var(--text-muted);
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-remove:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
  color: #ef4444;
}

.cart-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.cart-features li {
  font-size: 0.8rem;
  color: var(--text-muted);
  background: var(--bg);
  border: 1px solid var(--border-soft);
  border-radius: 9999px;
  padding: 0.2rem 0.65rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: background 0.35s, color 0.35s;
}

.cart-features li i { color: var(--accent); font-size: 0.75rem; }

/* ══ MONTHS CONTROL ══ */
.months-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px dashed var(--border-soft);
}

.months-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex: 1;
  min-width: 140px;
  transition: color 0.35s;
}

.months-label i { color: var(--accent); }

.months-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 9999px;
  padding: 0.2rem 0.5rem;
}

.month-btn {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 9999px;
  border: none;
  background: var(--border-soft);
  color: var(--accent);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.month-btn:hover { background: var(--accent); color: var(--accent-text); }

.month-val {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
  min-width: 1.5rem;
  text-align: center;
  transition: color 0.35s;
}

.months-subtotal {
  font-size: 1rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.02em;
}

/* ══ INFO NOTE ══ */
.info-note {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  background: var(--border-soft);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 0.85rem 1rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  transition: background 0.35s, border-color 0.35s, color 0.35s;
}

.info-note i { color: var(--accent); flex-shrink: 0; margin-top: 0.1rem; }

/* ══ SUMMARY ══ */
.summary-card {
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  border-radius: 1.25rem;
  padding: 1.5rem;
  position: sticky;
  top: 5rem;
  transition: background 0.35s, border-color 0.35s;
}

.summary-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 1.25rem;
  transition: color 0.35s;
}

.summary-lines {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  font-size: 0.88rem;
  color: var(--text-muted);
  transition: color 0.35s;
}

.summary-line span:last-child {
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
  transition: color 0.35s;
}

.summary-divider {
  height: 1px;
  background: var(--border);
  margin: 1rem 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  transition: color 0.35s;
}

.total-price {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--accent);
  letter-spacing: -0.04em;
}

.total-price small {
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--text-muted);
  margin-left: 0.2rem;
}

.summary-note {
  font-size: 0.8rem;
  color: var(--text-muted);
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  transition: color 0.35s;
}

.summary-note i { color: #25d366; flex-shrink: 0; margin-top: 0.1rem; }

.btn-checkout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.9rem;
  background: #25d366;
  color: #fff;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 18px rgba(37, 211, 102, 0.35);
  margin-bottom: 0.75rem;
}

.btn-checkout:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(37, 211, 102, 0.5);
}

.btn-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  padding: 0.65rem;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  color: var(--text-muted);
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-clear:hover {
  border-color: #ef4444;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.06);
}

/* ══ BUTTONS ══ */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 2rem;
  background: var(--accent);
  color: var(--accent-text);
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 0 18px var(--accent-glow);
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 28px var(--accent-glow);
}

/* ══ RESPONSIVE ══ */
@media (max-width: 640px) {
  .cart { padding: 3rem 0 2rem; }
  .container { padding: 0 1rem; }
  .cart-card { padding: 1.25rem; }
  .months-row { gap: 0.75rem; }
  .cart-title { font-size: clamp(1.5rem, 7vw, 1.8rem); }
}
</style>