import React from "react";
import { AppState } from "../context/ContextProvider";
import { Badge, Box, Button, Image, Text, VStack, useToast } from "@chakra-ui/react";

const SingleItem = () => {
  const { singleData } = AppState();
  const { cartNumber, setCartNumber, setRender } = AppState();
  const toast = useToast()
  let totalAmount, discountedTotal, data;

  if (singleData.comboItemsInfo) {
    totalAmount = singleData.comboItemsInfo.reduce(
      (total, item) => total + item.price,
      0
    );
    discountedTotal = totalAmount * (1 - singleData.discountPercent / 100);
    data = {
      cartCombo: singleData._id,
      discountedTotal: discountedTotal,
      price: totalAmount,
    };
  } else {
    discountedTotal =
      singleData.price * (1 - singleData.offer / 100).toFixed(2);
    data = {
      cartProduct: singleData._id,
      discountedTotal: discountedTotal,
      price: singleData.price,
    };
  }

  const handleAddToCart = async (name) => {
    let dataName = { name: name };
    await fetch(`https://e-comm-mf6t.onrender.com/cartCheckAdd`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(dataName),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Quantity Added") {
          setRender(true);
          toast({
            title: "Quanity Added",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        } else {
          addToCart();
        }
      })
      .catch((err) => console.log(err));
  };
  async function addToCart() {
    await fetch(`https://e-comm-mf6t.onrender.com/cart`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => { 
        if (data._id) {
          setCartNumber(cartNumber + 1);
          setRender(true);
          toast({
            title: "Item Added to Cart",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      {singleData.comboItemsInfo ? (
        <Box p={4} maxW="600px" mx="auto">
          <Box d="flex" flexDirection="row" alignItems="center">
            <VStack
              spacing={4}
              display={"flex"}
              flexDirection={"row"}
              align="flex-start"
            >
              {singleData.comboItemsInfo.map((item) => (
                <Image
                  key={item._id}
                  src={item.image}
                  alt={item.name}
                  w={190}
                  h={190}
                />
              ))}
            </VStack>
            <Box ml={4}>
              <Text fontSize="xl" fontWeight="bold">
                {singleData.comboName}
              </Text>
              <Badge colorScheme="green" mt={2}>
                {singleData.discountPercent}% Off
              </Badge>
              <Text color="gray.600" mt={2}>
                {singleData.comboItemsInfo.map((item, index) => (
                  <span key={item._id}>
                    {item.name}
                    {index < singleData.comboItemsInfo.length - 1 ? ", " : ""}
                  </span>
                ))}
              </Text>
              <Text fontSize="large" mt={2}>
                Total Price: {totalAmount.toFixed(2)}/-rs.
              </Text>
              <Badge colorScheme="green" mt={2}>
                You Save {totalAmount - discountedTotal}/- rs.
              </Badge>
              <Text fontSize="2xl" mt={4}>
                Discounted Price: {discountedTotal.toFixed(2)}/-rs.
              </Text>
            </Box>
          </Box>
          <VStack spacing={4} mt={4}>
            <Button
              onClick={() => handleAddToCart(singleData.comboName)}
              colorScheme="blue"
            >
              Add to Cart
            </Button>
          </VStack>
        </Box>
      ) : (
        <div>
          <Box p={4} maxW="600px" mx="auto">
            <Image
              src={singleData.image}
              alt={singleData.name}
              objectFit="contain"
            />
            <Text fontSize="xl" fontWeight="bold" mt={4}>
              {singleData.name}
            </Text>
            <Text color="gray.600" mt={2}>
              {singleData.description}
            </Text>
            <Badge colorScheme="green" mt={2}>
              In Stock
            </Badge>
            <Box>
              <Text fontSize="larger" mt={4}>
                Price: {singleData.price}.00/-rs.
              </Text>
              {singleData.offer > 0 && (
                <Badge colorScheme="green" mt={2}>
                  {singleData.offer}% Off
                </Badge>
              )}
            </Box>
            {singleData.offer > 0 && (
              <Text fontSize={"2xl"}>
                Discounted Price:{" "}
                {singleData.price * (1 - singleData.offer / 100).toFixed(2)}
                /-rs.
              </Text>
            )}
            <VStack spacing={4} mt={4}>
              <Button
                onClick={() => handleAddToCart(singleData.name)}
                colorScheme="blue"
              >
                Add to Cart
              </Button>
            </VStack>
          </Box>
        </div>
      )}
    </div>
  );
};

export default SingleItem;
