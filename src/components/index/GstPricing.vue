<template>
  <section class="gst-pricing" id="gst-planes" @click="closeAll">
    <!-- Toast -->
    <Teleport to=".app">
      <transition name="gst-toast">
        <div v-if="toast" class="gst-toast-msg">
          <i class="bi bi-cart-check-fill"></i> {{ toastMsg }}
        </div>
      </transition>
    </Teleport>

    <div class="gst-container">
      <div class="gst-header">
        <h2 class="gst-section-title">Planes de Gestión</h2>
        <div class="gst-toggle">
          <span :class="['gst-lbl', !annual && 'gst-lbl--active']">Mensual</span>
          <button class="gst-toggle-btn" @click="annual = !annual">
            <span class="gst-toggle-dot" :class="{ 'gst-toggle-dot--right': annual }"></span>
          </button>
          <span :class="['gst-lbl', annual && 'gst-lbl--active']">
            Anual <em class="gst-save">(Ahorra 20%)</em>
          </span>
        </div>
      </div>
    </div>

    <!-- ══ CARRUSEL PLANES ══ -->
    <div class="gst-carousel-container">
      <button class="gst-carr-arrow gst-carr-arrow--left" @click="prevPlan" :disabled="currentPlanIndex === 0"
        aria-label="Anterior">
        <i class="bi bi-chevron-left"></i>
      </button>
      <div class="gst-carousel-viewport" ref="planViewport" @mousedown="onMouseDown" @mousemove="onMouseMove"
        @mouseup="onMouseUp" @mouseleave="onMouseLeave" :style="{ cursor: isDragging ? 'grabbing' : 'grab' }">
        <div class="gst-plans-track" :style="{ transform: `translateX(${planTrackOffset}px)` }">
          <div v-for="(plan, i) in plans" :key="plan.name" class="gst-plan-card"
            :class="{ 'gst-featured': plan.featured, 'gst-plan-card--centered': i === currentPlanIndex, 'gst-plan-card--selected': selectedPlanIndex === i }"
            @click="selectPlan(i)">
            <i :class="['bi', plan.icon, 'gst-plan-icon']"></i>
            <h3 class="gst-plan-name">{{ plan.name }}</h3>
            <div v-if="!annual" class="gst-plan-price">
              {{ plan.price }} USD <span>/ mes</span>
            </div>
            <div v-else class="gst-plan-price-wrap">
              <span class="gst-price-old">{{ plan.price }} USD / mes</span>
              <div class="gst-plan-price">${{ annualPrice(plan.rawPrice) }} USD <span>/ mes</span></div>
              <span class="gst-discount-tag"><i class="bi bi-tag-fill"></i> –20%</span>
            </div>
            <ul class="gst-plan-features">
              <li v-for="f in plan.features" :key="f">
                <i class="bi bi-check-circle-fill gst-check"></i> {{ f }}
              </li>
            </ul>
            <p class="gst-plan-ideal"><i class="bi bi-info-circle"></i> {{ plan.ideal }}</p>

            <button :class="plan.featured ? 'gst-btn-primary' : 'gst-btn-outline'" @click.stop="addPlanToCart(plan)">
              <i :class="['bi', plan.rawPrice === 5 ? 'bi-rocket-takeoff' : 'bi-cart-check']"></i>
                Agregar al carrito 
            </button>
          </div>
        </div>
      </div>
      <button class="gst-carr-arrow gst-carr-arrow--right" @click="nextPlan"
        :disabled="currentPlanIndex === plans.length - 1" aria-label="Siguiente">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>

    <div class="gst-pagination-dots">
      <span class="gst-page-indicator">{{ currentPlanIndex + 1 }} / {{ plans.length }}</span>
      <div class="gst-dots">
        <button v-for="(plan, i) in plans" :key="i" class="gst-dot"
          :class="{ 'gst-dot--active': i === currentPlanIndex }" @click="goToPlan(i)"></button>
      </div>
      <span class="gst-plan-name-indicator">{{ plans[currentPlanIndex].name }}</span>
    </div>

    <div class="gst-container">
      <div class="gst-features-section">
        <h3 class="gst-features-title">
          <i class="bi bi-lightning-charge-fill"></i>
          Funcionalidades incluidas en TODOS los planes
        </h3>
        <div class="gst-features-grid">
          <div v-for="feature in allFeatures" :key="feature.text" class="gst-feature-item">
            <i :class="['bi', feature.icon, 'gst-feature-check']"></i>
            <span>{{ feature.text }}</span>
          </div>
        </div>
      </div>
      <div class="gst-storage-header">
        <h3 class="gst-storage-title">
          <i class="bi bi-database-fill"></i> Planes adicionales de almacenamiento
        </h3>
        <p class="gst-storage-subtitle">
          <i class="bi bi-cloud-arrow-up"></i>
          Se pueden contratar con cualquier plan • Integración con Google Drive
        </p>
      </div>
    </div>

    <!-- ══ CARDS ALMACENAMIENTO ══ -->
    <div class="gst-storage-cards-wrap">

      <!-- Card 1: 1 TB fijo -->
      <div class="gst-storage-card" :class="{ 'gst-storage-card--selected': selectedStorageIndex === 0 }"
        @click="selectStorage(0)">
        <i class="bi bi-hdd-stack-fill gst-storage-icon"></i>
        <div class="gst-storage-size">1 TB</div>
        <div class="gst-storage-price">$11 USD <span>/ mes</span></div>
        <div class="gst-storage-note">1,024 GB × $40 COP/GB</div>
        <button class="gst-btn-storage" @click.stop="addStorageToCart(1, 11)"><i class="bi bi-cart-check"></i> Agregar
          al carrito</button>
      </div>

      <!-- Card 2: 2–5 TB variable con botones -->
      <div class="gst-storage-card" :class="{ 'gst-storage-card--selected': selectedStorageIndex === 1 }"
        @click="selectStorage(1)">
        <i class="bi bi-hdd-rack-fill gst-storage-icon"></i>
        <div class="gst-storage-size">{{ inputTB }} TB</div>
        <div class="gst-storage-price">${{ inputPrice }} USD <span>/ mes</span></div>
        <div class="gst-storage-note">{{ inputTB * 1024 }} GB × $40 COP/GB</div>
        <div class="gst-input-wrap">
          <button class="gst-input-btn" @click="inputTB > 2 && inputTB--"><i class="bi bi-dash"></i></button>
          <span class="gst-input-val">{{ inputTB }} TB</span>
          <button class="gst-input-btn" @click="inputTB < 5 && inputTB++"><i class="bi bi-plus"></i></button>
        </div>
        <button class="gst-btn-storage" @click.stop="addStorageToCart(inputTB, inputPrice)"><i
            class="bi bi-cart-check"></i> Agregar al carrito</button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, defineProps } from 'vue'
import { useCartStore } from '@/stores/cartStore'

defineProps({ darkMode: Boolean })

const cart = useCartStore()

const selectedPlanIndex = ref(null)
const selectedStorageIndex = ref(null)  // 0 = 1TB fijo, 1 = variable

// ══ TOAST ══
const toast = ref(null)
const toastMsg = ref('')
let toastTimer = null

const showToast = (msg) => {
  toastMsg.value = msg
  toast.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value = false }, 2500)
}

const selectPlan = (i) => {
  selectedPlanIndex.value = selectedPlanIndex.value === i ? null : i
  if (selectedPlanIndex.value !== null) goToPlan(i)
}

const selectStorage = (i) => {
  selectedStorageIndex.value = selectedStorageIndex.value === i ? null : i
}

const closeAll = (e) => {
  // Cierra si el click fue fuera de cualquier card
  if (!e.target.closest('.plan-card') && !e.target.closest('.storage-card')) {
    selectedPlanIndex.value = null
    selectedStorageIndex.value = null
  }
}

const addPlanToCart = (plan) => {
  const price = annual.value ? parseFloat((plan.rawPrice * 0.8).toFixed(2)) : plan.rawPrice
  cart.setPlan({
    name: plan.name,
    price,
    rawPrice: plan.rawPrice,
    icon: plan.icon,
    features: plan.features,
    months: 1,
  })
  showToast(` ${plan.name} agregado al carrito`)
}

const addStorageToCart = (size, price) => {
  cart.setStorage({ size, price, months: 1 })
  showToast(` Almacenamiento ${size} TB agregado al carrito`)
}

const annual = ref(false)
const annualPrice = (p) => (p * 0.8).toFixed(2)

const planViewport = ref(null)
const currentPlanIndex = ref(0)


const screenWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)
const updateScreenWidth = () => { screenWidth.value = window.innerWidth }

// ══ DRAG ══
const isDragging = ref(false)
const dragStartX = ref(0)
const dragThreshold = 50

const onMouseDown = (e) => {
  e.preventDefault()
  isDragging.value = true
  dragStartX.value = e.clientX
}

const onMouseMove = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
}

const onMouseUp = (e) => {
  if (!isDragging.value) return
  isDragging.value = false
  const diff = dragStartX.value - e.clientX
  if (diff > dragThreshold) nextPlan()
  else if (diff < -dragThreshold) prevPlan()
}

const onMouseLeave = () => { isDragging.value = false }

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
  updateScreenWidth()
})
onUnmounted(() => { window.removeEventListener('resize', updateScreenWidth) })

const planCardWidth = computed(() => {
  if (screenWidth.value <= 360) return 220
  if (screenWidth.value <= 480) return 240
  if (screenWidth.value <= 768) return 260
  return 290
})
const planGap = computed(() => {
  if (screenWidth.value <= 480) return 12
  if (screenWidth.value <= 768) return 20
  return 32
})



const planTrackOffset = computed(() => {
  if (!planViewport.value) return 0
  const vw = planViewport.value.offsetWidth
  return (vw - planCardWidth.value) / 2 - (currentPlanIndex.value * (planCardWidth.value + planGap.value))
})


const prevPlan = () => { if (currentPlanIndex.value > 0) currentPlanIndex.value-- }
const nextPlan = () => { if (currentPlanIndex.value < plans.length - 1) currentPlanIndex.value++ }
const goToPlan = (i) => { currentPlanIndex.value = i }



const plans = [
  { name: 'Plan Basic – Integral', icon: 'bi-gift', price: '$5', rawPrice: 5, features: ['2 usuarios', '5 GB almacenamiento', 'Todas las funciones activas', 'Soporte básico'], ideal: 'Ideal para talleres pequeños que están empezando.', featured: false },
  { name: 'Plan Start', icon: 'bi-stars', price: '$19', rawPrice: 19, features: ['Hasta 5 usuarios', '50 GB almacenamiento', 'Todas las funciones'], ideal: 'Ideal para centros pequeños con flujo moderado.', featured: false },
  { name: 'Plan Growth', icon: 'bi-graph-up-arrow', price: '$49', rawPrice: 49, features: ['Hasta 15 usuarios', '200 GB almacenamiento', 'Todas las funciones'], ideal: 'Ideal para centros medianos con varios técnicos.', featured: false },
  { name: 'Plan Business', icon: 'bi-briefcase-fill', price: '$99', rawPrice: 99, features: ['Hasta 40 usuarios', '1 TB almacenamiento', 'Todas las funciones'], ideal: 'Ideal para empresas con varias sedes.', featured: false },
  { name: 'Plan Enterprise', icon: 'bi-building', price: '$179', rawPrice: 179, features: ['Hasta 100 usuarios', '2 TB almacenamiento', 'Todas las funciones', 'Soporte prioritario'], ideal: 'Ideal para redes grandes de servicio técnico.', featured: true },
]

const allFeatures = [
  { text: 'Gestión completa de agendas', icon: 'bi-calendar-check-fill' },
  { text: 'Creación y seguimiento de órdenes de servicio', icon: 'bi-clipboard2-check-fill' },
  { text: 'Gestión de garantías', icon: 'bi-shield-check' },
  { text: 'Carga de fotos y videos', icon: 'bi-camera-fill' },
  { text: 'Historial por cliente y por equipo', icon: 'bi-clock-history' },
  { text: 'Reportes completos', icon: 'bi-bar-chart-fill' },
  { text: 'Panel administrativo', icon: 'bi-speedometer2' },
  { text: 'Multi-sucursal', icon: 'bi-buildings-fill' },
  { text: 'Control de técnicos', icon: 'bi-person-gear' },
  { text: 'Soporte estándar', icon: 'bi-headset' },
]

const inputTB = ref(2)
const inputPrice = computed(() => Math.ceil((inputTB.value * 1024 * 40) / 4000))

</script>

<style>
.gst-pricing {
  padding: 5rem 0;
  background: var(--bg-alt);
  transition: background 0.35s;
}

.gst-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.gst-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.gst-section-title {
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--text);
  margin-bottom: 1.25rem;
  transition: color 0.35s;
}

.gst-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.gst-lbl {
  transition: color 0.2s;
}

.gst-lbl--active {
  color: var(--text);
  font-weight: 700;
}

.gst-save {
  color: var(--accent);
  font-style: normal;
}

.gst-toggle-btn {
  width: 3rem;
  height: 1.5rem;
  background: var(--border-soft);
  border: 1px solid var(--border);
  border-radius: 9999px;
  padding: 0.15rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.35s;
}

.gst-toggle-dot {
  width: 1.1rem;
  height: 1.1rem;
  background: var(--accent);
  border-radius: 9999px;
  transition: transform 0.25s ease;
  display: block;
}

.gst-toggle-dot--right {
  transform: translateX(1.4rem);
}

.gst-carousel-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
  margin-bottom: 1rem;
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.gst-carousel-viewport {
  flex: 1;
  overflow: hidden;
  border-radius: 1.5rem;
  min-height: 550px;
  display: flex;
  align-items: center;
}

.gst-plans-track {
  display: flex;
  gap: 32px;
  transition: transform 0.4s ease-in-out;
  will-change: transform;
  align-items: center;
  height: 40rem;
  width: fit-content;
}

.gst-storage-track {
  display: flex;
  gap: 32px;
  transition: transform 0.4s ease-in-out;
  will-change: transform;
  align-items: center;
  height: 20rem;
  width: fit-content;
}

.gst-carr-arrow {
  flex-shrink: 0;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  background: var(--bg-card);
  border: 1.5px solid var(--border);
  color: var(--accent);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, border-color 0.2s, transform 0.15s, opacity 0.2s;
  z-index: 10;
}

.gst-carr-arrow:hover:not(:disabled) {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--accent-text);
  transform: scale(1.1);
}

.gst-carr-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

.gst-pagination-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.gst-page-indicator {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 600;
  min-width: 3rem;
  text-align: center;
}

.gst-plan-name-indicator {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-style: italic;
  min-width: 10rem;
  text-align: center;
}

.gst-dots {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.gst-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 9999px;
  background: var(--border);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, width 0.25s ease;
}

.gst-dot--active {
  background: var(--accent);
  width: 1.5rem;
}

.gst-plan-card {
  flex-shrink: 0;
  width: v-bind(planCardWidth + 'px');
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  border-radius: 1.5rem;
  padding: 1rem;
  position: relative;
  cursor: pointer;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s, background 0.35s;
}

@media (max-width: 768px) {
  .gst-plan-card {
    width: 260px;
    min-height: 580px;
  }
}

@media (max-width: 480px) {
  .gst-plan-card {
    width: 240px;
    min-height: 560px;
  }
}

@media (max-width: 360px) {
  .gst-plan-card {
    width: 220px;
    min-height: 540px;
  }
}

.gst-plan-card--centered {
  border: 2px solid var(--accent);
  box-shadow: 0 0 0 2px var(--accent), 0 12px 40px var(--accent-glow);
  transform: scale(1.02);
  z-index: 2;
}

.gst-plan-card.gst-featured {
  border: 2px solid var(--accent);
  background: linear-gradient(145deg, var(--bg-card), var(--bg-alt));
  box-shadow: 0 0 28px var(--accent-glow);
}

.gst-plan-card--centered.gst-featured {
  box-shadow: 0 0 0 2px var(--accent), 0 12px 40px var(--accent-glow);
}

.gst-badge {
  position: fixed;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: var(--accent-text);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  white-space: nowrap;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  z-index: 3;
}

.gst-badge i {
  font-size: 0.6rem;
}

.gst-plan-icon {
  font-size: 2.5rem;
  color: var(--accent);
  margin-bottom: 1rem;
  display: inline-block;
  align-self: center;
}

.gst-plan-name {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
  transition: color 0.35s;
  line-height: 1.3;
  text-align: center;
}

.gst-plan-price {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--accent);
  line-height: 1.2;
  margin-bottom: 1.25rem;
  letter-spacing: -0.03em;
  text-align: center;
}

.gst-plan-price span {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--text-muted);
  margin-left: 0.25rem;
}

.gst-plan-price-wrap {
  margin-bottom: 1.25rem;
  text-align: center;
}

.gst-price-old {
  display: block;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-decoration: line-through;
  opacity: 0.65;
  margin-bottom: 0.1rem;
}

.gst-plan-price-wrap .gst-plan-price {
  margin-bottom: 0.25rem;
}

.gst-discount-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: var(--accent);
  color: var(--accent-text);
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
}

.gst-plan-features {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
}

.gst-plan-features li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
  color: var(--text);
  transition: color 0.35s;
  line-height: 1.4;
}

.gst-check {
  color: var(--accent);
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.gst-plan-ideal {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
  font-style: italic;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--border-soft);
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  transition: color 0.35s;
  line-height: 1.4;
}

.gst-plan-ideal i {
  color: var(--accent);
  font-size: 0.85rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.gst-btn-primary,
.gst-btn-outline,
a.gst-btn-primary,
a.gst-btn-outline {
  display: flex;
  width: 100%;
  padding: 0.8rem;
  font-weight: 700;
  font-size: 0.9rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  text-decoration: none;
  text-align: center;
  border-radius: 0.75rem;
  box-sizing: border-box;
}

.gst-btn-primary,
a.gst-btn-primary {
  background: var(--accent);
  color: var(--accent-text);
  border: none;
  box-shadow: 0 0 18px var(--accent-glow);
}

.gst-btn-primary:hover,
a.gst-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 28px var(--accent-glow);
}

.gst-btn-outline,
a.gst-btn-outline {
  background: transparent;
  border: 1.5px solid var(--border);
  color: var(--text);
}

.gst-btn-outline:hover,
a.gst-btn-outline:hover {
  background: var(--border-soft);
  border-color: var(--accent);
  color: var(--accent);
}

.gst-btn-outline i,
a.gst-btn-outline i {
  color: var(--accent);
}

.gst-features-section {
  margin-bottom: 4rem;
  background: var(--bg-card);
  border-radius: 2rem;
  padding: 2.5rem;
  border: 1px solid var(--border-soft);
  transition: background 0.35s;
}

.gst-features-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: color 0.35s;
}

.gst-features-title i {
  color: var(--accent);
  font-size: 1.8rem;
}

.gst-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.gst-feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--bg);
  border-radius: 0.75rem;
  border: 1px solid var(--border-soft);
  transition: all 0.2s ease;
}

.gst-feature-item:hover {
  border-color: var(--accent);
  transform: translateX(5px);
}

.gst-feature-check {
  color: var(--accent);
  font-size: 1.2rem;
  flex-shrink: 0;
}

.gst-feature-item span {
  font-size: 0.95rem;
  color: var(--text);
  transition: color 0.35s;
}

.gst-storage-header {
  text-align: center;
  margin-bottom: 2rem;
}

.gst-storage-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: color 0.35s;
}

.gst-storage-title i {
  color: var(--accent);
  font-size: 1.8rem;
}

.gst-storage-subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: color 0.35s;
}

.gst-storage-subtitle i {
  color: var(--accent);
}

.gst-storage-card {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  border-radius: 1.2rem;
  position: relative;
  cursor: pointer;
  height: auto;
  min-height: 260px;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  text-align: center;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s, background 0.35s;
}

@media (max-width: 768px) {
  .gst-storage-card {
    padding: 1.5rem 1rem;
    min-height: 240px;
  }
}

@media (max-width: 480px) {
  .gst-storage-card {
    padding: 1.25rem;
    min-height: 220px;
  }
}

@media (max-width: 360px) {
  .gst-storage-card {
    padding: 1rem 0.75rem;
    min-height: 200px;
  }
}

.gst-storage-cards-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 0 1.5rem;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 480px) {
  .gst-storage-cards-wrap {
    grid-template-columns: 1fr;
  }

  .gst-storage-cards-wrap .gst-storage-card {
    width: 80%;
    margin: 0 auto;
  }
}

.gst-storage-card--variable {
  min-height: 320px;
  height: auto;
}

.gst-storage-note {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin-top: -0.25rem;
}

.gst-input-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.gst-input-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  border: 1.5px solid var(--border);
  background: var(--border-soft);
  color: var(--accent);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.gst-input-btn:hover {
  background: var(--accent);
  color: var(--accent-text);
  border-color: var(--accent);
}

.gst-input-val {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  min-width: 3.5rem;
  text-align: center;
}

.gst-storage-card--centered {
  border: 2px solid var(--accent);
  box-shadow: 0 0 0 2px var(--accent), 0 12px 32px var(--accent-glow);
  transform: scale(1.02);
  z-index: 2;
}

.gst-storage-icon {
  font-size: 2.2rem;
  color: var(--accent);
}

.gst-storage-size {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text);
  transition: color 0.35s;
}

.gst-storage-price {
  font-size: 2rem;
  font-weight: 900;
  color: var(--accent);
  line-height: 1.2;
  letter-spacing: -0.03em;
}

.gst-storage-price span {
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--text-muted);
}

.gst-btn-storage {
  background: var(--border-soft);
  border: 1px solid var(--border);
  color: var(--accent);
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
}

.gst-btn-storage:hover {
  background: var(--accent);
  color: var(--accent-text);
  border-color: var(--accent);
}

@media (max-width: 768px) {
  .gst-pricing {
    padding: 3rem 0;
  }

  .gst-container {
    padding: 0 1rem;
  }

  .gst-carousel-container {
    gap: 0.5rem;
    padding: 0 0.5rem;
  }

  .gst-carousel-viewport {
    min-height: 500px;
  }

  .gst-plans-track {
    gap: 20px;
  }

  .gst-storage-track {
    gap: 20px;
  }

  .gst-features-section {
    padding: 1.5rem;
  }

  .gst-features-grid {
    grid-template-columns: 1fr;
  }

  .gst-carr-arrow {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 0.9rem;
  }

  .gst-pagination-dots {
    gap: 1rem;
  }

  .gst-plan-name-indicator {
    min-width: 8rem;
  }
}

@media (max-width: 480px) {
  .gst-carousel-viewport {
    min-height: 480px;
  }

  .gst-storage-price {
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.03em;
  }

  .gst-plans-track {
    gap: 12px;
  }

  .gst-storage-track {
    gap: 12px;
  }

  .gst-plan-price {
    font-size: 2rem;
  }

  .gst-features-title,
  .gst-storage-title {
    font-size: 1.3rem;
  }

  .gst-plan-name-indicator {
    min-width: 6rem;
    font-size: 0.75rem;
  }

  .gst-carr-arrow {
    width: 2rem;
    height: 2rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 360px) {
  .gst-carousel-viewport {
    min-height: 460px;
  }

  .gst-plans-track {
    gap: 8px;
  }

  .gst-storage-track {
    gap: 8px;
  }

  .gst-carr-arrow {
    width: 1.75rem;
    height: 1.75rem;
    font-size: 0.75rem;
  }
}

/* ══ TOAST ══ */
.gst-toast-msg {
  position: fixed;
  top: 5rem;
  right: 1.5rem;
  left: auto;
  transform: none;
  background: var(--bg-card);
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.9rem 1.8rem;
  border-radius: 1.5rem;
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow-lg);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  white-space: nowrap;
  transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, transform 0.2s ease;
}

.gst-toast-msg i {
  color: var(--accent);
  font-size: 1.1rem;
}

.gst-toast-msg:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent);
}

.gst-toast-enter-active,
.gst-toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.gst-toast-enter-from,
.gst-toast-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}
</style>