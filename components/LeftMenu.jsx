import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useDispatch } from "react-redux";

import SweatIcon from "../public/icons/sweat.svg";
import HomeIcon from "../public/icons/home.svg";
import ShirtIcon from "../public/icons/tshirt.svg";
import ArrowIcon from "../public/icons/arrow.svg";
import ClockIcon from "../public/icons/clock.svg";
import PaperPlaneIcon from "../public/icons/paper-plane.svg";

export default function LeftMenu() {
  const [menuIndex, setMenuIndex] = useState(-1);
  const dispatch = useDispatch();

  const handleIconMode = () =>
    dispatch({
      type: "TOGGLE_ICONMODE",
    });
  return (
    <ul className="main-menu">
      <li>
        <a>
          <span className="main-menu-logo-wrapper" onClick={handleIconMode}>
            <ArrowIcon />
          </span>
          <span className="main-menu-text-wrapper"></span>
        </a>
      </li>
      <li
        className={clsx({
          active: menuIndex === 0,
        })}
        onClick={() => setMenuIndex(0)}
      >
        <Link href="/">
          <a>
            <span className="main-menu-logo-wrapper">
              <HomeIcon />
            </span>
            <span className="main-menu-text-wrapper">Anasayfa</span>
          </a>
        </Link>
      </li>
      <li
        className={clsx({
          active: menuIndex === 1,
        })}
        onClick={() => setMenuIndex(1)}
      >
        <Link href="/on-siparis">
          <a>
            <span className="main-menu-logo-wrapper">
              <ClockIcon />
            </span>
            <span className="main-menu-text-wrapper">Ön Sipariş</span>
          </a>
        </Link>
      </li>
      <li
        className={clsx({
          active: menuIndex === 2,
        })}
        onClick={() => setMenuIndex(2)}
      >
        <Link href="/sweatler">
          <a>
            <span className="main-menu-logo-wrapper">
              <SweatIcon />
            </span>
            <span className="main-menu-text-wrapper">Sweatler</span>
          </a>
        </Link>
      </li>
      <li
        className={clsx({
          active: menuIndex === 3,
        })}
        onClick={() => setMenuIndex(3)}
      >
        <Link href="/t-shirtler">
          <a>
            <span className="main-menu-logo-wrapper">
              <ShirtIcon />
            </span>
            <span className="main-menu-text-wrapper">T-Shirtler</span>
          </a>
        </Link>
      </li>
      <li
        className={clsx({
          active: menuIndex === 4,
        })}
        onClick={() => setMenuIndex(4)}
      >
        <Link href="/iletisim">
          <a>
            <span className="main-menu-logo-wrapper">
              <PaperPlaneIcon />
            </span>
            <span className="main-menu-text-wrapper">İletişim</span>
          </a>
        </Link>
      </li>
    </ul>
  );
}
