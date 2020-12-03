import Link from "next/link";
import { Button, Icon, Table } from "semantic-ui-react";
import SEO from "../../../components/Seo";
//import { GET_LANGUAGES } from "../../../apollo/gql/query/language";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_LANGUAGES } from "../../../apollo/gql/query/language";

interface Language {
  id: string;
  name: string;
  code: number;
  sort_order: number;
  status: boolean;
}

interface LanguageRowType {
  language: Language;
}

export default function AdminSettingsLanguages() {
  const [languages, setLanguages] = useState([]);

  const [getLanguages, { data, loading, error }] = useLazyQuery(GET_LANGUAGES, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    getLanguages();

    return () => {
      setLanguages([]);
    };
  }, []);

  useEffect(() => {
    if (data && data.languages && data.languages.length > 0) {
      setLanguages(data.languages);
    }
  }, [data]);

  const CategoryRow: React.FC<LanguageRowType> = ({ language }) => {
    return (
      <Table.Row key={language.id}>
        <Table.Cell>{`${language.name} - ${language.code}`}</Table.Cell>
        <Table.Cell textAlign="center">{language.sort_order}</Table.Cell>
        <Table.Cell singleLine>
          <Link href={`/admin/kategoriler/duzenle/${language.id}`}>
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
            // onClick={() => handleDeleteCategory(category.id)}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  };

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
                <Link href="/admin/kategoriler/ekle">
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
