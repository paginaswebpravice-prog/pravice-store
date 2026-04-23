"use client";

import { useState } from "react";
import styles from "./styles/FAQ.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBalanceScale,
  faBuilding,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface FAQItem {
  question: string;
  answer: string;
}

const handleClick = () => {
  window.open("https://api.whatsapp.com/send?phone=573206353180", "_blank");
};

export default function FAQ() {
  const faqs: FAQItem[] = [
    {
      question: "¿En qué formato recibo los documentos?",
      answer:
        "Recibes todos los documentos en formato PDF para lectura y en Word editable, para que puedas adaptarlos fácilmente a las necesidades específicas de tu empresa.",
    },
    {
      question: "¿Cuánto tiempo tarda la entrega de los documentos?",
      answer:
        "La entrega es inmediata una vez se confirma el pago. Podrás descargar los documentos al instante desde la plataforma.",
    },
    {
      question: "¿Cómo se agenda la asesoría incluida?",
      answer:
        "Después de completar la compra, podrás seleccionar de forma autónoma el día y la hora disponibles para tu asesoría legal.",
    },
    {
      question: "¿Los documentos están actualizados a la normativa vigente?",
      answer:
        "Sí. Todos los documentos están actualizados conforme a la normativa laboral vigente y a los lineamientos aplicables de la Reforma Laboral 2026 en Colombia.",
    },
    {
      question: "¿Qué pasa si tengo dudas después de realizar la compra?",
      answer:
        "Puedes contactar a nuestro equipo de soporte y asesoría legal en cualquier momento para resolver tus inquietudes.",
    },
    {
      question: "¿Ofrecen garantía de devolución?",
      answer:
        "Sí. Ofrecemos garantía en caso de presentarse inconvenientes verificables relacionados con el acceso o el contenido de los documentos.",
    },
    {
      question: "¿Los packs son útiles para cualquier tipo de empresa?",
      answer:
        "Sí. Los packs están diseñados para micro, pequeñas y medianas empresas de diferentes sectores económicos.",
    },
    {
      question:
        "¿Necesito conocimientos legales para implementar los documentos?",
      answer:
        "No. Los documentos incluyen instrucciones claras y un manual práctico que te guía paso a paso durante la implementación.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* ICONOS SUPERIORES */}
      <section className={styles.iconsContainer}>
        <div className={styles.iconItem}>
          <FontAwesomeIcon icon={faBalanceScale} className={styles.iconBlue} />
          <p className={styles.iconLabel}>Pravice Abogados</p>
        </div>

        <div className={styles.iconItem}>
          <FontAwesomeIcon icon={faBuilding} className={styles.iconGray} />
          <p className={styles.iconLabel}>Registro Cámara De Comercio</p>
        </div>

        <div className={styles.iconItem}>
          <FontAwesomeIcon icon={faCheckCircle} className={styles.iconGreen} />
          <p className={styles.iconLabel}>Pago 100% Seguro</p>
        </div>
      </section>

      {/* FAQ */}
      <section
        className={styles.section}
        aria-labelledby="faq-title"
        aria-describedby="faq-description"
      >
        <h2 id="faq-title" className={styles.title}>
          Preguntas Frecuentes
        </h2>
        <p id="faq-description" className={styles.subtitle}>
          Respuestas claras sobre los packs legales, la asesoría y el
          cumplimiento…
        </p>

        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={`${styles.question} ${
                  openIndex === index ? styles.questionOpen : ""
                }`}
                onClick={() => toggle(index)}
              >
                <span
                  className={`${styles.iconSign} ${
                    openIndex === index ? styles.iconSignOpen : ""
                  }`}
                >
                  {openIndex === index ? "-" : "+"}
                </span>
                {faq.question}
              </button>

              <div
                className={`${styles.answer} ${
                  openIndex === index ? styles.answerOpen : ""
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

        {/* CAJA FINAL */}
        <p className={styles.boxTitle}>
          ¿Necesitas orientación antes de comprar?
        </p>
        <p className={styles.boxText}>
          Habla directamente con un asesor legal y resuelve tus dudas en
          minutos. Te ayudamos a elegir el pack adecuado para tu empresa.
        </p>
        <button className={styles.button} onClick={handleClick}>
          Hablar por WhatsApp
        </button>
      </section>
    </>
  );
}
