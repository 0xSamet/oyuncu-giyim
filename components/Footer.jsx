import { Input } from "semantic-ui-react";
import { useState } from "react";

import CartIcon from "../public/icons/cart.svg";
import ProfileIcon from "../public/icons/profile.svg";
import NotificationIcon from "../public/icons/notification.svg";

export default function Header() {
  const [searchWord, setSearchWord] = useState("");
  return (
    <footer>
      <div>
        <h2>Footer</h2>
      </div>
    </footer>
  );
}
