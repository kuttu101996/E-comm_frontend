import React from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { AppState } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const CartItem = ({ item }) => {
  const { setSingleData, setRender } = AppState();
  const navigate = useNavigate();
  const toast = useToast();

  const handleAddQuantity = async (name) => {
    let dataName = { name: name };
    await fetch(`https://e-comm-mf6t.onrender.com/cartCheckAdd`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(dataName),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Quantity Added") {
          // setCartNumber(cartNumber + 1);
          setRender(true);
          toast({
            title: "Quantity Added",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleReduceQuantity = async (name) => {
    let dataName = { name: name };
    await fetch(`https://e-comm-mf6t.onrender.com/cartCheckReduce`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(dataName),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Quantity Reduced") {
          // setCartNumber(cartNumber + 1);
          setRender(true);
          toast({
            title: "Quantity Reduced",
            status: "info",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = async (productId) => {
    await fetch(`https://e-comm-mf6t.onrender.com/cart/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product deleted successfully") {
          setRender(true);
          toast({
            title: "Product deleted successfully",
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
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
        <Box>
          <Box
            display={"flex"}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={2}
          >
            <Text mr={3}>Quantity - {item.quantity}</Text>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => handleRemove(item._id)}
            >
              Remove Item
            </Button>
          </Box>
          <Box
            display={"flex"}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Button
              mr={2}
              onClick={() => {
                {
                  item.cartProduct && handleAddQuantity(item.cartProduct.name);
                }
                {
                  item.cartCombo && handleAddQuantity(item.cartCombo.comboName);
                }
              }}
              colorScheme="green"
              size="sm"
            >
              Add Quantity
            </Button>
            <Button
              onClick={() => {
                {
                  item.cartProduct &&
                    handleReduceQuantity(item.cartProduct.name);
                }
                {
                  item.cartCombo &&
                    handleReduceQuantity(item.cartCombo.comboName);
                }
              }}
              colorScheme="purple"
              size="sm"
            >
              Reduce Quantity
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default CartItem;
