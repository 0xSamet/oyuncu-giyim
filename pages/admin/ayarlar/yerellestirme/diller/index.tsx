import Link from "next/link";
import {
  Button,
  Dimmer,
  Icon,
  Loader,
  Segment,
  Table,
} from "semantic-ui-react";
import SEO from "../../../../../components/Seo";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_LANGUAGES } from "../../../../../apollo/gql/query/language";
import { DELETE_LANGUAGE } from "../../../../../apollo/gql/mutations/language";
import { putAdminRequestError } from "../../../../../store/reducers/admin";

export interface Language {
  id: string;
  name: string;
  code: string;
  flag_code: string;
  sort_order: number;
  status: boolean;
}

interface LanguageRowType {
  language: Language;
}

export default function AdminSettingsLanguages() {
  const [languages, setLanguages] = useState([]);
  const dispatch = useDispatch();
  const [getLanguages, { data, loading, error }] = useLazyQuery(GET_LANGUAGES, {
    fetchPolicy: "no-cache",
  });

  const [
    deleteLanguageRun,
    {
      loading: deleteLanguageLoading,
      error: deleteLanguageError,
      data: deleteLanguageResponse,
    },
  ] = useMutation(DELETE_LANGUAGE);

  useEffect(() => {
    getLanguages();

    return () => {
      setLanguages([]);
    };
  }, []);

  useEffect(() => {
    if (data && data.languages) {
      setLanguages(data.languages);
    }
  }, [data]);

  const handleDeleteLanguage = async (languageId) => {
    try {
      await deleteLanguageRun({
        variables: {
          input: {
            id: languageId,
          },
        },
      });
      getLanguages();
    } catch (err) {
      console.log(err);
      dispatch(putAdminRequestError(err.message));
    }
  };

  const CategoryRow: React.FC<LanguageRowType> = ({ language }) => {
    return (
      <Table.Row key={language.id}>
        <Table.Cell>{`${language.name} - ${language.code}`}</Table.Cell>
        <Table.Cell textAlign="center">{language.sort_order}</Table.Cell>
        <Table.Cell singleLine>
          <Link href={`/admin/ayarlar/diller/duzenle/${language.id}`}>
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
            onClick={() => handleDeleteLanguage(language.id)}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  if (loading) {
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
        meta_title: "Ayarlar/Diller - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-options-languages-page">
        <Table
          celled
          compact
          className="admin-results-table admin-results-table-top"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3" textAlign="right">
                <Link href="/admin/ayarlar/yerellestirme/diller/ekle">
                  <a>
                    <Button icon labelPosition="left" size="tiny" color="blue">
                      <Icon name="add square" />
                      Dil Ekle
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
              <Table.HeaderCell>Diller</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Sıralama
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Butonlar
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {languages && languages.length > 0 ? (
              [...languages]
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((language) => {
                  return <CategoryRow key={language.id} language={language} />;
                })
            ) : (
              <Table.Row>
                <Table.HeaderCell colSpan="3" textAlign="center">
                  Dil Bulunamadı
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
