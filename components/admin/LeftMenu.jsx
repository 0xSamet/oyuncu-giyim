import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { toggleIconMode } from "../../store/reducers/theme";
import produce from "immer";

function LeftMenuListItem({ menu, menus, setMenus }) {
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
              subSubMenu.isActive &&
              subMenu.isActive
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
        active: menu.pageIndex === indexFromStore,
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
              <LeftMenuListItem
                key={menu.index}
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
  const {
    menu: {
      desktopMenu: { index: indexFromStore },
    },
    theme: { iconMode },
  } = useSelector((state) => state);
  const [firstLoad, setFirstLoad] = useState(false);
  const [menus, setMenus] = useState([
    {
      index: 0,
      pageIndex: 0,
      text: "Dashboard",
      link: "/admin/dashboard",
      icon: "/static/icons/admin/dashboard.svg",
      isActive: false,
    },
    {
      index: 1,
      pageIndex: 1,
      text: "Siparişler",
      link: "/admin/siparisler",
      icon: "/static/icons/admin/orders.svg",
      isActive: false,
    },

    {
      index: 2,
      pageIndex: 2,
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
      pageIndex: 4,
      text: "Ürünler",
      link: "/admin/urunler",
      icon: "/static/icons/sweat.svg",
      isActive: false,
    },
    {
      index: 5,
      pageIndex: 5,
      text: "Kategoriler",
      link: "/admin/kategoriler",
      icon: "/static/icons/categories.svg",
      isActive: false,
    },
    {
      index: 6,
      pageIndex: 6,
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
      pageIndex: 8,
      text: "Menüler",
      link: "/admin/menuler",
      icon: "/static/icons/admin/hamburger.svg",
      isActive: false,
    },
    {
      index: 9,
      pageIndex: 9,
      text: "Sayfalar",
      link: "/admin/sayfalar",
      icon: "/static/icons/admin/pages.svg",
      isActive: false,
    },
    {
      index: 10,
      pageIndex: 10,
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
              pageIndex: 11,
              text: "Diller",
              link: "/admin/ayarlar/yerellestirme/diller",
              icon: "/static/icons/admin/language.svg",
              isActive: false,
            },
            {
              index: [10, 0, 1],
              pageIndex: 12,
              text: "Ülkeler",
              link: "/admin/ayarlar/yerellestirme/ulkeler",
              icon: "/static/icons/admin/world.svg",
              isActive: false,
            },
            {
              index: [10, 0, 2],
              pageIndex: 13,
              text: "Şehirler",
              link: "/admin/ayarlar/yerellestirme/sehirler",
              icon: "/static/icons/admin/world.svg",
              isActive: false,
            },
            {
              index: [10, 0, 3],
              pageIndex: 14,
              text: "Bölgeler",
              link: "/admin/ayarlar/yerellestirme/bolgeler",
              icon: "/static/icons/admin/world.svg",
              isActive: false,
            },
            {
              index: [10, 0, 4],
              text: "Vergiler",
              link: "/admin/ayarlar/yerellestirme/vergiler",
              icon: "/static/icons/admin/tax.svg",
              isActive: false,
              submenu: [
                {
                  index: [10, 0, 4, 0],
                  pageIndex: 15,
                  text: "Vergi Sınıfları",
                  link: "/admin/ayarlar/yerellestirme/vergiler/vergi-siniflari",
                  icon: "/static/icons/admin/tax.svg",
                  isActive: false,
                },
                {
                  index: [10, 0, 4, 1],
                  pageIndex: 16,
                  text: "Vergi Oranları",
                  link: "/admin/ayarlar/yerellestirme/vergiler/vergi-oranlari",
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

  const handleDeep = (menusForF, result = []) => {
    menusForF.forEach((menu) => {
      if (menu.submenu && menu.submenu.length > 0) {
        //console.log(`Working for ${menu.text}`);
        const tryFound = menu.submenu.find((subMenu) => {
          if (subMenu.pageIndex) {
            return subMenu.pageIndex === indexFromStore;
          } else {
            return false;
          }
        });
        if (tryFound) {
          //console.log("buldum", tryFound);
          let indexesStrings = [];
          tryFound.index.forEach((_, index) => {
            const getIndexes = tryFound.index.slice(0, index + 1);
            let handleString = "";
            getIndexes.forEach((realIndex, currentIndex) => {
              handleString += `[${realIndex}]${
                currentIndex + 1 != getIndexes.length ? ".submenu" : ""
              }`;
            });
            indexesStrings.push(handleString);
          });
          //console.log("indexes ready", indexesStrings);

          setMenus(
            produce(menus, (draft) => {
              indexesStrings.forEach((index) => {
                eval(`draft${index}.isActive = true;`);
              });
            })
          );
          setFirstLoad(true);
        } else {
          return handleDeep(menu.submenu, result);
        }
      }
    });
  };

  useEffect(() => {
    if (indexFromStore !== -1) {
      if (!firstLoad) {
        handleDeep([...menus]);
      }
    }
  }, [indexFromStore]);

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
        const menuIndex = Array.isArray(menu.index)
          ? menu.index[menu.index.length - 1]
          : menu.index;
        if (menu.divider) {
          return (
            <LeftMenuListItem key={menu.index} index={menuIndex} menu={menu} />
          );
        } else {
          return (
            <LeftMenuListItem
              key={menu.index}
              index={menuIndex}
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
