import AltKategori from "../../components/pages/kategoriler/AltKategori";

export default AltKategori;

export async function getServerSideProps(context) {
    console.log(context);
    return {
        props: {
            asd: "asd"
        }
    };
}

