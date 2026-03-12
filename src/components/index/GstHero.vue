<template>
  <section class="hero">
    <div class="glow"></div>
    <div class="container">
      <div class="content-col">
        <div class="badge">
          <i class="bi bi-rocket-takeoff-fill"></i>
          Lanzamiento Oficial: 25 de Mayo, 2026
        </div>

        <h1 class="title">
          Optimiza tu Servicio<br />
          Técnico con <em>GST</em>
        </h1>

        <p class="subtitle">
          El sistema de gestión digital definitivo para centralizar tu información
          y tomar el control total de tu taller o empresa.
        </p>

        <div class="countdown">
          <div v-for="unit in countdown" :key="unit.label" class="countdown-unit">
            <span class="countdown-num">{{ unit.value }}</span>
            <span class="countdown-label">{{ unit.label }}</span>
          </div>
        </div>

        <p v-if="apiError" class="api-note">
          <i class="bi bi-wifi-off"></i> Usando tiempo local
        </p>

        <button class="btn-primary">Solicitar Acceso Anticipado</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, computed } from 'vue'

import bgBlue from '@/assets/backgroundBlue.jpg'
import bgGreen from '@/assets/backgroundGreen.jpg'

const props = defineProps({ darkMode: Boolean })

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
  color: var(--text);
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
  transition: background 0.35s, border-color 0.35s;
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

@media (max-width: 640px) {
  
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
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s;
}

.btn-primary:hover {
  background: var(--accent);
  color: var(--accent-text);
  transform: translateY(-2px);
  box-shadow: 0 0 32px var(--accent-glow);
}

@media (max-width: 640px) {
  .btn-primary {
    font-size: 0.9rem;
    padding: 0.7rem 1.5rem;
  }
}
</style>