import { Badge, Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./css/carousel.css";
import { AppState } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const CarouselComponent = ({ data }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // Number of items to slide at once
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  const { setSingleData } = AppState();
  const navigate = useNavigate();
  const handleClick = (ele) => {
    setSingleData(ele);
    navigate("/singleItem");
  };

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={2000}
      keyBoardControl={true}
      customTransition="all 1.1s ease-in-out"
      transitionDuration={2000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {data.map((ele) => {
        return (
          <Box
            cursor={"pointer"}
            margin={"20px"}
            marginLeft={"50px"}
            onClick={() => handleClick(ele)}
            key={ele._id}
          >
            <Image boxSize={"180px"} src={ele.image} alt={ele.name} />
            <Text fontSize="2xl" fontWeight={"bold"}>
              {ele.name}
            </Text>
            <Text>
              Description : {ele.description.substring(0, 51) + "....."}
            </Text>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text fontSize={"large"}>Price: {ele.price}.00/-</Text>
              {ele.offer > 0 && (
                <Badge colorScheme="green" mt={2}>
                  {ele.offer}% Off
                </Badge>
              )}
            </Box>
            {ele.offer > 0 && (
              <Text fontSize={"larger"}>
                Discounted Price: {ele.price * (1 - ele.offer / 100).toFixed(2)}
                /-rs.
              </Text>
            )}
          </Box>
        );
      })}
    </Carousel>
  );
};

export default CarouselComponent;
