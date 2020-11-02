import AltKategori from "../components/pages/kategoriler/AltKategori";
import { wrapper } from '../store';
//import { changeDesktopMenuIndex, changeMobileMenuIndex } from "../store/reducers/menu";
import { handleIconMode } from "../utils";

export default AltKategori;

// export const getServerSideProps = wrapper.getServerSideProps(
//     ({store, req, res, ...etc}) => {
//         store.dispatch(changeDesktopMenuIndex(0));
//         store.dispatch(changeMobileMenuIndex(0));
//     }
// );

export const getServerSideProps = wrapper.getServerSideProps(
    ({ store, req, res, ...etc }) => {
        handleIconMode(store, req);
        //store.dispatch();
        return {
            props: {sad: "asd"}
        }
    }
);

