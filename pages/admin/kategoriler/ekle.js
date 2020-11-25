import SEO from "../../../components/Seo";
import { Button, Checkbox, Form, Icon, Select } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../../apollo/gql/query/category";

export default function AddCategory() {
  const [fields, setFields] = useState({
    name: "",
    parent_id: null,
    sort_order: null,
  });
  const [categories, setCategories] = useState([]);

  const [
    getCategories,
    { data: data, loading: loading, error: error },
  ] = useLazyQuery(GET_CATEGORIES, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    getCategories();

    return () => {
      setCategories([]);
    };
  }, []);

  useEffect(() => {
    if (data && data.categories && data.categories.length > 0) {
      setCategories(
        getNestedChildren(
          data.categories.map((a) => {
            return {
              ...a,
              formattedName: a.name,
            };
          })
        )
      );
    }
  }, [data]);

  const handleFormSubmit = () => {
    console.log("submit");
  };

  const handleInputChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const getChildrenCategories = (category, categoryNames) => {
    if (category.children) {
    }
  };

  const getCategoriesForOption = () => {
    const result = categories.map((category) => {
      //const subs = getChildrenCategories(category, [category.name]);
      //console.log(getChildrenCategories(category, [category.name]));
      return {
        key: category.id,
        value: category.name,
        text: category.name,
      };
    });
    return result;
  };

  function getNestedChildren(arr, parent) {
    var out = [];
    for (var i in arr) {
      if (arr[i].parent_id == parent) {
        var children = getNestedChildren(arr, arr[i].id);

        if (children.length) {
          arr[i].children = children;
        }
        out.push(arr[i]);
      }
    }
    return out;
  }

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
            <Select options={getCategoriesForOption()} />
          </Form.Field>
          <Form.Field>
            <label>Sort Order</label>
            <input
              name="icon_url"
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

/*              style={{
                maxHeight: 40,
                marginTop: 17,
                marginRight: 7,
              }}*/
