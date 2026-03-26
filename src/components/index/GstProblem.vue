<template>
  <section class="problem">
    <div class="container">
      <h2 class="section-title fade-in-section">¿Cuál es el problema que resuelve GST?</h2>
      <div class="compare">

        <div class="card card--bad fade-in-section-left">
          <div class="card-head">
            <i class="bi bi-x-circle-fill dot dot--red"></i>
            <h3 class="card-title card-title--red">Sin GST</h3>
          </div>
          <ul class="list">
            <li v-for="(item, i) in sinGST" :key="item" :style="{ animationDelay: `${i * 100}ms` }" class="list-item-animate">
              <i class="bi bi-x-lg bullet bullet--red"></i> {{ item }}
            </li>
          </ul>
        </div>

        <div class="card card--good fade-in-section-right">
          <div class="card-head">
            <i class="bi bi-check-circle-fill dot dot--green"></i>
            <h3 class="card-title card-title--green">Con GST</h3>
          </div>
          <ul class="list">
            <li v-for="(item, i) in conGST" :key="item" :style="{ animationDelay: `${i * 100}ms` }" class="list-item-animate">
              <i class="bi bi-check2-all bullet bullet--green"></i> {{ item }}
            </li>
          </ul>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
defineProps({ darkMode: Boolean })

const sinGST = [
  'Información dispersa en cuadernos o excels.',
  'Pérdida de historial de clientes y equipos.',
  'Sin visibilidad del estado de cada orden de trabajo.',
]
const conGST = [
  'Información centralizada y accesible 24/7.',
  'Historial completo por cliente y por equipo.',
  'Monitoreo en tiempo real de cada servicio.',
]

//const sectionRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.4 })

  document.querySelectorAll('.fade-in-section, .fade-in-section-left, .fade-in-section-right').forEach(el => {
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

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInListItem {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.problem {
  padding: 5rem 0;
  background: var(--bg-alt);
  transition: background 0.35s;
}

.fade-in-section,
.fade-in-section-left,
.fade-in-section-right {
  opacity: 0;
}

.fade-in-section.animate-visible,
.fade-in-section-left.animate-visible {
  animation: fadeInSection 0.8s ease-out forwards;
}

.fade-in-section-left.animate-visible {
  animation: slideInLeft 0.8s ease-out forwards;
}

.fade-in-section-right.animate-visible {
  animation: slideInRight 0.8s ease-out forwards;
}

.list-item-animate {
  opacity: 0;
  animation: fadeInListItem 0.5s ease-out forwards;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-title {
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text);
  transition: color 0.35s;
}

.compare {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .compare {
    grid-template-columns: 1fr 1fr;
  }

}

@media (max-width: 600px) {
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.card {
  border-radius: 1rem;
  padding: 2rem;
  background: var(--bg-card);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}

.card--bad {
  border-color: rgba(239, 68, 68, 0.25);
}

.card--good {
  border-color: var(--border);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.card--bad:hover {
  border-color: rgba(239, 68, 68, 0.4);
  box-shadow: 0 12px 40px rgba(239, 68, 68, 0.15);
}

.card--good:hover {
  border-color: var(--accent);
  box-shadow: 0 12px 40px var(--accent-glow);
}

.card-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 800;
}

.card-title--red {
  color: #ef4444;
}

.card-title--green {
  color: var(--accent);
}

.dot {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.card:hover .dot {
  transform: scale(1.1) rotate(10deg);
}

.dot--red {
  background: rgba(239, 68, 68, 0.14);
  color: #ef4444;
}

.dot--green {
  background: var(--border-soft);
  color: var(--accent);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: var(--text);
  line-height: 1.55;
  transition: color 0.35s;
}

.bullet {
  flex-shrink: 0;
  font-size: 0.85rem;
  margin-top: 0.2rem;
}

.bullet--red {
  color: #ef4444;
}

.bullet--green {
  color: var(--accent);
}
/* ══ PANTALLAS GRANDES 2560px ══ */
@media (min-width: 2560px) {
  .container { max-width: 1600px; }
  .section-title { font-size: 3rem; }
  .card { padding: 3rem; }
  .card-title { font-size: 1.4rem; }
  .list li { font-size: 1.15rem; }
}
</style>