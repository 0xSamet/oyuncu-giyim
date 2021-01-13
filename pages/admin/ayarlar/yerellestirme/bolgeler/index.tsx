import { GetStaticProps } from "next";
import SEO from "../../../../../components/Seo";
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
} from "../../../../../apollo/gql/query/category";
import { DELETE_CATEGORY } from "../../../../../apollo/gql/mutations/category";
import { useLazyQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { putAdminRequestError } from "../../../../../store/reducers/admin";
import { GET_PAGES_ADMIN } from "../../../../../apollo/gql/query/page";
import { DELETE_PAGE } from "../../../../../apollo/gql/mutations/page";
import { GET_COUNTRIES_ADMIN } from "../../../../../apollo/gql/query/localization/country";
import { DELETE_COUNTRY } from "../../../../../apollo/gql/mutations/localization/country";
import { GET_GEO_ZONES_ADMIN } from "../../../../../apollo/gql/query/localization/geo_zone";
import { DELETE_GEO_ZONE } from "../../../../../apollo/gql/mutations/localization/geo_zone";

export interface ZonesType {
  id?: number | string;
  country_id: number | string;
  zone_id: number | string;
}

export interface GeoZone {
  id: ReactText;
  name: string;
  description: string;
  sort_order: number;
  zones: ZonesType[] | undefined[] | null;
}

interface GeoZoneRowType {
  geoZone: GeoZone;
}

export default function AdminDashboard() {
  const [geoZones, setGeoZones] = useState([]);
  const dispatch = useDispatch();

  const [getGeoZones, { data, loading, error }] = useLazyQuery(
    GET_GEO_ZONES_ADMIN,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [
    deleteGeoZoneRun,
    {
      loading: deleteGeoZoneLoading,
      error: deleteGeoZoneError,
      data: deleteGeoZoneResponse,
    },
  ] = useMutation(DELETE_GEO_ZONE);

  useEffect(() => {
    getGeoZones();
  }, []);

  useEffect(() => {
    if (data && data.geoZonesOnAdmin) {
      setGeoZones(data.geoZonesOnAdmin);
    }
  }, [data]);

  const GeoZoneRow: React.FC<GeoZoneRowType> = ({ geoZone }) => {
    return (
      <Table.Row key={geoZone.id}>
        <Table.Cell>{geoZone.name}</Table.Cell>
        <Table.Cell textAlign="center">{geoZone.sort_order}</Table.Cell>
        <Table.Cell singleLine>
          <Link
            href={`/admin/ayarlar/yerellestirme/bolgeler/duzenle/${geoZone.id}`}
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
            onClick={() => handleDeleteGeoZone(geoZone.id)}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  const handleDeleteGeoZone = async (geoZoneId) => {
    try {
      await deleteGeoZoneRun({
        variables: {
          input: {
            id: geoZoneId,
          },
        },
      });
    } catch (err) {
      console.log(err);
      dispatch(putAdminRequestError(err.message));
    }

    getGeoZones();
  };

  if (loading || deleteGeoZoneLoading) {
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
        meta_title: "Bölgeler - Oyuncu Giyim",
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
                <Link href="/admin/ayarlar/yerellestirme/bolgeler/ekle">
                  <a>
                    <Button icon labelPosition="left" size="tiny" color="blue">
                      <Icon name="add square" />
                      Bölge Ekle
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
              <Table.HeaderCell>Bölgeler</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Sıralama
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Butonlar
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {geoZones && geoZones.length > 0 ? (
              [...geoZones]
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((geoZone) => {
                  return <GeoZoneRow key={geoZone.id} geoZone={geoZone} />;
                })
            ) : (
              <Table.Row>
                <Table.HeaderCell colSpan="3" textAlign="center">
                  Bölge Bulunamadı
                </Table.HeaderCell>
              </Table.Row>
            )}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="3" textAlign="right">
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
