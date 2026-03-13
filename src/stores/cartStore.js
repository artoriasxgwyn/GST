import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    plan: null,        // Solo 1 plan GST
    storage: null,     // Solo 1 plan de almacenamiento
  }),

  getters: {
    totalMonthly: (state) => {
      let total = 0
      if (state.plan)    total += state.plan.price  * state.plan.months
      if (state.storage) total += state.storage.price * state.storage.months
      return total
    },
    itemCount: (state) => {
      return (state.plan ? 1 : 0) + (state.storage ? 1 : 0)
    },
    whatsappMessage: (state) => {
      let lines = ['Hola, estoy interesado en contratar los siguientes planes de GST:']
      lines.push('')
      if (state.plan) {
        lines.push(`📦 *Plan GST:* ${state.plan.name}`)
        lines.push(`   • Precio: $${state.plan.price} USD/mes`)
        lines.push(`   • Meses: ${state.plan.months}`)
        lines.push(`   • Subtotal: $${(state.plan.price * state.plan.months).toFixed(2)} USD`)
      }
      if (state.storage) {
        lines.push('')
        lines.push(`💾 *Almacenamiento adicional:* ${state.storage.size} TB`)
        lines.push(`   • Precio: $${state.storage.price} USD/mes`)
        lines.push(`   • Meses: ${state.storage.months}`)
        lines.push(`   • Subtotal: $${(state.storage.price * state.storage.months).toFixed(2)} USD`)
      }
      lines.push('')
      lines.push(`💰 *Total: $${((state.plan ? state.plan.price * state.plan.months : 0) + (state.storage ? state.storage.price * state.storage.months : 0)).toFixed(2)} USD*`)
      lines.push('')
      lines.push('Por favor, contáctenme para continuar con el proceso.')
      return encodeURIComponent(lines.join('\n'))
    }
  },

  actions: {
    setPlan(plan) {
      // plan: { name, price, rawPrice, icon, features, months }
      this.plan = { ...plan, months: plan.months ?? 1 }
      this._persist()
    },
    setStorage(storage) {
      // storage: { size, price, months }
      this.storage = { ...storage, months: storage.months ?? 1 }
      this._persist()
    },
    updatePlanMonths(months) {
      if (this.plan) { this.plan.months = months; this._persist() }
    },
    updateStorageMonths(months) {
      if (this.storage) { this.storage.months = months; this._persist() }
    },
    removePlan() {
      this.plan = null
      this._persist()
    },
    removeStorage() {
      this.storage = null
      this._persist()
    },
    clearCart() {
      this.plan = null
      this.storage = null
      this._persist()
    },
    loadFromStorage() {
      try {
        const saved = localStorage.getItem('gst-cart')
        if (saved) {
          const data = JSON.parse(saved)
          this.plan    = data.plan    ?? null
          this.storage = data.storage ?? null
        }
      } catch (e) { console.error('Error cargando carrito:', e) }
    },
    _persist() {
      try {
        localStorage.setItem('gst-cart', JSON.stringify({ plan: this.plan, storage: this.storage }))
      } catch (e) { console.error('Error guardando carrito:', e) }
    }
  }
})