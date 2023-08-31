import { Box, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CarouselComponent from "./CarouselComponent";
import ComboDataDisplay from "./ComboDataDisplay";
import { AppState } from "../context/ContextProvider";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [comboData, setComboData] = useState([]);
  const { setCartNumber, render, setRender } = AppState();

  useEffect(() => {
    setLoading(true);
    fetch(`https://e-comm-mf6t.onrender.com/getProduct`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));

    fetch(`https://e-comm-mf6t.onrender.com/getCombo`)
      .then((res) => res.json())
      .then((data) => {
        setComboData(data);
      })
      .catch((err) => console.log(err));

    fetch(`https://e-comm-mf6t.onrender.com/cart`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCartNumber(data.length);
        }
      });

    setLoading(false);
    setRender(false)
  }, [render]);

  return (
    <Box>
      {loading && (
        <Spinner
          thickness="6px"
          speed="0.95s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
      {data && <CarouselComponent data={data} />}
      <Box display={"flex"} marginTop={"40px"} ml={8}>
        {comboData &&
          comboData.map((ele) => (
            <ComboDataDisplay key={ele._id} comboData={ele} />
          ))}
      </Box>
    </Box>
  );
};

export default Home;
