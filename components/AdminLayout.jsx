import { useSelector } from "react-redux";
import AdminHeader from "./admin/Header";
import AdminLeftMenu from "./admin/LeftMenu";
import AdminModalCloser from "./admin/ModalCloser";
import Footer from "./Footer";
import clsx from "clsx";
import { Icon, Message } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteAdminRequestError } from "../store/reducers/admin";

const AdminLayout = ({ children }) => {
  const {
    theme: { iconMode },
    admin: { mobileMenuVisible: adminMobileMenuVisible, requestErrors },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  function ErrorBox({ error }) {
    useEffect(() => {
      setTimeout(
        () =>
          dispatch(
            deleteAdminRequestError({
              id: error.id,
            })
          ),
        5000
      );
    }, []);
    return (
      <Message icon error onDismiss={() => {}}>
        <Icon name="exclamation circle" />
        <Message.Content>
          <Message.Header>{error.id}Hata</Message.Header>
          {error.message}
        </Message.Content>
      </Message>
    );
  }

  function renderRequestErrors() {
    const {
      admin: { requestErrors },
    } = useSelector((state) => state);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
      console.log(requestErrors);
      setErrors(requestErrors);
    }, [requestErrors]);

    return (
      <div className="error-box">
        {errors.length > 0 &&
          errors.map((error, index) => {
            return <ErrorBox error={error} />;
          })}
      </div>
    );
  }
  return (
    <div
      className={clsx({
        "main-wrapper": true,
        "admin-layout": true,
        "theme-icon-mode-active": iconMode,
        "mobile-menu-visible": adminMobileMenuVisible,
      })}
    >
      <AdminHeader />
      <main className="content-wrapper">
        <div className="row">
          <div className="page-left-wrapper">
            <AdminLeftMenu />
          </div>
          <div className="page-right-wrapper">{children}</div>
        </div>
        <AdminModalCloser />
        {renderRequestErrors()}
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
