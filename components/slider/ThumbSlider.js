"use client";
import { useState } from "react";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ThumbSlider(params) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      {/* Main Image Slider */}
      <div className="swiper property-gallary2">
        <Swiper
          spaceBetween={10}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="swiper-wrapper"
        >
          {params.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="slide-wrapper">
                <img src={image} alt={image} className="swiper-slide-img" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-next" />
        <div className="swiper-button-prev" />

        <style jsx>{`
          .property-gallary2 {
            width: 100%; /* Full-width container */
            height: auto; /* Adapt to content */
          }

          .slide-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 300px; /* Set a maximum height for consistent layout */
            overflow: hidden; /* Avoid overflow issues with large images */
          }

          .swiper-slide-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain; /* Ensures the image scales proportionally */
          }

          .swiper-button-next,
          .swiper-button-prev {
            z-index: 10; /* Ensures buttons stay on top */
          }
        `}</style>
      </div>

      {/* Thumbnail Slider */}
      <div className="swiper property-gallary">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={20}
          slidesPerView={7}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          breakpoints={{
            0: {
              slidesPerView: 3,
            },
            480: {
              slidesPerView: 3,
            },
            767: {
              slidesPerView: 5,
            },
          }}
          className="swiper-wrapper"
        >
          {params.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="thumb-image">
                <img src={image} alt={image} className="img-fluid" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
