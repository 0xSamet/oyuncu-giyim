import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import ShowCaseProduct from "./ShowCaseProduct";
import ArrowIcon from "../public/icons/arrow.svg";

export default function ShowCase({ showCaseId }) {
  const {
    theme: { iconMode },
  } = useSelector((state) => state);
  const [showcase, setShowcase] = useState(undefined);
  useEffect(() => {
    if (showcase) {
      setTimeout(() => {
        showcase.update();
      }, 500);
    }
  }, [iconMode]);
  return (
    <div
      className={`homepage-showcase-wrapper homepage-showcase-${showCaseId}`}
    >
      <h2 className="homepage-showcase-title">Son Eklenen Ürünler</h2>
      <Swiper
        className="homepage-showcase"
        spaceBetween={30}
        slidesPerView={3}
        onSwiper={(swiper) => setShowcase(swiper)}
        loop
        centeredSlides
        navigation={{
          prevEl: `.homepage-showcase-${showCaseId} .homepage-showcase-controller-prev`,
          nextEl: `.homepage-showcase-${showCaseId} .homepage-showcase-controller-next`,
        }}
        shortSwipes={false}
        longSwipesRatio={0.2}
        longSwipesMs={0}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          678: {
            slidesPerView: 2,
          },
          1001: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide>
          <ShowCaseProduct productId={1} />
        </SwiperSlide>
        <SwiperSlide>
          <ShowCaseProduct productId={2} />
        </SwiperSlide>
        <SwiperSlide>
          <ShowCaseProduct productId={3} />
        </SwiperSlide>
        <SwiperSlide>
          <ShowCaseProduct productId={4} />
        </SwiperSlide>
        <SwiperSlide>
          <ShowCaseProduct productId={5} />
        </SwiperSlide>
        <SwiperSlide>
          <ShowCaseProduct productId={6} />
        </SwiperSlide>
      </Swiper>
      <div className="homepage-showcase-controller">
        <div className="homepage-showcase-controller-btn homepage-showcase-controller-prev">
          <ArrowIcon />
        </div>
        <div className="homepage-showcase-controller-btn homepage-showcase-controller-next">
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
}
