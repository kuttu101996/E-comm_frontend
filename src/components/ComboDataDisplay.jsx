import React from "react";
import { AppState } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { Badge, Box, Image, Text, VStack } from "@chakra-ui/react";

const ComboDataDisplay = ({ comboData }) => {
  const { setSingleData } = AppState();
  const navigate = useNavigate();

  const totalAmount = comboData.comboItemsInfo.reduce(
    (total, item) => total + item.price,
    0
  );
  const discountedTotal = totalAmount * (1 - comboData.discountPercent / 100);

  const handleClick = () => {
    setSingleData(comboData);
    navigate("/singleItem");
  };

  return (
    <Box
      onClick={handleClick}
      className="combo-card"
      textAlign="center"
      cursor="pointer"
      mr={5}
      p={3}
      border="1px solid gray"
      borderRadius="lg"
      boxShadow="2xl"
      bg={'whiteAlpha.100'}
    >
      <VStack
        spacing={4}
        display={"flex"}
        flexDirection={"row"}
        align="flex-start"
      >
        {comboData.comboItemsInfo.map((item) => (
          <Image
            key={item._id}
            src={item.image}
            alt={item.name}
            w={100}
            h={130}
          />
        ))}
      </VStack>
      <div className="combo-details">
        <Text fontSize={"2xl"} fontWeight={"bold"} className="combo-name">
          {comboData.comboName}
        </Text>
        <Text fontSize={"large"}>
          Total Amount: {totalAmount.toFixed(2)}/-rs.
        </Text>
        <Badge colorScheme="green" mt={2}>
          {comboData.discountPercent}% Off
        </Badge>
        <Text fontSize={"larger"} className="total-amount">
          Discounted Amount: {discountedTotal.toFixed(2)}/-rs.
        </Text>
      </div>
    </Box>
  );
};

export default ComboDataDisplay;
