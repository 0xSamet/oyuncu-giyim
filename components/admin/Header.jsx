import { useSelector, useDispatch } from "react-redux";

import Link from "next/link";
import clsx from "clsx";

import ProfileIcon from "../../public/static/icons/profile.svg";
import HamburgerMenuIcon from "../../public/static/icons/admin/hamburger.svg";
import { Button, Divider, Input, Checkbox } from "semantic-ui-react";

import {
  toggleAdminLoginForm,
  toggleAdminMobileMenu,
} from "../../store/reducers/admin";

export default function Header() {
  const {
    admin: { adminLoginFormVisible },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <header>
      <div
        className="mobile-hamburger"
        onClick={() => {
          dispatch(toggleAdminMobileMenu());
        }}
      >
        <HamburgerMenuIcon />
      </div>
      <div className="logo-wrapper">
        <Link href="/admin/dashboard">
          <a>
            <img className="logo" src="/static/oyuncu-giyim-logo.png" />
          </a>
        </Link>
      </div>
      <div className="header-right row">
        <div className="header-right-left col-md-10"></div>
        <div className="header-right-right col-md-2">
          <div className="header-right-icon-wrapper">
            <span
              className={clsx({
                "login-icon-wrapper": true,
                "login-form-active": adminLoginFormVisible,
              })}
            >
              <ProfileIcon
                className="login-icon"
                onClick={() => dispatch(toggleAdminLoginForm())}
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
                    loading={false}
                  />
                  <Input placeholder="Şifre" size="small" loading={false} />
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
          </div>
        </div>
      </div>
    </header>
  );
}
