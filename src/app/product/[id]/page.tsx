import Container from "@/src/components/Container";
import SingleProduct from "@/src/components/SingleProduct";
import { fetchData } from "@/src/hooks/fetchter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product View Page | Amazon Clone app",
};

const ProductPage = async ({ searchParams }: { searchParams?: Record<string, any> }) => {
  const id = typeof searchParams?.id === "string" ? searchParams.id : "";

  const endpoint = `https://dummyjson.com/products/${id}`;
  const product = await fetchData(endpoint);

  return (
    <Container className="py-10">
      {product && <SingleProduct product={product} />}
    </Container>
  );
};

export default ProductPage;
