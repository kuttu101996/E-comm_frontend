import React from "react";
import { Box, Image, Text, Button, Flex, Spacer } from "@chakra-ui/react";
import { AppState } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const CartItem = ({ item }) => {
  const { setSingleData, setRender } = AppState();
  const navigate = useNavigate();

  const handleRemove = async (productId) => {
    await fetch(`https://e-comm-mf6t.onrender.com/cart/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product deleted successfully") setRender(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box p={4} boxShadow="md" borderWidth="1px" borderRadius="md" mb={4}>
      <Flex alignItems="center">
        {item.cartCombo && (
          <Image
            src={item.cartCombo.comboItems[0].image}
            alt={item.cartCombo.comboItems[0].name}
            boxSize="80px"
            objectFit="cover"
            mr={4}
          />
        )}
        {item.cartProduct && (
          <Image
            src={item.cartProduct.image}
            alt={item.cartProduct.name}
            boxSize="80px"
            objectFit="cover"
            mr={4}
          />
        )}

        <Box
          onClick={() => {
            if (item.cartCombo) {
              setSingleData(item.cartCombo);
            } else setSingleData(item.cartProduct);
            navigate("/singleItem");
          }}
          cursor={"pointer"}
          flex="1"
        >
          <Text fontSize="lg" fontWeight="bold">
            {item.cartProduct && item.cartProduct.name}
            {item.cartCombo && item.cartCombo.comboName}
          </Text>
          <Text fontSize="md" color="gray.600">
            {item.cartProduct &&
              item.cartProduct.description.substring(0, 51) + "....."}
            {item.cartCombo && "A Super Combo offer"}
          </Text>
          <Text fontSize="lg" mt={1}>
            Price: ${item.price}
          </Text>
          <Text fontSize="lg" mt={1}>
            Discounted Price: ${item.discountedTotal}
          </Text>
        </Box>
        <Spacer />
        {/* <Box>
          <Button colorScheme="blue" size="sm">
            Quantity - {}
          </Button>
        </Box> */}
        <Box>
          <Button
            colorScheme="red"
            size="sm"
            onClick={() => handleRemove(item._id)}
          >
            Remove
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default CartItem;
