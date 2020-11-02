import Iletisim from "../components/pages/Iletisim";
import { wrapper } from '../store';
import { handleIconMode } from "../utils";
import { changeDesktopMenuIndex, changeMobileMenuIndex } from "../store/reducers/menu";

export default Iletisim;

export const getServerSideProps = wrapper.getServerSideProps(
    ({ store, req, res, ...etc }) => {
        handleIconMode(store, req);
        store.dispatch(changeDesktopMenuIndex(4));
        store.dispatch(changeMobileMenuIndex(4));
        return {
            props: {sad: "asd"}
        }
    }
);