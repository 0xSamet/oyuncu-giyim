import { GetStaticProps } from "next";
import SEO from "../../../../../../components/Seo";
import {
  Icon,
  Label,
  Menu,
  Table,
  Button,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import {
  Fragment,
  ReactText,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  GET_CATEGORIES,
  GET_CATEGORIES_ADMIN,
} from "../../../../../../apollo/gql/query/category";
import { DELETE_CATEGORY } from "../../../../../../apollo/gql/mutations/category";
import { useLazyQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { putAdminRequestError } from "../../../../../../store/reducers/admin";
import { GET_PAGES_ADMIN } from "../../../../../../apollo/gql/query/page";
import { DELETE_PAGE } from "../../../../../../apollo/gql/mutations/page";
import { GET_COUNTRIES_ADMIN } from "../../../../../../apollo/gql/query/localization/country";
import { DELETE_COUNTRY } from "../../../../../../apollo/gql/mutations/localization/country";
import { GET_TAX_RATES_ADMIN } from "../../../../../../apollo/gql/query/localization/tax_rate";
import { GET_GEO_ZONES_ADMIN } from "../../../../../../apollo/gql/query/localization/geo_zone";
import { changeDesktopMenuIndex } from "../../../../../../store/reducers/menu";

export interface TaxRate {
  id: ReactText;
  name: string;
  rate: number;
  type: string;
  geo_zone_id: string | number;
  sort_order: number;
}

interface TaxRateRowType {
  taxRate: TaxRate;
}

export const taxRateTypes = [
  {
    name: "Yüzde Oran",
    value: "P",
  },
  {
    name: "Sabit Oran",
    value: "F",
  },
];

export default function AdminDashboard() {
  const [taxRates, setTaxRates] = useState([]);
  const [geoZones, setGeoZones] = useState([]);
  const dispatch = useDispatch();

  const [getTaxRates, { data, loading, error }] = useLazyQuery(
    GET_TAX_RATES_ADMIN,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [
    getGeoZones,
    { data: geoZonesData, loading: geoZonesLoading, error: geoZonesError },
  ] = useLazyQuery(GET_GEO_ZONES_ADMIN, {
    fetchPolicy: "no-cache",
  });

  const [
    deleteCountryRun,
    {
      loading: deleteCountryLoading,
      error: deleteCountryError,
      data: deleteCountryResponse,
    },
  ] = useMutation(DELETE_COUNTRY);

  useEffect(() => {
    getTaxRates();
    getGeoZones();
    dispatch(changeDesktopMenuIndex(16));
  }, []);

  useEffect(() => {
    if (geoZonesData && geoZonesData.geoZonesOnAdmin) {
      setGeoZones(geoZonesData.geoZonesOnAdmin);
    }
  }, [geoZonesData]);

  useEffect(() => {
    if (data && data.taxRatesOnAdmin) {
      setTaxRates(data.taxRatesOnAdmin);
    }
  }, [data]);

  const TaxRateRow: React.FC<TaxRateRowType> = ({ taxRate }) => {
    const taxRateTypeName = taxRateTypes.find(
      (taxRateType) => taxRateType.value === taxRate.type
    ).name;

    let geoZoneName = taxRate.geo_zone_id;

    if (geoZones && geoZones.length > 0) {
      const findGeoZone = geoZones.find(
        (geoZone) => geoZone.id == taxRate.geo_zone_id
      );
      if (findGeoZone) {
        geoZoneName = findGeoZone.name;
      }
    }

    return (
      <Table.Row key={taxRate.id}>
        <Table.Cell>{taxRate.name}</Table.Cell>
        <Table.Cell textAlign="center">{geoZoneName}</Table.Cell>
        <Table.Cell textAlign="center">{taxRateTypeName}</Table.Cell>
        <Table.Cell textAlign="center">{taxRate.rate}</Table.Cell>
        <Table.Cell textAlign="center">{taxRate.sort_order}</Table.Cell>
        <Table.Cell singleLine>
          <Link
            href={`/admin/ayarlar/yerellestirme/vergiler/vergi-oranlari/duzenle/${taxRate.id}`}
          >
            <a>
              <Button icon labelPosition="left" size="tiny" color="teal">
                <Icon name="edit" />
                Düzenle
              </Button>
            </a>
          </Link>
          <Button
            icon="trash"
            size="tiny"
            color="red"
            onClick={() => handleDeleteCountry(taxRate.id)}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  const handleDeleteCountry = async (countryId) => {
    try {
      await deleteCountryRun({
        variables: {
          input: {
            id: countryId,
          },
        },
      });
    } catch (err) {
      console.log(err);
      dispatch(putAdminRequestError(err.message));
    }

    getTaxRates();
  };

  if (loading || deleteCountryLoading || geoZonesLoading) {
    return (
      <Segment className="page-loader">
        <Dimmer active>
          <Loader size="medium">Yükleniyor</Loader>
        </Dimmer>
      </Segment>
    );
  }

  return (
    <SEO
      seo={{
        meta_title: "Ülkeler - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-countries-page">
        <Table
          celled
          compact
          className="admin-results-table admin-results-table-top"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3" textAlign="right">
                <Link href="/admin/ayarlar/yerellestirme/vergiler/vergi-oranlari/ekle">
                  <a>
                    <Button icon labelPosition="left" size="tiny" color="blue">
                      <Icon name="add square" />
                      Vergi Oranı Ekle
                    </Button>
                  </a>
                </Link>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
        <Table celled compact className="admin-results-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Vergi Sınıfları</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Bölge</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Vergi Tipi</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Vergi Oranı
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Sıralama
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Butonlar
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {taxRates && taxRates.length > 0 ? (
              [...taxRates]
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((taxRate) => {
                  return <TaxRateRow key={taxRate.id} taxRate={taxRate} />;
                })
            ) : (
              <Table.Row>
                <Table.HeaderCell colSpan="6" textAlign="center">
                  Vergi Oranı Bulunamadı
                </Table.HeaderCell>
              </Table.Row>
            )}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6" textAlign="right">
                {/* <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu> */}
                {"Pagination yapılacak"}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </section>
    </SEO>
  );
}
