import { GetStaticProps } from "next";
import SEO from "../../components/Seo";
import {
  Accordion,
  Icon,
  Dimmer,
  Loader,
  Segment,
  Button,
  TextArea,
  Select,
  Checkbox,
  Form,
} from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PAGES } from "../../apollo/gql/query/page";
import clsx from "clsx";
import produce from "immer";

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

  console.log(pages);

  return (
    <SEO
      seo={{
        meta_title: "Sayfalar - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-pages-page">
        <Accordion styled className="pages-accordion">
          <div
            className={clsx({
              accordion: true,
              active: pagesAccordion.rootAccordionVisible,
            })}
          >
            <Accordion.Title
              active={clsx({
                active: pagesAccordion.rootAccordionVisible,
              })}
              onClick={() =>
                setPagesAccordion(
                  produce(pagesAccordion, (draft) => {
                    draft.rootAccordionVisible = !draft.rootAccordionVisible;
                  })
                )
              }
            >
              <Icon name="dropdown" />
              Sayfalar
            </Accordion.Title>
            <Accordion.Content
              active={clsx({
                active: pagesAccordion.rootAccordionVisible,
              })}
            >
              <Accordion styled>
                <div>asd</div>
              </Accordion>
              <Accordion styled>
                <Accordion.Title
                  active={pagesAccordion.addPagesForm.visible}
                  onClick={() =>
                    setPagesAccordion(
                      produce(pagesAccordion, (draft) => {
                        draft.addPagesForm.visible = !draft.addPagesForm
                          .visible;
                      })
                    )
                  }
                >
                  <Icon name="dropdown" />
                  Sayfa Ekle
                </Accordion.Title>
                <Accordion.Content active={pagesAccordion.addPagesForm.visible}>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      //handleAddDesktopMenu();
                    }}
                    style={{
                      paddingTop: 15,
                    }}
                  >
                    <Form.Group
                      widths="equal"
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <Form.Field>
                        <label>Sayfa Adı</label>
                        <input
                          type="text"
                          /*value={desktopMenuAccordion.addMenuForm.fields.name}
                        onChange={(e) =>
                          setDesktopMenuAccordion(
                            produce(desktopMenuAccordion, (draft) => {
                              draft.addMenuForm.fields.name =
                                e.currentTarget.value;
                            })
                          )
                        }*/
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Slug</label>
                        <input
                          type="text"
                          /*value={desktopMenuAccordion.addMenuForm.fields.name}
                        onChange={(e) =>
                          setDesktopMenuAccordion(
                            produce(desktopMenuAccordion, (draft) => {
                              draft.addMenuForm.fields.name =
                                e.currentTarget.value;
                            })
                          )
                        }*/
                        />
                      </Form.Field>
                    </Form.Group>

                    <Form.Field>
                      <label>Meta Title</label>
                      <input />
                    </Form.Field>

                    <Form.Field control={TextArea} label="Meta Description" />
                    <Form.Field control={TextArea} label="Meta Keyword" />
                    <Form.Field
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingBottom: 5,
                      }}
                    ></Form.Field>
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
                          /*value={desktopMenuAccordion.addMenuForm.fields.href}
                          onChange={(e) =>
                            setDesktopMenuAccordion(
                              produce(desktopMenuAccordion, (draft) => {
                                draft.addMenuForm.fields.href =
                                  e.currentTarget.value;
                              })
                            )
                          }*/
                        />
                      </Form.Field>
                      <Select
                        style={{
                          maxHeight: 40,
                          marginTop: 17,
                          marginRight: 7,
                        }}
                        placeholder="Target"
                        /*value={desktopMenuAccordion.addMenuForm.fields.target}*/
                        /*onChange={(e, { value }) =>
                          setDesktopMenuAccordion(
                            produce(desktopMenuAccordion, (draft) => {
                              draft.addMenuForm.fields.target = value;
                            })
                          )
                        }*/
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
                    </Form.Group>

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

/*                    <Form>
                      <Form.Field>
                        <label>Meta Title</label>
                        <input placeholder="First Name" />
                      </Form.Field>

                      <Form.Field control={TextArea} label="Meta Description" />
                      <Form.Field control={TextArea} label="Meta Keyword" />

                      <Button primary fluid>
                        Kaydet
                      </Button>
                    </Form>*/

/*          {pages && pages.length > 0 ? (
            pages.map((page) => {
              return (
                <div
                  className={
                    activeIndex === page.id
                      ? "item-wrapper active"
                      : "item-wrapper"
                  }
                >
                  <Accordion.Title
                    active={activeIndex === page.id}
                    onClick={() => handleClick(page.id)}
                  >
                    <Icon name="dropdown" />
                    {page.name}
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === page.id}
                  ></Accordion.Content>
                </div>
              );
            })
          ) : (
            <div>error</div>
          )} */
