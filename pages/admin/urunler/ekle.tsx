import SEO from "../../../components/Seo";
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Select,
  Input,
  Label,
  Flag,
  Segment,
  Dimmer,
  Loader,
  TextArea,
  Menu,
  Tab,
  FlagNameValues,
  Divider,
  Header,
} from "semantic-ui-react";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import produce from "immer";
import { putAdminRequestError } from "../../../store/reducers/admin";
import { GET_LANGUAGES } from "../../../apollo/gql/query/language";
import { Page, PageDescription } from "../sayfalar";
import { Language } from "../ayarlar/yerellestirme/diller";
import Editor from "../../../components/Editor";
import {
  GET_DESKTOP_MENU_ADMIN,
  GET_MOBILE_MENU_ADMIN,
} from "../../../apollo/gql/query/menu";
import { DesktopMenu, MobileMenu } from "../menuler";
import { ADD_PAGE } from "../../../apollo/gql/mutations/page";

export default function AddPage() {
  const [sampleDesc] = useState<PageDescription>({
    name: "",
    description: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    language: "",
    slug: "",
  });
  const [fields, setFields] = useState<Page>({
    id: null,
    sort_order: null,
    desktop_menu_id: null,
    mobile_menu_id: null,
    status: true,
    description: [sampleDesc],
  });
  const [languages, setLanguages] = useState<Language[] | undefined[]>([]);
  const [desktopMenu, setDesktopMenu] = useState<DesktopMenu[] | undefined[]>(
    []
  );
  const [mobileMenu, setMobileMenu] = useState<MobileMenu[] | undefined[]>([]);
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [tryState, setTryState] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const [
    getLanguages,
    { data: languagesData, loading: languagesLoading, error: languagesError },
  ] = useLazyQuery(GET_LANGUAGES, {
    fetchPolicy: "no-cache",
  });

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
    addPageRun,
    { loading: addPageLoading, error: addPageError, data: addPageResponse },
  ] = useMutation(ADD_PAGE);

  useEffect(() => {
    getLanguages();
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

  useEffect(() => {
    if (
      languagesData &&
      languagesData.languages &&
      languagesData.languages.length > 0
    ) {
      setFields({
        ...fields,
        description: languagesData.languages.map((language) => {
          return {
            ...fields.description[0],
            language: language.code,
          };
        }),
      });

      const { code: activeLanguageCode } = languagesData.languages.find(
        (language) => language.is_default === true
      );
      setLanguages(languagesData.languages);
      setActiveLanguage(activeLanguageCode);
    }
  }, [languagesData]);

  useEffect(() => {
    if (
      addPageResponse &&
      addPageResponse.addPage &&
      addPageResponse.addPage.id
    ) {
      router.push("/admin/sayfalar");
    }
  }, [addPageResponse]);

  const handleFormSubmit = async () => {
    let sortOrder;
    let desktopMenuId;
    let mobileMenuId;

    if (
      (!isNaN(fields.sort_order) && fields.sort_order) ||
      fields.sort_order === 0
    ) {
      sortOrder = Number(fields.sort_order);
    } else {
      sortOrder = null;
    }

    if (
      (!isNaN(fields.desktop_menu_id as number) && fields.desktop_menu_id) ||
      fields.desktop_menu_id === 0
    ) {
      desktopMenuId = Number(fields.desktop_menu_id);
    } else {
      desktopMenuId = null;
    }

    if (
      (!isNaN(fields.mobile_menu_id as number) && fields.mobile_menu_id) ||
      fields.mobile_menu_id === 0
    ) {
      mobileMenuId = Number(fields.mobile_menu_id);
    } else {
      mobileMenuId = null;
    }

    try {
      await addPageRun({
        variables: {
          input: {
            sort_order: sortOrder,
            status: fields.status,
            desktop_menu_id: desktopMenuId,
            mobile_menu_id: mobileMenuId,
            description: fields.description,
          },
        },
      });
    } catch (err) {
      console.log(err);
      dispatch(putAdminRequestError(err.message));
    }
  };

  const handleNormalInputChange = (e) => {
    return setFields(
      produce(fields, (draft) => {
        draft[e.target.name] = e.target.value;
      })
    );
  };

  const handleLanguageInputChange = (e) => {
    return setFields(
      produce(fields, (draft) => {
        const foundIndex = fields.description.findIndex(
          (c) => c.language === activeLanguage
        );

        draft.description[foundIndex][e.target.name] = e.target.value;
      })
    );
  };

  const getDesktopMenuForOption = useMemo(() => {
    const a = [...desktopMenu]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((c) => {
        const { name } = c.description.find((c) => c.language === "tr");

        return {
          key: c.id,
          value: c.id,
          text: name,
        };
      });

    return [
      {
        key: -1,
        value: "-1",
        text: "Menü Yok",
      },
      ...a,
    ];
  }, [desktopMenu]);

  const getMobileMenuForOption = useMemo(() => {
    const a = [...mobileMenu]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((c) => {
        const { name } = c.description.find((c) => c.language === "tr");

        return {
          key: c.id,
          value: c.id,
          text: name,
        };
      });

    return [
      {
        key: -1,
        value: "-1",
        text: "Menü Yok",
      },
      ...a,
    ];
  }, [mobileMenu]);

  const getLanguagesForMenu = useMemo(() => {
    return (languages as Language[]).map((language) => {
      return {
        menuItem: (
          <Menu.Item
            key={language.code}
            content={language.name}
            onClick={() => setActiveLanguage(language.code)}
            active={language.code === activeLanguage}
          ></Menu.Item>
        ),
      };
    });
  }, [languages, activeLanguage]);

  const panes = [
    {
      menuItem: "Genel",
      render: () => {
        const fieldsToUse = fields.description.find(
          (description) => description.language === activeLanguage
        );
        return (
          <Tab.Pane attached={false}>
            <Form.Field
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <label>Açık/Kapalı</label>
              <Checkbox
                toggle
                checked={fields.status}
                onChange={() => {
                  return setFields({
                    ...fields,
                    status: !fields.status,
                  });
                }}
              />
            </Form.Field>
            <Form.Field>
              <Tab menu={{ pointing: true }} panes={getLanguagesForMenu} />
            </Form.Field>
            <Form.Field>
              <label>Ürün Adı</label>
              <input
                type="text"
                name="name"
                value={fieldsToUse?.name || ""}
                onChange={handleLanguageInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Ürün Açıklaması</label>
              {languages.length > 0 &&
                (languages as Language[]).map((language) => {
                  const fieldsToUse = fields.description.find(
                    (description) => description.language === language.code
                  );
                  return (
                    <span
                      style={
                        activeLanguage === language.code
                          ? {}
                          : { display: "none" }
                      }
                    >
                      <Editor
                        value={fieldsToUse?.description || ""}
                        onChange={(c) => {
                          setFields(
                            produce(fields, (draft) => {
                              const foundIndex = fields.description.findIndex(
                                (c) => c.language === activeLanguage
                              );
                              draft.description[foundIndex]["description"] = c;
                            })
                          );
                        }}
                      />
                    </span>
                  );
                })}
            </Form.Field>
            <Form.Field>
              <label>Meta Title</label>
              <input
                type="text"
                name="meta_title"
                value={fieldsToUse?.meta_title || ""}
                onChange={handleLanguageInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Meta Description</label>
              <TextArea
                name="meta_description"
                value={fieldsToUse?.meta_description || ""}
                onChange={handleLanguageInputChange}
                style={{ minHeight: 100 }}
              />
            </Form.Field>
            <Form.Field>
              <label>Meta Keywords</label>
              <TextArea
                name="meta_keywords"
                value={fieldsToUse?.meta_keywords || ""}
                onChange={handleLanguageInputChange}
                style={{ minHeight: 30 }}
              />
            </Form.Field>
          </Tab.Pane>
        );
      },
    },
    {
      menuItem: "Veri",
      render: () => {
        return (
          <Tab.Pane attached={false}>
            <Form.Field key={0}>
              <label>Ürün Kodu</label>
              <Input type="text">
                <input
                  name="slug"
                  value={""}
                  onChange={handleLanguageInputChange}
                />
              </Input>
            </Form.Field>
            <Form.Field key={1}>
              <label>SKU</label>
              <Input type="text">
                <input
                  name="slug"
                  value={""}
                  onChange={handleLanguageInputChange}
                />
              </Input>
            </Form.Field>

            <Form.Field key={2}>
              <label>Fiyatı</label>
              <Input type="text">
                <input
                  name="slug"
                  value={""}
                  onChange={handleLanguageInputChange}
                />
              </Input>
            </Form.Field>
            <Form.Field key={3}>
              <label>Vergi Sınıfı</label>
              <Input type="text">
                <input
                  name="slug"
                  value={""}
                  onChange={handleLanguageInputChange}
                />
              </Input>
            </Form.Field>
            <Form.Field key={4}>
              <label>Adet</label>
              <Input type="text">
                <input
                  name="slug"
                  value={""}
                  onChange={handleLanguageInputChange}
                />
              </Input>
            </Form.Field>
            <Form.Field key={5}>
              <label>Asgari Adet</label>
              <Input type="text">
                <input
                  name="slug"
                  value={""}
                  onChange={handleLanguageInputChange}
                />
              </Input>
            </Form.Field>
            <Form.Field key={-1}>
              <label>Sıralama</label>
              <input
                type="number"
                name="sort_order"
                value={
                  fields.sort_order || fields.sort_order == 0
                    ? fields.sort_order
                    : ""
                }
                onChange={handleNormalInputChange}
              />
            </Form.Field>
          </Tab.Pane>
        );
      },
    },
    {
      menuItem: "Seçenekler",
      render: () => {
        return (
          <Tab.Pane attached={false}>
            <Divider horizontal>Seçenekler</Divider>
            <Form.Field key={1}>
              <Input type="text">
                <input
                  name="slug"
                  value={""}
                  onChange={handleLanguageInputChange}
                  autoComplete={"off"}
                  placeholder="Kategori Ara..."
                />
              </Input>
              <Segment style={{ backgroundColor: "#fff" }}>
                <Header
                  as="h5"
                  textAlign="center"
                  style={{ marginTop: 0, padding: "0 50px" }}
                >{`Beden Seç `}</Header>
                <Divider />
                <Form.Field
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <label>Seçenek Zorunlu ?</label>
                  <Checkbox
                    toggle
                    checked={fields.status}
                    onChange={() => {
                      return setFields({
                        ...fields,
                        status: !fields.status,
                      });
                    }}
                  />
                </Form.Field>

                <Icon
                  name="trash"
                  color="red"
                  circular
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: 10,
                    right: 10,
                  }}
                  onClick={() => {}}
                />

                <Segment raised color="teal">
                  <Form.Field
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Icon
                      name="trash"
                      color="red"
                      circular
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {}}
                    />
                  </Form.Field>
                  <Form.Field key={4}>
                    <label>Seçenek Değeri</label>
                    <Input type="text">
                      <input
                        name="slug"
                        value={""}
                        onChange={handleLanguageInputChange}
                      />
                    </Input>
                  </Form.Field>
                  <Form.Field key={5}>
                    <label>Adet</label>
                    <Input type="number">
                      <input
                        name="slug"
                        value={""}
                        onChange={handleLanguageInputChange}
                      />
                    </Input>
                  </Form.Field>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>Fiyat</label>
                      <Input type="text">
                        <input
                          name="slug"
                          value={""}
                          onChange={handleLanguageInputChange}
                        />
                      </Input>
                    </Form.Field>
                    <Form.Field>
                      <label>Fiyatı Artır/Azalt</label>
                      <Input type="text">
                        <input
                          name="slug"
                          value={""}
                          onChange={handleLanguageInputChange}
                        />
                      </Input>
                    </Form.Field>
                  </Form.Group>
                </Segment>
                <Segment raised textAlign="center" size="mini" color="teal">
                  <Button as="div" onClick={() => {}} primary size="tiny">
                    Seçenek Değeri Ekle
                  </Button>
                </Segment>
              </Segment>
            </Form.Field>
          </Tab.Pane>
        );
      },
    },
    {
      menuItem: "Bağlantılar",
      render: () => {
        return (
          <Tab.Pane attached={false}>
            <Form.Field key={1}>
              <Divider horizontal>Kategori</Divider>
              <Input type="text">
                <input
                  name="slug"
                  value={""}
                  onChange={handleLanguageInputChange}
                  autoComplete={"off"}
                  placeholder="Kategori Ara..."
                />
              </Input>
              <Segment style={{ backgroundColor: "#fff" }} color="brown">
                <Label
                  style={{
                    margin: "3px 0",
                    position: "relative",
                    lineHeight: 1.5,
                    padding: "15px 25px 15px 15px",
                  }}
                >
                  {`Sweatshirt > Baskılı Sweatshirt > Alt Başlık Uzuyo > Baya Bi Uzadı > Baskılı Deneme Sweatshirt > herhalde bro >a dasdasd asd asdasdasdasd`}
                  <Icon
                    name="delete"
                    style={{
                      margin: 0,
                      position: "absolute",
                      right: 7,
                      top: 5,
                    }}
                  />
                </Label>
                <br />
                <Label
                  style={{
                    margin: "3px 0",
                    position: "relative",
                    lineHeight: 1.5,
                    padding: "15px 25px 15px 15px",
                  }}
                >
                  {`Sweatshirt > Baskılı Sweatshirt > Alt Başlık Uzuyo > Baya Bi Uzadı > Baskılı Deneme Sweatshirt > herhalde bro >a dasdasd asd asdasdasdasd`}
                  <Icon
                    name="delete"
                    style={{
                      margin: 0,
                      position: "absolute",
                      right: 7,
                      top: 5,
                    }}
                  />
                </Label>
                <br />
                <Label
                  style={{
                    margin: "3px 0",
                    position: "relative",
                    lineHeight: 1.5,
                    padding: "15px 25px 15px 15px",
                  }}
                >
                  {`Sweatshirt > Baskılı Sweatshirt`}
                  <Icon
                    name="delete"
                    style={{
                      margin: 0,
                      position: "absolute",
                      right: 7,
                      top: 5,
                    }}
                  />
                </Label>
                <br />
                <Label
                  style={{
                    margin: "3px 0",
                    position: "relative",
                    lineHeight: 1.5,
                    padding: "15px 25px 15px 15px",
                  }}
                >
                  {`Sweatshirt`}
                  <Icon
                    name="delete"
                    style={{
                      margin: 0,
                      position: "absolute",
                      right: 7,
                      top: 5,
                    }}
                  />
                </Label>
                <br />
              </Segment>
            </Form.Field>
            <Form.Field key={2}>
              <Divider horizontal>Filtre</Divider>
              <Input type="text">
                <input
                  name="slug"
                  value={""}
                  onChange={handleLanguageInputChange}
                  autoComplete={"off"}
                  placeholder="Filtre Ara..."
                />
              </Input>
              <Segment style={{ backgroundColor: "#fff" }} color="teal">
                <Label
                  style={{
                    margin: "3px 0",
                    position: "relative",
                    lineHeight: 1.5,
                    padding: "15px 25px 15px 15px",
                  }}
                >
                  {`Sweatshirt > Baskılı Sweatshirt > Alt Başlık Uzuyo > Baya Bi Uzadı > Baskılı Deneme Sweatshirt > herhalde bro >a dasdasd asd asdasdasdasd`}
                  <Icon
                    name="delete"
                    style={{
                      margin: 0,
                      position: "absolute",
                      right: 7,
                      top: 5,
                    }}
                  />
                </Label>
                <br />
                <Label
                  style={{
                    margin: "3px 0",
                    position: "relative",
                    lineHeight: 1.5,
                    padding: "15px 25px 15px 15px",
                  }}
                >
                  {`Sweatshirt > Baskılı Sweatshirt > Alt Başlık Uzuyo > Baya Bi Uzadı > Baskılı Deneme Sweatshirt > herhalde bro >a dasdasd asd asdasdasdasd`}
                  <Icon
                    name="delete"
                    style={{
                      margin: 0,
                      position: "absolute",
                      right: 7,
                      top: 5,
                    }}
                  />
                </Label>
                <br />
                <Label
                  style={{
                    margin: "3px 0",
                    position: "relative",
                    lineHeight: 1.5,
                    padding: "15px 25px 15px 15px",
                  }}
                >
                  {`Sweatshirt > Baskılı Sweatshirt`}
                  <Icon
                    name="delete"
                    style={{
                      margin: 0,
                      position: "absolute",
                      right: 7,
                      top: 5,
                    }}
                  />
                </Label>
                <br />
                <Label
                  style={{
                    margin: "3px 0",
                    position: "relative",
                    lineHeight: 1.5,
                    padding: "15px 25px 15px 15px",
                  }}
                >
                  {`Sweatshirt`}
                  <Icon
                    name="delete"
                    style={{
                      margin: 0,
                      position: "absolute",
                      right: 7,
                      top: 5,
                    }}
                  />
                </Label>
                <br />
              </Segment>
            </Form.Field>
          </Tab.Pane>
        );
      },
    },
    {
      menuItem: "Resim",
      render: () => {
        return (
          <Tab.Pane attached={false}>
            <Segment style={{ backgroundColor: "#fff" }} color="orange" raised>
              <Form.Field
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://react.semantic-ui.com/images/wireframe/image.png"
                  style={{ width: 175, height: 175, objectFit: "cover" }}
                />
                <Icon
                  name="trash"
                  color="red"
                  circular
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: 10,
                    right: 10,
                  }}
                  onClick={() => {}}
                />
              </Form.Field>
              <Form.Field>
                <label>Resim Linki</label>
                <Input type="text">
                  <input
                    name="slug"
                    value={""}
                    onChange={handleLanguageInputChange}
                  />
                </Input>
              </Form.Field>
              <Form.Field key={4}>
                <label>Sıralama</label>
                <Input type="text">
                  <input
                    name="slug"
                    value={""}
                    onChange={handleLanguageInputChange}
                  />
                </Input>
              </Form.Field>
            </Segment>
            <Segment
              raised
              textAlign="center"
              size="mini"
              style={{ backgroundColor: "#fff" }}
              color="orange"
            >
              <Button as="div" onClick={() => {}} primary size="tiny">
                Resim Ekle
              </Button>
            </Segment>
          </Tab.Pane>
        );
      },
    },
    {
      menuItem: "SEO",
      render: () => {
        return (
          <Tab.Pane attached={false}>
            {(languages as Language[]).map((language) => {
              const fieldsToUse = fields.description.find(
                (description) => description.language === language.code
              );
              return (
                <Form.Field key={language.id}>
                  <label>{`Slug (${language.name})`}</label>
                  <Input
                    labelPosition="left"
                    type="text"
                    onFocus={() => setActiveLanguage(language.code)}
                  >
                    <Label basic>
                      <Flag name={language.flag_code as FlagNameValues} />
                    </Label>
                    <input
                      name="slug"
                      value={fieldsToUse.slug || ""}
                      onChange={handleLanguageInputChange}
                    />
                  </Input>
                </Form.Field>
              );
            })}
          </Tab.Pane>
        );
      },
    },
  ];

  if (addPageLoading || languagesLoading) {
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
        meta_title: "Ürün Ekle - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-pages-add-product admin-sub-page">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          <Tab className="tabs" menu={{ pointing: true }} panes={panes} />
          <Button
            className="big-button"
            type="submit"
            fluid
            icon
            size="tiny"
            color="blue"
          >
            <Icon name="add square" />
            Ürün Ekle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
