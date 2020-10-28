import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

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
        <img src="https://cdn.pixabay.com/photo/2019/11/02/21/45/maple-leaf-4597501_960_720.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://cdn.pixabay.com/photo/2020/10/10/17/53/sunrise-5643811_960_720.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://cdn.pixabay.com/photo/2020/10/03/17/44/mountain-5624148_960_720.jpg" />
      </SwiperSlide>
    </Swiper>
  );
}
