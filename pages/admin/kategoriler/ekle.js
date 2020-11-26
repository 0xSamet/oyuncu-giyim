import SEO from "../../../components/Seo";
import { Button, Checkbox, Form, Icon, Select } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CATEGORIES } from "../../../apollo/gql/query/category";
import { ADD_CATEGORY } from "../../../apollo/gql/mutations/category";
import { useRouter } from "next/router";

export default function AddCategory() {
  const [fields, setFields] = useState({
    name: "",
    parent_id: null,
    sort_order: null,
  });
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const [
    getCategories,
    { data: data, loading: loading, error: error },
  ] = useLazyQuery(GET_CATEGORIES, {
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
      addCategoryResponse.addCategory.success
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

    if (fields.sort_order && !isNaN(fields.sort_order)) {
      sortOrder = Number(fields.sort_order);
    } else {
      sortOrder = null;
    }

    await addCategoryRun({
      variables: {
        input: {
          name: fields.name,
          parent_id: parentId,
          sort_order: sortOrder,
        },
      },
    });
  };

  const handleInputChange = (e) => {
    return setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const getCategoriesForOption = () => {
    const a = categories.map((c) => {
      return {
        key: c.id,
        value: c.id,
        text: c.name,
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
  };

  return (
    <SEO
      seo={{
        meta_title: "Kategoriler - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-categories-page add-category-page">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          <Form.Field>
            <label>Kategori Adı</label>
            <input
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
              name="sort_order"
              value={fields.sort_order || ""}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Button fluid icon size="tiny" color="blue">
            <Icon name="add square" />
            Ekle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
