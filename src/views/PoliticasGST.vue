<template>
  <div :class="['app', darkMode ? 'dark' : 'light']">
    <section class="privacy">
      <div class="container">

        <!-- Header -->
        <div class="policy-header">
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
        <div class="intro-card">
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
              <p>
                Toda la información registrada dentro del sistema GST es <strong>propiedad exclusiva
                del cliente</strong> que la ingresa y gestiona dentro de la plataforma.
              </p>
              <p>
                OPERACION SISTEMICA SAS mantiene un principio estricto de confidencialidad sobre los
                datos almacenados dentro del sistema y <strong>no accede, utiliza ni divulga</strong>
                la información registrada por los clientes.
              </p>
            </div>
          </div>

          <div class="section-card">
            <div class="section-icon"><i class="bi bi-shield-check"></i></div>
            <div class="section-body">
              <h2 class="section-title">Seguridad y Protección de la Información</h2>
              <p>
                El sistema GST utiliza <strong>mecanismos avanzados de seguridad informática</strong>
                para proteger la información almacenada en la plataforma.
              </p>
              <ul class="security-list">
                <li><i class="bi bi-check-circle-fill"></i> Toda la información se mantiene <strong>cifrada</strong></li>
                <li><i class="bi bi-check-circle-fill"></i> Acceso protegido mediante <strong>autenticación y control de usuarios</strong></li>
                <li><i class="bi bi-check-circle-fill"></i> Arquitectura bajo principio de <strong>aislamiento de datos por cuenta</strong></li>
                <li><i class="bi bi-check-circle-fill"></i> Información <strong>no accesible desde el exterior</strong> ni por terceros</li>
              </ul>
            </div>
          </div>

          <div class="section-card">
            <div class="section-icon"><i class="bi bi-person-lock"></i></div>
            <div class="section-body">
              <h2 class="section-title">Acceso a la Información</h2>
              <p>
                La visualización, gestión y modificación de la información almacenada en el sistema
                solo puede realizarse mediante la <strong>conexión directa y autenticada</strong> de
                los usuarios autorizados por cada cliente.
              </p>
              <p>
                Cada cliente es responsable de la administración de sus <strong>credenciales de acceso</strong>
                y de los permisos asignados a sus usuarios dentro del sistema.
              </p>
            </div>
          </div>

          <div class="section-card section-card--last">
            <div class="section-icon"><i class="bi bi-info-circle-fill"></i></div>
            <div class="section-body">
              <h2 class="section-title">Alcance</h2>
              <p>
                Esta declaración aplica exclusivamente al funcionamiento del sistema
                <strong>GST – Gestión Servicio Técnico</strong> y a la información administrada
                dentro de dicha plataforma.
              </p>
            </div>
          </div>

        </div>

        <!-- Footer note -->
        <div class="policy-footer">
          <i class="bi bi-building"></i>
          <span>OPERACION SISTEMICA SAS · NIT 901227220-8 · © 2019-2026 GST. Todos los derechos reservados.</span>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({ darkMode: Boolean })
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
.policy-header {
  text-align: center;
  margin-bottom: 3rem;
}

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

.features-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

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
}

.section-card {
  display: flex;
  gap: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  border-radius: 1.25rem;
  padding: 1.75rem;
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

.security-list li i {
  color: var(--accent);
  font-size: 0.95rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

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
}

.policy-footer i { color: var(--accent); }

/* ══ RESPONSIVE ══ */
@media (max-width: 640px) {
  .privacy { padding: 3rem 0 2rem; }
  .container { padding: 0 1rem; }

  .section-card {
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
  }

  .section-icon { width: 2.5rem; height: 2.5rem; font-size: 1.1rem; }
  .policy-title { font-size: clamp(1.5rem, 7vw, 1.8rem); }
  .intro-card { padding: 1.25rem; }
  .features-grid { gap: 0.4rem; }
  .feature-pill { font-size: 0.76rem; }
}
</style>