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
  Message,
  TextArea,
} from "semantic-ui-react";
import { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CATEGORIES } from "../../../apollo/gql/query/category";
import { ADD_CATEGORY } from "../../../apollo/gql/mutations/category";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { Tab } from "semantic-ui-react";
import { putAdminRequestError } from "../../../store/reducers/admin";

export default function AddCategory() {
  const [fields, setFields] = useState({
    name: "",
    meta_title: "",
    meta_description: "",
    meta_keyword: "",
    parent_id: null,
    sort_order: null,
    status: true,
    slug: "",
  });
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [getCategories, { data, loading, error }] = useLazyQuery(
    GET_CATEGORIES,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [
    addCategoryRun,
    {
      loading: addCategoryLoading,
      error: addCategoryError,
      data: addCategoryResponse,
    },
  ] = useMutation(ADD_CATEGORY);

  useEffect(() => {
    getCategories();

    return () => {
      setCategories([]);
    };
  }, []);

  useEffect(() => {
    if (data && data.categories && data.categories.length > 0) {
      setCategories(data.categories);
    }
  }, [data]);

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
      await addCategoryRun({
        variables: {
          input: {
            name: fields.name,
            meta_title: fields.meta_title,
            meta_description: fields.meta_description,
            meta_keyword: fields.meta_keyword,
            parent_id: parentId,
            sort_order: sortOrder,
            status: fields.status,
            slug: fields.slug,
          },
        },
      });
    } catch (err) {
      console.log(err);
      dispatch(putAdminRequestError(err.message));
    }
  };

  const handleInputChange = (e) => {
    return setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const getCategoriesForOption = useCallback(() => {
    const a = [...categories]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((c) => {
        const parentCategoriesAsArray = c.parents.reverse().map((a) => a.name);
        const categoryName =
          parentCategoriesAsArray.length > 0 ? ` > ${c.name}` : c.name;
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
            <label>Kategori Adı</label>
            <input
              type="text"
              name="name"
              value={fields.name || ""}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Meta Title</label>
            <input
              type="text"
              name="meta_title"
              value={fields.meta_title || ""}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Meta Description</label>
            <TextArea
              name="meta_description"
              value={fields.meta_description || ""}
              onChange={handleInputChange}
              style={{ minHeight: 100 }}
            />
          </Form.Field>
          <Form.Field>
            <label>Meta Keywords</label>
            <TextArea
              name="meta_keyword"
              value={fields.meta_keyword || ""}
              onChange={handleInputChange}
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
          <Form.Field>
            <label>Slug</label>
            <Input labelPosition="left" type="text">
              <Label basic>
                <Flag name="tr" />
              </Label>
              <input
                name="slug"
                value={fields.slug}
                onChange={handleInputChange}
              />
            </Input>
          </Form.Field>
        </Tab.Pane>
      ),
    },
  ];

  if (loading || addCategoryLoading) {
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
