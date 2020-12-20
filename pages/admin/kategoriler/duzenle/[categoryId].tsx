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
import { GET_CATEGORIES } from "../../../../apollo/gql/query/category";
import { ADD_CATEGORY } from "../../../../apollo/gql/mutations/category";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import produce from "immer";

import { Tab } from "semantic-ui-react";
import { putAdminRequestError } from "../../../../store/reducers/admin";
import { GET_LANGUAGES } from "../../../../apollo/gql/query/language";
import { Category, CategoryDescription } from "../index";
import { Language } from "../../ayarlar/diller";

interface AddCategoryFormFields extends Omit<Category, "description"> {
  description: {
    [key: string]: CategoryDescription;
  };
}

export default function AddCategory() {
  const [fields, setFields] = useState<AddCategoryFormFields>({
    parent_id: null,
    sort_order: null,
    status: true,
    description: {
      tr: {
        name: "",
        description: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        slug: "",
      },
    },
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
  ] = useLazyQuery(GET_CATEGORIES, {
    fetchPolicy: "no-cache",
  });

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
    getCategories({
      variables: {
        language: "tr",
      },
    });
    getLanguages();

    return () => {
      setCategories([]);
    };
  }, []);

  useEffect(() => {
    if (
      categoriesData &&
      categoriesData.categories &&
      categoriesData.categories.length > 0
    ) {
      const categoryId = router.query.categoryId;
      const foundCategory = categoriesData.categories.find(
        (c) => c.id == categoryId
      );
      if (foundCategory) {
        setCategories(categoriesData.categories);
        // setFields({
        //   ...fields,
        //   id: foundCategory.id,
        //   name: foundCategory.name,
        //   meta_title: foundCategory.meta_title || "",
        //   meta_description: foundCategory.meta_description || "",
        //   meta_keyword: foundCategory.meta_keyword || "",
        //   parent_id: foundCategory.parent_id
        //     ? String(foundCategory.parent_id)
        //     : null,
        //   sort_order: foundCategory.sort_order,
        //   status: foundCategory.status,
        //   slug: foundCategory.slug,
        // });
      } else {
        router.push("/admin/kategoriler");
      }
    }
  }, [categoriesData]);

  useEffect(() => {
    if (
      languagesData &&
      languagesData.languages &&
      languagesData.languages.length > 0
    ) {
      let fieldsDescription = {};
      languagesData.languages.forEach((language) => {
        fieldsDescription[language.code] = { ...fields.description.tr };
      });
      setFields({
        ...fields,
        description: fieldsDescription,
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
      addCategoryResponse.addCategory.name
    ) {
      router.push("/admin/kategoriler");
    }
  }, [addCategoryResponse]);

  const handleFormSubmit = async () => {
    console.log("submitted");
    // let parentId;
    // let sortOrder;

    // if (fields.parent_id) {
    //   parentId = Number(fields.parent_id);
    // } else {
    //   parentId = null;
    // }

    // if (!isNaN(fields.sort_order) && fields.sort_order) {
    //   sortOrder = Number(fields.sort_order);
    // } else {
    //   sortOrder = null;
    // }

    // try {
    //   await addCategoryRun({
    //     variables: {
    //       input: {
    //         name: fields.name,
    //         meta_title: fields.meta_title,
    //         meta_description: fields.meta_description,
    //         meta_keyword: fields.meta_keyword,
    //         parent_id: parentId,
    //         sort_order: sortOrder,
    //         status: fields.status,
    //         slug: fields.slug,
    //       },
    //     },
    //   });
    // } catch (err) {
    //   console.log(err);
    //   dispatch(putAdminRequestError(err.message));
    // }
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
        draft.description[activeLanguage][e.target.name] = e.target.value;
      })
    );
  };

  const getCategoriesForOption = useCallback(() => {
    const a = [...categories]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((c) => {
        const parentCategoriesAsArray = c.parents
          .reverse()
          .map((a) => a.description?.name);
        const categoryName =
          parentCategoriesAsArray.length > 0
            ? ` > ${
                c.description?.name
                  ? c.description.name
                  : "[Kategorinin Türkçe Adı Yok]"
              }`
            : c.description?.name
            ? c.description.name
            : "[Kategorinin Türkçe Adı Yok]";
        return {
          key: c.id,
          value: c.id,
          text: parentCategoriesAsArray.join(" > ") + categoryName,
        };
      });
    return [
      {
        key: -1,
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
          ></Menu.Item>
        ),
      };
    });
  }, [languages]);

  const panes = [
    {
      menuItem: "Genel",
      render: () => (
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
              value={fields.parent_id ? fields.parent_id : "-1"}
              onChange={(_, { value }) => {
                console.log(value);
                setFields({
                  ...fields,
                  parent_id: value === "-1" ? null : value,
                } as AddCategoryFormFields);
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
              value={fields.description[activeLanguage]?.name || ""}
              onChange={handleLanguageInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Meta Title</label>
            <input
              type="text"
              name="meta_title"
              value={fields.description[activeLanguage]?.meta_title || ""}
              onChange={handleLanguageInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Meta Description</label>
            <TextArea
              name="meta_description"
              value={fields.description[activeLanguage]?.meta_description || ""}
              onChange={handleLanguageInputChange}
              style={{ minHeight: 100 }}
            />
          </Form.Field>
          <Form.Field>
            <label>Meta Keywords</label>
            <TextArea
              name="meta_keyword"
              value={fields.description[activeLanguage]?.meta_keywords || ""}
              onChange={handleLanguageInputChange}
              style={{ minHeight: 30 }}
            />
          </Form.Field>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "SEO",
      render: () => (
        <Tab.Pane attached={false}>
          {(languages as Language[]).map((language) => {
            return (
              <Form.Field>
                <label>{`Slug (${language.name})`}</label>
                <Input labelPosition="left" type="text">
                  <Label basic>
                    <Flag name={language.flag_code as FlagNameValues} />
                  </Label>
                  <input
                    name="slug"
                    value={fields.description[activeLanguage]?.slug || ""}
                    onChange={handleLanguageInputChange}
                  />
                </Input>
              </Form.Field>
            );
          })}
        </Tab.Pane>
      ),
    },
  ];

  if (categoriesLoading || addCategoryLoading || languagesLoading) {
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
