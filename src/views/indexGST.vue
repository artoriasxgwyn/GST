<template>
  <div id="inicio">
  <main ref="mainRef">
    <GstHero     :dark-mode="darkMode" />
    <GstProblem  :dark-mode="darkMode" />
    <GstSteps    :dark-mode="darkMode" />
    <GstFeatures :dark-mode="darkMode" />
    <GstAudience :dark-mode="darkMode" />
    <GstPricing  :dark-mode="darkMode" @toggle-form="emit('toggle-form')" />
   
  </main>
  </div>

</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import GstHero      from '../components/index/GstHero.vue'
import GstProblem   from '../components/index/GstProblem.vue'
import GstSteps     from '../components/index/GstSteps.vue'
import GstFeatures  from '../components/index/GstFeatures.vue'
import GstAudience  from '../components/index/GstAudience.vue'
import GstPricing   from '../components/index/GstPricing.vue'


defineProps({ darkMode: Boolean })
const emit = defineEmits(['toggle-form'])

const mainRef = ref(null)

onMounted(() => {
  const thresholds = [
    0.3,  // 0 - GstHero
    0.2,  // 1 - GstProblem
    0.15, // 2 - GstSteps
    0.15, // 3 - GstFeatures
    0.2,  // 4 - GstAudience
    0.05, // 5 - GstPricing
    0.1,  // 6 - GstFooter
  ]

  mainRef.value.querySelectorAll(':scope > *').forEach((el, i) => {
    el.style.opacity = '0'
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in-bottom')
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: thresholds[i] ?? 0.2 })
    obs.observe(el)
  })
})
</script>

<style scoped>
main { width: 100%; overflow-x: hidden; display: flex; flex-direction: column; }
main > section { width: 100%; padding-left: 1rem; padding-right: 1rem; box-sizing: border-box; }
@media (min-width: 640px)  { main > section { padding-left: 1.5rem; padding-right: 1.5rem; } }
@media (min-width: 1024px) { main > section { padding-left: 2rem; padding-right: 2rem; } }
main > * { opacity: 0; }
</style>