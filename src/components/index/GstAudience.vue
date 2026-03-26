<template>
  <section class="audience">
    <div class="container">
      <h2 class="section-title fade-in-section">¿Para quién es GST?</h2>
      <div class="grid">
        <div v-for="(item, i) in audience" :key="item.title" class="item fade-in-item" :style="{ animationDelay: `${i * 150}ms` }">
          <div class="icon-wrap">
            <i :class="['bi', item.icon]"></i>
          </div>
          <h4 class="label">{{ item.title }}</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
defineProps({ darkMode: Boolean })
const audience = [
  { icon: 'bi-tools',       title: 'Talleres'       },
  { icon: 'bi-person-gear', title: 'Independientes' },
  { icon: 'bi-headset',     title: 'Post-Venta'     },
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

  document.querySelectorAll('.fade-in-section, .fade-in-item').forEach(el => {
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.audience {
  padding: 3rem 0;
  background: var(--bg);
  text-align: center;
  transition: background 0.35s;
}

.fade-in-section,
.fade-in-item {
  opacity: 0;
}

.fade-in-section.animate-visible {
  animation: fadeInSection 0.8s ease-out forwards;
}

.fade-in-item.animate-visible {
  animation: scaleIn 0.6s ease-out forwards;
}

@media (min-width: 768px) {
  .audience {
    padding: 5rem 0;
  }
}

.container { 
  max-width: 700px; 
  margin: 0 auto; 
  padding: 0 1rem; /* Reducido en móvil */
}

@media (min-width: 640px) {
  .container {
    padding: 0 1.5rem;
  }
}

.section-title {
  font-size: clamp(1.6rem, 5vw, 2.6rem);
  font-weight: 900; 
  letter-spacing: -0.03em;
  color: var(--text); 
  margin-bottom: 2rem; /* Reducido en móvil */
  transition: color 0.35s;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .section-title {
    margin-bottom: 3rem;
  }
}

/* Grid responsive */
.grid { 
  display: grid; 
  grid-template-columns: repeat(3, 1fr); /* 1 columna en móvil */
  gap: 1.5rem; /* Gap reducido en móvil */
}

.item { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 0.75rem; /* Gap reducido en móvil */
  width: 100%;
}

@media (min-width: 640px) {
  .item {
    gap: 1rem;
  }
}

.icon-wrap {
  width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
  background: var(--border-soft);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: var(--accent);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.icon-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.item:hover .icon-wrap::after {
  opacity: 1;
}

.item:hover .icon-wrap {
  background: var(--accent);
  color: var(--accent-text);
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 8px 24px var(--accent-glow);
  border-color: var(--accent);
}

@media (min-width: 480px) {
  .icon-wrap {
    width: 4.5rem;
    height: 4.5rem;
    font-size: 2rem;
  }
}

@media (min-width: 640px) {
  .icon-wrap {
    width: 5rem;
    height: 5rem;
    border-radius: 1rem;
    font-size: 2.2rem;
  }
}

.label { 
  font-size: clamp(0.95rem, 3vw, 1.05rem); /* Tamaño fluido */
  font-weight: 700; 
  color: var(--text); 
  transition: color 0.35s;
}

/* Asegurar que los iconos de Bootstrap sean responsivos */
.bi {
  display: inline-block;
  line-height: 1;
}

/* Ajuste para móviles muy pequeños */
@media (max-width: 360px) {
  .icon-wrap {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.6rem;
  }
  
  .label {
    font-size: 0.9rem;
  }
}

/* Asegurar que todo sea responsive */
.audience * {
  max-width: 100%;
  box-sizing: border-box;
}

/* ══ PANTALLAS GRANDES 2560px ══ */
@media (min-width: 2560px) {
  .container { max-width: 1000px; }
  .section-title { font-size: 3rem; }
  .icon-wrap { width: 6rem; height: 6rem; font-size: 2.5rem; border-radius: 1.2rem; }
  .label { font-size: 1.3rem; }
  .grid { gap: 2.5rem; }
}
</style>