import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { useSpring, animated } from "react-spring";

import { toggleIconMode } from "../store/reducers/theme";

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
        text="Anasayfa"
        link={{ href: "/" }}
        icon="/icons/home.svg"
      />
      <LeftMenuListItem
        index={1}
        text="Sweatshirt"
        link={{
          href: "/sweatshirt",
        }}
        icon="/icons/sweat.svg"
      />
      <LeftMenuListItem
        index={2}
        text="T-Shirt"
        link={{
          href: "/t-shirt",
        }}
        icon="/icons/tshirt.svg"
      />
      {/* {      <LeftMenuListItem
        index={3}
        text="Tüm Kategoriler"
        link={{
          href: "/kategoriler",
          as: "/kategoriler",
        }}
        icon={<CategoriesIcon />}
        submenu={[
          {
            index: 20,
            text: "Alt Kategori 1",
            link: {
              href: "/kategoriler/[altKategori]",
              as: "/kategoriler/t-shirtler",
            },
            icon: <ShirtIcon />,
          },
          {
            index: 20,
            text: "Alt Kategori 2",
            link: {
              href: "/kategoriler/[altKategori]",
              as: "/kategoriler/t-shirtler",
            },
            icon: <ShirtIcon />,
          },
        ]}
      />} */}
      <LeftMenuListItem
        index={4}
        text="İletişim"
        link={{
          href: "/iletisim",
        }}
        icon="/icons/paper-plane.svg"
      />
      <li className="divider"></li>
      <LeftMenuListItem
        text="İnstagram"
        link={{
          href: "#",
        }}
        icon="/icons/instagram.svg"
      />
      <LeftMenuListItem
        text="Whatsapp"
        link={{
          href: "#",
        }}
        icon="/icons/whatsapp.svg"
      />
    </ul>
  );
}
