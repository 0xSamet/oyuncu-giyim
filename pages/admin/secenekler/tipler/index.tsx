import { GetStaticProps } from "next";
import SEO from "../../../../components/Seo";
import {
  Icon,
  Table,
  Button,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { ReactText, useEffect, useState } from "react";
import { DELETE_CATEGORY } from "../../../../apollo/gql/mutations/category";
import { useLazyQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { putAdminRequestError } from "../../../../store/reducers/admin";
import { GET_OPTION_TYPES } from "../../../../apollo/gql/query/option";
import { DELETE_OPTION_TYPE } from "../../../../apollo/gql/mutations/option";

export interface OptionType {
  id: ReactText;
  name: string;
  sort_order: number;
}

interface OptionTypesRow {
  optionType: OptionType;
}

export default function OptionTypesPage() {
  const [optionTypes, setOptionTypes] = useState([]);
  const dispatch = useDispatch();

  const [getOptionTypes, { data, loading, error }] = useLazyQuery(
    GET_OPTION_TYPES,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [
    deleteOptionTypeRun,
    {
      loading: deleteOptionTypeLoading,
      error: deleteOptionTypeError,
      data: deleteOptionTypeResponse,
    },
  ] = useMutation(DELETE_OPTION_TYPE);

  useEffect(() => {
    getOptionTypes();
  }, []);

  useEffect(() => {
    if (data && data.optionTypes) {
      setOptionTypes(data.optionTypes);
    }
  }, [data]);

  const OptionTypeRow: React.FC<OptionTypesRow> = ({ optionType }) => {
    console.log(optionType);
    return (
      <Table.Row key={optionType.id}>
        <Table.Cell>{optionType.name}</Table.Cell>
        <Table.Cell textAlign="center">{optionType.sort_order}</Table.Cell>
        <Table.Cell singleLine>
          <Link href={`/admin/secenekler/tipler/duzenle/${optionType.id}`}>
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
            onClick={() => handleDeleteCategory(optionType.id)}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  const handleDeleteCategory = async (optionTypeId) => {
    try {
      await deleteOptionTypeRun({
        variables: {
          input: {
            id: optionTypeId,
          },
        },
      });
    } catch (err) {
      console.log(err);
      dispatch(putAdminRequestError(err.message));
    }

    getOptionTypes();
  };

  if (loading || deleteOptionTypeLoading) {
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
        meta_title: "Seçenek tipleri - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-pages-page">
        <Table
          celled
          compact
          className="admin-results-table admin-results-table-top"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3" textAlign="right">
                <Link href="/admin/secenekler/tipler/ekle">
                  <a>
                    <Button icon labelPosition="left" size="tiny" color="blue">
                      <Icon name="add square" />
                      Seçenek Tipi Ekle
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
              <Table.HeaderCell>Seçenek Tipleri</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Sıralama
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Butonlar
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {optionTypes && optionTypes.length > 0 ? (
              [...optionTypes]
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((optionType) => {
                  return (
                    <OptionTypeRow
                      key={optionType.id}
                      optionType={optionType}
                    />
                  );
                })
            ) : (
              <Table.Row>
                <Table.HeaderCell colSpan="3" textAlign="center">
                  Seçenek Tipi Bulunamadı
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
