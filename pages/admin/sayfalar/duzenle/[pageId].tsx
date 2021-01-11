import SEO from "../../../../components/Seo";
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
} from "semantic-ui-react";
import { useEffect, useMemo, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import produce from "immer";
import { putAdminRequestError } from "../../../../store/reducers/admin";
import { GET_LANGUAGES } from "../../../../apollo/gql/query/language";
import { Page, PageDescription } from "../index";
import { Language } from "../../ayarlar/yerellestirme/diller";
import Editor from "../../../../components/Editor";
import {
  GET_DESKTOP_MENU_ADMIN,
  GET_MOBILE_MENU_ADMIN,
} from "../../../../apollo/gql/query/menu";
import { DesktopMenu, MobileMenu } from "../../menuler";
import { UPDATE_PAGE } from "../../../../apollo/gql/mutations/page";
import { GET_PAGE_ADMIN } from "../../../../apollo/gql/query/page";

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
  const router = useRouter();
  const dispatch = useDispatch();

  const [
    getPage,
    { data: pageData, loading: pageLoading, error: pageError },
  ] = useLazyQuery(GET_PAGE_ADMIN, {
    fetchPolicy: "no-cache",
  });

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
    updatePageRun,
    {
      loading: updatePageLoading,
      error: updatePageError,
      data: updatePageResponse,
    },
  ] = useMutation(UPDATE_PAGE);

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
    if (router.query.pageId) {
      getPage({
        variables: {
          input: {
            id: router.query.pageId,
          },
        },
      });
    }
  }, [router.query.pageId]);

  useEffect(() => {
    if (
      languagesData &&
      languagesData.languages &&
      languagesData.languages.length > 0 &&
      pageData &&
      pageData.pageOnAdmin &&
      pageData.pageOnAdmin.id
    ) {
      let {
        id,
        status,
        sort_order,
        description,
        desktop_menu_id,
        mobile_menu_id,
      } = pageData.pageOnAdmin;

      setFields({
        ...fields,
        status,
        sort_order,
        id,
        desktop_menu_id,
        mobile_menu_id,
        description: languagesData.languages.map((language) => {
          const tryFound = description.find(
            (c) => c.language === language.code
          );

          if (tryFound) {
            return tryFound;
          } else {
            return {
              ...sampleDesc,
              language: language.code,
            };
          }
        }),
      });

      const { code: activeLanguageCode } = languagesData.languages.find(
        (language) => language.is_default === true
      );
      setLanguages(languagesData.languages);
      setActiveLanguage(activeLanguageCode);
    }
  }, [languagesData, pageData]);

  useEffect(() => {
    if (
      updatePageResponse &&
      updatePageResponse.updatePage &&
      updatePageResponse.updatePage.id
    ) {
      router.push("/admin/sayfalar");
    }
  }, [updatePageResponse]);

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
      await updatePageRun({
        variables: {
          input: {
            id: fields.id,
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
            <Form.Field>
              <Tab menu={{ pointing: true }} panes={getLanguagesForMenu} />
            </Form.Field>
            <Form.Field>
              <label>Sayfa Adı</label>
              <input
                type="text"
                name="name"
                value={fieldsToUse?.name || ""}
                onChange={handleLanguageInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Sayfa Açıklaması</label>
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
    {
      menuItem: "Menü Bağlantısı",
      render: () => {
        return (
          <Tab.Pane attached={false}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Masaüstü Menü</label>
                <Select
                  options={getDesktopMenuForOption}
                  value={
                    fields.desktop_menu_id
                      ? String(fields.desktop_menu_id)
                      : "-1"
                  }
                  onChange={(_e, { value }: { value: string }) => {
                    setFields({
                      ...fields,
                      desktop_menu_id: value,
                    });
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Mobil Menü</label>
                <Select
                  options={getMobileMenuForOption}
                  value={
                    fields.mobile_menu_id ? String(fields.mobile_menu_id) : "-1"
                  }
                  onChange={(_e, { value }: { value: string }) => {
                    setFields({
                      ...fields,
                      mobile_menu_id: value,
                    });
                  }}
                />
              </Form.Field>
            </Form.Group>
          </Tab.Pane>
        );
      },
    },
  ];

  if (updatePageLoading || languagesLoading) {
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
        meta_title: "Sayfa Düzenle - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-pages-update-page admin-sub-page">
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
            <Icon name="save" />
            Sayfa Güncelle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
