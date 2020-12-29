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
import { GET_PAGES_ADMIN } from "../../../apollo/gql/query/page";
import { DELETE_PAGE } from "../../../apollo/gql/mutations/page";

export interface PageDescription {
  name: string;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  slug: string;
  language: string;
}

export interface Page {
  id: ReactText;
  description: PageDescription[] | null;
  status: boolean;
  sort_order: number;
  desktop_menu_id: number | string;
  mobile_menu_id: number | string;
}

interface PageRowType {
  page: Page;
}

export default function AdminDashboard() {
  const [pages, setPages] = useState([]);
  const dispatch = useDispatch();

  const [getPages, { data, loading, error }] = useLazyQuery(GET_PAGES_ADMIN, {
    fetchPolicy: "no-cache",
  });

  const [
    deletePageRun,
    {
      loading: deletePageLoading,
      error: deletePageError,
      data: deletePageResponse,
    },
  ] = useMutation(DELETE_PAGE);

  useEffect(() => {
    getPages();
  }, []);

  useEffect(() => {
    if (data && data.pagesOnAdmin) {
      setPages(data.pagesOnAdmin);
    }
  }, [data]);

  const PageRow: React.FC<PageRowType> = ({ page }) => {
    const { name } = page.description.find(
      (description) => description.language === "tr"
    );

    return (
      <Table.Row key={page.id}>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell textAlign="center">{page.sort_order}</Table.Cell>
        <Table.Cell singleLine>
          <Link href={`/admin/sayfalar/duzenle/${page.id}`}>
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
            onClick={() => handleDeletePage(page.id)}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  const handleDeletePage = async (pageId) => {
    try {
      await deletePageRun({
        variables: {
          input: {
            id: pageId,
          },
        },
      });
    } catch (err) {
      console.log(err);
      dispatch(putAdminRequestError(err.message));
    }

    getPages();
  };

  if (loading || deletePageLoading) {
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
        meta_title: "Sayfalar - Oyuncu Giyim",
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
                <Link href="/admin/sayfalar/ekle">
                  <a>
                    <Button icon labelPosition="left" size="tiny" color="blue">
                      <Icon name="add square" />
                      Sayfa Ekle
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
              <Table.HeaderCell>Sayfalar</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Sıralama
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Butonlar
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {pages && pages.length > 0 ? (
              [...pages]
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((page) => {
                  return <PageRow key={page.id} page={page} />;
                })
            ) : (
              <Table.Row>
                <Table.HeaderCell colSpan="3" textAlign="center">
                  Sayfa Bulunamadı
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
