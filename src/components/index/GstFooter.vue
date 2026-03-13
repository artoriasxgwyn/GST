<template>
  <footer class="footer">

    <!-- ══ SECCIÓN PRINCIPAL ══ -->
    <div class="footer-top">

      <!-- Columna brand -->
      <div class="brand-col">
        <img :src="props.darkMode ? logoGSTWhite : logoGSTColor" alt="logoGST" class="logo">
        <p class="tagline">
          Plataforma digital para la gestión, control y seguimiento de servicios técnicos,
          diseñada para operaciones profesionales.
        </p>
        <div class="social-icons">
          <a href="#" class="social-icon" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>
          <a href="#" class="social-icon" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="#" class="social-icon" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="social-icon" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
          <a href="#" class="social-icon" aria-label="Twitter / X"><i class="bi bi-twitter-x"></i></a>
          <a href="#" class="social-icon" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>

      <hr class="divider-v" />

      <!-- Columnas de links -->
      <div class="links-grid">
        <div class="link-col">
          <h5 class="col-heading">Empresa</h5>
          <ul class="link-list">
            <li><a href="#">¿Qué es GST?</a></li>
            <li><a href="#">Planes y precios</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>

        <div class="link-col">
          <h5 class="col-heading">Soporte</h5>
          <ul class="link-list">
            <li><a href="#">Solicitar acceso</a></li>
            <li><a href="#">Soporte técnico</a></li>
            <li><a href="#">Centro de ayuda</a></li>
          </ul>
        </div>

        <div class="link-col">
          <h5 class="col-heading">Legal</h5>
          <ul class="link-list">
            <li><router-link to="/politicas#start">Política de Privacidad</router-link></li>
            <li><router-link to="/terminosYCondiciones#start">Términos y Condiciones</router-link></li>
             <li><router-link to="/cookies#start">Política de Cookies</router-link></li>
            <li><router-link to="/politicasReembolso#start">Política de Reembolsos</router-link></li>
            <li><router-link to="/politicasGarantia#start">Políticas de Garantía</router-link></li>
          </ul>
        </div>
      </div>
    </div>

    <hr class="divider-h" />

    <!-- ══ SECCIÓN INFERIOR ══ -->
    <div class="footer-bottom">
      <div class="powered-by">
        <span>Powered by</span>
        <img :src="props.darkMode ? logoOSWhite : logoOSColor" alt="Logo de Operación Sistémica, empresa creadora de GST"
          class="powered-logo" />
      </div>
      <hr class="divider-v2" />
      <div class="legal-text">
        <strong><p>© 2019-2026 GST. Todos los derechos reservados.</p></strong>
        <strong><p>GST - Sistema de Gestión de Servicios Técnicos es un producto propiedad de Operación Sistémica</p></strong>
      </div>
    </div>

  </footer>
</template>

<script setup>
import { defineProps } from 'vue'
import logoGSTColor from '@/assets/logoGST.png'
import logoGSTWhite from '@/assets/GSTBlanco.png'
import logoOSWhite  from '@/assets/Operacion Sistemica Blanco.png'
import logoOSColor  from '@/assets/Operacion sistemica.png'

const props = defineProps({ darkMode: Boolean })
</script>

<style scoped>
.footer {
  background: var(--bg);
  color: var(--text-muted);
  padding: 3% 3% 1% 3%;
  width: 100%;
  border-top: 1px solid var(--border-light);
  transition: background 0.35s ease, color 0.35s ease, border-color 0.35s ease;
}
.footer-top {
  display: flex;
  width: 100%;
  gap: 2rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}
.brand-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 30%;
  flex-shrink: 0;
}
.tagline {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.6;
  max-width: 22rem;
  transition: color 0.35s;
}
.social-icons {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
}
.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background: var(--border-soft);
  color: var(--accent);
  font-size: 1.1rem;
  transition: all 0.2s ease;
  text-decoration: none;
}
.social-icon:hover {
  background: var(--accent);
  color: var(--accent-text);
  transform: translateY(-3px);
}
.divider-v {
  background: var(--border);
  width: 1.5px;
  height: auto;
  align-self: stretch;
  border: none;
  flex-shrink: 0;
  transition: background 0.35s;
}
.links-grid {
  display: flex;
  justify-content: space-around;
  flex: 1;
  gap: 1.5rem;
}
.link-col { display: flex; flex-direction: column; }
.col-heading {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.25rem;
  transition: color 0.35s;
}
.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.link-list a {
  font-size: 0.88rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
  display: inline-block;
}
.link-list a:hover {
  color: var(--accent);
  transform: translateX(3px);
}
.divider-h {
  background: var(--border);
  width: 100%;
  height: 1.5px;
  border: none;
  margin: 1rem 0;
  transition: background 0.35s;
}
.footer-bottom {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
  font-size: 0.82rem;
  color: var(--text-soft);
  transition: color 0.35s;
}
.powered-by {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  width: 14%;
  flex-shrink: 0;
  font-size: 0.8rem;
}
.powered-logo {
  height: 4rem;
  width: auto;
  opacity: 0.8;
  transition: opacity 0.2s;
}
.powered-logo:hover { opacity: 1; }
.divider-v2 {
  background: var(--border);
  width: 1.5px;
  height: 3rem;
  border: none;
  flex-shrink: 0;
  transition: background 0.35s;
}
.legal-text {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
}
.legal-text p {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-soft);
  transition: color 0.35s;
}
.logo { width: 60%; transition: opacity 0.35s; }
@media (max-width: 768px) { .logo { width: 30%; } }

@media (min-width: 768px) and (max-width: 1023px) {
  .footer-top { flex-wrap: wrap; }
  .brand-col { width: 100%; align-items: center; text-align: center; }
  .tagline { margin: 0 auto; }
  .social-icons { justify-content: center; }
  .divider-v { display: none; }
  .links-grid { width: 100%; justify-content: space-around; }
  .footer-bottom { flex-wrap: wrap; justify-content: center; text-align: center; }
  .powered-by { width: auto; }
  .divider-v2 { display: none; }
  .legal-text { width: 100%; text-align: center; align-items: center; }
}
@media (min-width: 481px) and (max-width: 767px) {
  .footer-top { flex-direction: column; align-items: center; }
  .brand-col { width: 100%; align-items: center; text-align: center; }
  .tagline { margin: 0 auto; }
  .social-icons { justify-content: center; }
  .divider-v { display: none; }
  .links-grid { width: 100%; justify-content: space-around; flex-wrap: wrap; gap: 2rem; }
  .link-col { align-items: center; text-align: center; }
  .link-list a:hover { transform: none; }
  .footer-bottom { flex-direction: column; align-items: center; text-align: center; }
  .powered-by { width: auto; }
  .divider-v2 { width: 80%; height: 1.5px; }
  .legal-text { align-items: center; }
}
@media (max-width: 480px) {
  .footer { padding: 2rem 1rem 1rem; }
  .footer-top { flex-direction: column; align-items: center; }
  .brand-col { width: 100%; align-items: center; text-align: center; }
  .tagline { margin: 0 auto; }
  .social-icons { justify-content: center; gap: 0.5rem; }
  .divider-v { display: none; }
  .links-grid { width: 100%; flex-direction: column; align-items: center; gap: 1.5rem; }
  .link-col { align-items: center; text-align: center; }
  .link-list a:hover { transform: none; }
  .footer-bottom { flex-direction: column; align-items: center; text-align: center; gap: 0.75rem; }
  .powered-by { width: auto; }
  .divider-v2 { width: 60%; height: 1.5px; }
  .legal-text { align-items: center; }
  .social-icon { width: 2rem; height: 2rem; font-size: 1rem; }
}
@media (max-width: 375px) {
  .tagline { font-size: 0.82rem; }
  .col-heading { font-size: 0.7rem; }
  .link-list a { font-size: 0.82rem; }
  .powered-logo { height: 1.4rem; }
  .legal-text p { font-size: 0.75rem; }
}
</style>