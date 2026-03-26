<template>
  <section class="features">
    <div class="container">
      <div class="inner">

        <div class="text-col">
          <h2 class="section-title fade-in-section">Funciones Profesionales Avanzadas</h2>
          <div class="feature-list">
            <div v-for="(feat, i) in features" :key="feat.title" class="feature fade-in-feature" :style="{ animationDelay: `${i * 100}ms` }">
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

        <div class="visual-col fade-in-section">
          <img :src="darkMode ? tecnicoVerde : tecnicoAzul" alt="tecnico" class="imgTecnico">
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
defineProps({ darkMode: Boolean })
import tecnicoAzul from '@/assets/tecnicoAzul.png'
import tecnicoVerde from '@/assets/tecnicoVerde.png'
const features = [
  { icon: 'bi-cloud-arrow-up-fill', title: 'Almacenamiento Multimedia', desc: 'Guarda fotos y videos del estado de los equipos como respaldo visual para el cliente.' },
  { icon: 'bi-stopwatch-fill', title: 'Visualización de Tiempo Admin', desc: 'Calcula cuánto tiempo dedicas realmente a la gestión administrativa vs. técnica.' },
  { icon: 'bi-download', title: 'Exportación de Nómina', desc: 'Exporta en un clic los reportes para el pago de técnicos y personal.' },
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.4 })

  document.querySelectorAll('.fade-in-section, .fade-in-feature').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
/* ══ ANIMACIONES DE ENTRADA ══ */
@keyframes fadeInSection {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInFeature {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.features {
  padding: 5rem 0;
  background: var(--bg-alt);
  transition: background 0.35s;
}

.fade-in-section,
.fade-in-feature {
  opacity: 0;
}

.fade-in-section.animate-visible {
  animation: fadeInSection 0.8s ease-out forwards;
}

.fade-in-feature.animate-visible {
  animation: fadeInFeature 0.6s ease-out forwards;
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
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease;
}

.imgTecnico:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 48px var(--accent-glow);
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
  padding: 0.5rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.feature:hover {
  background: var(--border-soft);
  transform: translateX(8px);
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
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature:hover .feature-icon {
  background: var(--accent);
  color: var(--accent-text);
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 4px 16px var(--accent-glow);
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

/* ══ PANTALLAS GRANDES 2560px ══ */
@media (min-width: 2560px) {
  .container { max-width: 1600px; }
  .section-title { font-size: 3rem; }
  .feature-list { gap: 2.5rem; }
  .feature-title { font-size: 1.2rem; }
  .feature-desc { font-size: 1.1rem; }
  .feature-icon { width: 4rem; height: 4rem; font-size: 1.6rem; }
  .imgTecnico { max-width: 600px; }
}
</style>