"use client";

import styles from "./CartPage.module.css";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTag, faCheck } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Carrito De Compras</h1>
      <p className={styles.subtitle}>
        Revisa tu pedido y continúa al pago seguro.
      </p>

      {cart.length > 0 && (
        <div className={styles.alert}>
          <FontAwesomeIcon icon={faCheck} />
          <span>
            "{cart[cart.length - 1].name}" se ha añadido a tu carrito.
          </span>
          <Link href="/cart" className={styles.viewCart}>
            VER CARRITO
          </Link>
        </div>
      )}

      <div className={styles.grid}>
        {/* TABLA */}
        <div className={styles.tableBox}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item: any) => (
                <tr key={item.id}>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>

                  <td className={styles.product}>
                    <Image
                      src={item.image}
                      width={60}
                      height={60}
                      alt={item.name}
                    />
                    {item.name}
                  </td>

                  <td>${item.price.toLocaleString()}</td>

                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                    />
                  </td>

                  <td className={styles.bold}>
                    ${(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* CUPÓN */}
          <div className={styles.coupon}>
            <div>
              <FontAwesomeIcon icon={faTag} />
              <input placeholder="Código de cupón" />
              <button>APLICAR CUPÓN</button>
            </div>

            <button className={styles.updateBtn}>ACTUALIZAR CARRITO</button>
          </div>
        </div>

        {/* TOTAL */}
        <div className={styles.totalBox}>
          <h3>Total Del Carrito</h3>

          <div className={styles.row}>
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          <div className={styles.row}>
            <span>Total</span>
            <span className={styles.total}>${subtotal.toLocaleString()}</span>
          </div>

          <button
            className={styles.checkout}
            onClick={() => (window.location.href = "/checkout")}
          >
            FINALIZAR COMPRA
          </button>
        </div>
      </div>

      <Link href="/" className={styles.back}>
        ← Regresar a la página principal
      </Link>
    </div>
  );
}
