<template>
  <section class="features">
    <div class="container">
      <div class="inner">

        <div class="text-col">
          <h2 class="section-title">Funciones Profesionales Avanzadas</h2>
          <div class="feature-list">
            <div v-for="feat in features" :key="feat.title" class="feature">
              <div class="feature-icon">
                <i :class="['bi', feat.icon]"></i>
              </div>
              <div>
                <h4 class="feature-title">{{ feat.title }}</h4>
                <p class="feature-desc">{{ feat.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="visual-col">
          <img :src="darkMode ? tecnicoVerde : tecnicoAzul" alt="tecnico" class="imgTecnico">
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({ darkMode: Boolean })
import tecnicoAzul from '@/assets/tecnicoAzul.png'
import tecnicoVerde from '@/assets/tecnicoVerde.png'
const features = [
  { icon: 'bi-cloud-arrow-up-fill', title: 'Almacenamiento Multimedia', desc: 'Guarda fotos y videos del estado de los equipos como respaldo visual para el cliente.' },
  { icon: 'bi-stopwatch-fill', title: 'Visualización de Tiempo Admin', desc: 'Calcula cuánto tiempo dedicas realmente a la gestión administrativa vs. técnica.' },
  { icon: 'bi-download', title: 'Exportación de Nómina', desc: 'Exporta en un clic los reportes para el pago de técnicos y personal.' },
]
</script>

<style scoped>
.features {
  padding: 5rem 0;
  background: var(--bg-alt);
  transition: background 0.35s;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.inner {
  display: grid;
  gap: 3.5rem;
  align-items: center;
}

.imgTecnico {
  width: 100%;
}

@media (min-width: 1024px) {
  .inner {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
 .section-title {
  text-align: center;
}
}
.section-title {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--text);
  margin-bottom: 2.5rem;
  line-height: 1.2;
  transition: color 0.35s;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.feature {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.feature-icon {
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  background: var(--border-soft);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  color: var(--accent);
  transition: background 0.35s, border-color 0.35s;
}

.feature-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.3rem;
  transition: color 0.35s;
}

.feature-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.6;
  transition: color 0.35s;
}

/* Mock dashboard */
.visual-col {
  display: flex;
  justify-content: center;
}

.mock {
  width: 100%;
  max-width: 420px;
  background: var(--bg-card);
  border-radius: 1rem;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: background 0.35s, border-color 0.35s;
}

.mock-bar {
  background: var(--accent);
  padding: 0.75rem 1rem;
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.mock-bar span {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 9999px;
  background: rgba(29, 29, 27, 0.3);
}

.mock-body {
  padding: 1.25rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.mock-stat {
  height: 4rem;
  border-radius: 0.5rem;
  background: var(--border-soft);
  border: 1px solid var(--border);
  animation: pulse 2.5s ease-in-out infinite;
  transition: background 0.35s;
}

.mock-chart {
  grid-column: 1 / -1;
  height: 7rem;
  border-radius: 0.5rem;
  background: var(--border-soft);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
  transition: background 0.35s;
}

.mock-chart::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55%;
  background: repeating-linear-gradient(90deg, transparent 0%, var(--border) 15%, transparent 30%);
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}
</style>