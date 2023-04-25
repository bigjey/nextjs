import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { RegisterSchema } from "~/app/libs/RegisterModel";
import bcrypt from "bcrypt";

import prisma from "~/app/libs/prismadb";
import { getErrors } from "~/app/libs/getErrors";

export async function POST(request: Request) {
  if (request.headers.get("content-type") !== "application/json") {
    return NextResponse.json(
      { message: "Must be an application/json" },
      { status: 400 }
    );
  }

  const body = await request.json();

  const parsed = RegisterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(getErrors(parsed.error.issues), {
      status: 400,
    });
  }

  const { passwordConfirm, ...payload } = parsed.data;

  try {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    await prisma.user.create({
      data: {
        ...payload,
        password: hashedPassword,
        role: UserRole.Customer,
      },
    });
    return NextResponse.json(
      {},
      {
        status: 200,
      }
    );
  } catch (e: any) {
    console.log({ e });

    let message = "Failed to create user";

    return NextResponse.json(
      {
        form: message,
      },
      {
        status: 400,
      }
    );
  }
}
