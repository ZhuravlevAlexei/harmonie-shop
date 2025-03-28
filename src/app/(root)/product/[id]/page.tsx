export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const awaitedParams = await Promise.resolve(params);
  return <div>Product {awaitedParams.id}</div>;
}
