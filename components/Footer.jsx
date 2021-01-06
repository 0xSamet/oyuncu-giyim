import { Input } from "semantic-ui-react";
import { useState } from "react";

import CartIcon from "../public/static/icons/cart.svg";
import ProfileIcon from "../public/static/icons/profile.svg";
import NotificationIcon from "../public/static/icons/notification.svg";
import MasterCardIcon from "../public/static/icons/mastercard.svg";
import VisaCardIcon from "../public/static/icons/visacard.svg";

export default function Header() {
  const [searchWord, setSearchWord] = useState("");
  return (
    <footer>
      <div className="footer-left">
        <p className="copyright">
          Copyright © 2019, Oyuncu Giyim, Tüm Hakları Saklıdır.
        </p>
      </div>
      <div className="footer-right">
        <div className="informations-wrapper">
          <span>Gizlilik Sözleşmesi</span>
          <span>Çerezler</span>
        </div>
        <div className="payments-wrapper">
          <MasterCardIcon className="mastercard-icon" />
          <VisaCardIcon />
        </div>
      </div>
    </footer>
  );
}
