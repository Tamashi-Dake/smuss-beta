"use client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface WrapperProps {
  children: React.ReactNode;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 2, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Carousel
      swipeable={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      containerClass="carousel-container"
      removeArrowOnDeviceType={["mobile"]}
      // arrows={false}
      renderButtonGroupOutside={true}
      // customButtonGroup={<ButtonGroup />}
      className="w-full grow-1"
    >
      {children}
    </Carousel>
  );
};
// const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
//   const {
//     carouselState: { currentSlide },
//   } = rest;
//   return (
//     <div
//       className="carousel-button-group mb-4  gap-4 flex justify-end
//           items-center w-full"
//     >
//       <button className={"p-3 "
//       + (currentSlide === 0 ? "hidden" : "")
//     } onClick={() => previous()}>
//         {" "}
//         <FaArrowLeft />
//       </button>
//       <button onClick={() => next()}>
//         <span className={"p-3 "+
//         currentSlide
//       }>
//           <FaArrowRight />
//         </span>
//       </button>
//     </div>
//   );
// };
export default Wrapper;
