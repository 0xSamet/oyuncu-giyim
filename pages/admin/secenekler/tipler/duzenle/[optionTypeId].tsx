import SEO from "../../../../../components/Seo";
import {
  Button,
  Form,
  Icon,
  Segment,
  Dimmer,
  Loader,
  Tab,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import produce from "immer";
import { putAdminRequestError } from "../../../../../store/reducers/admin";
import { OptionType } from "../index";
import { GET_OPTION_TYPE } from "../../../../../apollo/gql/query/option";
import { UPDATE_OPTION_TYPE } from "../../../../../apollo/gql/mutations/option";

export default function EditOptionTypePage() {
  const [fields, setFields] = useState<OptionType>({
    id: null,
    name: "",
    sort_order: null,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const [
    getOptionType,
    {
      data: optionTypeData,
      loading: optionTypeLoading,
      error: optionTypeError,
    },
  ] = useLazyQuery(GET_OPTION_TYPE, {
    fetchPolicy: "no-cache",
  });

  const [
    updateOptionTypeRun,
    {
      loading: updateOptionTypeLoading,
      error: updateOptionTypeError,
      data: updateOptionTypeResponse,
    },
  ] = useMutation(UPDATE_OPTION_TYPE);

  useEffect(() => {
    if (router.query.optionTypeId) {
      getOptionType({
        variables: {
          input: {
            id: router.query.optionTypeId,
          },
        },
      });
    }
  }, [router.query.optionTypeId]);

  useEffect(() => {
    if (
      optionTypeData &&
      optionTypeData.optionType &&
      optionTypeData.optionType.id
    ) {
      let { id, name, sort_order } = optionTypeData.optionType;

      setFields({
        ...fields,
        id,
        name,
        sort_order,
      });
    }
  }, [optionTypeData]);

  useEffect(() => {
    if (
      updateOptionTypeResponse &&
      updateOptionTypeResponse.updateOptionType &&
      updateOptionTypeResponse.updateOptionType.id
    ) {
      router.push("/admin/secenekler/tipler");
    }
  }, [updateOptionTypeResponse]);

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
      await updateOptionTypeRun({
        variables: {
          input: {
            id: fields.id,
            sort_order: sortOrder,
            name: fields.name,
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

  const panes = [
    {
      menuItem: "Genel",
      render: () => {
        return (
          <Tab.Pane attached={false}>
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
              <label>Seçenek Tipi</label>
              <input
                type="text"
                name="name"
                value={fields.name || ""}
                onChange={handleNormalInputChange}
              />
            </Form.Field>
          </Tab.Pane>
        );
      },
    },
  ];

  if (updateOptionTypeLoading || optionTypeLoading) {
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
        meta_title: "Seçenek Tipi Düzenle - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-option-types-update-page admin-sub-page">
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
            Seçenek Tipini Güncelle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
