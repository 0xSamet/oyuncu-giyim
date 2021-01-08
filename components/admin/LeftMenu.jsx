import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { toggleIconMode } from "../../store/reducers/theme";
import produce from "immer";

function LeftMenuListItemV2({ menu, menus, setMenus }) {
  const {
    menu: {
      desktopMenu: { index: indexFromStore },
    },
    theme: { iconMode },
  } = useSelector((state) => state);

  const getDeepHeight = (menu, total = 0) => {
    // BAD CODE //
    if (menu && menu.submenu && menu.submenu.length > 0) {
      const countChildrens = menu.submenu.length;
      total += countChildrens;
      menu.submenu.forEach((subMenu) => {
        if (subMenu.submenu && subMenu.submenu.length > 0 && subMenu.isActive) {
          total += subMenu.submenu.length;
        }
        if (subMenu.submenu && subMenu.submenu.length > 0) {
          subMenu.submenu.forEach((subSubMenu) => {
            if (
              subSubMenu.submenu &&
              subSubMenu.submenu.length > 0 &&
              subSubMenu.isActive
            ) {
              total += subSubMenu.submenu.length;
            }
          });
        }
      });
      return total * (iconMode ? 55 : 45);
    }
    return 0;
  };

  if (menu && menu.divider) {
    return <li className="divider"></li>;
  }

  const props = useSpring({
    height: menu.isActive ? getDeepHeight(menu) : 0,
  });

  return (
    <li
      className={clsx({
        active:
          (Array.isArray(menu.index)
            ? menu.index[menu.index.length - 1]
            : menu.index) === indexFromStore,
      })}
    >
      <Link href={menu.link}>
        <a
          onClick={(e) => {
            if (menu.submenu && menu.submenu.length > 0) e.preventDefault();
            if (Array.isArray(menu.index)) {
              setMenus(
                produce(menus, (draft) => {
                  let handleDeepMenuString = "";
                  menu.index.forEach((realIndex, currentIndex) => {
                    handleDeepMenuString += `[${realIndex}]${
                      currentIndex + 1 != menu.index.length ? ".submenu" : ""
                    }`;
                  });

                  eval(
                    `draft${handleDeepMenuString}.isActive = !draft${handleDeepMenuString}.isActive`
                  );
                })
              );
            } else {
              setMenus(
                produce(menus, (draft) => {
                  draft[menu.index]["isActive"] = !draft[menu.index][
                    "isActive"
                  ];
                })
              );
            }
          }}
        >
          <span className="main-menu-icon-wrapper">
            <img src={menu.icon} />
          </span>
          <span className="main-menu-text-wrapper">{menu.text}</span>
          {menu.submenu && menu.submenu.length > 0 && (
            <span
              style={{
                width: 9,
                position: "absolute",
                right: 10,
                opacity: iconMode ? 0 : 1,
                transition: "opacity 0.3s",
              }}
            >
              <img
                src={"/static/icons/arrow.svg"}
                style={{
                  transform: `${
                    menu.isActive ? "rotate(90deg)" : "rotate(-90deg)"
                  }`,
                  transition: "0.5s",
                  transformOrigin: "center center",
                }}
              />
            </span>
          )}
        </a>
      </Link>

      {menu.submenu && menu.submenu.length > 0 && (
        <animated.ul style={props} className="submenu">
          {menu.submenu.map((menu) => {
            return (
              <LeftMenuListItemV2
                index={
                  Array.isArray(menu.index)
                    ? menu.index[menu.index.length - 1]
                    : menu.index
                }
                menu={menu}
                menus={menus}
                setMenus={setMenus}
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
  const [menus, setMenus] = useState([
    {
      index: 0,
      text: "Dashboard",
      link: "/admin/dashboard",
      icon: "/static/icons/admin/dashboard.svg",
      isActive: false,
    },
    {
      index: 1,
      text: "Siparişler",
      link: "/admin/siparisler",
      icon: "/static/icons/admin/orders.svg",
      isActive: false,
    },

    {
      index: 2,
      text: "Müşteriler",
      link: "/admin/musteriler",
      icon: "/static/icons/admin/customers.svg",
      isActive: false,
    },
    {
      index: 3,
      divider: true,
    },
    {
      index: 4,
      text: "Ürünler",
      link: "/admin/urunler",
      icon: "/static/icons/sweat.svg",
      isActive: false,
    },
    {
      index: 5,
      text: "Kategoriler",
      link: "/admin/kategoriler",
      icon: "/static/icons/categories.svg",
      isActive: false,
    },
    {
      index: 6,
      text: "Seçenekler",
      link: "/admin/secenekler",
      icon: "/static/icons/admin/options.svg",
      isActive: false,
    },
    {
      index: 7,
      divider: true,
    },
    {
      index: 8,
      text: "Menüler",
      link: "/admin/menuler",
      icon: "/static/icons/admin/hamburger.svg",
      isActive: false,
    },
    {
      index: 9,
      text: "Sayfalar",
      link: "/admin/sayfalar",
      icon: "/static/icons/admin/pages.svg",
      isActive: false,
    },
    {
      index: 10,
      text: "Ayarlar",
      link: "/admin/ayarlar",
      icon: "/static/icons/settings.svg",
      isActive: false,
      submenu: [
        {
          index: [10, 0],
          text: "Yerelleştirme",
          link: "",
          icon: "/static/icons/admin/language.svg",
          isActive: false,
          submenu: [
            {
              index: [10, 0, 0],
              text: "Dil",
              link: "/admin/ayarlar/diller",
              icon: "/static/icons/admin/language.svg",
              isActive: false,
            },
            {
              index: [10, 0, 1],
              text: "Vergiler",
              link: "/admin/ayarlar/vergiler",
              icon: "/static/icons/admin/tax.svg",
              isActive: false,
              submenu: [
                {
                  index: [10, 0, 1, 0],
                  text: "Vergi Sınıfları",
                  link: "/admin/ayarlar/vergiler/vergi-siniflari",
                  icon: "/static/icons/admin/tax.svg",
                  isActive: false,
                },
                {
                  index: [10, 0, 1, 1],
                  text: "Vergi Oranları",
                  link: "/admin/ayarlar/vergiler/vergi-oranlari",
                  icon: "/static/icons/admin/tax.svg",
                  isActive: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const handleIconMode = () => {
    return dispatch(toggleIconMode());
  };

  return (
    <ul className="main-menu">
      <li>
        <a>
          <span className="main-menu-icon-wrapper" onClick={handleIconMode}>
            <img src="/static/icons/arrow.svg" />
          </span>
          <span className="main-menu-text-wrapper"></span>
        </a>
      </li>
      {menus.map((menu) => {
        if (menu.divider) {
          return (
            <LeftMenuListItemV2
              index={
                Array.isArray(menu.index)
                  ? menu.index[menu.index.length - 1]
                  : menu.index
              }
              menu={menu}
            />
          );
        } else {
          return (
            <LeftMenuListItemV2
              index={
                Array.isArray(menu.index)
                  ? menu.index[menu.index.length - 1]
                  : menu.index
              }
              menu={menu}
              menus={menus}
              setMenus={setMenus}
            />
          );
        }
      })}
    </ul>
  );
}
