//import { Input } from "semantic-ui-react";
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
import MobileSearchListItem from "../components/MobileSearchListItem";

import { Provider, useSelector, useDispatch } from "react-redux";

export default function Header() {
  const [searchWord, setSearchWord] = useState("");
  const [loginFormOpened, setLoginFormOpened] = useState(false);
  const {
    header: { loginFormVisible, notificationsVisible, mobileSearchVisible },
    modalCloser: { opened: modalCloserOpened },
    body: { cartReviewVisible },
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
              onClick={() => {
                if (notificationsVisible) {
                  return;
                } else {
                  dispatch({
                    type: "TOGGLE_NOTIFICATIONS",
                  });
                }
              }}
            >
              <NotificationIcon className="notification-icon" />
              <span className="notifications-wrapper">
                <h4 className="notifications-title">Bildirimler</h4>
                <ul>
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
                </ul>
              </span>
            </span>
            <span
              className={clsx({
                "login-icon-wrapper": true,
                "login-form-active": loginFormVisible,
              })}
              onClick={() => {
                if (loginFormVisible) {
                  return;
                } else {
                  dispatch({
                    type: "TOGGLE_LOGIN_FORM",
                  });
                }
              }}
            >
              <ProfileIcon className="login-icon" />
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
              onClick={() => {
                if (cartReviewVisible) {
                  console.log("actşve");
                  return;
                } else {
                  console.log("dispatched");
                  dispatch({
                    type: "TOGGLE_CART_REVIEW",
                  });
                }
              }}
            >
              <CartIcon />
            </span>
            <span
              className="search-icon-wrapper"
              onClick={() => {
                dispatch({
                  type: "TOGGLE_MOBILE_SEARCH",
                });
              }}
            >
              <SearchIcon />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
