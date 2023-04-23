import Link from "next/link";

function ProductCard(props: { title: string; slug: string }) {
  return (
    <Link href={`/product/${props.slug}`} className="hover:text-blue-500">
      <div className="p-4 border-slate-300 border-solid border-[1px] rounded-s w-[400px] flex flex-col gap-2">
        <h3 className="text-2xl font-bold">{props.title}</h3>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure aut
          tempore corporis maiores doloribus cumque soluta, atque minima enim
          optio mollitia ratione repellendus exercitationem nulla iste,
          cupiditate quaerat deleniti quae.
        </div>
      </div>
    </Link>
  );
}

export default function LoginPage() {
  return (
    <>
      <div className="flex gap-4">
        <ProductCard title="First" slug="first" />
        <ProductCard title="Second" slug="second" />
      </div>
    </>
  );
}
