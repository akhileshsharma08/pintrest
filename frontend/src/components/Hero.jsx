import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import YellowSection from "./YellowSection";
import GreenSection from "./GreenSection";
import SignUpSection from "./SignUpSection";

const tagline = [
  { id: 1, tagline: "home decor ideas", color: "text-blue-500" },
  { id: 2, tagline: "Outfit ideas", color: "text-yellow-700" },
  { id: 3, tagline: "DIY ideas", color: "text-pink-500" },
  { id: 4, tagline: "chai snacks ideas", color: "text-green-500" },
  { id: 5, tagline: "technology ideas", color: "text-purple-500" },
];

const Hero = () => {
  return (
    <>
      <div className="mx-auto h-[80vh] ">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          modules={[Pagination]}
          loop={true}
          rewind={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          freeMode={true}
          scrollbar={{ draggable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {tagline.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="herotext my-20 ">
                <h1 className="text-5xl font-semibold text-gray-700 my-2 text-center">
                  Get Your Next
                </h1>
                <h1
                  data-aos="fade-up"
                  data-aos-dela="400"
                  data-aos-duration="1000"
                  className={`${item.color} text-5xl font-semibold my-2 text-center capitalize`}
                >
                  {item.tagline}
                </h1>
              </div>{" "}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <YellowSection />
      <GreenSection />
      <SignUpSection/>
    </>
  );
};

export default Hero;
