import { Input } from "semantic-ui-react";
import { useState } from "react";

import CartIcon from "../public/icons/cart.svg";
import ProfileIcon from "../public/icons/profile.svg";
import NotificationIcon from "../public/icons/notification.svg";
import MasterCardIcon from "../public/icons/mastercard.svg";
import VisaCardIcon from "../public/icons/visacard.svg";

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
