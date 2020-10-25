import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

export default function ModalCloser() {
  const {
    modalCloser: {
      opened: modalCloserOpened,
      withBackGround: modalCloserWithBg,
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
        dispatch({
          type: "CLEAN_MODALS",
        });
      }}
    ></div>
  );
}
