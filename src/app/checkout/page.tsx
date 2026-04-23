"use client";

import styles from "./Checkout.module.css";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0,
  );

  const handlePayment = () => {
    if (subtotal <= 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const reference = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;

    if (!publicKey) {
      alert("Error: Falta la llave pública de Wompi.");
      return;
    }

    // 🔥 Detecta automáticamente si es TEST o PROD
    const isProd = publicKey.includes("prod");

    const wompiUrl = isProd
      ? "https://checkout.wompi.co/p/"
      : "https://sandbox.checkout.wompi.co/p/";

    // 🔥 Usa variable de entorno para URL base
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      alert("Error: Falta la URL base.");
      return;
    }

    const redirectUrl = `${baseUrl}/confirmacion`;

    const checkoutUrl =
      `${wompiUrl}?public-key=${publicKey}` +
      `&currency=COP` +
      `&amount-in-cents=${subtotal * 100}` +
      `&reference=${reference}` +
      `&redirect-url=${redirectUrl}`;

    // 🔎 DEBUG (puedes quitar luego)
    console.log({
      isProd,
      wompiUrl,
      subtotal,
      amountInCents: subtotal * 100,
      reference,
      redirectUrl,
    });

    window.location.href = checkoutUrl;
  };

  return (
    <>
      <Link href="/cart" className={styles.backTop}>
        ← Regresar al carro de compras
      </Link>

      <div className={styles.container}>
        <section className={styles.formSection}>
          <h2 className={styles.title}>Detalles De Facturación</h2>

          <form className={styles.form}>
            <div className={styles.row}>
              <input className={styles.input} placeholder="Nombre *" required />
              <input
                className={styles.input}
                placeholder="Apellidos *"
                required
              />
            </div>

            <input
              className={styles.input}
              placeholder="Nombre de la empresa (opcional)"
            />

            <label className={styles.label}>País / Región</label>
            <select className={styles.select} defaultValue="Colombia">
              <option>Colombia</option>
            </select>

            <input
              className={styles.input}
              placeholder="Dirección de la calle"
              required
            />

            <input
              className={styles.input}
              placeholder="Apartamento, etc. (opcional)"
            />

            <div className={styles.row}>
              <input className={styles.input} placeholder="Ciudad" required />

              <select className={styles.select} required>
                <option value="">Departamento</option>
                <option>Antioquia</option>
                <option>Cundinamarca</option>
                <option>Valle del Cauca</option>
              </select>
            </div>

            <input
              className={styles.input}
              placeholder="Código postal (opcional)"
            />

            <input className={styles.input} placeholder="Teléfono *" required />

            <input
              className={styles.input}
              placeholder="Correo electrónico *"
              required
            />

            <h3 className={styles.subtitle}>Información Adicional</h3>

            <textarea
              className={styles.textarea}
              placeholder="Notas del pedido (opcional)"
            />
          </form>
        </section>

        <aside className={styles.orderSection}>
          <h2 className={styles.title}>Tu Pedido</h2>

          <table className={styles.summary}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Producto</th>
                <th className={styles.th}>Subtotal</th>
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              {cart.map((item: any) => (
                <tr key={item.id}>
                  <td className={styles.td}>
                    {item.name} ×{item.quantity}
                  </td>
                  <td className={styles.td}>
                    ${(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}

              <tr className={styles.totalRow}>
                <td className={styles.totalLabel}>Total</td>
                <td className={styles.totalValue}>
                  ${subtotal.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>

          <img
            src="/Wompi_LogoPrincipal-2.png"
            className={styles.gatewayLogo}
            alt="Wompi"
          />

          <p className={styles.privacy}>
            Tus datos personales se utilizarán para procesar tu pedido.
          </p>

          <label className={styles.checkbox}>
            <input type="checkbox" className={styles.checkboxInput} required />
            <span className={styles.checkboxLabel}>
              He leído y estoy de acuerdo con los términos y condiciones *
            </span>
          </label>

          <button
            type="button"
            className={styles.payBtn}
            onClick={handlePayment}
          >
            REALIZAR EL PEDIDO
          </button>
        </aside>
      </div>
    </>
  );
}
