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
import { GET_COUNTRIES_ADMIN } from "../../../../../apollo/gql/query/country";
import { DELETE_COUNTRY } from "../../../../../apollo/gql/mutations/country";

export interface CountryDescription {
  name: string;
  language: string;
}

export interface Country {
  id: ReactText;
  description: CountryDescription[] | null;
  status: boolean;
  sort_order: number;
}

interface CountryRowType {
  country: Country;
}

export default function AdminDashboard() {
  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();

  const [getCountries, { data, loading, error }] = useLazyQuery(
    GET_COUNTRIES_ADMIN,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [
    deleteCountryRun,
    {
      loading: deleteCountryLoading,
      error: deleteCountryError,
      data: deleteCountryResponse,
    },
  ] = useMutation(DELETE_COUNTRY);

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (data && data.countriesOnAdmin) {
      setCountries(data.countriesOnAdmin);
    }
  }, [data]);

  const CountryRow: React.FC<CountryRowType> = ({ country }) => {
    const { name } = country.description.find(
      (description) => description.language === "tr"
    );

    return (
      <Table.Row key={country.id}>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell textAlign="center">{country.sort_order}</Table.Cell>
        <Table.Cell singleLine>
          <Link
            href={`/admin/ayarlar/yerellestirme/ulkeler/duzenle/${country.id}`}
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
            onClick={() => handleDeleteCountry(country.id)}
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

    getCountries();
  };

  if (loading || deleteCountryLoading) {
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
                <Link href="/admin/ayarlar/yerellestirme/ulkeler/ekle">
                  <a>
                    <Button icon labelPosition="left" size="tiny" color="blue">
                      <Icon name="add square" />
                      Ülke Ekle
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
              <Table.HeaderCell>Ülkeler</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Sıralama
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Butonlar
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {countries && countries.length > 0 ? (
              [...countries]
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((country) => {
                  return <CountryRow key={country.id} country={country} />;
                })
            ) : (
              <Table.Row>
                <Table.HeaderCell colSpan="3" textAlign="center">
                  Ülke Bulunamadı
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
