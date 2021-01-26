import SEO from "../../../components/Seo";
import {
  Icon,
  Table,
  Button,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { ReactText, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { putAdminRequestError } from "../../../store/reducers/admin";
import { GET_OPTIONS_ADMIN_JUST_NAMES } from "../../../apollo/gql/query/option";
import { DELETE_OPTION } from "../../../apollo/gql/mutations/option";
import { changeDesktopMenuIndex } from "../../../store/reducers/menu";

export interface OptionType {
  name: string;
  sort_order: number;
}

export interface OptionValueDescription {
  name: string;
  language: string;
}

export interface OptionValue {
  id: number;
  sort_order: number;
  description: OptionValueDescription[];
}

export interface OptionDescription {
  name: string;
  language: string;
}

export interface Option {
  id: number | ReactText;
  sort_order: number;
  type: string;
  description: OptionDescription[];
  option_values: OptionValue[];
}

interface OptionRowType {
  option: Option;
}

export default function AdminDashboard() {
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

  const [getOptions, { data, loading, error }] = useLazyQuery(
    GET_OPTIONS_ADMIN_JUST_NAMES,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [
    deleteOptionRun,
    {
      loading: deleteOptionLoading,
      error: deleteOptionError,
      data: deleteOptionResponse,
    },
  ] = useMutation(DELETE_OPTION);

  useEffect(() => {
    getOptions();
    dispatch(changeDesktopMenuIndex(6));
  }, []);

  useEffect(() => {
    if (data && data.optionsOnAdmin) {
      setOptions(data.optionsOnAdmin);
    }
  }, [data]);

  const OptionRow: React.FC<OptionRowType> = ({ option }) => {
    const { name } = option.description.find(
      (description) => description.language === "tr"
    );

    return (
      <Table.Row key={option.id}>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell textAlign="center">{option.sort_order}</Table.Cell>
        <Table.Cell singleLine>
          <Link href={`/admin/secenekler/duzenle/${option.id}`}>
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
            onClick={() => handleDeleteOption(option.id)}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  const handleDeleteOption = async (optionId) => {
    try {
      await deleteOptionRun({
        variables: {
          input: {
            id: optionId,
          },
        },
      });
    } catch (err) {
      console.log(err);
      dispatch(putAdminRequestError(err.message));
    }

    getOptions();
  };

  if (loading || deleteOptionLoading) {
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
        meta_title: "Seçenekler - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-options-page">
        <Table
          celled
          compact
          className="admin-results-table admin-results-table-top"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3" textAlign="right">
                <Link href="/admin/secenekler/ekle">
                  <a>
                    <Button icon labelPosition="left" size="tiny" color="blue">
                      <Icon name="add square" />
                      Seçenek Ekle
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
              <Table.HeaderCell>Seçenekler</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Sıralama
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Butonlar
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {options && options.length > 0 ? (
              [...options]
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((option) => {
                  return <OptionRow key={option.id} option={option} />;
                })
            ) : (
              <Table.Row>
                <Table.HeaderCell colSpan="3" textAlign="center">
                  Seçenek Bulunamadı
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
