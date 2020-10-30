import { useState } from "react";
import Link from "next/link";

import CartIcon from "../public/icons/cart.svg";
import ProfileIcon from "../public/icons/profile.svg";
import NotificationIcon from "../public/icons/notification.svg";
import DeliveryTruckIcon from "../public/icons/delivery-truck.svg";
import CheckedIcon from "../public/icons/checked.svg";
import CancelIcon from "../public/icons/cancel.svg";
import SearchIcon from "../public/icons/search.svg";

import { Button, Divider, Input, Segment, Checkbox } from "semantic-ui-react";
import clsx from "clsx";

import { useSelector, useDispatch } from "react-redux";

import {
  toggleLoginForm,
  toggleNotifications,
  toggleCartReview,
  toggleMobileSearch,
} from "../store/reducers/modals";

export default function Header() {
  const [searchWord, setSearchWord] = useState("");
  const {
    modals: { loginFormVisible, notificationsVisible },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <header>
      <div className="logo-wrapper">
        <Link href="/" as="/">
          <a>
            <img className="logo" src="/oyuncu-giyim-logo.png" />
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
          />
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
