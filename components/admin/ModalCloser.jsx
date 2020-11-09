import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import { closeAllModals } from "../../store/reducers/admin";

export default function ModalCloser() {
  const {
    admin: {
      modalCloser: {
        opened: modalCloserOpened,
        withBackground: modalCloserWithBg,
      },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div
      className={clsx({
        "modal-closer": true,
        open: modalCloserOpened,
        "with-bg": modalCloserWithBg,
      })}
      onClick={() => {
        dispatch(closeAllModals());
      }}
    ></div>
  );
}
