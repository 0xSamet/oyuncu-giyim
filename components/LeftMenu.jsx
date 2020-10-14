import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import SweatIcon from "../public/icons/sweat.svg";
import HomeIcon from "../public/icons/home.svg";
import ShirtIcon from "../public/icons/tshirt.svg";

export default function LeftMenu() {
  const [menuIndex, setMenuIndex] = useState(-1);
  return (
    <ul className="main-menu">
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
          active: menuIndex === 2,
        })}
        onClick={() => setMenuIndex(2)}
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
    </ul>
  );
}
