import SEO from "../../../components/Seo";
import {
  Icon,
  Table,
  Button,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { ReactText, useCallback, useEffect, useMemo, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import {
  GET_DESKTOP_MENU_ADMIN,
  GET_MOBILE_MENU_ADMIN,
} from "../../../apollo/gql/query/menu";
import {
  DELETE_DESKTOP_MENU,
  DELETE_MOBILE_MENU,
  SORT_DESKTOP_MENU,
  SORT_MOBILE_MENU,
} from "../../../apollo/gql/mutations/menu";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import arrayMove from "array-move";
import { useDispatch } from "react-redux";
import { putAdminRequestError } from "../../../store/reducers/admin";
import { changeDesktopMenuIndex } from "../../../store/reducers/menu";

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

export default function AdminMenus() {
  const [desktopMenu, setDesktopMenu] = useState([]);
  const [mobileMenu, setMobileMenu] = useState([]);
  const dispatch = useDispatch();

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

  const [
    sortDesktopMenuRun,
    {
      loading: sortDesktopMenuLoading,
      error: sortDesktopMenuError,
      data: sortDesktopMenuResponse,
    },
  ] = useMutation(SORT_DESKTOP_MENU);

  const [
    deleteMobileMenuRun,
    {
      loading: deleteMobileMenuLoading,
      error: deleteMobileMenuError,
      data: deleteMobileMenuResponse,
    },
  ] = useMutation(DELETE_MOBILE_MENU);

  const [
    sortMobileMenuRun,
    {
      loading: sortMobileMenuLoading,
      error: sortMobileMenuError,
      data: sortMobileMenuResponse,
    },
  ] = useMutation(SORT_MOBILE_MENU);

  useEffect(() => {
    getDesktopMenu();
    getMobileMenu();
    dispatch(changeDesktopMenuIndex(8));
  }, []);

  useEffect(() => {
    if (desktopMenuData && desktopMenuData.desktopMenuOnAdmin) {
      setDesktopMenu(desktopMenuData.desktopMenuOnAdmin);
    }
  }, [desktopMenuData]);

  useEffect(() => {
    if (mobileMenuData && mobileMenuData.mobileMenuOnAdmin) {
      setMobileMenu(mobileMenuData.mobileMenuOnAdmin);
    }
  }, [mobileMenuData]);

  const handleDeleteDesktopMenu = useCallback(async (menuId) => {
    try {
      await deleteDesktopMenuRun({
        variables: {
          input: {
            id: menuId,
          },
        },
      });
    } catch (err) {
      console.log(err);
      dispatch(putAdminRequestError(err.message));
    }

    getDesktopMenu();
  }, []);

  const handleDeleteMobileMenu = useCallback(async (menuId) => {
    try {
      await deleteMobileMenuRun({
        variables: {
          input: {
            id: menuId,
          },
        },
      });
    } catch (err) {
      console.log(err);
      dispatch(putAdminRequestError(err.message));
    }

    getMobileMenu();
  }, []);

  const desktopMenuOnSortEnd = useCallback(
    async ({ oldIndex, newIndex }) => {
      const reSortedMenu = arrayMove(desktopMenu, oldIndex, newIndex);
      setDesktopMenu(reSortedMenu);

      const requestArr = reSortedMenu.map((menu, i) => {
        return {
          id: menu.id,
          sort_order: i,
        };
      });

      try {
        await sortDesktopMenuRun({
          variables: {
            input: requestArr,
          },
        });

        getDesktopMenu();
      } catch (err) {
        console.log(err);
        dispatch(putAdminRequestError(err.message));
      }
    },
    [desktopMenu]
  );

  const mobileMenuOnSortEnd = useCallback(
    async ({ oldIndex, newIndex }) => {
      const reSortedMenu = arrayMove(mobileMenu, oldIndex, newIndex);
      setMobileMenu(reSortedMenu);

      const requestArr = reSortedMenu.map((menu, i) => {
        return {
          id: menu.id,
          sort_order: i,
        };
      });

      try {
        await sortMobileMenuRun({
          variables: {
            input: requestArr,
          },
        });

        getMobileMenu();
      } catch (err) {
        console.log(err);
        dispatch(putAdminRequestError(err.message));
      }
    },
    [mobileMenu]
  );

  const DesktopMenuDragHandle = SortableHandle(() => {
    return (
      <Icon
        name="arrows alternate vertical"
        style={{ cursor: "grab", margin: 0 }}
      />
    );
  });

  const DesktopMenuRow = SortableElement(({ desktopMenu }) => {
    const { name } = desktopMenu.description.find(
      (description: DesktopMenuDescription) => description.language === "tr"
    );

    return (
      <Table.Row key={desktopMenu.id}>
        <Table.Cell textAlign="center">
          <DesktopMenuDragHandle />
        </Table.Cell>
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
            onClick={() => handleDeleteDesktopMenu(desktopMenu.id)}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  });

  const DesktopMenuSortableList = SortableContainer(({ desktopMenu }) => {
    return (
      <Table.Body id="desktop-appender">
        {[...desktopMenu]
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((menu, index) => {
            return (
              <DesktopMenuRow key={menu.id} index={index} desktopMenu={menu} />
            );
          })}
      </Table.Body>
    );
  });

  const MobileMenuDragHandle = SortableHandle(() => {
    return (
      <Icon
        name="arrows alternate vertical"
        style={{ cursor: "grab", margin: 0 }}
      />
    );
  });

  const MobileMenuRow = SortableElement(({ mobileMenu }) => {
    const { name } = mobileMenu.description.find(
      (description: MobileMenuDescription) => description.language === "tr"
    );

    return (
      <Table.Row key={mobileMenu.id}>
        <Table.Cell textAlign="center">
          <MobileMenuDragHandle />
        </Table.Cell>
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
            onClick={() => handleDeleteMobileMenu(mobileMenu.id)}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  });

  const MobileMenuSortableList = SortableContainer(({ mobileMenu }) => {
    return (
      <Table.Body id="mobile-appender">
        {[...mobileMenu]
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((menu, index) => {
            return (
              <MobileMenuRow key={menu.id} index={index} mobileMenu={menu} />
            );
          })}
      </Table.Body>
    );
  });

  if (
    desktopMenuLoading ||
    mobileMenuLoading ||
    deleteDesktopMenuLoading ||
    deleteMobileMenuLoading ||
    sortDesktopMenuLoading ||
    sortMobileMenuLoading
  ) {
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
              <Table.HeaderCell collapsing>Sırala</Table.HeaderCell>
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
            <DesktopMenuSortableList
              desktopMenu={desktopMenu}
              useDragHandle
              lockAxis="y"
              helperClass="desktop-helper-row"
              helperContainer={() => {
                if (typeof window !== "undefined") {
                  return document.querySelector("#desktop-appender");
                }
              }}
              onSortStart={({ node }) => {
                const t = document.querySelector(".desktop-helper-row");
                if (t) {
                  node.childNodes.forEach((a: any, i) => {
                    (t.childNodes[
                      i
                    ] as HTMLElement).style.width = `${a.offsetWidth}px`;
                  });
                }
              }}
              onSortEnd={desktopMenuOnSortEnd}
            />
          ) : (
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell colSpan="4" textAlign="center">
                  Masaüstü Menü Bulunamadı
                </Table.HeaderCell>
              </Table.Row>
            </Table.Body>
          )}
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="4" textAlign="right">
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
              <Table.HeaderCell collapsing textAlign="center">
                Sırala
              </Table.HeaderCell>
              <Table.HeaderCell>Mobil Menüler</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Sıralama
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Butonlar
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {mobileMenu && mobileMenu.length > 0 ? (
            <MobileMenuSortableList
              mobileMenu={mobileMenu}
              useDragHandle
              lockAxis="y"
              helperClass="mobile-helper-row"
              helperContainer={() => {
                if (typeof window !== "undefined") {
                  return document.querySelector("#mobile-appender");
                }
              }}
              onSortStart={({ node }) => {
                const t = document.querySelector(".mobile-helper-row");
                if (t) {
                  node.childNodes.forEach((a: any, i) => {
                    (t.childNodes[
                      i
                    ] as HTMLElement).style.width = `${a.offsetWidth}px`;
                  });
                }
              }}
              onSortEnd={mobileMenuOnSortEnd}
            />
          ) : (
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell colSpan="4" textAlign="center">
                  Mobil Menü Bulunamadı
                </Table.HeaderCell>
              </Table.Row>
            </Table.Body>
          )}

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="4" textAlign="right">
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
