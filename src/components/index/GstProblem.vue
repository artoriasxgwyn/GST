<template>
  <section class="problem">
    <div class="container">
      <h2 class="section-title">¿Cuál es el problema que resuelve GST?</h2>
      <div class="compare">

        <div class="card card--bad">
          <div class="card-head">
            <i class="bi bi-x-circle-fill dot dot--red"></i>
            <h3 class="card-title card-title--red">Sin GST</h3>
          </div>
          <ul class="list">
            <li v-for="item in sinGST" :key="item">
              <i class="bi bi-x-lg bullet bullet--red"></i> {{ item }}
            </li>
          </ul>
        </div>

        <div class="card card--good">
          <div class="card-head">
            <i class="bi bi-check-circle-fill dot dot--green"></i>
            <h3 class="card-title card-title--green">Con GST</h3>
          </div>
          <ul class="list">
            <li v-for="item in conGST" :key="item">
              <i class="bi bi-check2-all bullet bullet--green"></i> {{ item }}
            </li>
          </ul>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';
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
</script>

<style scoped>
.problem {
  padding: 5rem 0;
  background: var(--bg-alt);
  transition: background 0.35s;
}
.container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.section-title {
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text);
  transition: color 0.35s;
}
.compare { display: grid; gap: 1.5rem; }
@media (min-width: 768px) { .compare { grid-template-columns: 1fr 1fr; } }

.card {
  border-radius: 1rem;
  padding: 2rem;
  background: var(--bg-card);
  transition: background 0.35s, border-color 0.35s;
}
.card--bad  { border: 1px solid rgba(239,68,68,0.25); }
.card--good { border: 1px solid var(--border); }

.card-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.card-title { font-size: 1.1rem; font-weight: 800; }
.card-title--red   { color: #ef4444; }
.card-title--green { color: var(--accent); }

.dot {
  width: 2rem; height: 2rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  flex-shrink: 0;
}
.dot--red   { background: rgba(239,68,68,0.14); color: #ef4444; }
.dot--green { background: var(--border-soft); color: var(--accent); }

.list { display: flex; flex-direction: column; gap: 0.7rem; }
.list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: var(--text);
  line-height: 1.55;
  transition: color 0.35s;
}
.bullet { flex-shrink: 0; font-size: 0.85rem; margin-top: 0.2rem; }
.bullet--red   { color: #ef4444; }
.bullet--green { color: var(--accent); }
</style>