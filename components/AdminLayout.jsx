import { useSelector } from "react-redux";
import AdminHeader from "./admin/Header";
import AdminLeftMenu from "./admin/LeftMenu";
import AdminModalCloser from "./admin/ModalCloser";
import Footer from "./Footer";
import clsx from "clsx";

const AdminLayout = ({ children }) => {
  const {
    theme: { iconMode },
    admin: { mobileMenuVisible: adminMobileMenuVisible },
  } = useSelector((state) => state);
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
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
