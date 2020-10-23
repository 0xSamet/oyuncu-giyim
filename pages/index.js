import Head from "next/head";
import { useState } from "react";
import { Button, Input, Grid, Dropdown } from "semantic-ui-react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import ShowCase from "../components/ShowCase"

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Home() {
  return (
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
  );
}
