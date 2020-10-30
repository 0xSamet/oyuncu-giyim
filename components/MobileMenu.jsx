import clsx from "clsx";
import Link from "next/link";
import { useSelector } from "react-redux";

import CategoryIcon from "../public/icons/categories.svg";
import HomeIcon from "../public/icons/home.svg";
import PaperPlaneIcon from "../public/icons/paper-plane.svg";
import CartIcon from "../public/icons/cart.svg";
import ProfileIcon from "../public/icons/profile2.svg";

function MobileMenuListItem({
  index = -4,
  text,
  link: { href = "#", as = "#" },
  icon,
}) {
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
      <Link href={href} as={as}>
        <a>
          <span className="mobile-menu-logo-wrapper">{icon}</span>
          <span className="mobile-menu-text-wrapper">{text}</span>
        </a>
      </Link>
    </li>
  );
}

export default function MobileMenu() {
  return (
    <div className="mobile-menu-wrapper">
      <ul className="mobile-menu">
        <MobileMenuListItem
          index={0}
          text="Anasayfa"
          link={{ href: "/", as: "/" }}
          icon={<HomeIcon />}
        />
        <MobileMenuListItem
          index={1}
          text="Kategoriler"
          link={{ href: "/kategoriler", as: "/kategoriler" }}
          icon={<CategoryIcon />}
        />

        <MobileMenuListItem
          index={2}
          text="Giriş Yap"
          link={{ href: "/giris-yap", as: "/giris-yap" }}
          icon={<ProfileIcon />}
        />
        <MobileMenuListItem
          index={3}
          text="Sepet"
          link={{ href: "/sepetim", as: "/sepetim" }}
          icon={<CartIcon />}
        />
        <MobileMenuListItem
          index={4}
          text="İletişim"
          link={{ href: "/iletisim", as: "/iletisim" }}
          icon={<PaperPlaneIcon />}
        />
      </ul>
    </div>
  );
}
