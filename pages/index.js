import Anasayfa from "../components/pages/Anasayfa";
import { wrapper } from '../store';
import { changeDesktopMenuIndex, changeMobileMenuIndex } from "../store/reducers/menu";
import { handleIconMode } from "../utils";

export default Anasayfa;

export const getServerSideProps = wrapper.getServerSideProps(
    ({ store, req, res, ...etc }) => {
        
        handleIconMode(store, req);
        store.dispatch(changeDesktopMenuIndex(0));
        store.dispatch(changeMobileMenuIndex(0));
        return {
            props: {
                sad: "asd",
                env: process.env.MONGODB_URI
            }
        }
    }
);

