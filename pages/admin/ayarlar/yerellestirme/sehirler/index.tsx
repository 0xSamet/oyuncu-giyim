import SEO from "../../../../../components/Seo";
import {
  Icon,
  Table,
  Button,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { ReactText, useEffect, useState } from "react";
import { DELETE_CATEGORY } from "../../../../../apollo/gql/mutations/category";
import { useLazyQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { putAdminRequestError } from "../../../../../store/reducers/admin";
import { DELETE_COUNTRY } from "../../../../../apollo/gql/mutations/localization/country";
import { Country } from "../ulkeler";
import { GET_ZONES_ADMIN } from "../../../../../apollo/gql/query/localization/zone";
import { DELETE_ZONE } from "../../../../../apollo/gql/mutations/localization/zone";
import { changeDesktopMenuIndex } from "../../../../../store/reducers/menu";

export interface Zone {
  id: ReactText;
  name: string;
  status: boolean;
  sort_order: number;
  country: Country | null;
  country_id: number | string;
}

interface ZoneRowType {
  zone: Zone;
}

export default function AdminDashboard() {
  const [zones, setZones] = useState([]);
  const dispatch = useDispatch();

  const [getZones, { data, loading, error }] = useLazyQuery(GET_ZONES_ADMIN, {
    fetchPolicy: "no-cache",
  });

  const [
    deleteZoneRun,
    {
      loading: deleteZoneLoading,
      error: deleteZoneError,
      data: deleteZoneResponse,
    },
  ] = useMutation(DELETE_ZONE);

  useEffect(() => {
    getZones();
    dispatch(changeDesktopMenuIndex(13));
  }, []);

  useEffect(() => {
    if (data && data.zonesOnAdmin) {
      setZones(data.zonesOnAdmin);
    }
  }, [data]);

  const ZoneRow: React.FC<ZoneRowType> = ({ zone }) => {
    const { name: countryName } = zone.country.description.find(
      (description) => description.language === "tr"
    );

    return (
      <Table.Row key={zone.id}>
        <Table.Cell>
          {countryName}
          <Icon
            name="chevron right"
            size="small"
            style={{ marginRight: 1, marginLeft: 1 }}
          />
          <span
            style={{
              background: "#1a69a4",
              color: "#fff",
              padding: 5,
              borderRadius: ".28571429rem",
              lineHeight: 2,
            }}
          >
            {zone.name}
          </span>
        </Table.Cell>
        <Table.Cell textAlign="center">{zone.sort_order}</Table.Cell>
        <Table.Cell singleLine>
          <Link
            href={`/admin/ayarlar/yerellestirme/sehirler/duzenle/${zone.id}`}
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
            onClick={() => handleDeleteZone(zone.id)}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  const handleDeleteZone = async (zoneId) => {
    try {
      await deleteZoneRun({
        variables: {
          input: {
            id: zoneId,
          },
        },
      });
    } catch (err) {
      console.log(err);
      dispatch(putAdminRequestError(err.message));
    }

    getZones();
  };

  if (loading || deleteZoneLoading) {
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
        meta_title: "Şehirler - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-zones-page">
        <Table
          celled
          compact
          className="admin-results-table admin-results-table-top"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3" textAlign="right">
                <Link href="/admin/ayarlar/yerellestirme/sehirler/ekle">
                  <a>
                    <Button icon labelPosition="left" size="tiny" color="blue">
                      <Icon name="add square" />
                      Şehir Ekle
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
              <Table.HeaderCell>Şehirler</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Sıralama
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Butonlar
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {zones && zones.length > 0 ? (
              [...zones]
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((zone) => {
                  return <ZoneRow key={zone.id} zone={zone} />;
                })
            ) : (
              <Table.Row>
                <Table.HeaderCell colSpan="3" textAlign="center">
                  Şehir Bulunamadı
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
