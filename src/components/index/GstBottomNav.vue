<template>
  <nav class="bottom-nav">
    <a
      v-for="item in navItems" :key="item.icon"
      href="#"
      class="nav-item"
      :class="{ 'nav-item--active': item.active }"
    ><i :class="['bi', item.icon]"></i></a>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({ darkMode: Boolean })
const navItems = [
  { icon: 'bi-house-door-fill',  active: true  },
  { icon: 'bi-bar-chart-fill',   active: false },
  { icon: 'bi-credit-card-fill', active: false },
  { icon: 'bi-person-fill',      active: false },
]
</script>

<style scoped>
.bottom-nav {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: var(--header-bg);
  backdrop-filter: blur(14px);
  border-top: 1px solid var(--border);
  display: flex; justify-content: space-around;
  padding: 0.6rem 0; z-index: 100;
  transition: background 0.35s, border-color 0.35s;
}
@media (min-width: 768px) { .bottom-nav { display: none; } }

.nav-item {
  font-size: 1.35rem; text-decoration: none;
  display: flex; align-items: center; justify-content: center;
  width: 2.75rem; height: 2.75rem; border-radius: 0.5rem;
  color: var(--text-muted);
  transition: background 0.2s, color 0.2s;
}
.nav-item:hover { background: var(--border-soft); }
.nav-item--active { color: var(--accent); }
</style>