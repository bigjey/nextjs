export default function ProductPage({ params }: { params: { slug: string } }) {
  return <h1>Product {params.slug} page</h1>;
}
