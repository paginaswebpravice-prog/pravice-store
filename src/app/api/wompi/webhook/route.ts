import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-wompi-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // 🔐 VALIDAR FIRMA
    const expectedSignature = crypto
      .createHmac("sha256", process.env.WOMPI_EVENTS_SECRET!)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parsear después de validar firma
    const body = JSON.parse(rawBody);

    const event = body.event;
    const transaction = body.data?.transaction;

    if (!transaction) {
      return NextResponse.json({ error: "No transaction" }, { status: 400 });
    }

    const { status, reference, id, amount_in_cents } = transaction;

    console.log("📩 Webhook recibido:", {
      id,
      status,
      reference,
      amount_in_cents,
    });

    // 🔎 VALIDACIÓN BÁSICA
    if (!reference?.startsWith("ORDER-")) {
      return NextResponse.json({ error: "Invalid reference" }, { status: 400 });
    }

    // 🧠 LÓGICA DE NEGOCIO
    switch (status) {
      case "APPROVED":
        console.log("💰 Pago aprobado:", reference);

        // 👉 AQUÍ:
        // await db.orders.update({
        //   where: { reference },
        //   data: { status: "PAID" },
        // });

        break;

      case "DECLINED":
        console.log("❌ Pago rechazado:", reference);

        // await db.orders.update({
        //   where: { reference },
        //   data: { status: "FAILED" },
        // });

        break;

      case "PENDING":
        console.log("⏳ Pago pendiente:", reference);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
