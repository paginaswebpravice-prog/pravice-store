"use client";

import { useEffect, useState } from "react";

export default function ConfirmacionPage() {
  const [status, setStatus] = useState("Procesando...");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get("id");

    if (!transactionId) {
      setStatus("Transacción no encontrada");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(`/api/wompi/verify?id=${transactionId}`);
        const result = await res.json();

        if (!res.ok) {
          setStatus("Error verificando el pago");
          return;
        }

        setData(result);

        if (result.approved) {
          setStatus("✅ Pago aprobado");
        } else if (result.status === "DECLINED") {
          setStatus("❌ Pago rechazado");
        } else {
          setStatus("⏳ Pago en proceso");
        }
      } catch (error) {
        setStatus("Error en la conexión");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Estado del pago</h1>
      <h2>{status}</h2>

      {data && (
        <div style={{ marginTop: 20 }}>
          <p>
            <strong>Referencia:</strong> {data.reference}
          </p>
          <p>
            <strong>Monto:</strong> $
            {(data.amount / 100).toLocaleString("es-CO")}
          </p>
          <p>
            <strong>Método:</strong> {data.method}
          </p>
        </div>
      )}
    </div>
  );
}
