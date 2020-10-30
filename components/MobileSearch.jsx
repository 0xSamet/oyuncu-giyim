import { Input } from "semantic-ui-react";
import SearchIcon from "../public/icons/search.svg";
import ArrowIcon from "../public/icons/arrow.svg";
import CancelIcon from "../public/icons/cancel.svg";

import { useState } from "react";

import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { closeAllModals } from "../store/reducers/modals";

function MobileSearchListItem({ productId }) {
  return (
    <li className="product">
      <div className="product-image">
        <img src={`/products/valorant-sweat-${productId}.jpg`} />
      </div>
      <div className="product-informations">
        <h3 className="product-name">Valorant Sweat Gri</h3>
        <span className="product-price">
          99.90&#8378; <span className="old-price">129.90&#8378;</span>
        </span>
      </div>
    </li>
  );
}

function MobileSearchNotFound() {
  return (
    <li className="not-found">
      <span>Ürün Bulunamadı</span>
    </li>
  );
}

export default function MobileSearch() {
  const [searchWord, setSearchWord] = useState("");
  const {
    modals: { mobileSearchVisible },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div
      className={clsx({
        "mobile-search-wrapper": true,
        "mobile-search-active": mobileSearchVisible,
      })}
      data-scroll-lock-scrollable=""
    >
      <div className="input-wrapper">
        <div
          className="go-back-icon"
          onClick={() => dispatch(closeAllModals())}
        >
          <ArrowIcon />
        </div>
        <Input
          placeholder="Ürün Ara"
          value={searchWord || ""}
          icon={
            searchWord !== "" ? (
              <CancelIcon onClick={() => setSearchWord("")} />
            ) : (
              <SearchIcon />
            )
          }
          loading={searchWord !== ""}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
      </div>
      <div className="search-results-wrapper">
        <ul className="search-results">
          {searchWord !== "" && (
            <>
              <h6 className="title">Arama Sonuçları</h6>
              {/* <MobileSearchListItem productId={1} />
              <MobileSearchListItem productId={1} />
              <MobileSearchListItem productId={1} /> */}
              <MobileSearchNotFound />
            </>
          )}
          <h6
            className={clsx({
              title: true,
              "popular-products-title": true,
              searched: searchWord !== "",
            })}
          >
            Popüler Ürünler
          </h6>
          <MobileSearchListItem productId={1} />
          <MobileSearchListItem productId={2} />
          <MobileSearchListItem productId={3} />
          <MobileSearchListItem productId={2} />
          <MobileSearchListItem productId={3} />
          <MobileSearchListItem productId={2} />
          <MobileSearchListItem productId={3} />
          <MobileSearchListItem productId={2} />
          <MobileSearchListItem productId={3} />
        </ul>
      </div>
    </div>
  );
}
