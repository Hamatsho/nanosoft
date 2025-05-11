import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Zoom, Autoplay , 
    EffectCube
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import "swiper/css/autoplay";
import "swiper/css/effect-cube";
import "./SwipGallery.css"; // لإضافة التنسيق


const Swip = ({images}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  if(!images) return;

  // const images = [
  //   "/imgs/nano.jpeg",
  //   "/imgs/landing1.webp",
  //   "/imgs/nanologo.png",

  //   "/imgs/nanologo.png",
  //   "/imgs/nanologo.webp",
  // ];

  return (
    <div className="swip-container">

      {images.length > 0 ? 
      <Swiper
        modules={[Navigation, Thumbs, Zoom, Autoplay, EffectCube]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        zoom={{
          maxRatio: 6,
          minRatio: 1,
        }}
        onZoomChange={(swiper, scale) => {
          if (scale > 1) swiper.autoplay.stop();
          else swiper.autoplay.start();
        }}
        speed={500}
        autoHeight={true}
        effect="cube"
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        // autoFocus={true}
        className="main-swiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} >
            <div className="slide " >
              <div className=" swiper-zoom-container">
                <img src={img.original} alt={`Photo_${index + 1}`} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
        : null }
      {/* معرض الصور المصغرة */}
      {images.length > 1 ?
      
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        watchSlidesProgress
        className="thumbs-swiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img.original} alt={`Thumb ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
 : null}
    </div>
  );
};

export default Swip;
