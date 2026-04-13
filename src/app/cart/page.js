"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CartPageItem from "@/components/Cart/CartItem";
import { FiArrowRight } from "react-icons/fi";

export default function CartPage() {
  const products = useSelector((state) => state.cart.cart);
  const router = useRouter();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);



  const cartLength = products.length;

  const getPrice = (item) => {
    return item?.product?.discount
      ? item.product.sell_price -
          (item.product.discount * item.product.sell_price) / 100
      : item.product.sell_price;
  };

  const subtotal = products.reduce(
    (acc, item) => acc + getPrice(item) * item.quantity,
    0
  );

  const discount = products.reduce((acc, item) => {
    const product = item.product;
    if (!product?.discount) return acc;

    const itemDiscount =
      (product.discount * product.sell_price) / 100;

    return acc + itemDiscount * item.quantity;
  }, 0);

  const total = subtotal;

  if (mounted && cartLength === 0) {
    return (
      <section className="bg-[#F7F3EA] min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🛒</div>

          <h1 className="text-2xl font-semibold text-[#1E2A38] mb-2">
            Your cart is empty
          </h1>

          <p className="text-gray-500 text-sm mb-6">
            Looks like you haven’t added anything yet.
            Start exploring and find something you love!
          </p>

         <button
  onClick={() => router.push("/all-products")}
className="bg-btnBg-secondary px-6 py-3 mx-auto rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center"
>
  <span className="flex items-center gap-2">
    Continue Shopping
    <FiArrowRight className="text-lg" />
  </span>
</button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F7F3EA] min-h-screen px-4 lg:px-12 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-text-primaryText">
          Your cart
        </h1>
        <p className="text-sm text-text-secondaryText mt-1">
          {cartLength} items in your cart
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
       <div className="flex-1 ">
        <div className="bg-transparent px-0">
            {products.map((item, index) => (
              <CartPageItem key={index} item={item} />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[380px]">
          <div className=" rounded-xl border border-[#1B3A5C14] p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#1E2A38] mb-5">
              Order summary
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal ({cartLength} items)
                </span>
                <span className="text-gray-800">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="border-t border-[#E6DECF] pt-4 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>
                  ₹{(subtotal).toLocaleString()}
                </span>
              </div>

              <p className="text-xs text-gray-500">
                Inclusive of all taxes
              </p>

              {discount > 0 && (
                <div className="bg-[#E9F5EC] text-green-700 text-xs rounded-md px-3 py-2 text-center">
                  You’re saving ₹{discount.toLocaleString()} on this order!
                </div>
              )}

        <button
  onClick={() => router.push("/checkout")}
  className="w-full bg-btnBg-secondary py-3 rounded-lg font-medium mt-2 hover:opacity-90 transition flex items-center justify-center gap-2 group"
>
  Proceed to checkout
  <FiArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
</button>

              <p className="text-xs text-gray-400 text-center">
                🔒 Secure checkout • 256-bit SSL encrypted
              </p>

              <div className="flex justify-center gap-2 text-xs text-gray-500 mt-2">
                {["UPI", "Visa", "Mastercard", "RuPay", "COD"].map((p) => (
                  <span
                    key={p}
                    className="border border-[#E6DECF] px-2 py-1 rounded"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}