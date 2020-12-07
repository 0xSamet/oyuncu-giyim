import SEO from "../../../../../components/Seo";
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { Tab } from "semantic-ui-react";
import { putAdminRequestError } from "../../../../../store/reducers/admin";
import {
  ADD_LANGUAGE,
  UPDATE_LANGUAGE,
} from "../../../../../apollo/gql/mutations/language";
import { GET_LANGUAGE } from "../../../../../apollo/gql/query/language";

export default function AdminSettingsAddLanguage() {
  const [fields, setFields] = useState({
    id: null,
    name: "",
    code: "",
    sort_order: null,
    status: true,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const [
    getLanguageRun,
    {
      loading: getLanguageLoading,
      error: getLanguageError,
      data: getLanguageResponse,
    },
  ] = useLazyQuery(GET_LANGUAGE, {
    fetchPolicy: "no-cache",
  });

  const [
    updateLanguageRun,
    {
      loading: updateLanguageLoading,
      error: updateLanguageError,
      data: updateLanguageResponse,
    },
  ] = useMutation(UPDATE_LANGUAGE);

  useEffect(() => {
    if (router.query.languageId) {
      getLanguageRun({ variables: { id: Number(router.query.languageId) } });
    }
  }, [router.query]);

  useEffect(() => {
    if (getLanguageResponse) {
      if (getLanguageResponse.language) {
        console.log(getLanguageResponse.language);
        const {
          id,
          name,
          code,
          sort_order,
          status,
        } = getLanguageResponse.language;
        setFields({
          ...fields,
          id,
          name,
          code,
          sort_order,
          status,
        });
      } else {
        router.push("/admin/ayarlar/diller");
      }
    }
  }, [getLanguageResponse]);

  useEffect(() => {
    if (
      updateLanguageResponse &&
      updateLanguageResponse.updateLanguage &&
      updateLanguageResponse.updateLanguage.name
    ) {
      router.push("/admin/ayarlar/diller");
    }
  }, [updateLanguageResponse]);

  const handleFormSubmit = async () => {
    let sortOrder;

    if (!isNaN(fields.sort_order) && fields.sort_order) {
      sortOrder = Number(fields.sort_order);
    } else {
      sortOrder = null;
    }

    try {
      await updateLanguageRun({
        variables: {
          input: {
            id: fields.id,
            name: fields.name,
            code: fields.code,
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
            <input
              type="text"
              name="code"
              value={fields.code || ""}
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

  if (getLanguageLoading) {
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
