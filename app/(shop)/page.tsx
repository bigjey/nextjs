import prismaClient from "../libs/prismadb";

export const revalidate = 0;

export default async function ShopIndexPage() {
  const users = await prismaClient.user.findMany();

  return (
    <div>
      <div>Shop Index 3</div>
      {users.map((u, index) => (
        <div key={index}>{u.email}</div>
      ))}
    </div>
  );
}
