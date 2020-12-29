import SEO from "../../../../components/Seo";
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Segment,
  Dimmer,
  Loader,
  Input,
  Label,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { Tab } from "semantic-ui-react";
import { putAdminRequestError } from "../../../../store/reducers/admin";
import { ADD_LANGUAGE } from "../../../../apollo/gql/mutations/language";

export default function AdminSettingsAddLanguage() {
  const [fields, setFields] = useState({
    name: "",
    code: "",
    flag_code: "",
    sort_order: null,
    status: true,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const [
    addLanguageRun,
    {
      loading: addLanguageLoading,
      error: addLanguageError,
      data: addLanguageResponse,
    },
  ] = useMutation(ADD_LANGUAGE);

  useEffect(() => {
    if (
      addLanguageResponse &&
      addLanguageResponse.addLanguage &&
      addLanguageResponse.addLanguage.name
    ) {
      router.push("/admin/ayarlar/diller");
    }
  }, [addLanguageResponse]);

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
      await addLanguageRun({
        variables: {
          input: {
            name: fields.name,
            code: fields.code,
            flag_code: fields.flag_code,
            sort_order: sortOrder,
            status: fields.status,
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
            <label>Dil Adı</label>
            <input
              type="text"
              name="name"
              value={fields.name || ""}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Dil Kodu</label>
            <input
              type="text"
              name="code"
              value={fields.code || ""}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Bayrak Kodu</label>
            <Input
              labelPosition="right"
              label={
                <Label basic>
                  <a
                    href="https://react.semantic-ui.com/elements/flag/"
                    target="_blank"
                    title="Semantic ui Flag"
                  >
                    <Icon name="info circle" link style={{ margin: 0 }} />
                  </a>
                </Label>
              }
              type="text"
              name="flag_code"
              value={fields.flag_code || ""}
              onChange={handleInputChange}
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
        </Tab.Pane>
      ),
    },
  ];

  if (addLanguageLoading) {
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
          <Button
            className="big-button"
            type="submit"
            fluid
            icon
            size="tiny"
            color="blue"
          >
            <Icon name="add square" />
            Ekle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
