import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Button, Input, Grid, Dropdown } from "semantic-ui-react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

import ArrowIcon from "../public/icons/arrow.svg";
import PlusIcon from "../public/icons/plus.svg";
import MinusIcon from "../public/icons/minus.svg";

export default function Home() {
  return (
    <>
      <section className="homepage">
        <Swiper
          className="homepage-slider"
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
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

        <div className="homepage-showcase-wrapper">
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
              prevEl: ".homepage-showcase-controller-prev",
              nextEl: ".homepage-showcase-controller-next",
            }}
          >
            <SwiperSlide>
              <div className="showcase-product-wrapper">
                <div className="showcase-product-image">
                  <img src="/products/valorant-sweat-1.jpg" />
                </div>
                <div className="showcase-product-info">
                  <h4 className="showcase-product-name">Valorant Sweat - 1</h4>
                  <div className="showcase-product-options">
                    <div className="showcase-product-options-left" >
                      <div className="opt-el" >
                        <span className="minus-btn" >
                          <MinusIcon />
                        </span>
                      </div>
                      <div className="opt-el">
                      <input type="text" defaultValue={1} />
                      </div>
                      <div className="opt-el" >
                        <span className="plus-btn" >
                          <PlusIcon />
                        </span>
                      </div>
                    </div>
                    <div className="showcase-product-options-right" >
                      <Dropdown
                        placeholder='Beden Seçiniz'
                        selection
                        options={[
                          {
                            key: 'S',
                            text: 'S',
                            value: 'S',
                          },
                                                    {
                            key: 'M',
                            text: 'M',
                            value: 'M',
                          }
                        ]}
                      />
                    </div>
                  </div>
                  <div className="showcase-product-add-cart-btn" >
                    <span>SEPETE EKLE</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="showcase-product-wrapper">
                <div className="showcase-product-image">
                  <img src="/products/valorant-sweat-2.jpg" />
                </div>
                <div className="showcase-product-info">
                  <h4 className="showcase-product-name">Valorant Sweat - 2</h4>
                  <div className="showcase-product-options">
                    <div className="showcase-product-options-left" >
                      <div className="opt-el" >
                        <span className="minus-btn" >
                          <MinusIcon />
                        </span>
                      </div>
                      <div className="opt-el">
                      <input type="text" defaultValue={1} />
                      </div>
                      <div className="opt-el" >
                        <span className="plus-btn" >
                          <PlusIcon />
                        </span>
                      </div>
                    </div>
                    <div className="showcase-product-options-right" >
                      <Dropdown
                        placeholder='Beden Seçiniz'
                        selection
                        options={[
                          {
                            key: 'S',
                            text: 'S',
                            value: 'S',
                          },
                                                    {
                            key: 'M',
                            text: 'M',
                            value: 'M',
                          }
                        ]}
                      />
                    </div>
                  </div>
                  <div className="showcase-product-add-cart-btn" >
                    <span>SEPETE EKLE</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="showcase-product-wrapper">
                <div className="showcase-product-image">
                  <img src="/products/valorant-sweat-3.jpg" />
                </div>
                <div className="showcase-product-info">
                  <h4 className="showcase-product-name">Valorant Sweat - 3</h4>
                  <div className="showcase-product-options">
                    <div className="showcase-product-options-left" >
                      <div className="opt-el" >
                        <span className="minus-btn" >
                          <MinusIcon />
                        </span>
                      </div>
                      <div className="opt-el">
                      <input type="text" defaultValue={1} />
                      </div>
                      <div className="opt-el" >
                        <span className="plus-btn" >
                          <PlusIcon />
                        </span>
                      </div>
                    </div>
                    <div className="showcase-product-options-right" >
                      <Dropdown
                        placeholder='Beden Seçiniz'
                        selection
                        options={[
                          {
                            key: 'S',
                            text: 'S',
                            value: 'S',
                          },
                                                    {
                            key: 'M',
                            text: 'M',
                            value: 'M',
                          }
                        ]}
                      />
                    </div>
                  </div>
                  <div className="showcase-product-add-cart-btn" >
                    <span>SEPETE EKLE</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="showcase-product-wrapper">
                <div className="showcase-product-image">
                  <img src="/products/valorant-sweat-4.jpg" />
                </div>
                <div className="showcase-product-info">
                  <h4 className="showcase-product-name">Valorant Sweat - 4</h4>
                  <div className="showcase-product-options">
                    <div className="showcase-product-options-left" >
                      <div className="opt-el" >
                        <span className="minus-btn" >
                          <MinusIcon />
                        </span>
                      </div>
                      <div className="opt-el">
                      <input type="text" defaultValue={1} />
                      </div>
                      <div className="opt-el" >
                        <span className="plus-btn" >
                          <PlusIcon />
                        </span>
                      </div>
                    </div>
                    <div className="showcase-product-options-right" >
                      <Dropdown
                        placeholder='Beden Seçiniz'
                        selection
                        options={[
                          {
                            key: 'S',
                            text: 'S',
                            value: 'S',
                          },
                                                    {
                            key: 'M',
                            text: 'M',
                            value: 'M',
                          }
                        ]}
                      />
                    </div>
                  </div>
                  <div className="showcase-product-add-cart-btn" >
                    <span>SEPETE EKLE</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="showcase-product-wrapper">
                <div className="showcase-product-image">
                  <img src="/products/valorant-sweat-5.jpg" />
                </div>
                <div className="showcase-product-info">
                  <h4 className="showcase-product-name">Valorant Sweat - 5</h4>
                  <div className="showcase-product-options">
                    <div className="showcase-product-options-left" >
                      <div className="opt-el" >
                        <span className="minus-btn" >
                          <MinusIcon />
                        </span>
                      </div>
                      <div className="opt-el">
                      <input type="text" defaultValue={1} />
                      </div>
                      <div className="opt-el" >
                        <span className="plus-btn" >
                          <PlusIcon />
                        </span>
                      </div>
                    </div>
                    <div className="showcase-product-options-right" >
                      <Dropdown
                        placeholder='Beden Seçiniz'
                        selection
                        options={[
                          {
                            key: 'S',
                            text: 'S',
                            value: 'S',
                          },
                                                    {
                            key: 'M',
                            text: 'M',
                            value: 'M',
                          }
                        ]}
                      />
                    </div>
                  </div>
                  <div className="showcase-product-add-cart-btn" >
                    <span>SEPETE EKLE</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="showcase-product-wrapper">
                <div className="showcase-product-image">
                  <img src="/products/valorant-sweat-6.jpg" />
                </div>
                <div className="showcase-product-info">
                  <h4 className="showcase-product-name">Valorant Sweat - 6</h4>
                  <div className="showcase-product-options">
                    <div className="showcase-product-options-left" >
                      <div className="opt-el" >
                        <span className="minus-btn" >
                          <MinusIcon />
                        </span>
                      </div>
                      <div className="opt-el">
                      <input type="text" defaultValue={1} />
                      </div>
                      <div className="opt-el" >
                        <span className="plus-btn" >
                          <PlusIcon />
                        </span>
                      </div>
                    </div>
                    <div className="showcase-product-options-right" >
                      <Dropdown
                        placeholder='Beden Seçiniz'
                        selection
                        options={[
                          {
                            key: 'S',
                            text: 'S',
                            value: 'S',
                          },
                                                    {
                            key: 'M',
                            text: 'M',
                            value: 'M',
                          }
                        ]}
                      />
                    </div>
                  </div>
                  <div className="showcase-product-add-cart-btn" >
                    <span>SEPETE EKLE</span>
                  </div>
                </div>
              </div>
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
      </section>
    </>
  );
}
