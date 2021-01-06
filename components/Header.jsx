import { useState } from "react";
import Link from "next/link";

import CartIcon from "../public/static/icons/cart.svg";
import ProfileIcon from "../public/static/icons/profile.svg";
import NotificationIcon from "../public/static/icons/notification.svg";
import DeliveryTruckIcon from "../public/static/icons/delivery-truck.svg";
import CheckedIcon from "../public/static/icons/checked.svg";
import CancelIcon from "../public/static/icons/cancel.svg";
import SearchIcon from "../public/static/icons/search.svg";

import { Button, Divider, Input, Checkbox } from "semantic-ui-react";
import clsx from "clsx";

import { useSelector, useDispatch } from "react-redux";

import {
  toggleLoginForm,
  toggleNotifications,
  toggleCartReview,
  toggleMobileSearch,
  toggleDesktopSearch,
} from "../store/reducers/modals";

function DesktopSearchListItem({ productId }) {
  return (
    <li className="product">
      <div className="product-image">
        <img src={`/static/products/valorant-sweat-${productId}.jpg`} />
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
function DesktopSearchNotFound() {
  return (
    <li className="not-found">
      <span>Ürün Bulunamadı</span>
    </li>
  );
}

export default function Header() {
  const [searchWord, setSearchWord] = useState("");
  const {
    modals: { loginFormVisible, notificationsVisible, desktopSearchVisible },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <header>
      <div className="logo-wrapper">
        <Link href="/">
          <a>
            <img className="logo" src="/static/oyuncu-giyim-logo.png" />
          </a>
        </Link>
      </div>
      <div className="header-right row">
        <div className="header-right-left col-md-10">
          <Input
            placeholder="Ürün Ara"
            icon={<SearchIcon />}
            loading={searchWord !== ""}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
            onFocus={() => {
              if (!desktopSearchVisible) {
                dispatch(toggleDesktopSearch());
              }
            }}
            /*onBlur={() => dispatch(toggleDesktopSearch())}*/
          />

          <div className="desktop-search-wrapper">
            <ul>
              {searchWord.length > 3 ? (
                <>
                  <h6 className="title popular-products-title">
                    Arama Sonuçları
                  </h6>
                  <DesktopSearchNotFound />
                </>
              ) : (
                <>
                  <h6 className="title popular-products-title">
                    Popüler Ürünler
                  </h6>
                  <DesktopSearchListItem productId={1} />
                  <DesktopSearchListItem productId={2} />
                  <DesktopSearchListItem productId={2} />
                  <DesktopSearchListItem productId={2} />
                  <DesktopSearchListItem productId={2} />
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="header-right-right col-md-2">
          <div className="header-right-icon-wrapper">
            <span
              className={clsx({
                "notification-icon-wrapper": true,
                "notifications-active": notificationsVisible,
              })}
            >
              <NotificationIcon
                className="notification-icon"
                onClick={() => dispatch(toggleNotifications())}
              />
              <span className="notifications-wrapper">
                <h4 className="notifications-title">Bildirimler</h4>
                <ul data-scroll-lock-scrollable="">
                  <li>
                    <a>
                      <span className="notification-icon">
                        <DeliveryTruckIcon className="delivery-truck-icon" />
                      </span>
                      <div className="notification-right">
                        <h5 className="notification-title">
                          Siparişiniz Kargoya Verildi
                        </h5>
                        <p className="notification-description">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Distinctio, nostrum ipsa aperiam consequuntur
                          deserunt rem tempor
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span className="notification-icon">
                        <CheckedIcon className="checked-icon" />
                      </span>
                      <div className="notification-right">
                        <h5 className="notification-title">
                          Siparişiniz Onaylandı
                        </h5>
                        <p className="notification-description">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Distinctio, nostrum ipsa aperiam consequuntur
                          deserunt rem tempor
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span className="notification-icon">
                        <CancelIcon className="cancel-icon" />
                      </span>
                      <div className="notification-right">
                        <h5 className="notification-title">
                          Siparişiniz Onaylanamadı
                        </h5>
                        <p className="notification-description">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Distinctio, nostrum ipsa aperiam consequuntur
                          deserunt rem tempor
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span className="notification-icon">
                        <CancelIcon className="cancel-icon" />
                      </span>
                      <div className="notification-right">
                        <h5 className="notification-title">
                          Siparişiniz Onaylanamadı
                        </h5>
                        <p className="notification-description">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Distinctio, nostrum ipsa aperiam consequuntur
                          deserunt rem tempor
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>
              </span>
            </span>
            <span
              className={clsx({
                "login-icon-wrapper": true,
                "login-form-active": loginFormVisible,
              })}
            >
              <ProfileIcon
                className="login-icon"
                onClick={() => dispatch(toggleLoginForm())}
              />
              <span className="login-options-wrapper">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Input
                    placeholder="Mail Adresiniz"
                    size="small"
                    loading={searchWord !== ""}
                    onChange={(e) => {
                      setSearchWord(e.target.value);
                    }}
                  />
                  <Input
                    placeholder="Şifre"
                    size="small"
                    loading={searchWord !== ""}
                    onChange={(e) => {
                      setSearchWord(e.target.value);
                    }}
                  />
                  <div className="submit-row">
                    <Checkbox label="Beni Hatırla" />
                    <Button primary>Giriş Yap</Button>
                  </div>
                  <Divider horizontal>Veya</Divider>
                  <div className="register-row">
                    <Button primary fluid>
                      Kayıt Ol
                    </Button>
                  </div>
                </form>
              </span>
            </span>
            <span
              className="cart-icon-wrapper"
              onClick={() => dispatch(toggleCartReview())}
            >
              <CartIcon />
            </span>
            <span
              className="search-icon-wrapper"
              onClick={() => dispatch(toggleMobileSearch())}
            >
              <SearchIcon />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
