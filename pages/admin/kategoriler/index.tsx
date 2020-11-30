import { GetStaticProps } from "next";
import SEO from "../../../components/Seo";
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
import { Fragment, useEffect, useState } from "react";
import { GET_CATEGORIES } from "../../../apollo/gql/query/category";
import { DELETE_CATEGORY } from "../../../apollo/gql/mutations/category";
import { useLazyQuery, useMutation } from "@apollo/client";
import Link from "next/link";

export default function AdminDashboard() {
  const [categories, setCategories] = useState([]);

  const [getCategories, { data, loading, error }] = useLazyQuery(
    GET_CATEGORIES,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [
    deleteCategoryRun,
    {
      loading: deleteCategoryLoading,
      error: deleteCategoryError,
      data: deleteCategoryResponse,
    },
  ] = useMutation(DELETE_CATEGORY);

  useEffect(() => {
    getCategories();

    return () => {
      setCategories([]);
    };
  }, []);

  useEffect(() => {
    if (data && data.categories && data.categories.length > 0) {
      setCategories(data.categories);
    }
  }, [data]);

  const renderCategory = (category) => {
    return (
      <Table.Row key={category.id}>
        <Table.Cell>
          {category.parents.reverse().map((category) => {
            return (
              <Fragment key={category.id}>
                {category.name}
                <Icon
                  name="chevron right"
                  size="small"
                  style={{ marginRight: 1, marginLeft: 1 }}
                />
              </Fragment>
            );
          })}
          {category.name}
        </Table.Cell>
        <Table.Cell textAlign="center">{category.sort_order}</Table.Cell>
        <Table.Cell singleLine>
          <Link href={`/admin/kategoriler/duzenle/${category.id}`}>
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
            onClick={() => handleDeleteCategory(category.id)}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  const handleDeleteCategory = async (categoryId) => {
    await deleteCategoryRun({
      variables: {
        input: {
          id: categoryId,
        },
      },
    });

    getCategories();
  };

  if (loading || deleteCategoryLoading) {
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
        meta_title: "Kategoriler - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-categories-page">
        <Table celled compact className="categories-table add-category">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3" textAlign="right">
                <Link href="/admin/kategoriler/ekle">
                  <a>
                    <Button icon labelPosition="left" size="tiny" color="blue">
                      <Icon name="add square" />
                      Kategori Ekle
                    </Button>
                  </a>
                </Link>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
        <Table celled compact className="categories-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Kategoriler</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Sıralama
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Butonlar
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {categories && categories.length > 0 ? (
              [...categories]
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((category) => {
                  return renderCategory(category);
                })
            ) : (
              <Table.Row>
                <Table.HeaderCell colSpan="3" textAlign="center">
                  Yükleniyor...
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
