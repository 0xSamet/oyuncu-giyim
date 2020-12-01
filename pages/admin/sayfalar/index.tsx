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
import { useState, useEffect, Fragment } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PAGES } from "../../../apollo/gql/query/page";
import clsx from "clsx";
import produce from "immer";
import Link from "next/link";

interface Page {
  id: string;
  name: string;
  desktop_menu_id: number;
  mobile_menu_id: number;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  slug: string;
}

interface PageRowType {
  page: Page;
}

export default function AdminDashboard({ page }) {
  const [pagesAccordion, setPagesAccordion] = useState({
    rootAccordionVisible: true,
    activeIndex: 0,
    addPagesForm: {
      visible: false,
      fields: {
        name: "",
        desktop_menu_id: null,
        mobile_menu_id: -1,
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        slug: "",
      },
    },
  });
  const [pages, setPages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [getPages, { data, loading, error }] = useLazyQuery(GET_PAGES, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    getPages();

    return () => {
      setPages([]);
    };
  }, []);

  useEffect(() => {
    if (data && data.pages && data.pages.length > 0) {
      setPages(data.pages);
    }
  }, [data]);

  const handleClick = (index) => {
    const newIndex = activeIndex === index ? -1 : index;
    return setActiveIndex(newIndex);
  };

  const PageRow: React.FC<PageRowType> = ({ page }) => {
    return (
      <Table.Row key={page.id}>
        <Table.Cell>{page.name}</Table.Cell>
        <Table.Cell textAlign="center">0</Table.Cell>
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
            // onClick={() => handleDeletePage(category.id)}
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

  if (error) {
    console.log(error);
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
                <Link href="/admin/kategoriler/ekle">
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
