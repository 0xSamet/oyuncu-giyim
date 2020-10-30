import MobileSearchListItem from "./MobileSearchListItem";
import { Input } from "semantic-ui-react";
import SearchIcon from "../public/icons/search.svg";
import ArrowIcon from "../public/icons/arrow.svg";
import CancelIcon from "../public/icons/cancel.svg";
import { useState } from "react";

import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { closeAllModals } from "../store/reducers/modals";

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
              <MobileSearchListItem productId={1} />
              <MobileSearchListItem productId={1} />
              <MobileSearchListItem productId={1} />
            </>
          )}
          <h6 className="title popular-products-title">Popüler Ürünler</h6>
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
