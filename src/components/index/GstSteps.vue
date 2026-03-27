<template>
  <section class="steps">
    <div class="container">
      <div class="section-header fade-in-section">
        <h2 class="section-title">¿Cómo funciona GST?</h2>
        <p class="section-sub">Un flujo de trabajo optimizado en 7 pasos clave.</p>
      </div>
      <div class="grid">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="step fade-in-step"
          :class="{ 'step--cta': step.cta }"
        >
          <template v-if="!step.cta">
            <span class="step-num">0{{ i + 1 }}</span>
            <i :class="['bi', step.icon, 'step-icon']"></i>
            <h4 class="step-title">{{ step.title }}</h4>
            <p class="step-desc">{{ step.desc }}</p>
          </template>
          <template v-else>
            <strong class="step-cta-text">Control<br>Total<br>24/7</strong>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
defineProps({ darkMode: Boolean })

const steps = [
  { icon: 'bi-person-plus-fill',      title: 'Registro',      desc: 'Ingreso rápido de clientes y equipos al sistema.' },
  { icon: 'bi-calendar-check-fill',   title: 'Agendamiento',  desc: 'Organización inteligente de citas y visitas técnicas.' },
  { icon: 'bi-clipboard2-pulse-fill', title: 'Diagnóstico',   desc: 'Evaluación precisa y registro de fallas técnicas.' },
  { icon: 'bi-graph-up-arrow',        title: 'Seguimiento',   desc: 'Monitoreo en tiempo real del estado de cada orden.' },
  { icon: 'bi-receipt-cutoff',        title: 'Cierre',        desc: 'Finalización del servicio y facturación instantánea.' },
  { icon: 'bi-megaphone-fill',        title: 'PostServicio',  desc: 'Encuestas de satisfacción automáticas vía email.' },
  { icon: 'bi-credit-card-fill',      title: 'Pago',          desc: 'Liquidación de comisiones y pagos a técnicos.' },
  { cta: true },
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible')
      } else {
        entry.target.classList.remove('animate-visible')
      }
    })
  }, { threshold: 0.4 })

  document.querySelectorAll('.fade-in-section, .fade-in-step').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
.steps {
  padding: 3rem 0;
  background: var(--bg);
  transition: background 0.35s;
}

.fade-in-section,
.fade-in-step {
  opacity: 0;
}

.fade-in-section.animate-visible {
  animation: fadeIn 0.8s ease-out forwards;
}

.fade-in-step.animate-visible {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive para móvil (≤425px) */
@media (max-width: 425px) {
  .container {
    padding: 0 1rem;
    text-align: center;
  }
  
  .grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .step {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    text-align: center;
  }
  
  .step--cta {
    max-width: 300px;
    min-height: 180px;
  }
  
  .step-num,
  .step-icon,
  .step-title,
  .step-desc {
    text-align: center;
  }
  
  .section-header {
    text-align: center;
    padding: 0 0.5rem;
  }
}

@media (min-width: 768px) {
  .steps {
    padding: 5rem 0;
  }
}

.container { 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container {
    padding: 0 1.5rem;
  }
}

.section-header { 
  text-align: center; 
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .section-header {
    margin-bottom: 3.5rem;
  }
}

.section-title {
  font-size: clamp(1.6rem, 5vw, 2.6rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--text);
  margin-bottom: 0.5rem;
  transition: color 0.35s;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .section-title {
    margin-bottom: 0.6rem;
  }
}

.section-sub { 
  color: var(--text-muted); 
  font-size: clamp(0.95rem, 3vw, 1.05rem);
  transition: color 0.35s;
  padding: 0 0.5rem;
}

/* Grid responsive */
.grid { 
  display: grid; 
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 480px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) { 
  .grid { 
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  } 
}

.step {
  border: 1px solid var(--border-soft);
  border-radius: 0.75rem;
  padding: 1.25rem;
  background: var(--bg-card);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.step:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: var(--accent);
  box-shadow: 0 12px 32px var(--accent-glow);
}

@media (min-width: 640px) {
  .step {
    border-radius: 1rem;
    padding: 1.5rem;
  }
}

.step--cta {
  background: var(--accent);
  border-color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 200px;
}

@media (min-width: 480px) {
  .step--cta {
    min-height: auto;
  }
}

.step-cta-text {
  font-size: clamp(1.2rem, 4vw, 1.35rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--accent-text);
  text-transform: uppercase;
  line-height: 1.2;
  word-break: break-word;
}

.step-num {
  display: block;
  font-size: clamp(1.8rem, 5vw, 2.4rem);
  font-weight: 900;
  color: var(--num-color);
  opacity: var(--num-opacity);
  line-height: 1;
  margin-bottom: 0.1rem;
  transition: color 0.35s, opacity 0.35s;
}

.step-icon {
  display: block;
  font-size: clamp(1.4rem, 4vw, 1.6rem);
  color: var(--accent);
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.step:hover .step-icon {
  transform: scale(1.05);
}

@media (min-width: 640px) {
  .step-icon {
    margin-bottom: 0.6rem;
  }
}

.step-title {
  font-size: clamp(0.9rem, 3vw, 0.95rem);
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.3rem;
  transition: color 0.35s;
}

@media (min-width: 640px) {
  .step-title {
    margin-bottom: 0.35rem;
  }
}

.step-desc {
  font-size: clamp(0.75rem, 2.5vw, 0.82rem);
  color: var(--text-muted);
  line-height: 1.5;
  transition: color 0.35s;
  flex-grow: 1;
}

/* Ajuste para el último step (CTA) en móvil */
.step:last-child {
  grid-column: auto;
}

@media (min-width: 480px) and (max-width: 767px) {
  .step--cta {
    grid-column: span 2;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .step--cta {
    grid-column: auto;
  }
}

.steps * {
  max-width: 100%;
  box-sizing: border-box;
}

/* ══ PANTALLAS GRANDES 2560px ══ */
@media (min-width: 2560px) {
  .container { max-width: 1600px; }
  .section-title { font-size: 3rem; }
  .section-sub { font-size: 1.2rem; }
  .step { padding: 2rem; }
  .step-num { font-size: 2.8rem; }
  .step-icon { font-size: 2rem; }
  .step-title { font-size: 1.2rem; }
  .step-desc { font-size: 1rem; }
  .step--cta { min-height: 260px; }
  .step-cta-text { font-size: 1.8rem; }
}
</style>