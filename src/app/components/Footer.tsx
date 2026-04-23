"use client";

import styles from "./styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

const handleClick = () => {
  window.open("https://api.whatsapp.com/send?phone=573206353180", "_blank");
};

export default function Footer() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let showTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    const loop = () => {
      // aparece
      showTimer = setTimeout(() => {
        setShowTooltip(true);

        // desaparece después de 4s visible
        hideTimer = setTimeout(() => {
          setShowTooltip(false);

          // vuelve a ejecutarse el ciclo después de 6s oculto
          setTimeout(loop, 6000);
        }, 4000);
      }, 2000); // espera inicial
    };

    loop();

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      {/* ========== PRE FOOTER / CTA ========== */}
      <section className={styles.preFooter}>
        <div className={styles.overlay} />

        <div className={styles.preFooterContent}>
          <p className={styles.topText}>PRAVICE ABOGADOS</p>

          <h2 className={styles.title}>No arriesgues a tu empresa</h2>

          <p className={styles.subtitle}>
            Cumple hoy con la Reforma Laboral 2026 y evita sanciones legales
          </p>

          <div className={styles.banner}>
            <FontAwesomeIcon icon={faFire} />
            <span>
              Oferta limitada: los precios aumentarán después del 31 de enero
            </span>
          </div>
        </div>
      </section>

      {/* ========== FOOTER REAL ========== */}
      <section className={styles.footerMain}>
        <div className={styles.columns}>
          <div>
            <h3>Pravice Abogados</h3>
            <p>
              Firma legal especializada en cumplimiento normativo y aplicación
              de la Reforma Laboral 2026 para empresas en Colombia.
            </p>
          </div>

          <div>
            <h4>Servicios</h4>
            <ul>
              <li>Implementación Reforma Laboral</li>
              <li>Contratos laborales actualizados</li>
              <li>Asesoría legal empresarial</li>
            </ul>
          </div>

          <div>
            <h4>Contacto</h4>
            <ul>
              <li>WhatsApp: +57 320 635 3180</li>
              <li>Atención nacional</li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul>
              <li>Aviso legal</li>
              <li>Política de privacidad</li>
              <li>Términos del servicio</li>
            </ul>
          </div>
        </div>

        <div className={styles.copy}>
          © {new Date().getFullYear()} Pravice Abogados. Todos los derechos
          reservados.
        </div>
      </section>

      {/* ========== WHATSAPP FLOAT ========== */}
      <div className={styles.whatsappWrapper}>
        <div
          className={`${styles.whatsappTooltip} ${
            showTooltip ? styles.visible : styles.hidden
          }`}
        >
          💬 ¿Tienes dudas antes de comprar? <br />
          Habla con un asesor legal en este momento.
        </div>

        <button
          className={styles.whatsappBtn}
          onClick={handleClick}
          aria-label="Contactar por WhatsApp"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </button>
      </div>
    </footer>
  );
}
