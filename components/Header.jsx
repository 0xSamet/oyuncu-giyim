//import { Input } from "semantic-ui-react";
import { useState } from "react";
import Link from "next/link";

import CartIcon from "../public/icons/cart.svg";
import ProfileIcon from "../public/icons/profile.svg";
import NotificationIcon from "../public/icons/notification.svg";

import { Button, Divider, Input, Segment, Checkbox } from "semantic-ui-react";

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
                {/* <ul>
                  <li>
                    <a>Giriş Yap</a>
                  </li>
                  <li>
                    <a>Kayıt Ol</a>
                  </li>
                </ul> */}
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
            <span className="cart-icon-wrapper">
              <CartIcon />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
