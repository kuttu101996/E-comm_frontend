import React, { useEffect, useState } from "react";
import { AppState } from "../context/ContextProvider";
import { Box, Text, VStack, Button } from "@chakra-ui/react";
import CartItem from "./CartItem";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const { setCartNumber, render, setRender } = AppState();
  const totalPrice = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalDiscountedPrice = cartData.reduce(
    (total, item) => total + item.discountedTotal * item.quantity,
    0
  );
  const youSave = totalPrice - totalDiscountedPrice;

  const handleProceed = (totalPrice) => {
    console.log(totalPrice);
  };

  useEffect(() => {
    fetch(`https://e-comm-mf6t.onrender.com/cart`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCartNumber(data.length);
          setCartData(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
console.log('Cart.jsx useEffect rendered');
    setRender(false);
  }, [render]);

  return (
    <Box>
      <Box>
        <Box p={8}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Your Shopping Cart
          </Text>
          {cartData.map((item) => (
            <Box key={item._id}>
              <CartItem item={item} />
            </Box>
          ))}
          {cartData.length === 0 && (
            <Text fontSize="lg" mt={4}>
              Your cart is empty.
            </Text>
          )}
          {cartData.length > 0 && (
            <VStack spacing={4}>
              <Text fontSize="lg">
                Total Price: <strong>{totalPrice.toFixed(2)}/-rs.</strong>
              </Text>
              <Text fontSize="lg">
                You Save: <strong>{youSave.toFixed(2)}/-rs.</strong>
              </Text>
              <Text fontSize="lg">
                Discounted Total:{" "}
                <strong>{totalDiscountedPrice.toFixed(2)}/-rs.</strong>
              </Text>
              <Button
                onClick={() => handleProceed(totalPrice)}
                colorScheme="blue"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </VStack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
