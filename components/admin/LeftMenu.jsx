import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { useSpring, animated } from "react-spring";

import { toggleIconMode } from "../../store/reducers/theme";

function LeftMenuListItem({
  index = -4,
  text,
  link: { href = "#" },
  icon,
  submenu = [],
}) {
  const {
    menu: {
      desktopMenu: { index: indexFromStore },
    },
    theme: { iconMode },
  } = useSelector((state) => state);

  const [toggle, setToggle] = useState(false);
  const getHeight = () => {
    if (iconMode) {
      return submenu.length * 55;
    } else {
      return submenu.length * 45;
    }
  };
  const props = useSpring({ height: toggle ? getHeight() : 0 });
  return (
    <li
      className={clsx({
        active: index === indexFromStore,
      })}
    >
      <Link href={href}>
        <a
          onClick={(e) => {
            if (submenu.length > 0) e.preventDefault();
            setToggle(!toggle);
          }}
        >
          <span className="main-menu-icon-wrapper">
            <img src={icon} />
          </span>
          <span className="main-menu-text-wrapper">{text}</span>
        </a>
      </Link>
      {submenu.length > 0 && (
        <animated.ul style={props} className="submenu">
          {submenu.map((menu) => {
            return (
              <LeftMenuListItem
                key={menu.index}
                index={menu.index}
                text={menu.text}
                link={menu.link}
                icon={menu.icon}
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
          <span className="main-menu-icon-wrapper" onClick={handleIconMode}>
            <img src="/icons/arrow.svg" />
          </span>
          <span className="main-menu-text-wrapper"></span>
        </a>
      </li>
      <LeftMenuListItem
        index={0}
        text="Dashboard"
        link={{ href: "/admin/dashboard" }}
        icon="/icons/admin/dashboard.svg"
      />
      <LeftMenuListItem
        index={1}
        text="Siparişler"
        link={{
          href: "/admin/siparisler",
        }}
        icon="/icons/admin/orders.svg"
      />
      <LeftMenuListItem
        index={2}
        text="Müşteriler"
        link={{
          href: "/admin/musteriler",
        }}
        icon="/icons/admin/customers.svg"
      />
      <li className="divider"></li>
      <LeftMenuListItem
        index={3}
        text="Ürünler"
        link={{
          href: "/admin/urunler",
        }}
        icon="/icons/sweat.svg"
      />
      <LeftMenuListItem
        index={4}
        text="Kategoriler"
        link={{
          href: "/admin/kategoriler",
        }}
        icon="/icons/categories.svg"
      />
      <LeftMenuListItem
        index={5}
        text="Seçenekler"
        link={{
          href: "/admin/secenekler",
        }}
        icon="/icons/admin/options.svg"
        submenu={[
          {
            index: 10,
            text: "Seçenekleri Listele",
            link: {
              href: "/admin/secenekler",
            },
            icon: "/icons/admin/options.svg",
          },
          {
            index: 11,
            text: "Seçenek Tipleri",
            link: {
              href: "/admin/secenekler/tipler",
            },
            icon: "/icons/settings.svg",
          },
        ]}
      />
      <li className="divider"></li>
      <LeftMenuListItem
        index={6}
        text="Menüler"
        link={{
          href: "/admin/menuler",
        }}
        icon="/icons/admin/hamburger.svg"
      />
      <LeftMenuListItem
        index={7}
        text="Sayfalar"
        link={{
          href: "/admin/sayfalar",
        }}
        icon="/icons/admin/pages.svg"
      />
      <LeftMenuListItem
        index={8}
        text="Ayarlar"
        link={{
          href: "/admin/ayarlar",
        }}
        icon="/icons/settings.svg"
        submenu={[
          {
            index: 9,
            text: "Dil",
            link: {
              href: "/admin/ayarlar/diller",
            },
            icon: "/icons/admin/language.svg",
          },
        ]}
      />
    </ul>
  );
}
