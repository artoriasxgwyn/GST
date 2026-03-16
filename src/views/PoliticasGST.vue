<template>
  <div :class="['app', darkMode ? 'dark' : 'light']" id="start">
    <section class="privacy">
      <div class="container">

        <!-- Header -->
        <div class="policy-header anim-item">
          <div class="badge">
            <i class="bi bi-shield-lock-fill"></i>
            Privacidad & Confidencialidad
          </div>
          <h1 class="policy-title">Declaración de Privacidad<br />y Confidencialidad</h1>
          <p class="policy-meta">
            <i class="bi bi-building"></i> Sistema GST – Gestión Servicio Técnico
            <span class="dot">·</span>
            <i class="bi bi-calendar3"></i> Última actualización: Marzo 2026
          </p>
        </div>

        <!-- Intro -->
        <div class="intro-card anim-item">
          <p>
            El sistema <strong>GST – Gestión Servicio Técnico</strong> es una plataforma tecnológica
            desarrollada y operada por <strong>OPERACION SISTEMICA SAS</strong>, identificada con
            NIT <strong>901227220-8</strong>, diseñada para la administración y gestión de procesos
            relacionados con servicios técnicos.
          </p>
          <p>La plataforma permite a sus usuarios gestionar información asociada a:</p>
          <div class="features-grid">
            <div class="feature-pill"><i class="bi bi-people-fill"></i> Clientes</div>
            <div class="feature-pill"><i class="bi bi-pc-display"></i> Productos y equipos</div>
            <div class="feature-pill"><i class="bi bi-tools"></i> Repuestos</div>
            <div class="feature-pill"><i class="bi bi-receipt"></i> Ventas</div>
            <div class="feature-pill"><i class="bi bi-clipboard2-check-fill"></i> Órdenes de servicio</div>
            <div class="feature-pill"><i class="bi bi-file-earmark-text-fill"></i> Reportes técnicos y diagnósticos</div>
          </div>
        </div>

        <!-- Sections -->
        <div class="sections">
          <div class="section-card">
            <div class="section-icon"><i class="bi bi-lock-fill"></i></div>
            <div class="section-body">
              <h2 class="section-title">Confidencialidad de la Información</h2>
              <p>Toda la información registrada dentro del sistema GST es <strong>propiedad exclusiva del cliente</strong> que la ingresa y gestiona dentro de la plataforma.</p>
              <p>OPERACION SISTEMICA SAS mantiene un principio estricto de confidencialidad sobre los datos almacenados dentro del sistema y <strong>no accede, utiliza ni divulga</strong> la información registrada por los clientes, salvo cuando sea estrictamente necesario para garantizar el correcto funcionamiento técnico de la plataforma, brindar soporte solicitado por el cliente o cuando exista requerimiento legal por parte de una autoridad competente.</p>
            </div>
          </div>

          <div class="section-card">
            <div class="section-icon"><i class="bi bi-shield-check"></i></div>
            <div class="section-body">
              <h2 class="section-title">Seguridad y Protección de la Información</h2>
              <p>El sistema GST implementa <strong>medidas técnicas, administrativas y de seguridad informática</strong> destinadas a proteger la información almacenada en la plataforma.</p>
              <ul class="security-list">
                <li><i class="bi bi-check-circle-fill"></i> Toda la información se mantiene <strong>cifrada</strong></li>
                <li><i class="bi bi-check-circle-fill"></i> Acceso protegido mediante <strong>autenticación segura y control de usuarios</strong></li>
                <li><i class="bi bi-check-circle-fill"></i> Arquitectura bajo principio de <strong>aislamiento de datos por cuenta</strong></li>
                <li><i class="bi bi-check-circle-fill"></i> Información <strong>no accesible desde el exterior</strong> ni por terceros no autorizados</li>
              </ul>
              <p style="margin-top: 0.75rem;">Estas medidas buscan prevenir accesos no autorizados, pérdida, alteración o uso indebido de la información almacenada en la plataforma.</p>
            </div>
          </div>

          <div class="section-card">
            <div class="section-icon"><i class="bi bi-person-lock"></i></div>
            <div class="section-body">
              <h2 class="section-title">Acceso a la Información</h2>
              <p>La visualización, gestión y modificación de la información almacenada en el sistema solo puede realizarse mediante la <strong>conexión directa y autenticada</strong> de los usuarios autorizados por cada cliente.</p>
              <p>Cada cliente es responsable de:</p>
              <ul class="security-list">
                <li><i class="bi bi-check-circle-fill"></i> La administración de sus <strong>credenciales de acceso</strong></li>
                <li><i class="bi bi-check-circle-fill"></i> La gestión de los <strong>permisos asignados</strong> a sus usuarios</li>
                <li><i class="bi bi-check-circle-fill"></i> El <strong>uso adecuado del sistema</strong> dentro de su organización</li>
              </ul>
            </div>
          </div>

          <div class="section-card">
            <div class="section-icon"><i class="bi bi-file-earmark-person-fill"></i></div>
            <div class="section-body">
              <h2 class="section-title">Tratamiento de Datos Personales</h2>
              <p>En caso de que dentro del sistema se almacenen datos personales de clientes, usuarios o terceros, dichos datos serán tratados conforme a la <strong>Ley 1581 de 2012</strong> y demás normas colombianas aplicables sobre protección de datos personales.</p>
              <p>OPERACION SISTEMICA SAS actúa como <strong>encargado del tratamiento de datos</strong> cuando estos son almacenados por los clientes dentro del sistema. El tratamiento se limita exclusivamente a:</p>
              <ul class="security-list">
                <li><i class="bi bi-check-circle-fill"></i> Garantizar el <strong>funcionamiento del sistema</strong></li>
                <li><i class="bi bi-check-circle-fill"></i> Permitir la <strong>gestión operativa</strong> del servicio contratado</li>
                <li><i class="bi bi-check-circle-fill"></i> Proporcionar <strong>soporte técnico</strong> cuando sea requerido</li>
              </ul>
            </div>
          </div>

          <div class="section-card">
            <div class="section-icon"><i class="bi bi-person-check-fill"></i></div>
            <div class="section-body">
              <h2 class="section-title">Derechos de los Titulares de Datos</h2>
              <p>De acuerdo con la legislación colombiana sobre protección de datos personales, los titulares de los datos tienen derecho a:</p>
              <ul class="security-list">
                <li><i class="bi bi-check-circle-fill"></i> <strong>Conocer</strong> los datos personales que se encuentren almacenados</li>
                <li><i class="bi bi-check-circle-fill"></i> Solicitar la <strong>actualización o corrección</strong> de su información</li>
                <li><i class="bi bi-check-circle-fill"></i> Solicitar la <strong>eliminación</strong> de sus datos cuando corresponda</li>
                <li><i class="bi bi-check-circle-fill"></i> <strong>Revocar la autorización</strong> otorgada para el tratamiento de datos</li>
                <li><i class="bi bi-check-circle-fill"></i> Presentar <strong>consultas o reclamos</strong> relacionados con sus datos personales</li>
              </ul>
            </div>
          </div>

          <div class="section-card">
            <div class="section-icon"><i class="bi bi-chat-dots-fill"></i></div>
            <div class="section-body">
              <h2 class="section-title">Canal de Atención para Solicitudes de Datos</h2>
              <p>Para consultas, solicitudes o reclamos relacionados con el tratamiento de datos personales, los titulares podrán comunicarse con:</p>
              <div class="contact-block">
                <div class="contact-row"><i class="bi bi-building"></i> <strong>OPERACION SISTEMICA SAS</strong></div>
                <div class="contact-row"><i class="bi bi-envelope-fill"></i> operacionsitemica@gmail.com</div>
              </div>
              <p style="margin-top: 0.75rem;">Las solicitudes serán atendidas conforme a los plazos establecidos en la legislación colombiana.</p>
            </div>
          </div>

          <div class="section-card">
            <div class="section-icon"><i class="bi bi-info-circle-fill"></i></div>
            <div class="section-body">
              <h2 class="section-title">Alcance</h2>
              <p>Esta declaración aplica exclusivamente al funcionamiento del sistema <strong>GST – Gestión Servicio Técnico</strong> y a la información administrada dentro de dicha plataforma.</p>
            </div>
          </div>

          <div class="section-card section-card--last">
            <div class="section-icon"><i class="bi bi-pencil-square"></i></div>
            <div class="section-body">
              <h2 class="section-title">Modificaciones de la Política</h2>
              <p>OPERACION SISTEMICA SAS se reserva el derecho de <strong>modificar o actualizar</strong> la presente política cuando sea necesario para mejorar el funcionamiento del sistema, adaptarse a cambios normativos o actualizar prácticas de seguridad.</p>
              <p>Las modificaciones entrarán en vigencia desde su <strong>publicación en la plataforma</strong>.</p>
            </div>
          </div>
        </div>

        <!-- Footer note -->
        <div class="policy-footer anim-item">
          <i class="bi bi-building"></i>
          <span>OPERACION SISTEMICA SAS · NIT 901227220-8 · © 2019-2026 GST. Todos los derechos reservados.</span>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { defineProps, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

defineProps({ darkMode: Boolean })

const route = useRoute()

onMounted(() => {
  nextTick(() => {
    // Scroll to hash
    if (route.hash) {
      const id = route.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
    }

    // Observer para anim-item (slide-in-top)
    const animItems = document.querySelectorAll('.anim-item')
    const topObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in-top')
          topObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.3 })
    animItems.forEach(el => topObserver.observe(el))

    // Observer para section-card (slide-in-fwd-center)
    const cards = document.querySelectorAll('.section-card')
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in-fwd-center')
          cardObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.3 })
    cards.forEach(el => cardObserver.observe(el))
  })
})
</script>

<style scoped>
.privacy {
  min-height: 100vh;
  background: var(--bg);
  padding: 5rem 0 4rem;
  transition: background 0.35s;
}

.container {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ══ HEADER ══ */
.policy-header { text-align: center; margin-bottom: 3rem; }

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: var(--border-soft);
  border: 1px solid var(--border);
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
}

.policy-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.15;
  color: var(--text);
  margin-bottom: 1rem;
  transition: color 0.35s;
}

.policy-meta {
  font-size: 0.88rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  transition: color 0.35s;
}

.policy-meta i { color: var(--accent); }
.dot { opacity: 0.4; }

/* ══ INTRO CARD ══ */
.intro-card {
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  border-radius: 1.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  transition: background 0.35s, border-color 0.35s;
}

.intro-card p {
  font-size: 0.95rem;
  color: var(--text);
  line-height: 1.7;
  margin-bottom: 1rem;
  transition: color 0.35s;
}

.intro-card p:last-of-type { margin-bottom: 1.25rem; }

.features-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; }

.feature-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.82rem;
  font-weight: 500;
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  transition: background 0.35s, border-color 0.35s, color 0.35s;
}

.feature-pill i { color: var(--accent); font-size: 0.85rem; }

/* ══ SECTIONS ══ */
.sections {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
  perspective: 1400px;
}

.section-card {
  display: flex;
  gap: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  border-radius: 1.25rem;
  padding: 1.75rem;
  opacity: 0;
  transition: background 0.35s, border-color 0.35s;
}

.section-card--last {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent), 0 4px 24px var(--accent-glow);
}

.section-icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  background: var(--border-soft);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: var(--accent);
  transition: background 0.35s, border-color 0.35s;
}

.section-body { flex: 1; }

.section-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
  transition: color 0.35s;
}

.section-body p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 0.75rem;
  transition: color 0.35s;
}

.section-body p:last-child { margin-bottom: 0; }

.security-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.security-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
  transition: color 0.35s;
}

.security-list li i { color: var(--accent); font-size: 0.95rem; flex-shrink: 0; margin-top: 0.1rem; }

/* ══ CONTACT BLOCK ══ */
.contact-block {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text);
  transition: color 0.35s;
}

.contact-row i { color: var(--accent); }

/* ══ FOOTER NOTE ══ */
.policy-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: var(--text-muted);
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-light);
  transition: color 0.35s, border-color 0.35s;
  opacity: 0;
}

.policy-footer i { color: var(--accent); }

/* ══ ANIMACIONES ══ */

/* Oculto hasta que el observer lo active */
.anim-item { opacity: 0; }

.slide-in-top {
  opacity: 1 !important;
  -webkit-animation: slide-in-top 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-top 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.slide-in-fwd-center {
  opacity: 1 !important;
  -webkit-animation: slide-in-fwd-center 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-fwd-center 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-top {
  0% { -webkit-transform: translateY(-60px); transform: translateY(-60px); opacity: 0; }
  100% { -webkit-transform: translateY(0); transform: translateY(0); opacity: 1; }
}
@keyframes slide-in-top {
  0% { -webkit-transform: translateY(-60px); transform: translateY(-60px); opacity: 0; }
  100% { -webkit-transform: translateY(0); transform: translateY(0); opacity: 1; }
}

@-webkit-keyframes slide-in-fwd-center {
  0% { -webkit-transform: translateZ(-1400px); transform: translateZ(-1400px); opacity: 0; }
  100% { -webkit-transform: translateZ(0); transform: translateZ(0); opacity: 1; }
}
@keyframes slide-in-fwd-center {
  0% { -webkit-transform: translateZ(-1400px); transform: translateZ(-1400px); opacity: 0; }
  100% { -webkit-transform: translateZ(0); transform: translateZ(0); opacity: 1; }
}

/* ══ RESPONSIVE ══ */
@media (max-width: 640px) {
  .privacy { padding: 3rem 0 2rem; }
  .container { padding: 0 1rem; }
  .section-card { flex-direction: column; gap: 1rem; padding: 1.25rem; }
  .section-icon { width: 2.5rem; height: 2.5rem; font-size: 1.1rem; }
  .policy-title { font-size: clamp(1.5rem, 7vw, 1.8rem); }
  .intro-card { padding: 1.25rem; }
  .features-grid { gap: 0.4rem; }
  .feature-pill { font-size: 0.76rem; }
}
</style>