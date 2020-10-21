//import { Input } from "semantic-ui-react";
import { useState } from "react";
import Link from "next/link";

import ArrowIcon from "../public/icons/arrow.svg";

import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";

import { Provider, useSelector, useDispatch } from "react-redux";

import ShowCaseProduct from '../components/ShowCaseProductItem'


export default function ShowCase({showCaseId}) {
  const {
    header: { loginFormVisible, notificationsVisible },
    modalCloser: { opened: modalCloserOpened },
    body: { cartReviewVisible },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
        <div className={`homepage-showcase-wrapper homepage-showcase-${showCaseId}`} >
          <h2 className="homepage-showcase-title">Son Eklenen Ürünler</h2>
          <Swiper
            className="homepage-showcase"
            spaceBetween={30}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            loop
            centeredSlides
            navigation={{
              prevEl: `.homepage-showcase-${showCaseId} .homepage-showcase-controller-prev`,
              nextEl: `.homepage-showcase-${showCaseId} .homepage-showcase-controller-next`,
            }}
            
            breakpoints={
              {
                0: {
                  slidesPerView: 1,
                  centeredSlides: false
                },
                768: {       
                  slidesPerView: 2,
                  centeredSlides: false
                },
                1001: {
                                    slidesPerView: 3,
                  centeredSlides: true
                }
              }
            }
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
