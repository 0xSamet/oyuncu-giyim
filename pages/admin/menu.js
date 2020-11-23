import { GetStaticProps } from "next";
import SEO from "../../components/Seo";
import {
  Accordion,
  Icon,
  Dimmer,
  Loader,
  Segment,
  Button,
  Input,
  Form,
  Select,
  Checkbox,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_DESKTOP_MENU, GET_MOBILE_MENU } from "../../apollo/gql/query/menu";
import {
  ADD_DESKTOP_MENU,
  UPDATE_DESKTOP_MENU,
  DELETE_DESKTOP_MENU,
  SORT_DESKTOP_MENU,
  ADD_MOBILE_MENU,
  UPDATE_MOBILE_MENU,
  DELETE_MOBILE_MENU,
  SORT_MOBILE_MENU,
} from "../../apollo/gql/mutations/menu";
import clsx from "clsx";
import produce from "immer";
import { initializeApollo } from "../../apollo/client";

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import arrayMove from "array-move";

const DragHandle = SortableHandle(() => (
  <Icon name="arrows alternate vertical" style={{ marginRight: 12 }} />
));

const TargetSelectComponent = ({ ...all }) => {
  return (
    <Select
      {...all}
      style={{
        maxHeight: 40,
        marginTop: 17,
        marginRight: 7,
      }}
      options={[
        {
          key: "_self",
          value: "_self",
          text: "_self",
        },
        {
          key: "_blank",
          value: "_blank",
          text: "_blank",
        },
        {
          key: "_parent",
          value: "_parent",
          text: "_parent",
        },
        {
          key: "_top",
          value: "_top",
          text: "_top",
        },
      ]}
    />
  );
};

const DesktopMenuSortableItem = SortableElement(
  ({
    menu,
    isActive,
    handleDesktopMenuClick,
    handleDesktopMenuInputChange,
    handleDesktopMenuUpdate,
    handleDesktopMenuDelete,
    desktopMenu,
    setDesktopMenu,
  }) => {
    return (
      <div
        className={clsx({
          "sortable-list-item": true,
          active: isActive,
        })}
      >
        <Accordion.Title
          active={isActive}
          index={menu.id}
          onClick={() => handleDesktopMenuClick(menu.id)}
        >
          <DragHandle />
          {menu.name}
          <span
            className="delete-icon-wrapper"
            onClick={(e) => {
              e.stopPropagation();
              handleDesktopMenuDelete(menu.id);
            }}
          >
            <img src="/icons/cancel.svg" />
          </span>
        </Accordion.Title>
        <Accordion.Content active={isActive}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleDesktopMenuUpdate(menu.id);
            }}
          >
            <Form.Field>
              <label>Menü Adı</label>
              <Input
                name="name"
                value={menu.name || ""}
                onChange={(e) => handleDesktopMenuInputChange(e, menu.id)}
              />
            </Form.Field>
            <Form.Group
              widths="equal"
              style={{
                alignItems: "center",
              }}
            >
              <Form.Field>
                <label>Gideceği Link</label>
                <Input
                  name="href"
                  value={menu.href || ""}
                  onChange={(e) => handleDesktopMenuInputChange(e, menu.id)}
                />
              </Form.Field>
              <TargetSelectComponent
                onChange={(_e, { value }) => {
                  const menuId = menu.id;
                  const index = desktopMenu.findIndex(
                    (menu) => menu.id === menuId
                  );
                  setDesktopMenu(
                    produce(desktopMenu, (draft) => {
                      draft[index]["target"] = value;
                    })
                  );
                }}
                value={menu.target || "_self"}
              />
            </Form.Group>
            <Form.Field>
              <label>Icon Url</label>
              <Input
                name="icon_url"
                value={menu.icon_url || ""}
                onChange={(e) => handleDesktopMenuInputChange(e, menu.id)}
              />
            </Form.Field>
            <Form.Field
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: 5,
              }}
            >
              <Checkbox
                toggle
                label="Divider ?"
                checked={menu.is_divider}
                onChange={() => {
                  const menuId = menu.id;
                  const index = desktopMenu.findIndex(
                    (menu) => menu.id === menuId
                  );
                  setDesktopMenu(
                    produce(desktopMenu, (draft) => {
                      draft[index]["is_divider"] = !draft[index]["is_divider"];
                    })
                  );
                }}
              />
            </Form.Field>

            <Button primary fluid>
              Kaydet
            </Button>
          </Form>
        </Accordion.Content>
      </div>
    );
  }
);

const DesktopMenuSortableList = SortableContainer(
  ({
    desktopMenu,
    setDesktopMenu,
    desktopMenuAccordion,
    handleDesktopMenuClick,
    handleDesktopMenuInputChange,
    handleDesktopMenuUpdate,
    handleDesktopMenuDelete,
  }) => {
    return (
      <div className="desktop-menu-sortable-list">
        {desktopMenu && desktopMenu.length > 0 ? (
          desktopMenu.map((menu, i) => {
            return (
              <DesktopMenuSortableItem
                key={`sortable-item-${menu.id}`}
                index={i}
                menu={menu}
                desktopMenu={desktopMenu}
                setDesktopMenu={setDesktopMenu}
                isActive={desktopMenuAccordion.activeIndex === menu.id}
                handleDesktopMenuClick={handleDesktopMenuClick}
                handleDesktopMenuInputChange={handleDesktopMenuInputChange}
                handleDesktopMenuUpdate={handleDesktopMenuUpdate}
                handleDesktopMenuDelete={handleDesktopMenuDelete}
                disabled={desktopMenuAccordion.activeIndex === menu.id}
              />
            );
          })
        ) : (
          <div>error</div>
        )}
        <div className="sortable-list-appender-desktop"></div>
      </div>
    );
  }
);

const MobileMenuSortableItem = SortableElement(
  ({
    menu,
    isActive,
    handleMobileMenuClick,
    handleMobileMenuInputChange,
    mobileMenu,
    setMobileMenu,
    handleMobileMenuUpdate,
    handleMobileMenuDelete,
  }) => {
    return (
      <div
        className={clsx({
          "sortable-list-item": true,
          active: isActive,
        })}
      >
        <Accordion.Title
          active={isActive}
          onClick={() => handleMobileMenuClick(menu.id)}
        >
          <DragHandle />
          {menu.name}
          <span
            className="delete-icon-wrapper"
            onClick={(e) => {
              e.stopPropagation();
              handleMobileMenuDelete(menu.id);
            }}
          >
            <img src="/icons/cancel.svg" />
          </span>
        </Accordion.Title>
        <Accordion.Content active={isActive}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleMobileMenuUpdate(menu.id);
            }}
          >
            <Form.Field>
              <label>Menü Adı</label>
              <input
                name="name"
                value={menu.name}
                onChange={(e) => handleMobileMenuInputChange(e, menu.id)}
              />
            </Form.Field>
            <Form.Group
              widths="equal"
              style={{
                alignItems: "center",
              }}
            >
              <Form.Field>
                <label>Gideceği Link</label>
                <input
                  name="href"
                  value={menu.href}
                  onChange={(e) => handleMobileMenuInputChange(e, menu.id)}
                />
              </Form.Field>
              <TargetSelectComponent
                value={menu.target || "_self"}
                onChange={(_e, { value }) => {
                  const menuId = menu.id;
                  const index = mobileMenu.findIndex(
                    (menu) => menu.id === menuId
                  );
                  setMobileMenu(
                    produce(mobileMenu, (draft) => {
                      draft[index]["target"] = value;
                    })
                  );
                }}
              />
            </Form.Group>
            <Form.Field>
              <label>Icon Url</label>
              <input
                name="icon_url"
                value={menu.icon_url}
                onChange={(e) => handleMobileMenuInputChange(e, menu.id)}
              />
            </Form.Field>
            <Button primary fluid>
              Kaydet
            </Button>
          </Form>
        </Accordion.Content>
      </div>
    );
  }
);

const MobileMenuSortableList = SortableContainer(
  ({
    mobileMenu,
    setMobileMenu,
    handleMobileMenuUpdate,
    handleMobileMenuDelete,
    mobileMenuAccordion,
    handleMobileMenuClick,
    handleMobileMenuInputChange,
  }) => {
    return (
      <div className="desktop-menu-sortable-list">
        {mobileMenu && mobileMenu.length > 0 ? (
          mobileMenu.map((menu, i) => {
            return (
              <MobileMenuSortableItem
                key={`sortable-item-${menu.id}`}
                index={i}
                menu={menu}
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
                isActive={mobileMenuAccordion.activeIndex === menu.id}
                handleMobileMenuClick={handleMobileMenuClick}
                handleMobileMenuInputChange={handleMobileMenuInputChange}
                disabled={mobileMenuAccordion.activeIndex === menu.id}
                handleMobileMenuUpdate={handleMobileMenuUpdate}
                handleMobileMenuDelete={handleMobileMenuDelete}
              />
            );
          })
        ) : (
          <div>error</div>
        )}
        <div className="sortable-list-appender-mobile"></div>
      </div>
    );
  }
);

export default function AdminMenuPage({ page }) {
  const [desktopMenu, setDesktopMenu] = useState([]);
  const [mobileMenu, setMobileMenu] = useState([]);

  const [desktopMenuAccordion, setDesktopMenuAccordion] = useState({
    rootAccordionVisible: true,
    activeIndex: 0,
    addMenuForm: {
      visible: false,
      fields: {
        name: "",
        href: "",
        target: "_self",
        icon_url: "",
        is_divider: false,
      },
    },
  });
  const [mobileMenuAccordion, setMobileMenuAccordion] = useState({
    rootAccordionVisible: true,
    activeIndex: 0,
    addMenuForm: {
      visible: false,
      fields: {
        name: "",
        href: "",
        target: "_self",
        icon_url: "",
      },
    },
  });
  const apollo = initializeApollo();

  //console.log(apollo);

  const [
    getDesktopMenu,
    { data: data1, loading: loading1, error1 },
  ] = useLazyQuery(GET_DESKTOP_MENU, {
    fetchPolicy: "no-cache",
    client: apollo,
  });
  const [
    getMobileMenu,
    { data: data2, loading: loading2, error2 },
  ] = useLazyQuery(GET_MOBILE_MENU, {
    fetchPolicy: "no-cache",
    client: apollo,
  });

  const [addDesktopMenuRun] = useMutation(ADD_DESKTOP_MENU);

  const [updateDesktopMenuRun] = useMutation(UPDATE_DESKTOP_MENU);

  const [sortDesktopMenuRun] = useMutation(SORT_DESKTOP_MENU);

  const [deleteDesktopMenuRun] = useMutation(DELETE_DESKTOP_MENU);

  const [addMobileMenuRun] = useMutation(ADD_MOBILE_MENU);

  const [updateMobileMenuRun] = useMutation(UPDATE_MOBILE_MENU);

  const [deleteMobileMenuRun] = useMutation(DELETE_MOBILE_MENU);

  const [sortMobileMenuRun] = useMutation(SORT_MOBILE_MENU);

  useEffect(() => {
    getDesktopMenu();
    getMobileMenu();

    return () => {
      setDesktopMenu([]);
      setMobileMenu([]);
    };
  }, []);

  useEffect(() => {
    if (data1 && data1.desktopMenu && data1.desktopMenu.length > 0) {
      setDesktopMenu(
        [...data1.desktopMenu].sort((a, b) => a.sort_order - b.sort_order)
      );
    }
    if (data2 && data2.mobileMenu && data2.mobileMenu.length > 0) {
      setMobileMenu(
        [...data2.mobileMenu].sort((a, b) => a.sort_order - b.sort_order)
      );
    }
  }, [data1, data2]);

  const handleDesktopMenuUpdate = async (menuId) => {
    const menu = desktopMenu.find((menu) => menu.id == menuId);
    if (!menu) {
      console.log("menü bulunamadı");
    } else {
      await updateDesktopMenuRun({
        variables: {
          input: {
            id: menu.id,
            name: menu.name,
            href: menu.href,
            target: menu.target,
            icon_url: menu.icon_url,
            is_divider: menu.is_divider,
          },
        },
      });

      getDesktopMenu();
    }
  };

  const handleAddDesktopMenu = async () => {
    const {
      name,
      href,
      target,
      icon_url,
      is_divider,
    } = desktopMenuAccordion.addMenuForm.fields;

    if (name === "" || href === "" || icon_url === "") {
      console.log("Tüm Alanları Doldurunuz");
    } else {
      await addDesktopMenuRun({
        variables: {
          input: {
            name,
            href,
            target,
            icon_url,
            is_divider,
          },
        },
      });

      getDesktopMenu();
    }
  };

  const handleDesktopMenuDelete = async (menuId) => {
    await deleteDesktopMenuRun({
      variables: {
        input: {
          id: menuId,
        },
      },
    });

    getDesktopMenu();
  };

  const handleDesktopMenuClick = (index) => {
    const newIndex = desktopMenuAccordion.activeIndex === index ? -1 : index;
    return setDesktopMenuAccordion({
      ...desktopMenuAccordion,
      activeIndex: newIndex,
    });
  };

  const handleDesktopMenuInputChange = (e, menuId) => {
    //setDesktopMenu(...desktopMenu);
    const index = desktopMenu.findIndex((menu) => menu.id == menuId);

    setDesktopMenu(
      produce(desktopMenu, (draft) => {
        draft[index][e.target.name] = e.target.value;
      })
    );
  };

  const desktopMenuOnSortEnd = async ({ oldIndex, newIndex }) => {
    const reSortedMenu = arrayMove(desktopMenu, oldIndex, newIndex);
    setDesktopMenu(reSortedMenu);

    const requestArr = reSortedMenu.map((menu, i) => {
      return {
        id: menu.id,
        sort_order: i,
      };
    });

    await sortDesktopMenuRun({
      variables: {
        input: requestArr,
      },
    });

    getMobileMenu();
  };

  const handleMobileMenuClick = (index) => {
    const newIndex = mobileMenuAccordion.activeIndex === index ? -1 : index;
    return setMobileMenuAccordion({
      ...mobileMenuAccordion,
      activeIndex: newIndex,
    });
  };

  const handleAddMobileMenu = async () => {
    const {
      name,
      href,
      target,
      icon_url,
    } = mobileMenuAccordion.addMenuForm.fields;

    if (name === "" || href === "" || icon_url === "") {
      console.log("Tüm Alanları Doldurunuz");
    } else {
      await addMobileMenuRun({
        variables: {
          input: {
            name,
            href,
            target,
            icon_url,
          },
        },
      });

      getMobileMenu();
    }
  };

  const handleMobileMenuUpdate = async (menuId) => {
    const menu = mobileMenu.find((menu) => menu.id == menuId);
    if (!menu) {
      console.log("menü bulunamadı");
    } else {
      await updateMobileMenuRun({
        variables: {
          input: {
            id: menu.id,
            name: menu.name,
            href: menu.href,
            target: menu.target,
            icon_url: menu.icon_url,
          },
        },
      });

      getMobileMenu();
    }
  };

  const handleMobileMenuDelete = async (menuId) => {
    await deleteMobileMenuRun({
      variables: {
        input: {
          id: menuId,
        },
      },
    });

    getMobileMenu();
  };

  const mobileMenuOnSortEnd = async ({ oldIndex, newIndex }) => {
    const reSortedMenu = arrayMove(mobileMenu, oldIndex, newIndex);
    setMobileMenu(reSortedMenu);
    const requestArr = reSortedMenu.map((menu, i) => {
      return {
        id: menu.id,
        sort_order: i,
      };
    });
    await sortMobileMenuRun({
      variables: {
        input: requestArr,
      },
    });

    getMobileMenu();
  };

  const handleMobileMenuInputChange = (e, menuId) => {
    //setDesktopMenu(...desktopMenu);
    const index = mobileMenu.findIndex((menu) => menu.id == menuId);

    setMobileMenu(
      produce(mobileMenu, (draft) => {
        draft[index][e.target.name] = e.target.value;
      })
    );
  };

  if (error1 || error2) {
    console.log(error1 || error2);
  }

  if (loading1 || loading2) {
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
      <section className="admin-menu-page">
        <Accordion styled className="menu-accordion">
          <div
            className={clsx({
              accordion: true,
              active: desktopMenuAccordion.rootAccordionVisible,
            })}
          >
            <Accordion.Title
              active={desktopMenuAccordion.rootAccordionVisible}
              onClick={() =>
                setDesktopMenuAccordion({
                  ...desktopMenuAccordion,
                  rootAccordionVisible: !desktopMenuAccordion.rootAccordionVisible,
                })
              }
            >
              <Icon name="dropdown" />
              Masaüstü Menü
            </Accordion.Title>
            <Accordion.Content
              active={desktopMenuAccordion.rootAccordionVisible}
            >
              <Accordion styled>
                <DesktopMenuSortableList
                  useDragHandle
                  lockAxis="y"
                  desktopMenu={desktopMenu}
                  setDesktopMenu={setDesktopMenu}
                  desktopMenuAccordion={desktopMenuAccordion}
                  handleDesktopMenuClick={handleDesktopMenuClick}
                  handleDesktopMenuUpdate={handleDesktopMenuUpdate}
                  handleDesktopMenuDelete={handleDesktopMenuDelete}
                  handleDesktopMenuInputChange={handleDesktopMenuInputChange}
                  onSortEnd={desktopMenuOnSortEnd}
                  helperContainer={() => {
                    if (typeof window === "undefined") {
                      return null;
                    } else {
                      return document.querySelector(
                        ".sortable-list-appender-desktop"
                      );
                    }
                  }}
                />
              </Accordion>
              <Accordion styled>
                <Accordion.Title
                  active={desktopMenuAccordion.addMenuForm.visible}
                  onClick={() =>
                    setDesktopMenuAccordion({
                      ...desktopMenuAccordion,
                      addMenuForm: {
                        ...desktopMenuAccordion.addMenuForm,
                        visible: !desktopMenuAccordion.addMenuForm.visible,
                      },
                    })
                  }
                >
                  <Icon name="dropdown" />
                  Menü Ekle
                </Accordion.Title>
                <Accordion.Content
                  active={desktopMenuAccordion.addMenuForm.visible}
                >
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddDesktopMenu();
                    }}
                    style={{
                      paddingTop: 15,
                    }}
                  >
                    <Form.Field>
                      <label>Menu Adı</label>
                      <input
                        type="text"
                        value={desktopMenuAccordion.addMenuForm.fields.name}
                        onChange={(e) =>
                          setDesktopMenuAccordion(
                            produce(desktopMenuAccordion, (draft) => {
                              draft.addMenuForm.fields.name =
                                e.currentTarget.value;
                            })
                          )
                        }
                      />
                    </Form.Field>
                    <Form.Group
                      widths="equal"
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <Form.Field>
                        <label>Gideceği Link</label>
                        <input
                          type="text"
                          value={desktopMenuAccordion.addMenuForm.fields.href}
                          onChange={(e) =>
                            setDesktopMenuAccordion(
                              produce(desktopMenuAccordion, (draft) => {
                                draft.addMenuForm.fields.href =
                                  e.currentTarget.value;
                              })
                            )
                          }
                        />
                      </Form.Field>
                      <TargetSelectComponent
                        value={desktopMenuAccordion.addMenuForm.fields.target}
                        onChange={(e, { value }) =>
                          setDesktopMenuAccordion(
                            produce(desktopMenuAccordion, (draft) => {
                              draft.addMenuForm.fields.target = value;
                            })
                          )
                        }
                      />
                    </Form.Group>
                    <Form.Field>
                      <label>Icon Url</label>
                      <input
                        type="text"
                        value={desktopMenuAccordion.addMenuForm.fields.icon_url}
                        onChange={(e) =>
                          setDesktopMenuAccordion(
                            produce(desktopMenuAccordion, (draft) => {
                              draft.addMenuForm.fields.icon_url =
                                e.currentTarget.value;
                            })
                          )
                        }
                      />
                    </Form.Field>
                    <Form.Field
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingBottom: 5,
                      }}
                    >
                      <Checkbox
                        toggle
                        label="Divider ?"
                        checked={
                          desktopMenuAccordion.addMenuForm.fields.is_divider
                        }
                        onChange={(e) =>
                          setDesktopMenuAccordion(
                            produce(desktopMenuAccordion, (draft) => {
                              draft.addMenuForm.fields.is_divider = !draft
                                .addMenuForm.fields.is_divider;
                            })
                          )
                        }
                      />
                    </Form.Field>

                    <Button primary fluid>
                      Ekle
                    </Button>
                  </Form>
                </Accordion.Content>
              </Accordion>
            </Accordion.Content>
          </div>
        </Accordion>
        <Accordion styled className="menu-accordion">
          <div
            className={clsx({
              accordion: true,
              active: mobileMenuAccordion.rootAccordionVisible,
            })}
          >
            <Accordion.Title
              active={mobileMenuAccordion.rootAccordionVisible}
              index={1}
              onClick={() =>
                setMobileMenuAccordion({
                  ...mobileMenuAccordion,
                  rootAccordionVisible: !mobileMenuAccordion.rootAccordionVisible,
                })
              }
            >
              <Icon name="dropdown" />
              Mobil Menü
            </Accordion.Title>
            <Accordion.Content
              active={mobileMenuAccordion.rootAccordionVisible}
            >
              <Accordion styled>
                <MobileMenuSortableList
                  useDragHandle
                  lockAxis="y"
                  mobileMenu={mobileMenu}
                  setMobileMenu={setMobileMenu}
                  mobileMenuAccordion={mobileMenuAccordion}
                  handleMobileMenuClick={handleMobileMenuClick}
                  handleMobileMenuUpdate={handleMobileMenuUpdate}
                  handleMobileMenuDelete={handleMobileMenuDelete}
                  handleMobileMenuInputChange={handleMobileMenuInputChange}
                  onSortEnd={mobileMenuOnSortEnd}
                  helperContainer={() => {
                    if (typeof window === "undefined") {
                      return null;
                    } else {
                      return document.querySelector(
                        ".sortable-list-appender-mobile"
                      );
                    }
                  }}
                />
              </Accordion>
              <Accordion styled>
                <Accordion.Title
                  active={mobileMenuAccordion.addMenuForm.visible}
                  onClick={() =>
                    setMobileMenuAccordion({
                      ...mobileMenuAccordion,
                      addMenuForm: {
                        ...mobileMenuAccordion.addMenuForm,
                        visible: !mobileMenuAccordion.addMenuForm.visible,
                      },
                    })
                  }
                >
                  <Icon name="dropdown" />
                  Menü Ekle
                </Accordion.Title>
                <Accordion.Content
                  active={mobileMenuAccordion.addMenuForm.visible}
                >
                  <Form
                    style={{ marginTop: 15 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddMobileMenu();
                    }}
                  >
                    <Form.Field>
                      <label>Menü Adı</label>
                      <input
                        type="text"
                        value={mobileMenuAccordion.addMenuForm.fields.name}
                        onChange={(e) => {
                          setMobileMenuAccordion(
                            produce(mobileMenuAccordion, (draft) => {
                              draft.addMenuForm.fields.name = e.target.value;
                            })
                          );
                        }}
                      />
                    </Form.Field>
                    <Form.Group
                      widths="equal"
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <Form.Field>
                        <label>Gideceği Link</label>
                        <input
                          type="text"
                          value={mobileMenuAccordion.addMenuForm.fields.href}
                          onChange={(e) => {
                            setMobileMenuAccordion(
                              produce(mobileMenuAccordion, (draft) => {
                                draft.addMenuForm.fields.href = e.target.value;
                              })
                            );
                          }}
                        />
                      </Form.Field>
                      <TargetSelectComponent
                        value={mobileMenuAccordion.addMenuForm.fields.target}
                        onChange={(e, { value }) => {
                          setMobileMenuAccordion(
                            produce(mobileMenuAccordion, (draft) => {
                              draft.addMenuForm.fields.target = value;
                            })
                          );
                        }}
                      />
                    </Form.Group>
                    <Form.Field>
                      <label>Icon Url</label>
                      <input
                        type="text"
                        value={mobileMenuAccordion.addMenuForm.fields.icon_url}
                        onChange={(e) => {
                          setMobileMenuAccordion(
                            produce(mobileMenuAccordion, (draft) => {
                              draft.addMenuForm.fields.icon_url =
                                e.target.value;
                            })
                          );
                        }}
                      />
                    </Form.Field>
                    <Button primary fluid>
                      Ekle
                    </Button>
                  </Form>
                </Accordion.Content>
              </Accordion>
            </Accordion.Content>
          </div>
        </Accordion>
      </section>
    </SEO>
  );
}
