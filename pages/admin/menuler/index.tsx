import SEO from "../../../components/Seo";
import {
  Icon,
  Table,
  Button,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { ReactText, useEffect, useMemo, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import {
  GET_DESKTOP_MENU_ADMIN,
  GET_MOBILE_MENU_ADMIN,
} from "../../../apollo/gql/query/menu";
import { DELETE_DESKTOP_MENU } from "../../../apollo/gql/mutations/menu";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import arrayMove from "array-move";

export interface DesktopMenuDescription {
  name: string;
  href: string;
  target: string;
  icon_url: string;
  language: string;
}

export interface MobileMenuDescription {
  name: string;
  href: string;
  target: string;
  icon_url: string;
  language: string;
}

export interface DesktopMenu {
  id?: ReactText;
  is_divider: boolean;
  status: boolean;
  sort_order: number;
  description: DesktopMenuDescription[] | null;
}

export interface MobileMenu {
  id?: ReactText;
  status: boolean;
  sort_order: number;
  description: MobileMenuDescription[] | null;
}

interface DesktopMenuRowType {
  desktopMenu: DesktopMenu;
}

interface MobileMenuRowType {
  mobileMenu: MobileMenu;
}

export default function AdminDashboard() {
  const [desktopMenu, setDesktopMenu] = useState([]);
  const [mobileMenu, setMobileMenu] = useState([]);
  const [desktopMenuMinWidth, setDesktopMenuMinWidth] = useState(null);

  const [
    getDesktopMenu,
    {
      data: desktopMenuData,
      loading: desktopMenuLoading,
      error: desktopMenuError,
    },
  ] = useLazyQuery(GET_DESKTOP_MENU_ADMIN, {
    fetchPolicy: "no-cache",
  });

  const [
    getMobileMenu,
    {
      data: mobileMenuData,
      loading: mobileMenuLoading,
      error: mobileMenuError,
    },
  ] = useLazyQuery(GET_MOBILE_MENU_ADMIN, {
    fetchPolicy: "no-cache",
  });

  const [
    deleteDesktopMenuRun,
    {
      loading: deleteDesktopMenuLoading,
      error: deleteDesktopMenuError,
      data: deleteDesktopMenuResponse,
    },
  ] = useMutation(DELETE_DESKTOP_MENU);

  useEffect(() => {
    getDesktopMenu();
    getMobileMenu();
  }, []);

  useEffect(() => {
    if (
      desktopMenuData &&
      desktopMenuData.desktopMenuOnAdmin &&
      desktopMenuData.desktopMenuOnAdmin.length > 0
    ) {
      setDesktopMenu(desktopMenuData.desktopMenuOnAdmin);
    }
  }, [desktopMenuData]);

  useEffect(() => {
    if (
      mobileMenuData &&
      mobileMenuData.mobileMenuOnAdmin &&
      mobileMenuData.mobileMenuOnAdmin.length > 0
    ) {
      setMobileMenu(mobileMenuData.mobileMenuOnAdmin);
    }
  }, [mobileMenuData]);

  const DesktopMenuRow = SortableElement(({ desktopMenu }) => {
    const { name } = desktopMenu.description.find(
      (description: DesktopMenuDescription) => description.language === "tr"
    );

    return (
      <Table.Row key={desktopMenu.id}>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell textAlign="center">{desktopMenu.sort_order}</Table.Cell>
        <Table.Cell singleLine>
          <Link href={`/admin/menuler/masaustu/duzenle/${desktopMenu.id}`}>
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
            onClick={() => handleDeleteCategory(desktopMenu.id)}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  });

  const DesktopMenuSortableList = SortableContainer(({ desktopMenu }) => {
    return (
      <Table.Body id="desktop-appender">
        {[...mobileMenu]
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((menu, index) => {
            return (
              <DesktopMenuRow key={menu.id} index={index} desktopMenu={menu} />
            );
          })}
      </Table.Body>
    );
  });

  const MobileMenuRow: React.FC<MobileMenuRowType> = ({ mobileMenu }) => {
    const { name } = mobileMenu.description.find(
      (description: MobileMenuDescription) => description.language === "tr"
    );

    return (
      <Table.Row key={mobileMenu.id}>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell textAlign="center">{mobileMenu.sort_order}</Table.Cell>
        <Table.Cell singleLine>
          <Link href={`/admin/menuler/mobil/duzenle/${mobileMenu.id}`}>
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
            onClick={() => handleDeleteCategory(mobileMenu.id)}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  const handleDeleteCategory = async (menuId) => {
    await deleteDesktopMenuRun({
      variables: {
        input: {
          id: menuId,
        },
      },
    });

    getDesktopMenu();
  };

  if (desktopMenuLoading || mobileMenuLoading || deleteDesktopMenuLoading) {
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
        meta_title: "Menüler - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-menus-page">
        <Table
          celled
          compact
          className="admin-results-table admin-results-table-top"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3" textAlign="right">
                <Link href="/admin/menuler/masaustu/ekle">
                  <a>
                    <Button icon labelPosition="left" size="tiny" color="blue">
                      <Icon name="add square" />
                      Masaüstü Menü Ekle
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
              <Table.HeaderCell>Masaüstü Menüler</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Sıralama
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Butonlar
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {desktopMenu && desktopMenu.length > 0 ? (
            <>
              <DesktopMenuSortableList
                desktopMenu={desktopMenu}
                helperClass="helper-row"
                helperContainer={() => {
                  if (typeof window === "undefined") {
                    return null;
                  } else {
                    return document.querySelector("#desktop-appender");
                  }
                }}
              />
            </>
          ) : (
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell colSpan="3" textAlign="center">
                  Masaüstü Menü Bulunamadı
                </Table.HeaderCell>
              </Table.Row>
            </Table.Body>
          )}
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
        <Table
          celled
          compact
          className="admin-results-table admin-results-table-top"
          style={{ marginTop: 85 }}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3" textAlign="right">
                <Link href="/admin/menuler/mobil/ekle">
                  <a>
                    <Button icon labelPosition="left" size="tiny" color="blue">
                      <Icon name="add square" />
                      Mobil Menü Ekle
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
              <Table.HeaderCell>Mobil Menüler</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Sıralama
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Butonlar
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {mobileMenu && mobileMenu.length > 0 ? (
              [...mobileMenu]
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((menu) => {
                  return <MobileMenuRow key={menu.id} mobileMenu={menu} />;
                })
            ) : (
              <Table.Row>
                <Table.HeaderCell colSpan="3" textAlign="center">
                  Mobil Menü Bulunamadı
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
