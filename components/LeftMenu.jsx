import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import SweatIcon from "../public/icons/sweat.svg";
import HomeIcon from "../public/icons/home.svg";
import ShirtIcon from "../public/icons/tshirt.svg";
import ArrowIcon from "../public/icons/arrow.svg";
import PaperPlaneIcon from "../public/icons/paper-plane.svg";
import InstagramIcon from "../public/icons/instagram.svg";
import WPIcon from "../public/icons/whatsapp.svg";
import CategoriesIcon from "../public/icons/categories.svg";

import { useSpring, animated } from "react-spring";

import { toggleIconMode } from "../store/reducers/theme";

function LeftMenuListItem({
  index = -4,
  text,
  link: { href = "#", as = "#" },
  logo,
  submenu = [],
}) {
  const {
    menu: {
      desktopMenu: { index: indexFromStore },
    },
  } = useSelector((state) => state);

  const [toggle, setToggle] = useState(false);
  const props = useSpring({ height: toggle ? submenu.length * 45 : 0 });

  return (
    <li
      className={clsx({
        active: index === indexFromStore,
      })}
    >
      <Link href={href} as={as}>
        <a onClick={() => setToggle(!toggle)}>
          <span className="main-menu-logo-wrapper">{logo}</span>
          <span className="main-menu-text-wrapper">{text}</span>
        </a>
      </Link>
      {submenu.length > 0 && (
        <animated.ul style={props} className="submenu">
          {submenu.map((menu) => {
            return (
              <LeftMenuListItem
                index={menu.index}
                text={menu.text}
                link={menu.link}
                logo={menu.logo}
              />
            );
          })}
        </animated.ul>
      )}
    </li>
  );
}

export default function LeftMenu() {
  const dispatch = useDispatch();

  const handleIconMode = () => {
    return dispatch(toggleIconMode());
  };

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
      <LeftMenuListItem
        index={0}
        text="Anasayfa"
        link={{ href: "/", as: "/" }}
        logo={<HomeIcon />}
      />
      <LeftMenuListItem
        index={1}
        text="Sweatshirt"
        link={{
          href: "/kategoriler/[altKategori]",
          as: "/kategoriler/sweatler",
        }}
        logo={<SweatIcon />}
      />
      <LeftMenuListItem
        index={2}
        text="T-Shirt"
        link={{
          href: "/kategoriler/[altKategori]",
          as: "/kategoriler/t-shirtler",
        }}
        logo={<ShirtIcon />}
      />
      {/* {      <LeftMenuListItem
        index={3}
        text="Tüm Kategoriler"
        link={{
          href: "/kategoriler",
          as: "/kategoriler",
        }}
        logo={<CategoriesIcon />}
        submenu={[
          {
            index: 20,
            text: "Alt Kategori 1",
            link: {
              href: "/kategoriler/[altKategori]",
              as: "/kategoriler/t-shirtler",
            },
            logo: <ShirtIcon />,
          },
          {
            index: 20,
            text: "Alt Kategori 2",
            link: {
              href: "/kategoriler/[altKategori]",
              as: "/kategoriler/t-shirtler",
            },
            logo: <ShirtIcon />,
          },
        ]}
      />} */}
      <LeftMenuListItem
        index={4}
        text="İletişim"
        link={{
          href: "/iletisim",
          as: "/iletisim",
        }}
        logo={<PaperPlaneIcon />}
      />
      <li className="divider"></li>
      <LeftMenuListItem
        text="İnstagram"
        link={{
          href: "#",
          as: null,
        }}
        logo={<InstagramIcon />}
      />
      <LeftMenuListItem
        text="Whatsapp"
        link={{
          href: "#",
          as: null,
        }}
        logo={<WPIcon />}
      />
    </ul>
  );
}
