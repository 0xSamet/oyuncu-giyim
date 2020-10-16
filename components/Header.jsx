import { Input } from "semantic-ui-react";
import { useState } from "react";
import Link from "next/link";

import CartIcon from "../public/icons/cart.svg";
import ProfileIcon from "../public/icons/profile.svg";
import NotificationIcon from "../public/icons/notification.svg";

export default function Header() {
  const [searchWord, setSearchWord] = useState("");
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
            loading={searchWord !== ""}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          />
        </div>
        <div className="header-right-right col-md-2">
          <div className="header-right-icon-wrapper">
            <span className="notification-icon-wrapper">
              <NotificationIcon className="notification-icon" />
            </span>
            <span className="login-icon-wrapper">
              <ProfileIcon className="login-icon" />
              <span className="login-options-wrapper">
                <ul>
                  <li>
                    <a>Giriş Yap</a>
                  </li>
                  <li>
                    <a>Kayıt Ol</a>
                  </li>
                </ul>
              </span>
            </span>
            <span className="cart-icon-wrapper">
              <CartIcon />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
