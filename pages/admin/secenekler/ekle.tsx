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
} from "semantic-ui-react";
import { useEffect, useMemo, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import produce from "immer";
import { putAdminRequestError } from "../../../store/reducers/admin";
import { GET_LANGUAGES } from "../../../apollo/gql/query/language";
import { Page, PageDescription } from "./index";
import { Language } from "../ayarlar/diller";
import Editor from "../../../components/Editor";
import { DesktopMenu, MobileMenu } from "../menuler";
import { ADD_PAGE } from "../../../apollo/gql/mutations/page";

export default function AddOptionPage() {
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
    getLanguages,
    { data: languagesData, loading: languagesLoading, error: languagesError },
  ] = useLazyQuery(GET_LANGUAGES, {
    fetchPolicy: "no-cache",
  });

  const [
    addPageRun,
    { loading: addPageLoading, error: addPageError, data: addPageResponse },
  ] = useMutation(ADD_PAGE);

  useEffect(() => {
    getLanguages();
  }, []);

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

    if (
      (!isNaN(fields.sort_order) && fields.sort_order) ||
      fields.sort_order === 0
    ) {
      sortOrder = Number(fields.sort_order);
    } else {
      sortOrder = null;
    }

    try {
      await addPageRun({
        variables: {
          input: {
            sort_order: sortOrder,
            status: fields.status,
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
            <Form.Group
              style={{
                alignItems: "center",
              }}
            >
              <Form.Field width={8}>
                <label>Seçenek Tipi</label>
                <Select
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
                  value={"_top"}
                  onChange={(_e, { value }: { value: string }) => {
                    // setFields(
                    //   produce(fields, (draft) => {
                    //     const findIndex = fields.description.findIndex(
                    //       (desc) => desc.language === activeLanguage
                    //     );
                    //     draft.description[findIndex].target = value;
                    //   })
                    // );
                  }}
                />
              </Form.Field>
              <Form.Field width={8}>
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
            </Form.Group>

            <Form.Field>
              <Tab menu={{ pointing: true }} panes={getLanguagesForMenu} />
            </Form.Field>
            <Form.Field>
              <label>Seçenek Adı</label>
              <input
                type="text"
                name="name"
                value={fieldsToUse?.name || ""}
                onChange={handleLanguageInputChange}
              />
            </Form.Field>
          </Tab.Pane>
        );
      },
    },
    {
      menuItem: "Seçenek Değerleri",
      render: () => {
        return (
          <Tab.Pane attached={false}>
            <Segment>
              <Form.Field
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Icon name="trash" color="red" circular />
              </Form.Field>
              <Form.Field>
                <Tab menu={{ pointing: true }} panes={getLanguagesForMenu} />
              </Form.Field>

              <Form.Field>
                <label>Seçenek Değer Adı</label>
                <input
                  type="text"
                  name="name"
                  value={fields.sort_order || ""}
                  onChange={handleLanguageInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Sıralama</label>
                <input
                  type="text"
                  name="name"
                  value={fields.sort_order || ""}
                  onChange={handleLanguageInputChange}
                />
              </Form.Field>
            </Segment>
            <Segment>
              <Button primary>Seçenek Değeri Ekle</Button>
            </Segment>
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
        meta_title: "Seçenek Ekle - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-pages-add-page admin-sub-page">
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
            Sayfa Ekle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
