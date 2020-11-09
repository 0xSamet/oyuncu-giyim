import clsx from "clsx";
import { useState, useEffect } from "react";
import { Sugar } from "react-preloaders";
import { useSelector } from "react-redux";

export default function ModalCloser() {
  const {
    page: { firstLoading },
  } = useSelector((state) => state);
  const [customLoading, setCustomLoading] = useState(true);
  useEffect(() => {
    if (!firstLoading) {
      setTimeout(() => {
        const preEl = document.querySelector(".preloader-wrapper");
        if (preEl) preEl.remove();
        return setCustomLoading(false);
      }, 1000);
    }
  }, [firstLoading]);
  return (
    <div
      className={clsx({
        "preloader-wrapper": true,
        loaded: !firstLoading,
      })}
    >
      <Sugar customLoading={customLoading} time={0} />
    </div>
  );
}
