import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { reference, amountInCents, currency } = await req.json();

    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET;

    if (!integritySecret) {
      return NextResponse.json(
        { error: "Falta WOMPI_INTEGRITY_SECRET" },
        { status: 500 },
      );
    }

    const signature = crypto
      .createHash("sha256")
      .update(`${reference}${amountInCents}${currency}${integritySecret}`)
      .digest("hex");

    return NextResponse.json({ signature });
  } catch (error) {
    return NextResponse.json(
      { error: "Error generando firma" },
      { status: 500 },
    );
  }
}
