import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { toggleIconMode } from "../store/reducers/theme";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_DESKTOP_MENU } from "../apollo/query/menu";

function LeftMenuListItem({
  index = -4,
  text,
  link = "#",
  icon,
  submenu = [],
  divider,
}) {
  const {
    menu: {
      desktopMenu: { index: indexFromStore },
    },
  } = useSelector((state) => state);

  const [toggle, setToggle] = useState(false);
  const props = useSpring({ height: toggle ? submenu.length * 45 : 0 });

  if (divider) {
    return <li className="divider"></li>;
  }

  return (
    <li
      className={clsx({
        active: index == indexFromStore,
      })}
    >
      <Link href={link}>
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

export default function LeftMenu(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    theme: { iconMode },
  } = useSelector((state) => state);
  const [isTabletMenuClosed, setIsTabletMenuClosed] = useState(false);
  const { data, loading, error } = useQuery(GET_DESKTOP_MENU);

  const handleIconMode = () => {
    return dispatch(toggleIconMode());
  };

  useEffect(() => {
    Cookie.set("iconMode", iconMode);

    function checkMenu() {
      if (
        window.innerWidth < 1199 &&
        !iconMode &&
        router.asPath.slice(0, 6) !== "/admin"
      ) {
        dispatch(toggleIconMode());
      }
    }
    if (!isTabletMenuClosed) {
      checkMenu();
      setIsTabletMenuClosed(true);
    }
    window.addEventListener("resize", checkMenu);
    return () => {
      window.removeEventListener("resize", checkMenu);
    };
  }, [iconMode]);

  if (loading) {
    return <ul className="main-menu">loading</ul>;
  }

  if (error) {
    return <ul className="main-menu">error</ul>;
  }

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
      {data.desktopMenu !== undefined && data.desktopMenu.length > 0 ? (
        [...data.desktopMenu]
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((menu) => {
            if (menu.is_divider) {
              return (
                <LeftMenuListItem
                  key={menu.id}
                  divider
                  link={{ href: undefined }}
                />
              );
            } else {
              return (
                <LeftMenuListItem
                  key={menu.id}
                  index={menu.id}
                  text={menu.name}
                  link={menu.href || undefined}
                  icon={menu.icon_url}
                />
              );
            }
          })
      ) : (
        <li></li>
      )}
    </ul>
  );
}
