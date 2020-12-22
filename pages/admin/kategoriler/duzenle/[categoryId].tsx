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
  Message,
  TextArea,
  Menu,
  FlagNameValues,
  FormField,
} from "semantic-ui-react";
import { useCallback, useEffect, useState } from "react";
import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_CATEGORIES,
  GET_CATEGORIES_ADMIN,
} from "../../../../apollo/gql/query/category";
import {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
} from "../../../../apollo/gql/mutations/category";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import produce from "immer";

import { Tab } from "semantic-ui-react";
import { putAdminRequestError } from "../../../../store/reducers/admin";
import { GET_LANGUAGES } from "../../../../apollo/gql/query/language";
import { Category, CategoryDescription } from "../index";
import { Language } from "../../ayarlar/diller";
import Editor from "../../../../components/Editor";
import { updateCategoryValidate } from "../../../../database/models/category";

export default function AddCategory() {
  const [sampleDesc] = useState({
    name: "",
    description: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    language: "",
    slug: "",
  });
  const [fields, setFields] = useState<Category>({
    id: null,
    parent_id: null,
    sort_order: null,
    status: true,
    description: [sampleDesc],
  });
  const [categories, setCategories] = useState<Category[] | undefined[]>([]);
  const [languages, setLanguages] = useState<Language[] | undefined[]>([]);
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [
    getCategories,
    {
      data: categoriesData,
      loading: categoriesLoading,
      error: categoriesError,
    },
  ] = useLazyQuery(GET_CATEGORIES_ADMIN, {
    fetchPolicy: "no-cache",
  });

  const [
    getLanguages,
    { data: languagesData, loading: languagesLoading, error: languagesError },
  ] = useLazyQuery(GET_LANGUAGES, {
    fetchPolicy: "no-cache",
  });

  const [
    updateCategoryRun,
    {
      loading: updateCategoryLoading,
      error: updateCategoryError,
      data: updateCategoryResponse,
    },
  ] = useMutation(UPDATE_CATEGORY);

  useEffect(() => {
    getCategories();
    getLanguages();
  }, []);

  useEffect(() => {
    if (
      categoriesData &&
      categoriesData.categoriesOnAdmin &&
      categoriesData.categoriesOnAdmin.length > 0
    ) {
      const categoryId = router.query.categoryId;
      const foundCategory = categoriesData.categoriesOnAdmin.find(
        (c) => c.id == categoryId
      );
      if (foundCategory) {
        setCategories(categoriesData.categoriesOnAdmin);
      } else {
        router.push("/admin/kategoriler");
      }
    }
  }, [categoriesData]);

  useEffect(() => {
    if (
      languagesData &&
      languagesData.languages &&
      languagesData.languages.length > 0 &&
      categories.length > 0
    ) {
      const categoryId = router.query.categoryId;
      const foundCategory = categories.find((c) => c.id == categoryId);

      if (foundCategory) {
        setFields({
          ...fields,
          id: foundCategory.id,
          status: foundCategory.status,
          parent_id: foundCategory.parent_id,
          sort_order: foundCategory.sort_order,
          description: (languagesData.languages as Language[]).map(
            (language) => {
              const tryFound = foundCategory.description.find(
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
            }
          ),
        });
      } else {
        router.push("/admin/kategoriler");
      }

      const { code: activeLanguageCode } = languagesData.languages.find(
        (language) => language.is_default === true
      );
      setLanguages(languagesData.languages);
      setActiveLanguage(activeLanguageCode);
    }
  }, [languagesData, categories]);

  useEffect(() => {
    if (
      updateCategoryResponse &&
      updateCategoryResponse.updateCategory &&
      updateCategoryResponse.updateCategory.id
    ) {
      router.push("/admin/kategoriler");
    }
  }, [updateCategoryResponse]);

  const handleFormSubmit = async () => {
    let parentId;
    let sortOrder;

    if (fields.parent_id) {
      parentId = Number(fields.parent_id);
    } else {
      parentId = null;
    }

    if (!isNaN(fields.sort_order) && fields.sort_order) {
      sortOrder = Number(fields.sort_order);
    } else {
      sortOrder = null;
    }

    try {
      await updateCategoryRun({
        variables: {
          input: {
            id: fields.id,
            parent_id: parentId,
            sort_order: sortOrder,
            status: fields.status,
            description: fields.description,
          },
        },
      } as any);
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

  const getCategoriesForOption = useCallback(() => {
    const a = [...categories]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((c) => {
        const { name } = c.description.find((c) => c.language === "tr");

        const parentCategoriesAsArray = c.parents.reverse().map((a) => {
          const { name } = a.description.find((c) => c.language === "tr");
          return name;
        });

        const categoryName =
          parentCategoriesAsArray.length > 0
            ? ` > ${name ? name : "[Kategorinin Türkçe Adı Yok]"}`
            : name
            ? name
            : "[Kategorinin Türkçe Adı Yok]";
        return {
          key: c.id,
          value: c.id,
          text: parentCategoriesAsArray.join(" > ") + categoryName,
        };
      });

    return [
      {
        key: "-1",
        value: "-1",
        text: "Üst Kategori Yok",
      },
      ...a,
    ];
  }, [categories]);

  const getLanguagesForMenu = useCallback(() => {
    return (languages as Language[]).map((language) => {
      return {
        menuItem: (
          <Menu.Item
            key={language.code}
            content={language.name}
            onClick={() => setActiveLanguage(language.code)}
            active={activeLanguage === language.code}
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
              <label>Üst Kategori</label>
              <Select
                className="category-select"
                options={getCategoriesForOption()}
                value={fields.parent_id ? String(fields.parent_id) : "-1"}
                onChange={(_, { value }) => {
                  setFields({
                    ...fields,
                    parent_id: value === "-1" ? null : value,
                  } as any);
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
              <label>Kategori Adı</label>
              <input
                type="text"
                name="name"
                value={fieldsToUse?.name || ""}
                onChange={handleLanguageInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Kategori Açıklaması</label>
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
  ];

  if (categoriesLoading || updateCategoryLoading || languagesLoading) {
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
            <Icon name="save" />
            Güncelle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
