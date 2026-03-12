<template>
  <section class="contact">
    <div class="container">

      <!-- Header -->
      <div class="contact-header">
        <h2 class="section-title">¿Listo para empezar?</h2>
        <p class="section-sub">Cuéntanos sobre tu taller y te contactamos en menos de 24 horas.</p>
      </div>

      <div class="contact-wrap">

        <!-- Info lateral -->
        <div class="contact-info">
          <div class="info-item" v-for="item in infoItems" :key="item.label">
            <div class="info-icon"><i :class="['bi', item.icon]"></i></div>
            <div>
              <p class="info-label">{{ item.label }}</p>
              <p class="info-value">{{ item.value }}</p>
            </div>
          </div>
          <div class="info-divider"></div>
          <p class="info-note">
            <i class="bi bi-shield-check"></i>
            Tus datos están seguros. No compartimos tu información con terceros.
          </p>
        </div>

        <!-- Formulario -->
        <form
          class="contact-form"
          action="https://checkout.wompi.co/p/"
          method="GET"
          @submit="handleSubmit"
          novalidate
        >
          <!-- ══ CAMPOS WOMPI (hidden) ══ -->
          <input type="hidden" name="public-key"                  value="pub_prod_cek7gchp2ZG6NnTNJQOuupFL8SbNSU6W" />
          <input type="hidden" name="currency"                    value="COP" />
          <input type="hidden" name="amount-in-cents"             :value="amountInCents" />
          <input type="hidden" name="reference"                   :value="referencia" />
          <input type="hidden" name="signature:integrity"         value="prod_integrity_ifs70HfUZb6Y1WvBxUqO1VTwe06e8xdb" />
          <input type="hidden" name="redirect-url"                value="https://tusitio.com/gracias" />
          <input type="hidden" name="customer-data:email"         :value="form.email" />
          <input type="hidden" name="customer-data:full-name"     :value="form.nombre" />
          <input type="hidden" name="customer-data:phone-number"  :value="form.telefono" />

          <!-- Primera fila: Nombre y Empresa -->
          <div class="form-row">
            <div class="form-group" :class="{ error: errors.nombre, success: touched.nombre && !errors.nombre }">
              <label for="nombre">
                <i class="bi bi-person"></i> Nombre completo del representante
              </label>
              <input id="nombre" v-model="form.nombre" type="text" placeholder="Ej: Carlos Martínez" @blur="validate('nombre')" />
              <span class="field-msg" v-if="errors.nombre">{{ errors.nombre }}</span>
            </div>

            <div class="form-group" :class="{ error: errors.empresa, success: touched.empresa && !errors.empresa }">
              <label for="empresa">
                <i class="bi bi-building"></i> Nombre de la empresa
              </label>
              <input id="empresa" v-model="form.empresa" type="text" placeholder="Ej: TechService S.A.S" @blur="validate('empresa')" />
              <span class="field-msg" v-if="errors.empresa">{{ errors.empresa }}</span>
            </div>
          </div>
          
          <!-- Segunda fila: Email y Teléfono -->
          <div class="form-row">
            <div class="form-group" :class="{ error: errors.email, success: touched.email && !errors.email }">
              <label for="email">
                <i class="bi bi-envelope"></i> Correo electrónico
              </label>
              <input id="email" v-model="form.email" type="email" placeholder="correo@ejemplo.com" @blur="validate('email')" />
              <span class="field-msg" v-if="errors.email">{{ errors.email }}</span>
            </div>

            <div class="form-group" :class="{ error: errors.telefono, success: touched.telefono && !errors.telefono }">
              <label for="telefono">
                <i class="bi bi-telephone"></i> Teléfono / WhatsApp
              </label>
              <input id="telefono" v-model="form.telefono" type="tel" placeholder="+57 300 000 0000" @blur="validate('telefono')" />
              <span class="field-msg" v-if="errors.telefono">{{ errors.telefono }}</span>
            </div>
          </div>
          
          <!-- Tercera fila: NIT y Contraseña (CORREGIDA) -->
          <div class="form-row">
            <!-- Campo NIT con validación -->
            <div class="form-group" :class="{ error: errors.nit, success: touched.nit && !errors.nit }">
              <label for="nit">
                <i class="bi bi-building"></i> NIT de la empresa
              </label>
              <input 
                id="nit" 
                v-model="form.nit" 
                type="text" 
                placeholder="900.123.456-7" 
                @blur="validate('nit')"
              />
              <span class="field-msg" v-if="errors.nit">{{ errors.nit }}</span>
            </div>

            <!-- Campo Contraseña (sin validación) -->
            <div class="form-group">
              <label for="password">
                <i class="bi bi-lock"></i> Contraseña
              </label>
              <input 
                id="password" 
                v-model="form.contra" 
                type="password" 
                placeholder="••••••••" 
              />
              <!-- Sin mensaje de error porque no tiene validación -->
            </div>
          </div>

          <!-- Plan de interés -->
          <div class="form-group" :class="{ error: errors.plan, success: touched.plan && !errors.plan }">
            <label for="plan">
              <i class="bi bi-grid"></i> Plan de interés
            </label>
            <div class="select-wrap">
              <select id="plan" v-model="form.plan" @blur="validate('plan')">
                <option value="" disabled>Selecciona un plan...</option>
                <option value="basic">Plan Basic – Integral ($5/mes)</option>
                <option value="start">Plan Start ($19/mes)</option>
                <option value="growth">Plan Growth ($49/mes)</option>
                <option value="business">Plan Business ($99/mes)</option>
                <option value="enterprise">Plan Enterprise ($179/mes)</option>
                <option value="duda">Aún tengo dudas</option>
              </select>
              <i class="bi bi-chevron-down select-icon"></i>
            </div>
            <span class="field-msg" v-if="errors.plan">{{ errors.plan }}</span>
          </div>
          <div class="form-group" :class="{ error: errors.plan, success: touched.plan && !errors.plan }">
            <label for="plan">
              <i class="bi bi-grid"></i> Plan de expansion de almacenamiento
            </label>
            <div class="select-wrap">
              <select id="plan" v-model="form.plan" @blur="validate('plan')">
                <option value="" disabled>Selecciona un plan...</option>
                <option value="basic">1T ($10.24/mes)</option>
                <option value="start">2T ($20.48/mes)</option>
                <option value="growth">3T ($30.72/mes)</option>
                <option value="business">4T ($40.96/mes)</option>
                <option value="enterprise">5T ($51.20/mes)</option>
                <option value="duda">Aún tengo dudas</option>
              </select>
              <i class="bi bi-chevron-down select-icon"></i>
            </div>
            <span class="field-msg" v-if="errors.plan">{{ errors.plan }}</span>
          </div>

          <!-- Mensaje (opcional) -->
          <div class="form-group" :class="{ error: errors.mensaje, success: touched.mensaje && !errors.mensaje }">
            <label for="mensaje">
              <i class="bi bi-chat-text"></i> Mensaje <span class="optional">(opcional)</span>
            </label>
            <textarea id="mensaje" v-model="form.mensaje" rows="4" placeholder="Cuéntanos cuántos técnicos tienen, qué necesitan gestionar..." @blur="validate('mensaje')"></textarea>
            <span class="char-count">{{ form.mensaje.length }} / 500</span>
          </div>

          <!-- Submit -->
          <button type="submit" class="btn-submit" :class="{ loading: submitting }" :disabled="submitting">
            <span v-if="!submitting && !submitted">
              <i class="bi bi-send-fill"></i> Enviar mensaje
            </span>
            <span v-else-if="submitting">
              <i class="bi bi-arrow-repeat spin"></i> Enviando...
            </span>
            <span v-else>
              <i class="bi bi-check-circle-fill"></i> ¡Mensaje enviado!
            </span>
          </button>

          <!-- Feedback -->
          <div class="form-success" v-if="submitted">
            <i class="bi bi-patch-check-fill"></i>
            <div>
              <strong>¡Gracias, {{ form.nombre }}!</strong>
              <p>Te contactaremos pronto al correo <em>{{ form.email }}</em>.</p>
            </div>
          </div>

        </form>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, defineProps } from 'vue'
defineProps({ darkMode: Boolean })

const form = reactive({
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  nit: '',        // ✅ Campo NIT agregado
  contra: '',     // ✅ Campo contraseña (sin validación)
  plan: '',
  mensaje: '',
})

const errors   = reactive({})
const touched  = reactive({})
const submitting = ref(false)
const submitted  = ref(false)

// ══ WOMPI: monto según plan ══
const planPrices = {
  basic:      500,
  start:      1900,
  growth:     4900,
  business:   9900,
  enterprise: 17900,
  duda:       0,
}
const amountInCents = computed(() => (planPrices[form.plan] ?? 0) * 100)
const referencia    = computed(() => `GST-${form.plan}-${Date.now()}`)

// ══ REGLAS DE VALIDACIÓN ══
const rules = {
  nombre:   v => !v.trim() ? 'El nombre es obligatorio.' : v.trim().length < 3 ? 'Mínimo 3 caracteres.' : '',
  empresa:  v => !v.trim() ? 'El nombre del taller es obligatorio.' : '',
  email:    v => !v.trim() ? 'El correo es obligatorio.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Correo no válido.' : '',
  telefono: v => !v.trim() ? 'El teléfono es obligatorio.' : '',
  
  // ✅ REGLA DEL NIT (SOLO LONGITUD)
  nit: v => {
    if (!v.trim()) return 'El NIT es obligatorio.'
    
    // Limpiar puntos, guiones y espacios para contar solo dígitos
    const nitLimpio = v.replace(/[.\-\s]/g, '')
    
    if (nitLimpio.length < 9) return 'El NIT debe tener al menos 9 dígitos.'
    if (nitLimpio.length > 12) return 'El NIT no puede tener más de 12 dígitos.'
    
    return '' // ✅ Válido
  },
  
  plan:     v => !v ? 'Selecciona un plan.' : '',
  mensaje:  v => v.length > 500 ? 'Máximo 500 caracteres.' : '',
  
  // contra: No tiene regla de validación
}

const validate = (field) => {
  touched[field] = true
  errors[field] = rules[field]?.(form[field]) ?? ''
}

const validateAll = () => {
  Object.keys(rules).forEach(validate)
  return !Object.values(errors).some(e => e)
}

const handleSubmit = (e) => {
  if (!validateAll()) {
    e.preventDefault()
    return
  }
  // Si es válido deja que el form haga GET a Wompi
}

const infoItems = [
  { icon: 'bi-whatsapp',      label: 'WhatsApp directo',    value: '+57 301 573 9461' },
  { icon: 'bi-envelope-fill', label: 'Correo',              value: 'contacto@gst.com' },
  { icon: 'bi-clock-fill',    label: 'Horario de atención', value: 'Lun – Vie, 8am – 6pm' },
  { icon: 'bi-geo-alt-fill',  label: 'Ubicación',           value: 'Colombia · Servicio nacional' },
]
</script>

<style scoped>
/* (Todos tus estilos se quedan exactamente igual) */
.contact { padding: 5rem 0; background: var(--bg); transition: background 0.35s; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.contact-header { text-align: center; margin-bottom: 3.5rem; }
.section-title { font-size: clamp(1.6rem, 3.5vw, 2.6rem); font-weight: 900; letter-spacing: -0.03em; color: var(--text); margin-bottom: 0.75rem; transition: color 0.35s; }
.section-sub { color: var(--text-muted); font-size: 1.05rem; transition: color 0.35s; }
.contact-wrap { display: grid; grid-template-columns: 1fr 2fr; gap: 2.5rem; align-items: start; }
@media (max-width: 768px) { .contact-wrap { grid-template-columns: 1fr; } }

.contact-info { background: var(--bg-card); border: 1px solid var(--accent); border-radius: 1.5rem; padding: 2rem 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; transition: background 0.35s; }
.info-item { display: flex; align-items: flex-start; gap: 1rem; }
.info-icon { width: 2.5rem; height: 2.5rem; background: var(--border-soft); border: 1px solid var(--border); border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; color: var(--accent); font-size: 1.1rem; flex-shrink: 0; transition: background 0.35s; }
.info-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.15rem; transition: color 0.35s; }
.info-value { font-size: 0.95rem; color: var(--text); font-weight: 500; transition: color 0.35s; }
.info-divider { height: 1px; background: var(--border-soft); }
.info-note { font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: flex-start; gap: 0.5rem; line-height: 1.5; transition: color 0.35s; }
.info-note i { color: var(--accent); font-size: 1rem; flex-shrink: 0; margin-top: 0.1rem; }

.contact-form { background: var(--bg-card); border: 1px solid var(--accent); border-radius: 1.5rem; padding: 2.5rem; display: flex; flex-direction: column; gap: 1.25rem; transition: background 0.35s; }
@media (max-width: 480px) { .contact-form { padding: 1.5rem 1rem; } }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
@media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; position: relative; }
label { font-size: 0.85rem; font-weight: 600; color: var(--text-soft); display: flex; align-items: center; gap: 0.4rem; transition: color 0.35s; }
label i { color: var(--accent); font-size: 0.9rem; }
.optional { font-weight: 400; color: var(--text-muted); font-size: 0.8rem; }
input, textarea, select { width: 100%; background: var(--bg); border: 1.5px solid var(--border-soft); border-radius: 0.75rem; padding: 0.75rem 1rem; font-size: 0.95rem; color: var(--text); font-family: inherit; outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.35s, color 0.35s; resize: none; appearance: none; -webkit-appearance: none; }
input::placeholder, textarea::placeholder { color: var(--text-muted); opacity: 0.7; }
input:focus, textarea:focus, select:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
.form-group.error input, .form-group.error textarea, .form-group.error select { border-color: var(--error); box-shadow: 0 0 0 3px var(--error-bg); }
.form-group.success input, .form-group.success textarea, .form-group.success select { border-color: var(--success); }
.field-msg { font-size: 0.78rem; color: var(--error); display: flex; align-items: center; gap: 0.3rem; }
.field-msg::before { content: '⚠'; font-size: 0.7rem; }
.select-wrap { position: relative; }
.select-wrap select { padding-right: 2.5rem; cursor: pointer; }
.select-icon { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: var(--accent); font-size: 0.85rem; pointer-events: none; }
.char-count { font-size: 0.75rem; color: var(--text-muted); text-align: right; margin-top: -0.2rem; transition: color 0.35s; }

.btn-submit { width: 100%; padding: 0.9rem; background: var(--accent); color: var(--accent-text); border: none; border-radius: 0.75rem; font-size: 1rem; font-weight: 700; font-family: inherit; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 0 18px var(--accent-glow); transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s; margin-top: 0.5rem; }
.btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 0 28px var(--accent-glow); }
.btn-submit:disabled { opacity: 0.75; cursor: not-allowed; }
.spin { display: inline-block; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.form-success { display: flex; align-items: flex-start; gap: 1rem; background: var(--success-bg); border: 1px solid var(--success); border-radius: 0.75rem; padding: 1rem 1.25rem; color: var(--text); font-size: 0.92rem; transition: background 0.35s; }
.form-success i { color: var(--success); font-size: 1.5rem; flex-shrink: 0; }
.form-success strong { display: block; margin-bottom: 0.2rem; color: var(--success); }
.form-success p { color: var(--text-muted); line-height: 1.5; }
.form-success em { color: var(--accent); font-style: normal; font-weight: 600; }
</style>