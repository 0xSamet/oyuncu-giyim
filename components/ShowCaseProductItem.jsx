import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import ArrowIcon from "../public/icons/arrow.svg";
import PlusIcon from "../public/icons/plus.svg";
import MinusIcon from "../public/icons/minus.svg";

export default function ShowCaseProductItem({ productId }) {
    const [selectingSize, setSelectingSize] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [productPiece, setProductPiece] = useState(1);
  return (
      <div className={clsx({
          "showcase-product-wrapper": true,
          "selecting-size": selectingSize
              })}>
                <div className="showcase-product-image">
                  <img src={`/products/valorant-sweat-${productId}.jpg`} />
                  <div className="showcase-product-price-wrapper" >
                    <span className="showcase-product-price">
                      99.90&#8378;
                      <span className="showcase-product-old-price">
                        155&#8378;
                      </span>   
                    </span>
                  </div>
                  <div className="showcase-sizes-wrapper" >
                    <ul>
                      <li className="hide-sizes" onClick={() => setSelectingSize(false)}>
                        <ArrowIcon />
                      </li>
                      <li onClick={
                          () => setSelectedSize("S")
                      }>S</li>
                      <li onClick={
                          () => setSelectedSize("M")
                      }>M</li>
                      <li onClick={
                          () => setSelectedSize("L")
                      }>L</li>
                      <li onClick={
                          () => setSelectedSize("XL")
                      }>XL</li>
                      <li onClick={
                          () => setSelectedSize("XXL")
                      }>XXL</li>
                    </ul>
                  </div>
                </div>
      <div className="showcase-product-info">
        
                  <Link href="#"  >
                    <a className="showcase-product-name-wrapper">
                  <h4 className="showcase-product-name">Valorant Sweat - {productId}</h4>
                    </a>
                  </Link>
                  <div className="showcase-product-options">
                    <div className="showcase-product-options-left" >
                      <div className="opt-el" >
                          <span className="minus-btn" onClick={
                              () => {
                                  if (productPiece > 1) 
                                    setProductPiece(productPiece - 1);
                              }
                        } >
                          <MinusIcon />
                        </span>
                      </div>
                      <div className="opt-el">
                      <input type="text" value={productPiece} readOnly />
                      </div>
                      <div className="opt-el" >
                        <span className="plus-btn" onClick={
                              () => {
                                  setProductPiece(productPiece + 1);
                              }
                        } >
                          <PlusIcon />
                        </span>
                      </div>
                    </div>
          <div className="showcase-product-options-right" onClick={() => {
            if (selectingSize) {
              return setSelectingSize(false)
            }
            setSelectingSize(true);
          }} >
                      <span className="select-size-btn" >Beden Seç</span>
                      <span className="selected-size" >{selectedSize === "" ? "..." : selectedSize}</span>
                    </div>
                  </div>
              <div className="showcase-product-add-cart-btn" onClick={
                  () => {
                      if (selectedSize === "") {
                        return setSelectingSize(true);
                      } else {
                          console.log("eklendi");
                      }
                  }
                  } >
                    <span>SEPETE EKLE</span>
                  </div>
                </div>
              </div>
  );
}
