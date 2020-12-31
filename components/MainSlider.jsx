import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function MainSlider() {
  const {
    theme: { iconMode },
  } = useSelector((state) => state);
  const [slider, setSlider] = useState(undefined);
  useEffect(() => {
    if (slider) {
      setTimeout(() => {
        slider.update();
      }, 500);
    }
  }, [iconMode]);

  return (
    <Swiper
      className="homepage-slider"
      spaceBetween={0}
      slidesPerView={1}
      onSwiper={(swiper) => setSlider(swiper)}
      loop
    >
      <SwiperSlide>
        <Image
          src="/slider/slider-1.jpg"
          layout="intrinsic"
          width={1165}
          height={550}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/slider/slider-2.jpg"
          layout="intrinsic"
          width={1165}
          height={550}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/slider/slider-3.jpg"
          layout="intrinsic"
          width={1165}
          height={550}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/slider/slider-4.jpg"
          layout="intrinsic"
          width={1165}
          height={550}
        />
      </SwiperSlide>
    </Swiper>
  );
}
