import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get("id");

    if (!transactionId) {
      return NextResponse.json(
        { error: "Missing transaction id" },
        { status: 400 },
      );
    }

    const wompiRes = await fetch(
      `https://production.wompi.co/v1/transactions/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
        },
      },
    );

    if (!wompiRes.ok) {
      return NextResponse.json(
        { error: "Error fetching transaction" },
        { status: 500 },
      );
    }

    const data = await wompiRes.json();
    const transaction = data.data;

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 },
      );
    }

    // 🔎 VALIDACIONES IMPORTANTES
    const isApproved = transaction.status === "APPROVED";

    // ⚠️ AQUÍ deberías validar contra tu DB
    // ejemplo:
    // const order = await db.findOrder(transaction.reference)

    // Simulación básica:
    const isValidAmount = transaction.amount_in_cents > 0;
    const hasReference = transaction.reference?.startsWith("ORDER-");

    if (!isValidAmount || !hasReference) {
      return NextResponse.json(
        { error: "Invalid transaction data" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      status: transaction.status,
      reference: transaction.reference,
      amount: transaction.amount_in_cents,
      method: transaction.payment_method_type,
      approved: isApproved,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
