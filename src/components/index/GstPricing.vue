<template>
  <section class="pricing" id="planes" @click="closeAll">
    <!-- Toast -->
    <Teleport to=".app">
      <transition name="gst-toast">
        <div v-if="toast" class="gst-toast-msg">
          <i class="bi bi-cart-check-fill"></i> {{ toastMsg }}
        </div>
      </transition>
    </Teleport>
    <div class="container">
      <div class="header">
        <h2 class="section-title">Planes de Gestión</h2>
        <div class="toggle">
          <span :class="['lbl', !annual && 'lbl--active']">Mensual</span>
          <button class="toggle-btn" @click="annual = !annual">
            <span class="toggle-dot" :class="{ 'toggle-dot--right': annual }"></span>
          </button>
          <span :class="['lbl', annual && 'lbl--active']">
            Anual <em class="save">(Ahorra 20%)</em>
          </span>
        </div>
      </div>
    </div>

    <!-- ══ CARRUSEL PLANES (100% INFINITO) ══ -->
    <div class="carousel-container">
      <button class="carr-arrow carr-arrow--left" @click="prevPlan" aria-label="Anterior">
        <i class="bi bi-chevron-left"></i>
      </button>
      
      <div class="carousel-viewport" ref="planViewport" 
        @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseLeave" 
        @touchstart.passive="onTouchStart" @touchmove.passive="onTouchMove" @touchend="onTouchEnd" 
        :style="{ cursor: isDragging ? 'grabbing' : 'grab' }">
        
        <div class="plans-track"
          @transitionend.self="handleTransitionEnd"
          :style="{ 
            transform: `translateX(${planTrackOffset}px)`, 
            transition: trackTransition 
          }">
          
          <div v-for="(plan, i) in infinitePlans" :key="i" class="plan-card"
            :class="{
              featured: plan.featured,
              'plan-card--centered': i === (virtualIndex + centerOffsetIndex),
              'plan-card--selected': selectedPlanIndex === (i % plans.length)
            }"
            @click="selectPlan(i)">

            <i :class="['bi', plan.icon, 'plan-icon']"></i>
            <h3 class="plan-name">{{ plan.name }}</h3>
            
            <div v-if="!annual" class="plan-price">
              {{ plan.price }} USD <span>/ mes</span>
            </div>
            <div v-else class="plan-price-wrap">
              <span class="price-old">{{ plan.price }} USD / mes</span>
              <div class="plan-price">${{ annualPrice(plan.rawPrice) }} USD <span>/ mes</span></div>
              <span class="discount-tag"><i class="bi bi-tag-fill"></i> –20%</span>
            </div>
            
            <ul class="plan-features">
              <li v-for="f in plan.features" :key="f">
                <i class="bi bi-check-circle-fill check"></i> {{ f }}
              </li>
            </ul>
            <p class="plan-ideal"><i class="bi bi-info-circle"></i> {{ plan.ideal }}</p>

            <button :class="plan.featured ? 'btn-primary' : 'btn-outline'" @click.stop="addPlanToCart(plan)">
              <i :class="['bi', plan.rawPrice === 5 ? 'bi-rocket-takeoff' : 'bi-cart-check']"></i>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
      
      <button class="carr-arrow carr-arrow--right" @click="nextPlan" aria-label="Siguiente">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>

    <div class="pagination-dots">
      <span class="page-indicator">{{ currentPlanIndex + 1 }} / {{ plans.length }}</span>
      <div class="dots">
        <button v-for="(plan, i) in plans" :key="i" class="dot" :class="{ 'dot--active': i === currentPlanIndex }"
          @click="goToPlan(i)"></button>
      </div>
      <span class="plan-name-indicator">{{ plans[currentPlanIndex].name }}</span>
    </div>

    <!-- ══ SECCIÓN FUNCIONALIDADES Y ALMACENAMIENTO ══ -->
    <div class="container">
      <div class="features-section">
        <h3 class="features-title">
          <i class="bi bi-lightning-charge-fill"></i>
          Funcionalidades incluidas en TODOS los planes
        </h3>
        <div class="features-grid">
          <div v-for="feature in allFeatures" :key="feature.text" class="feature-item">
            <i :class="['bi', feature.icon, 'feature-check']"></i>
            <span>{{ feature.text }}</span>
          </div>
        </div>
      </div>
      <div class="storage-header">
        <h3 class="storage-title">
          <i class="bi bi-database-fill"></i> Planes adicionales de almacenamiento
        </h3>
        <p class="storage-subtitle">
          <i class="bi bi-cloud-arrow-up"></i>
          Se pueden contratar con cualquier plan • Integración con Google Drive
        </p>
      </div>
    </div>

    <!-- ══ CARDS ALMACENAMIENTO ══ -->
    <div class="storage-cards-wrap">
      <div class="storage-card" :class="{ 'storage-card--selected': selectedStorageIndex === 0 }"
        @click="selectStorage(0)">
        <i class="bi bi-hdd-stack-fill storage-icon"></i>
        <div class="storage-size">1 TB</div>
        <div class="storage-price">$11 USD <span>/ mes</span></div>
        <div class="storage-note">1,024 GB × $40 COP/GB</div>
        <button class="btn-storage" @click.stop="addStorageToCart(1, 11)"><i class="bi bi-cart-check"></i> Agregar al carrito</button>
      </div>

      <div class="storage-card" :class="{ 'storage-card--selected': selectedStorageIndex === 1 }"
        @click="selectStorage(1)">
        <i class="bi bi-hdd-rack-fill storage-icon"></i>
        <div class="storage-size">{{ inputTB }} TB</div>
        <div class="storage-price">${{ inputPrice }} USD <span>/ mes</span></div>
        <div class="storage-note">{{ inputTB * 1024 }} GB × $40 COP/GB</div>
        <div class="input-wrap">
          <button class="input-btn" @click="inputTB > 2 && inputTB--"><i class="bi bi-dash"></i></button>
          <span class="input-val">{{ inputTB }} TB</span>
          <button class="input-btn" @click="inputTB < 5 && inputTB++"><i class="bi bi-plus"></i></button>
        </div>
        <button class="btn-storage" @click.stop="addStorageToCart(inputTB, inputPrice)"><i class="bi bi-cart-check"></i> Agregar al carrito</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onUnmounted, defineProps,onMounted} from 'vue'
import { useCartStore } from '@/stores/cartStore'

defineProps({ darkMode: Boolean })

const cart = useCartStore()

const selectedPlanIndex    = ref(null)
const selectedStorageIndex = ref(null)

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

const annual = ref(false)
const annualPrice = (p) => (p * 0.8).toFixed(2)

const plans = [
  { name: 'Plan Basic – Integral', icon: 'bi-gift',             price: '$5',   rawPrice: 5,   features: ['2 usuarios', '5 GB almacenamiento', 'Todas las funciones activas', 'Soporte básico'],        ideal: 'Ideal para talleres pequeños que están empezando.', featured: false },
  { name: 'Plan Start',            icon: 'bi-stars',            price: '$19',  rawPrice: 19,  features: ['Hasta 5 usuarios', '50 GB almacenamiento', 'Todas las funciones'],                           ideal: 'Ideal para centros pequeños con flujo moderado.',   featured: false },
  { name: 'Plan Growth',           icon: 'bi-graph-up-arrow',   price: '$49',  rawPrice: 49,  features: ['Hasta 15 usuarios', '200 GB almacenamiento', 'Todas las funciones'],                         ideal: 'Ideal para centros medianos con varios técnicos.',  featured: false },
  { name: 'Plan Business',         icon: 'bi-briefcase-fill',   price: '$99',  rawPrice: 99,  features: ['Hasta 40 usuarios', '1 TB almacenamiento', 'Todas las funciones'],                           ideal: 'Ideal para empresas con varias sedes.',             featured: false },
  { name: 'Plan Enterprise',       icon: 'bi-building',         price: '$179', rawPrice: 179, features: ['Hasta 100 usuarios', '2 TB almacenamiento', 'Todas las funciones', 'Soporte prioritario'], ideal: 'Ideal para redes grandes de servicio técnico.',     featured: true  },
]

// ══ LÓGICA DE CINTA INFINITA 100% FLUIDA ══
const MULTIPLIER = 15 // Gran buffer: 35 planes a la izquierda, 35 a la derecha. Imposible ver el límite.
const centerOffsetIndex = Math.floor(MULTIPLIER / 2) * plans.length // Índice central exacto (35)
const infinitePlans = computed(() => {
  let arr = []
  for (let i = 0; i < MULTIPLIER; i++) arr.push(...plans)
  return arr
})

const planViewport = ref(null)
const virtualIndex = ref(0) 
const isTransitioning = ref(false)

const currentPlanIndex = computed(() => ((virtualIndex.value % plans.length) + plans.length) % plans.length)

// Teletransporte invisible SOLO cuando la cinta está completamente quieta
const handleTransitionEnd = (e) => {
  if (e.propertyName !== 'transform') return
  if (!isTransitioning.value) return // Evitar gatillos dobles
  
  isTransitioning.value = false
  
  // Normalizar para mantenernos siempre en el bloque central de 5 tarjetas
  const normalized = ((virtualIndex.value % plans.length) + plans.length) % plans.length
  if (virtualIndex.value !== normalized) {
    virtualIndex.value = normalized
  }
}

const triggerNavigation = (delta) => {
  virtualIndex.value += delta
  isTransitioning.value = true
}

const prevPlan = () => triggerNavigation(-1)
const nextPlan = () => triggerNavigation(1)

const goToPlan = (logicalTarget) => {
  const currentLogical = ((virtualIndex.value % plans.length) + plans.length) % plans.length
  let diff = logicalTarget - currentLogical
  if (diff > plans.length / 2) diff -= plans.length
  if (diff < -plans.length / 2) diff += plans.length
  if (diff !== 0) triggerNavigation(diff)
}

const selectPlan = (indexInArray) => {
  const logical = indexInArray % plans.length
  selectedPlanIndex.value = selectedPlanIndex.value === logical ? null : logical
  if (selectedPlanIndex.value !== null) goToPlan(logical)
}

// ══ RESPONSIVE & MEDIDAS ══
const screenWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)
const viewportWidth = ref(0)

const planCardWidth = computed(() => {
  if (screenWidth.value <= 360) return 240
  if (screenWidth.value <= 480) return 260
  if (screenWidth.value <= 768) return 270
  return 290
})

const planGap = computed(() => {
  if (screenWidth.value <= 480) return 16
  if (screenWidth.value <= 768) return 20
  return 32
})

// ══ ARRASTRE SIN LÍMITES ══
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartOffset = ref(0)
const liveOffset = ref(0)
const dragThreshold = 5

const trackTransition = computed(() => {
  if (isDragging.value) return 'none'
  return isTransitioning.value ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
})

const planTrackOffset = computed(() => {
  if (isDragging.value && liveOffset.value !== 0) return liveOffset.value
  
  const vw = viewportWidth.value || (planViewport.value ? planViewport.value.offsetWidth : window.innerWidth - 32)
  const step = planCardWidth.value + planGap.value
  const realIndex = virtualIndex.value + centerOffsetIndex
  return (vw - planCardWidth.value) / 2 - (realIndex * step)
})

const startDrag = (clientX) => {
  isDragging.value = true
  isTransitioning.value = false 
  
  // Leer la matriz física exacta para evitar tirones si cortas la animación
  const trackEl = planViewport.value?.querySelector('.plans-track')
  if (trackEl) {
    const style = window.getComputedStyle(trackEl)
    try {
      const matrix = new DOMMatrix(style.transform)
      dragStartOffset.value = matrix.m41
    } catch(e) {
      dragStartOffset.value = planTrackOffset.value
    }
  } else {
    dragStartOffset.value = planTrackOffset.value
  }
  
  liveOffset.value = dragStartOffset.value
  dragStartX.value = clientX
}

const moveDrag = (clientX) => {
  if (!isDragging.value) return
  liveOffset.value = dragStartOffset.value + (clientX - dragStartX.value)
}

const endDrag = (clientX) => {
  if (!isDragging.value) return
  isDragging.value = false
  const diff = dragStartX.value - clientX
  
  if (Math.abs(diff) > dragThreshold) {
    const step = planCardWidth.value + planGap.value
    const vw = viewportWidth.value || (planViewport.value ? planViewport.value.offsetWidth : window.innerWidth - 32)
    const centerOffsetPx = (vw - planCardWidth.value) / 2
    
    // Calcular el índice exacto en base a los píxeles reales arrastrados
    const exactIndex = (centerOffsetPx - liveOffset.value) / step
    virtualIndex.value = Math.round(exactIndex - centerOffsetIndex)
    
    liveOffset.value = 0 
    isTransitioning.value = true
  } else {
    // Si fue solo un toque (click), soltar sin animar
    liveOffset.value = 0
  }
}

const onMouseDown = (e) => { e.preventDefault(); startDrag(e.clientX) }
const onMouseMove = (e) => { e.preventDefault(); moveDrag(e.clientX) }
const onMouseUp = (e) => endDrag(e.clientX)
const onMouseLeave = () => isDragging.value && endDrag(dragStartX.value)

const onTouchStart = (e) => startDrag(e.touches[0].clientX)
const onTouchMove = (e) => moveDrag(e.touches[0].clientX)
const onTouchEnd = (e) => endDrag(e.changedTouches[0].clientX)

// ══ UTILIDADES Y CICLO DE VIDA ══
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
  updateViewportWidth()
}

const updateViewportWidth = () => {
  if (planViewport.value) {
    viewportWidth.value = planViewport.value.getBoundingClientRect().width || planViewport.value.offsetWidth || window.innerWidth - 32
  }
}

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
  updateScreenWidth()
  cart.loadFromStorage()

  if (planViewport.value) {
    const ro = new ResizeObserver(() => {
      updateScreenWidth()
      updateViewportWidth()
    })
    ro.observe(planViewport.value)
    setTimeout(() => ro.disconnect(), 3000)
  }
  [50, 150, 300, 600, 1000].forEach(ms => setTimeout(updateViewportWidth, ms))
})

const closeAll = (e) => {
if (!e.target.closest('.plan-card') && !e.target.closest('.storage-card')) {
  selectedPlanIndex.value    = null
  selectedStorageIndex.value = null
}
}

onUnmounted(() => window.removeEventListener('resize', updateScreenWidth))

const addPlanToCart = (plan) => {
const price = annual.value ? parseFloat((plan.rawPrice * 0.8).toFixed(2)) : plan.rawPrice
cart.setPlan({
  name:     plan.name,
  price,
  rawPrice: plan.rawPrice,
  icon:     plan.icon,
  features: plan.features,
  months:   1,
})
showToast(`${plan.name} agregado al carrito`)
}

const selectStorage = (i) => selectedStorageIndex.value = selectedStorageIndex.value === i ? null : i

const addStorageToCart = (size, price) => {
  if (!cart.plan) return showToast('Primero selecciona un plan GST')
  cart.setStorage({ size, price, months: 1 })
  showToast(`Almacenamiento ${size} TB agregado al carrito`)
}

const allFeatures = [
{ text: 'Gestión completa de agendas',                   icon: 'bi-calendar-check-fill'    },
{ text: 'Creación y seguimiento de órdenes de servicio', icon: 'bi-clipboard2-check-fill'  },
{ text: 'Gestión de garantías',                          icon: 'bi-shield-check'           },
{ text: 'Carga de fotos y videos',                       icon: 'bi-camera-fill'            },
{ text: 'Historial por cliente y por equipo',            icon: 'bi-clock-history'          },
{ text: 'Reportes completos',                            icon: 'bi-bar-chart-fill'         },
{ text: 'Panel administrativo',                          icon: 'bi-speedometer2'           },
{ text: 'Multi-sucursal',                                icon: 'bi-buildings-fill'         },
{ text: 'Control de técnicos',                           icon: 'bi-person-gear'            },
{ text: 'Soporte estándar',                              icon: 'bi-headset'                },
]

const inputTB    = ref(2)
const inputPrice = computed(() => Math.ceil((inputTB.value * 1024 * 40) / 4000))
</script>

<style scoped>
.pricing {
padding: 5rem 0;
background: var(--bg-alt);
transition: background 0.35s;
}

.header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.container {
max-width: 1200px;
margin: 0 auto;
padding: 0 1.5rem;
}

.header {
text-align: center;
margin-bottom: 3.5rem;
}

.section-title {
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--text);
  margin-bottom: 1.25rem;
  transition: color 0.35s;
}

.toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.lbl { transition: color 0.2s; }
.lbl--active { color: var(--text); font-weight: 700; }
.save { color: var(--accent); font-style: normal; }

.toggle-btn {
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

.toggle-dot {
  width: 1.1rem;
  height: 1.1rem;
  background: var(--accent);
  border-radius: 9999px;
  transition: transform 0.25s ease;
  display: block;
}

.toggle-dot--right { transform: translateX(1.4rem); }

.carousel-container {
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

.carousel-viewport {
  flex: 1;
  overflow: hidden;
  border-radius: 1.5rem;
  min-height: 550px;
  display: flex;
  align-items: center;
}

.plans-track {
  display: flex;
  gap: v-bind(planGap + 'px');
  will-change: transform;
  align-items: center;
  height: 40rem;
  width: fit-content;
}

.storage-track {
  display: flex;
  gap: 32px;
  transition: transform 0.4s ease-in-out;
  will-change: transform;
  align-items: center;
  height: 20rem;
  width: fit-content;
}

.carr-arrow {
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

.carr-arrow:hover:not(:disabled) {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--accent-text);
  transform: scale(1.1);
}

.carr-arrow:disabled { opacity: 0.3; cursor: not-allowed; pointer-events: none; }

.pagination-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.page-indicator { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; min-width: 3rem; text-align: center; }
.plan-name-indicator { font-size: 0.85rem; color: var(--text-muted); font-style: italic; min-width: 10rem; text-align: center; }
.dots { display: flex; gap: 0.5rem; align-items: center; }
.dot { width: 0.6rem; height: 0.6rem; border-radius: 9999px; background: var(--border); border: none; cursor: pointer; padding: 0; transition: background 0.2s, width 0.25s ease; }
.dot--active { background: var(--accent); width: 1.5rem; }

.plan-card {
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.plan-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.plan-card:hover::before {
  transform: scaleX(1);
}

.plan-card:hover {
  border-color: var(--accent);
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 16px 48px var(--accent-glow);
}

@media (max-width: 768px) { .plan-card { width: 270px; min-height: 580px; } }
@media (max-width: 480px) { .plan-card { width: 260px; min-height: 560px; } }
@media (max-width: 360px) { .plan-card { width: 240px; min-height: 540px; } }

.plan-card--centered {
  border: 2px solid var(--accent);
  box-shadow: 0 0 0 2px var(--accent), 0 12px 40px var(--accent-glow);
  transform: scale(1.02);
  z-index: 2;
}

.plan-card.featured {
  border: 2px solid var(--accent);
  background: linear-gradient(145deg, var(--bg-card), var(--bg-alt));
  box-shadow: 0 0 28px var(--accent-glow);
}

.plan-card--centered.featured { box-shadow: 0 0 0 2px var(--accent), 0 12px 40px var(--accent-glow); }

.badge {
  position: absolute;
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

.badge i { font-size: 0.6rem; }
.plan-icon { font-size: 2.5rem; color: var(--accent); margin-bottom: 1rem; display: inline-block; align-self: center; }
.plan-name { font-size: 1.35rem; font-weight: 800; color: var(--text); margin-bottom: 0.75rem; letter-spacing: -0.02em; transition: color 0.35s; line-height: 1.3; text-align: center; }
.plan-price { font-size: 2.5rem; font-weight: 900; color: var(--accent); line-height: 1.2; margin-bottom: 1.25rem; letter-spacing: -0.03em; text-align: center; }
.plan-price span { font-size: 0.85rem; font-weight: 400; color: var(--text-muted); margin-left: 0.25rem; }
.plan-price-wrap { margin-bottom: 1.25rem; text-align: center; }
.price-old { display: block; font-size: 0.85rem; color: var(--text-muted); text-decoration: line-through; opacity: 0.65; margin-bottom: 0.1rem; }
.plan-price-wrap .plan-price { margin-bottom: 0.25rem; }
.discount-tag { display: inline-flex; align-items: center; gap: 0.3rem; background: var(--accent); color: var(--accent-text); font-size: 0.65rem; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 9999px; }
.plan-features { list-style: none; padding: 0; margin: 0.5rem 0; }
.plan-features li { display: flex; align-items: flex-start; gap: 0.6rem; margin-bottom: 0.6rem; font-size: 0.9rem; color: var(--text); transition: color 0.35s; line-height: 1.4; }
.check { color: var(--accent); font-size: 1rem; flex-shrink: 0; margin-top: 0.1rem; }
.plan-ideal { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem; font-style: italic; padding-top: 0.5rem; border-top: 1px dashed var(--border-soft); display: flex; align-items: flex-start; gap: 0.4rem; transition: color 0.35s; line-height: 1.4; }
.plan-ideal i { color: var(--accent); font-size: 0.85rem; flex-shrink: 0; margin-top: 0.1rem; }

.btn-primary, .btn-outline, a.btn-primary, a.btn-outline { display: flex; width: 100%; padding: 0.8rem; font-weight: 700; font-size: 0.9rem; font-family: inherit; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); align-items: center; justify-content: center; gap: 0.5rem; margin-top: 0.5rem; text-decoration: none; text-align: center; border-radius: 0.75rem; box-sizing: border-box; position: relative; overflow: hidden; }
.btn-primary, a.btn-primary { background: var(--accent); color: var(--accent-text); border: none; box-shadow: 0 0 18px var(--accent-glow); }
.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}
.btn-primary:hover::before {
  transform: translateX(100%);
}
.btn-primary:hover, a.btn-primary:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 32px var(--accent-glow); }
.btn-primary:active { transform: translateY(-1px) scale(0.98); }
.btn-outline, a.btn-outline { background: transparent; border: 1.5px solid var(--border); color: var(--text); }
.btn-outline:hover, a.btn-outline:hover { background: var(--border-soft); border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
.btn-outline i, a.btn-outline i { color: var(--accent); transition: transform 0.3s ease; }
.btn-outline:hover i { transform: scale(1.2); }

.features-section { margin-bottom: 4rem; background: var(--bg-card); border-radius: 2rem; padding: 2.5rem; border: 1px solid var(--border-soft); transition: background 0.35s; }
.features-title { font-size: 1.6rem; font-weight: 800; color: var(--text); margin-bottom: 2rem; text-align: center; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: color 0.35s; }
.features-title i { color: var(--accent); font-size: 1.8rem; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }
.feature-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: var(--bg); border-radius: 0.75rem; border: 1px solid var(--border-soft); transition: all 0.2s ease; }
.feature-item:hover { border-color: var(--accent); transform: translateX(5px); }
.feature-check { color: var(--accent); font-size: 1.2rem; flex-shrink: 0; }
.feature-item span { font-size: 0.95rem; color: var(--text); transition: color 0.35s; }

.storage-header { text-align: center; margin-bottom: 2rem; }
.storage-title { font-size: 1.6rem; font-weight: 800; color: var(--text); margin-bottom: 0.5rem; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: color 0.35s; }
.storage-title i { color: var(--accent); font-size: 1.8rem; }
.storage-subtitle { color: var(--text-muted); font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: color 0.35s; }
.storage-subtitle i { color: var(--accent); }

.storage-card {
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.storage-card:hover {
  border-color: var(--accent);
  transform: translateY(-4px) scale(1.02);
}

@media (max-width: 768px) { .storage-card { padding: 1.5rem 1rem; min-height: 240px; } }
@media (max-width: 480px) { .storage-card { padding: 1.25rem; min-height: 220px; } }
@media (max-width: 360px) { .storage-card { padding: 1rem 0.75rem; min-height: 200px; } }

.storage-cards-wrap {
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
  .storage-cards-wrap { grid-template-columns: 1fr; }
  .storage-cards-wrap .storage-card { width: 80%; margin: 0 auto; }
}

.storage-card--variable { min-height: 320px; height: auto; }
.storage-note { font-size: 0.72rem; color: var(--text-muted); margin-top: -0.25rem; }
.input-wrap { display: flex; align-items: center; gap: 0.75rem; margin-top: 0.25rem; }
.input-btn { width: 2rem; height: 2rem; border-radius: 9999px; border: 1.5px solid var(--border); background: var(--border-soft); color: var(--accent); font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.input-btn:hover { background: var(--accent); color: var(--accent-text); border-color: var(--accent); }
.input-val { font-size: 1rem; font-weight: 700; color: var(--text); min-width: 3.5rem; text-align: center; }
.storage-card--centered { border: 2px solid var(--accent); box-shadow: 0 0 0 2px var(--accent), 0 12px 32px var(--accent-glow); transform: scale(1.02); z-index: 2; }
.storage-icon { font-size: 2.2rem; color: var(--accent); }
.storage-size { font-weight: 700; font-size: 1.1rem; color: var(--text); transition: color 0.35s; }
.storage-price { font-size: 2rem; font-weight: 900; color: var(--accent); line-height: 1.2; letter-spacing: -0.03em; }
.storage-price span { font-size: 0.8rem; font-weight: 400; color: var(--text-muted); }
.btn-storage { background: var(--border-soft); border: 1px solid var(--border); color: var(--accent); font-weight: 600; padding: 0.5rem 1.5rem; border-radius: 9999px; font-size: 0.9rem; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 0.5rem; width: fit-content; }
.btn-storage:hover { background: var(--accent); color: var(--accent-text); border-color: var(--accent); }

@media (max-width: 768px) {
  .pricing { padding: 3rem 0; }
  .container { padding: 0 1rem; }
  .carousel-container { gap: 0.5rem; padding: 0 0.5rem; }
  .carousel-viewport { min-height: 500px; }
  .plans-track { gap: 20px; }
  .storage-track { gap: 20px; }
  .features-section { padding: 1.5rem; }
  .features-grid { grid-template-columns: 1fr; }
  .carr-arrow { width: 2.25rem; height: 2.25rem; font-size: 0.9rem; }
  .pagination-dots { gap: 1rem; }
  .plan-name-indicator { min-width: 8rem; }
}

@media (max-width: 480px) {
  .carousel-viewport { min-height: 480px; }
  .storage-price { font-size: 1.2rem; font-weight: 700; line-height: 1.2; letter-spacing: -0.03em; }
  .plans-track { gap: 16px; }
  .storage-track { gap: 12px; }
  .plan-price { font-size: 2rem; }
  .features-title, .storage-title { font-size: 1.3rem; }
  .plan-name-indicator { min-width: 6rem; font-size: 0.75rem; }
  .carr-arrow { width: 2rem; height: 2rem; font-size: 0.8rem; }
}

@media (max-width: 360px) {
  .carousel-viewport { min-height: 460px; }
  .plans-track { gap: 12px; }
  .storage-track { gap: 8px; }
  .carr-arrow { width: 1.75rem; height: 1.75rem; font-size: 0.75rem; }
}
</style>