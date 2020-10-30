import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ShowCase from "../ShowCase";
import MainSlider from "../MainSlider";
import Layout from "./Layout";

SwiperCore.use([Navigation]);

export default function Home() {
  return (
    <Layout title="Anasayfa - Oyuncu Giyim">
      <section className="homepage">
        <MainSlider />
        <ShowCase showCaseId={1} />
        <ShowCase showCaseId={2} />
        <ShowCase showCaseId={3} />
      </section>
    </Layout>
  );
}
