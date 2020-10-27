import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import { closeAllModals } from "../store/reducers/modals";

export default function ModalCloser() {
  const {
    modals: {
      modalCloser: {
        opened: modalCloserOpened,
        withBackGround: modalCloserWithBg,
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
