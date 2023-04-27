import { NextResponse } from "next/server";
import { LoginSchema } from "~/app/libs/LoginModel";
import prismaClient from "~/app/libs/prismadb";
import bcrypt from "bcrypt";
import { getErrors } from "~/app/libs/getErrors";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(getErrors(parsed.error.issues), { status: 400 });
    }

    const user = await prismaClient.user.findUnique({
      where: { email: parsed.data.email },
    });
    if (!user || !user.hashedPassword) {
      return NextResponse.json(
        { form: "Wrong email or password" },
        { status: 400 }
      );
    }

    const match = await bcrypt.compare(
      parsed.data.password,
      user.hashedPassword
    );
    if (!match) {
      return NextResponse.json(
        { form: "Wrong email or password" },
        { status: 400 }
      );
    }

    // req.session.userId = user.id;
    // req.session.lastSignIn = Date.now();

    // handle cart items merge

    // const idsToKeep = await prisma
    //   .$queryRawUnsafe<{ id: number }[]>(
    //     `
    //   select "id"
    //   from "CartItem"
    //   where ("productId", "updatedAt") in (
    //     select "productId", max("updatedAt")
    //     from "CartItem"
    //     where "sessionId" = $1 or "userId" = $2
    //     group by "productId"
    //   )
    // `,
    //     req.session.id,
    //     user.id
    //   )
    //   .then((values) => values.map((el) => el.id));

    // await prisma.$transaction([
    //   prisma.cartItem.deleteMany({
    //     where: {
    //       id: {
    //         notIn: idsToKeep,
    //       },
    //       OR: [
    //         {
    //           userId: user.id,
    //         },
    //         {
    //           sessionId: req.session.id,
    //         },
    //       ],
    //     },
    //   }),
    //   prisma.cartItem.updateMany({
    //     where: {
    //       id: {
    //         in: idsToKeep,
    //       },
    //     },
    //     data: {
    //       sessionId: null,
    //       userId: user.id,
    //     },
    //   }),
    // ]);

    // const token = jwt.sign(
    //   payload,
    //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //   process.env.JWT_SECRET!,
    //   { expiresIn: '6h' }
    // );

    // res.json({ token });
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}
