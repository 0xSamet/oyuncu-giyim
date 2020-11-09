import Layout from "../components/Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  changeDesktopMenuIndex,
  changeMobileMenuIndex,
} from "../store/reducers/menu";

export default function Iletisim() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeDesktopMenuIndex(4));
    dispatch(changeMobileMenuIndex(4));
  }, []);

  return (
    <Layout title="İletişim - Oyuncu Giyim">
      <h1>İletişim</h1>
    </Layout>
  );
}
