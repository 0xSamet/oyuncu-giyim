import { Input } from "semantic-ui-react";
import { useState } from "react";

import CartIcon from "../public/icons/cart.svg";
import ProfileIcon from "../public/icons/profile.svg";
import NotificationIcon from "../public/icons/notification.svg";

export default function Header() {
  const [searchWord, setSearchWord] = useState("");
  return (
    <header>
      <div className="logo-wrapper">
        <img className="logo" src="/oyuncu-giyim-logo.png" />
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
            <NotificationIcon className="notification-icon" />
            <ProfileIcon className="profile-icon" />
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
