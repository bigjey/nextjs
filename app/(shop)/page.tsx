import prismaClient from "../libs/prismadb";

export const revalidate = 0;

export default async function ShopIndexPage() {
  const users = await prismaClient.test.findMany();

  return (
    <div>
      Shop Index 3
      {users.map((u, index) => (
        <div key={index}>{u.text}</div>
      ))}
    </div>
  );
}
