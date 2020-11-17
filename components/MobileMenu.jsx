import clsx from "clsx";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_MOBILE_MENU } from "../apollo/gql/query/menu";

function MobileMenuListItem({ index = -4, text, link = "#", icon }) {
  const {
    menu: {
      mobileMenu: { index: indexFromStore },
    },
  } = useSelector((state) => state);

  return (
    <li
      className={clsx({
        active: index === indexFromStore,
      })}
    >
      <Link href={link}>
        <a>
          <span className="mobile-menu-icon-wrapper">
            <img src={icon} />
          </span>
          <span className="mobile-menu-text-wrapper">{text}</span>
        </a>
      </Link>
    </li>
  );
}

export default function MobileMenu() {
  const { data, error, loading } = useQuery(GET_MOBILE_MENU);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="mobile-menu-wrapper">
      <ul className="mobile-menu">
        {"mobileMenu" in data && data.mobileMenu.length > 0 ? (
          data.mobileMenu.map((menu) => {
            return (
              <MobileMenuListItem
                key={menu.id}
                index={menu.id}
                text={menu.name}
                link={menu.href || undefined}
                icon={menu.icon_url}
              />
            );
          })
        ) : (
          <li></li>
        )}
      </ul>
    </div>
  );
}
