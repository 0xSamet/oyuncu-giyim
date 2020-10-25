import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useDispatch } from "react-redux";

import SweatIcon from "../public/icons/sweat.svg";
import HomeIcon from "../public/icons/home.svg";
import PaperPlaneIcon from "../public/icons/paper-plane.svg";
import CartIcon from "../public/icons/cart.svg";
import ProfileIcon from "../public/icons/profile2.svg";

export default function LeftMenu() {
  const [menuIndex, setMenuIndex] = useState(-1);
  const dispatch = useDispatch();

  return (
    <div className="mobile-menu-wrapper">
      <ul className="mobile-menu">
        <li
          className={clsx({
            active: menuIndex === 2,
          })}
          onClick={() => setMenuIndex(2)}
        >
          <Link href="/kategoriler" as="/kategoriler">
            <a>
              <span className="mobile-menu-logo-wrapper">
                <SweatIcon />
              </span>
              <span className="mobile-menu-text-wrapper">Kategoriler</span>
            </a>
          </Link>
        </li>
        <li
          className={clsx({
            active: menuIndex === 5,
          })}
          onClick={() => setMenuIndex(5)}
        >
          <Link href="/giris-yap" as="/giris-yap">
            <a>
              <span className="mobile-menu-logo-wrapper">
                <ProfileIcon />
              </span>
              <span className="mobile-menu-text-wrapper">Giriş Yap</span>
            </a>
          </Link>
        </li>
        <li
          className={clsx({
            homepage: true,
            active: menuIndex === 0,
          })}
          onClick={() => setMenuIndex(0)}
        >
          <Link href="/" as="/">
            <a>
              <span className="mobile-menu-logo-wrapper">
                <HomeIcon />
              </span>
              <span className="mobile-menu-text-wrapper">Anasayfa</span>
            </a>
          </Link>
        </li>
        <li
          className={clsx({
            active: menuIndex === 6,
          })}
          onClick={() => setMenuIndex(6)}
        >
          <Link href="/sepetim" as="/sepetim">
            <a>
              <span className="mobile-menu-logo-wrapper">
                <CartIcon />
              </span>
              <span className="mobile-menu-text-wrapper">Sepet</span>
            </a>
          </Link>
        </li>
        <li
          className={clsx({
            active: menuIndex === 7,
          })}
          onClick={() => setMenuIndex(7)}
        >
          <Link href="/iletisim" as="/iletisim">
            <a>
              <span className="mobile-menu-logo-wrapper">
                <PaperPlaneIcon />
              </span>
              <span className="mobile-menu-text-wrapper">İletişim</span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
