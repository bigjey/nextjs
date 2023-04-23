import { NextResponse } from "next/server";

import prisma from "~/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  // await new Promise((r) => setTimeout(r, 2000));

  if (!body.login) {
    return NextResponse.json(
      { success: false, message: '"login" is required' },
      { status: 400 }
    );
  }

  if (body.login === "admin") {
    return NextResponse.json({
      success: true,
      message: `Logged in as ${body.login}`,
    });
  }

  try {
    const existing = await prisma.test.findFirst({
      where: {
        text: body.login,
      },
    });
    if (existing) {
      return NextResponse.json({
        success: true,
        message: `Logged in as ${body.login}`,
      });
    }
    await prisma.test.create({
      data: {
        text: body.login,
      },
    });
    return NextResponse.json({
      success: false,
      message: `${body.login} is now in DB`,
    });
  } catch (e: any) {
    return NextResponse.json({
      success: false,
      message: e?.message ?? "Failed :/",
    });
  }
}
