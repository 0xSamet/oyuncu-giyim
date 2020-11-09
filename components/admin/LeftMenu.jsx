import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import DashboardIcon from "../../public/icons/admin/dashboard.svg";
import OrdersIcon from "../../public/icons/admin/orders.svg";
import CustomersIcon from "../../public/icons/admin/customers.svg";
import HamburgerMenuIcon from "../../public/icons/admin/hamburger.svg";
import PagesIcon from "../../public/icons/admin/pages.svg";
import SettingsIcon from "../../public/icons/admin/settings.svg";
import SweatIcon from "../../public/icons/sweat.svg";

import HomeIcon from "../../public/icons/home.svg";
import ShirtIcon from "../../public/icons/tshirt.svg";
import ArrowIcon from "../../public/icons/arrow.svg";
import PaperPlaneIcon from "../../public/icons/paper-plane.svg";
import InstagramIcon from "../../public/icons/instagram.svg";
import WPIcon from "../../public/icons/whatsapp.svg";
import CategoriesIcon from "../../public/icons/categories.svg";

import { useSpring, animated } from "react-spring";

import { toggleIconMode } from "../../store/reducers/theme";

function LeftMenuListItem({
  index = -4,
  text,
  link: { href = "#" },
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
      <Link href={href}>
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
        text="Dashboard"
        link={{ href: "/admin/dashboard" }}
        logo={<DashboardIcon />}
      />
      <LeftMenuListItem
        index={1}
        text="Siparişler"
        link={{
          href: "/admin/siparisler",
        }}
        logo={<OrdersIcon />}
      />
      <LeftMenuListItem
        index={2}
        text="Müşteriler"
        link={{
          href: "/admin/musteriler",
        }}
        logo={<CustomersIcon />}
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
        text="Ürünler"
        link={{
          href: "/admin/urunler",
        }}
        logo={<SweatIcon />}
      />
      <li className="divider"></li>
      <LeftMenuListItem
        index={4}
        text="Kategoriler"
        link={{
          href: "/admin/kategoriler",
        }}
        logo={<CategoriesIcon />}
      />
      <LeftMenuListItem
        index={4}
        text="Menü"
        link={{
          href: "/admin/menu",
        }}
        logo={<HamburgerMenuIcon />}
      />
      <LeftMenuListItem
        index={4}
        text="Sayfalar"
        link={{
          href: "/admin/sayfalar",
        }}
        logo={<PagesIcon />}
      />
      <li className="divider"></li>
      <LeftMenuListItem
        index={4}
        text="Ayarlar"
        link={{
          href: "/admin/ayarlar",
        }}
        logo={<SettingsIcon />}
      />
    </ul>
  );
}
