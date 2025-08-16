import { auth } from "@/auth"; // NextAuth middleware API
import CartProducts from "@/src/components/cart/CartProducts";
import Container from "@/src/components/Container";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Cart | Amazon online shopping",
};

const CartPage = async () => {
  const session = await auth(); // ✅ direct call is fine if headers are awaited inside

  if (!session) {
    redirect("/"); // 🔒 redirect if not signed in
  }

  const { user } = session;

  return (
    <Container>
      <CartProducts user={user} />
    </Container>
  );
};

export default CartPage;
