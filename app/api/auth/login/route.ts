import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  await new Promise((r) => setTimeout(r, 2000));

  if (body.login === "admin") {
    return NextResponse.json({
      success: true,
      message: `Logged in as ${body.login}`,
    });
  }

  return NextResponse.json({
    success: false,
    message: `${body.login} is not allowed`,
  });
}
