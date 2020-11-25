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
import { useEffect, useState } from "react";
import { GET_CATEGORIES } from "../../../apollo/gql/query/category";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";

export default function AdminDashboard() {
  const [categories, setCategories] = useState([]);

  const [
    getCategories,
    { data: data, loading: loading, error: error },
  ] = useLazyQuery(GET_CATEGORIES, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    getCategories();

    return () => {
      setCategories([]);
    };
  }, []);

  useEffect(() => {
    if (data && data.categories && data.categories.length > 0) {
      setCategories(getNestedChildren(data.categories));
    }
  }, [data]);

  function getNestedChildren(arr, parent) {
    var out = [];
    for (var i in arr) {
      if (arr[i].parent_id == parent) {
        var children = getNestedChildren(arr, arr[i].id);

        if (children.length) {
          arr[i].children = children;
        }
        out.push(arr[i]);
      }
    }
    return out;
  }

  //console.log();

  const renderChildrens = (category, categoryNames) => {
    if (category.children) {
      return category.children.map((c) => {
        return (
          <>
            <Table.Row>
              <Table.Cell>
                {categoryNames.map((name) => {
                  return (
                    <>
                      {name}
                      <Icon name="angle right" style={{ margin: "0 1px" }} />
                    </>
                  );
                })}
                {c.name}
              </Table.Cell>
              <Table.Cell textAlign="center">{c.sort_order}</Table.Cell>
              <Table.Cell singleLine>
                <Link href={`/admin/kategoriler/duzenle/${c.id}`}>
                  <a>
                    <Button icon labelPosition="left" size="tiny" color="teal">
                      <Icon name="edit" />
                      Düzenle
                    </Button>
                  </a>
                </Link>

                <Button icon="trash" size="tiny" color="red"></Button>
              </Table.Cell>
            </Table.Row>
            {renderChildrens(c, [...categoryNames, c.name])}
          </>
        );
      });
    }
  };

  const renderCategory = (category) => {
    return (
      <>
        <Table.Row>
          <Table.Cell>{category.name}</Table.Cell>
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

            <Button icon="trash" size="tiny" color="red"></Button>
          </Table.Cell>
        </Table.Row>
        {renderChildrens(category, [category.name])}
      </>
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
              categories.map((category) => {
                return renderCategory(category);
              })
            ) : (
              <div>error</div>
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
