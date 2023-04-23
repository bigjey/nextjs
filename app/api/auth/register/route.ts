import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { RegisterSchema } from "~/app/libs/RegisterModel";

import prisma from "~/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();

  const parsed = RegisterSchema.safeParse(body);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const err of parsed.error.issues) {
      const path = err.path.join(".");
      if (!errors[path]) {
        errors[path] = err.message;
      }
    }
    return NextResponse.json(errors, {
      status: 400,
    });
  }

  const { passwordConfirm, ...payload } = parsed.data;

  try {
    await prisma.user.create({
      data: {
        ...payload,
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
