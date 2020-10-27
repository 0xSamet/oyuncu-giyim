import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import ShowCase from "../ShowCase";
import Layout from "./Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { changeDesktopMenuIndex } from "../../store/reducers/menu";

SwiperCore.use([Navigation]);

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeDesktopMenuIndex(0));
  }, []);
  return (
    <Layout title="Anasayfa - Oyuncu Giyim">
      <section className="homepage">
        <Swiper
          className="homepage-slider"
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={(swiper) => console.log(swiper)}
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

        <ShowCase showCaseId={1} />
        <ShowCase showCaseId={2} />
        <ShowCase showCaseId={3} />
      </section>
    </Layout>
  );
}
