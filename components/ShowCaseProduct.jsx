import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import ArrowIcon from "../public/icons/arrow.svg";
import PlusIcon from "../public/icons/plus.svg";
import MinusIcon from "../public/icons/minus.svg";

export default function ShowCaseProductItem({ productId }) {
  const [selectingSize, setSelectingSize] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [productPiece, setProductPiece] = useState(1);
  return (
    <div
      className={clsx({
        "showcase-product-wrapper": true,
        "selecting-size": selectingSize,
      })}
    >
      <div className="showcase-product-image">
        <img src={`/products/valorant-sweat-${productId}.jpg`} />
      </div>
      <div className="showcase-product-info">
        <Link href="#">
          <a className="showcase-product-name-wrapper">
            <h4 className="showcase-product-name">
              Valorant Sweat - {productId}
            </h4>
          </a>
        </Link>
        <span className="showcase-product-price">
          99.90&#8378;
          <span className="showcase-product-old-price">155&#8378;</span>
        </span>
      </div>
    </div>
  );
}
