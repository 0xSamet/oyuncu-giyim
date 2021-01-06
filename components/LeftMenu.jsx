import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { toggleIconMode } from "../store/reducers/theme";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_DESKTOP_MENU } from "../apollo/gql/query/menu";

function LeftMenuListItem({
  index = -4,
  text,
  link = "#",
  icon,
  submenu = [],
  divider,
  target,
}) {
  const {
    menu: {
      desktopMenu: { index: indexFromStore },
    },
  } = useSelector((state) => state);

  //const [toggle, setToggle] = useState(false);
  //const props = useSpring({ height: toggle ? submenu.length * 45 : 0 });

  if (divider) {
    return <li className="divider"></li>;
  }

  return (
    <li
      className={clsx({
        active: index == indexFromStore,
      })}
      key={index}
    >
      <Link href={link}>
        <a target={target}>
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
    page: { slugs },
  } = useSelector((state) => state);
  const [isTabletMenuClosed, setIsTabletMenuClosed] = useState(false);
  const { data, loading, error } = useQuery(GET_DESKTOP_MENU, {
    variables: { language: router.locale },
  });

  const handleIconMode = () => {
    return dispatch(toggleIconMode());
  };

  const renderLanguageSwitcher = useMemo(() => {
    if (slugs) {
      return slugs.map((slug) => (
        <li key={slug.language}>
          <Link href={slug.slug} locale={slug.language}>
            <a>
              <span>{slug.language}</span>
            </a>
          </Link>
        </li>
      ));
    }
    return null;
  }, [slugs]);

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

  if (error) {
    return <ul className="main-menu">error</ul>;
  }

  if (loading) {
    return <ul className="main-menu">loading</ul>;
  }

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
      {data && data.desktopMenu && data.desktopMenu.length > 0 ? (
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
                  text={menu.description.name}
                  link={menu.description.href || undefined}
                  target={menu.description.target}
                  icon={menu.description.icon_url}
                />
              );
            }
          })
      ) : (
        <li></li>
      )}
      {renderLanguageSwitcher}
    </ul>
  );
}
