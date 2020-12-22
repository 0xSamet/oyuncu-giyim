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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CATEGORIES_ADMIN } from "../../../../apollo/gql/query/category";
import { ADD_CATEGORY } from "../../../../apollo/gql/mutations/category";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import produce from "immer";
import { putAdminRequestError } from "../../../../store/reducers/admin";
import { GET_LANGUAGES } from "../../../../apollo/gql/query/language";
import { DesktopMenu, DesktopMenuDescription } from "../index";
import { Language } from "../../ayarlar/diller";
import Editor from "../../../../components/Editor";

export default function AddCategory() {
  const [sampleDesc] = useState<DesktopMenuDescription>({
    name: "",
    href: "",
    icon_url: "",
    target: "",
    language: "",
  });
  const [fields, setFields] = useState<DesktopMenu>({
    sort_order: null,
    status: true,
    is_divider: false,
    description: [sampleDesc],
  });
  const [languages, setLanguages] = useState<Language[] | undefined[]>([]);
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
    addCategoryRun,
    {
      loading: addCategoryLoading,
      error: addCategoryError,
      data: addCategoryResponse,
    },
  ] = useMutation(ADD_CATEGORY);

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
      addCategoryResponse &&
      addCategoryResponse.addCategory &&
      addCategoryResponse.addCategory.id
    ) {
      router.push("/admin/kategoriler");
    }
  }, [addCategoryResponse]);

  const handleFormSubmit = async () => {
    let sortOrder;

    if (!isNaN(fields.sort_order) && fields.sort_order) {
      sortOrder = Number(fields.sort_order);
    } else {
      sortOrder = null;
    }

    try {
      await addCategoryRun({
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

  const getLanguagesForMenu = useCallback(() => {
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
                value={fields.sort_order || ""}
                onChange={handleNormalInputChange}
              />
            </Form.Field>
            <Form.Field>
              <Tab menu={{ pointing: true }} panes={getLanguagesForMenu()} />
            </Form.Field>
            <Form.Field>
              <label>Menü Adı</label>
              <input
                type="text"
                name="name"
                value={fieldsToUse?.name || ""}
                onChange={handleLanguageInputChange}
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
                  value={fieldsToUse?.href || ""}
                  onChange={handleLanguageInputChange}
                />
              </Form.Field>
              <Select
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
            </Form.Group>
            {/* <Form.Field>
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
            </Form.Field> */}
          </Tab.Pane>
        );
      },
    },
  ];

  if (addCategoryLoading || languagesLoading) {
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
      <section className="admin-categories-page admin-sub-page">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          <Tab className="tabs" menu={{ pointing: true }} panes={panes} />
          <Button type="submit" fluid icon size="tiny" color="blue">
            <Icon name="add square" />
            Ekle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
