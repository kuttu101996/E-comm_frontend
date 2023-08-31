import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import SingleItem from "./components/SingleItem";
import { Badge, Box } from "@chakra-ui/react";
import { AppState } from "./context/ContextProvider";

function App() {
  const navigate = useNavigate();
  const { cartNumber } = AppState();
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        textAlign={"center"}
        width={"100%"}
        bg={"blue.100"}
        p={2}
      >
        <Badge
          textAlign={"center"}
          cursor={"pointer"}
          p={1.5}
          colorScheme="blue"
          bg={"blue.300"}
          borderRadius={5}
          _hover={{
            backgroundColor: "blue.400",
            transition: ".2s ease-in-out",
            color: "white",
          }}
          onClick={() => navigate("/cart")}
        >
          Cart {cartNumber}
        </Badge>
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/singleItem" element={<SingleItem />} />
      </Routes>
    </>
  );
}

export default App;
