<template>
  <section class="hero">
    <div class="glow"></div>
    <div class="container">
      <div class="content-col">
        <div class="badge hero-fade-in">
          <i class="bi bi-rocket-takeoff-fill"></i>
          Lanzamiento Oficial: 25 de Mayo, 2026
        </div>

        <h1 class="title hero-fade-in-up">
          Optimiza tu Servicio<br />
          Técnico con <em>GST</em>
        </h1>

        <p class="subtitle hero-fade-in-up">
          El sistema de gestión digital definitivo para centralizar tu información
          y tomar el control total de tu taller o empresa.
        </p>

        <div class="countdown hero-fade-in-up">
          <div v-for="(unit, i) in countdown" :key="unit.label" class="countdown-unit" :style="{ transitionDelay: `${i * 50}ms` }">
            <span class="countdown-num">{{ unit.value }}</span>
            <span class="countdown-label">{{ unit.label }}</span>
          </div>
        </div>

        <p v-if="apiError" class="api-note hero-fade-in-up">
          <i class="bi bi-wifi-off"></i> Usando tiempo local
        </p>

        <button class="btn-primary hero-fade-in-up">
          <span>Solicitar Acceso Anticipado</span>
          <i class="bi bi-arrow-right btn-arrow"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, computed } from 'vue'

import bgBlue from '@/assets/backgroundBlue.jpg'
import bgGreen from '@/assets/backgroundGreen.jpg'

const props = defineProps({
  darkMode: Boolean,
  toggleForm: Function
})

const scrollToPricing = () => {
  document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const heroBg = computed(() => `url(${props.darkMode ? bgGreen : bgBlue})`)

const TARGET_ISO = '2026-05-25T05:00:00Z'

const countdown = ref([
  { label: 'Días', value: '--' },
  { label: 'Horas', value: '--' },
  { label: 'Minutos', value: '--' },
  { label: 'Segundos', value: '--' },
])

const apiError = ref(false)
let timer = null
const pad = (n, len = 2) => String(n).padStart(len, '0')

const calculateCountdown = () => {
  try {
    const target = new Date(TARGET_ISO).getTime()
    const now = Date.now()
    const diff = Math.max(0, target - now)
    if (isNaN(diff)) throw new Error('Diferencia inválida')
    countdown.value[0].value = Math.floor(diff / 86400000).toString()
    countdown.value[1].value = pad(Math.floor((diff % 86400000) / 3600000))
    countdown.value[2].value = pad(Math.floor((diff % 3600000) / 60000))
    countdown.value[3].value = pad(Math.floor((diff % 60000) / 1000))
    apiError.value = false
  } catch (error) {
    console.error('Error en countdown:', error)
  }
}

onMounted(() => {
  calculateCountdown()
  timer = setInterval(calculateCountdown, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
/* ══ ANIMACIONES DE ENTRADA ══ */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.hero {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 42rem;
  background-image: v-bind(heroBg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.35s ease;
}

/* Animaciones de entrada */
.hero-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.hero-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.badge.hero-fade-in { animation-delay: 0.1s; }
.title.hero-fade-in-up { animation-delay: 0.2s; }
.subtitle.hero-fade-in-up { animation-delay: 0.3s; }
.countdown.hero-fade-in-up { animation-delay: 0.4s; }
.api-note.hero-fade-in-up { animation-delay: 0.5s; }
.btn-primary.hero-fade-in-up { animation-delay: 0.6s; }

@media (max-width:768px) {
  .hero {
    height: 25rem;
  }
}

@media (min-width:769px) and (max-width:1024px) {
  .hero {
    height: 33rem;
  }
}

.glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 80% at 25% 50%, var(--accent-glow) 0%, transparent 65%);
  pointer-events: none;
  z-index: 1;
  transition: background 0.35s ease;
}

.container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  padding: 0 3rem;
  z-index: 2;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1.5rem;
  }
  .countdown-unit {
    width: 5rem;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 0 1rem;
    align-items: flex-start;
    padding-top: 2rem;
  }
}

.content-col {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

@media (max-width: 768px) {
  .content-col {
    width: 65%;
  }
}

@media (max-width: 640px) {
  .content-col {
    width: 100%;
  }
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
  margin-bottom: 1.25rem;
  transition: background 0.35s, border-color 0.35s;
}

@media (max-width: 640px) {
  .badge {
    font-size: 0.65rem;
    padding: 0.25rem 0.6rem;
    margin-bottom: 0.75rem;
  }
}

.title {
  font-size: clamp(1.8rem, 4vw, 4rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: var(--title);
  transition: color 0.35s;
}

@media (max-width: 640px) {
  .title {
    font-size: clamp(1.6rem, 7vw, 2rem);
    margin-bottom: 0.75rem;
  }
}

.title em {
  color: var(--accent);
  font-style: normal;
}

.subtitle {
  font-size: 1rem;
  color: var(--text-muted);
  max-width: 28rem;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
  transition: color 0.35s;
}

@media (max-width: 640px) {
  .subtitle {
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }
}

.countdown {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 0.6rem;
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .countdown {
    gap: 0.4rem;
  }
}

.countdown-unit {
  border: 1px solid var(--border);
  border-radius: 0.6rem;
  padding: 0.75rem 0.6rem;
  background: var(--border-soft);
  min-width: 3.5rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.countdown-unit::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent, rgba(255,255,255,0.05), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.countdown-unit:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--accent-glow);
}

.countdown-unit:hover::after {
  opacity: 1;
}

@media (max-width: 640px) {
  .countdown-unit {
    padding: 0.5rem 0.4rem;
    min-width: 2.8rem;
  }
}

.countdown-num {
  display: block;
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--accent);
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.countdown-label {
  display: block;
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-top: 0.3rem;
  transition: color 0.35s;
  width: 4rem;
}

.api-note {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.btn-primary {
  margin-top: 0.5rem;
  background: transparent;
  color: var(--accent);
  border: 2px solid var(--accent);
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.8rem 2rem;
  cursor: pointer;
  box-shadow: 0 0 18px var(--accent-glow);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

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

.btn-primary:hover {
  background: var(--accent);
  color: var(--accent-text);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 40px var(--accent-glow);
}

.btn-primary:active {
  transform: translateY(-1px) scale(0.98);
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.btn-primary:hover .btn-arrow {
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .btn-primary {
    font-size: 0.9rem;
    padding: 0.7rem 1.5rem;
  }
}

/* ══ MÓVIL 600px — rediseño sin imagen ══ */
@media (max-width: 600px) {
  .hero {
    height: auto !important;
    background-image: none !important;
    background: var(--bg) !important;
    padding: 0;
  }

  .glow { display: none; }

  .container {
    position: relative;
    inset: unset;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 0;
  }

  .content-col {
    width: 100%;
    align-items: center;
    text-align: center;
    padding: 2.5rem 1.5rem 2.5rem;
    position: relative;
    overflow: hidden;
  }

  /* Línea accent decorativa arriba */
  .content-col::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }

  .badge {
    align-self: center;
    font-size: 0.7rem;
    padding: 0.3rem 0.75rem;
    margin-bottom: 1.25rem;
  }

  .title {
    font-size: clamp(2rem, 9vw, 2.6rem);
    line-height: 1.15;
    margin-bottom: 0.75rem;
    color: var(--text);
  }

  .subtitle {
    font-size: 0.9rem;
    margin: 0 auto 1.75rem;
    max-width: 100%;
  }

  /* Countdown como pill horizontal unificada */
  .countdown {
    display: flex;
    justify-content: center;
    gap: 0;
    margin-bottom: 1.75rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 1rem;
    overflow: hidden;
    width: 100%;
  }

  .countdown-unit {
    flex: 1;
    border: none;
    border-radius: 0;
    background: transparent;
    padding: 0.85rem 0.25rem;
    border-right: 1px solid var(--border);
    min-width: unset;
  }

  .countdown-unit:last-child { border-right: none; }

  .countdown-num {
    font-size: 1.75rem;
  }

  .countdown-label {
    width: auto;
    font-size: 0.5rem;
    margin-top: 0.25rem;
  }

  .btn-primary {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 1rem;
    padding: 0.9rem 1.5rem;
    border-radius: 0.75rem;
    margin-top: 0;
  }
}

/* ══ PANTALLAS GRANDES 2560px ══ */
@media (min-width: 2560px) {
  .hero {
    height: 55rem;
  }

  .title {
    font-size: 5rem;
  }

  .subtitle {
    font-size: 1.3rem;
    max-width: 40rem;
  }

  .countdown-num {
    font-size: 2.2rem;
  }

  .countdown-label {
    font-size: 0.7rem;
    width: 5rem;
  }

  .countdown-unit {
    min-width: 4.5rem;
    padding: 1rem 0.8rem;
  }

  .badge {
    font-size: 1rem;
    padding: 0.5rem 1.2rem;
  }

  .btn-primary {
    font-size: 1.2rem;
    padding: 1rem 2.5rem;
  }
}
</style>