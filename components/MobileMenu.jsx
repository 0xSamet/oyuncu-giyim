import clsx from "clsx";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_MOBILE_MENU } from "../apollo/gql/query/menu";
import { useRouter } from "next/dist/client/router";

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
  const router = useRouter();
  const { data, error, loading } = useQuery(GET_MOBILE_MENU, {
    variables: { language: router.locale },
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="mobile-menu-wrapper">
      <ul className="mobile-menu">
        {data && data.mobileMenu && data.mobileMenu.length > 0 ? (
          [...data.mobileMenu]
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((menu) => {
              return (
                <MobileMenuListItem
                  key={menu.id}
                  index={menu.id}
                  text={menu.description.name}
                  link={menu.description.href || undefined}
                  icon={menu.description.icon_url}
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
