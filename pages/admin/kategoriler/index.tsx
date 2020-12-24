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
} from "../../../apollo/gql/query/category";
import { DELETE_CATEGORY } from "../../../apollo/gql/mutations/category";
import { useLazyQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { putAdminRequestError } from "../../../store/reducers/admin";

export interface CategoryDescription {
  name: string;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  slug: string;
  language: string;
}

export interface Category {
  id: ReactText;
  description: CategoryDescription[] | null;
  parent_id: number | string | null;
  status: boolean;
  sort_order: number;
  desktop_menu_id: number;
  mobile_menu_id: number;
  parents?: Category[];
}

interface CategoryRowType {
  category: Category;
}

export default function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const [getCategories, { data, loading, error }] = useLazyQuery(
    GET_CATEGORIES_ADMIN,
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
    if (data && data.categoriesOnAdmin && data.categoriesOnAdmin.length > 0) {
      setCategories(
        data.categoriesOnAdmin.map((category) => {
          return {
            ...category,
            parents: category.parents.reverse(),
          };
        })
      );
    }
  }, [data]);

  const CategoryRow: React.FC<CategoryRowType> = ({ category }) => {
    const { name } = category.description.find(
      (category) => category.language === "tr"
    );

    return (
      <Table.Row key={category.id}>
        <Table.Cell>
          {category.parents.map((category) => {
            const { name } = category.description.find(
              (category) => category.language === "tr"
            );
            return (
              <Fragment key={category.id}>
                {name}
                <Icon
                  name="chevron right"
                  size="small"
                  style={{ marginRight: 1, marginLeft: 1 }}
                />
              </Fragment>
            );
          })}
          <span
            style={{
              background: "#1a69a4",
              color: "#fff",
              padding: 5,
              borderRadius: ".28571429rem",
              lineHeight: 2,
            }}
          >
            {name}
          </span>
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
    try {
      await deleteCategoryRun({
        variables: {
          input: {
            id: categoryId,
          },
        },
      });
    } catch (err) {
      console.log(err);
      dispatch(putAdminRequestError(err.message));
    }

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
                      Kategori Ekle
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
                  return <CategoryRow key={category.id} category={category} />;
                })
            ) : (
              <Table.Row>
                <Table.HeaderCell colSpan="3" textAlign="center">
                  Kategori Bulunamadı
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
