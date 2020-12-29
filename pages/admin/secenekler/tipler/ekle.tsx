import SEO from "../../../../components/Seo";
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
import { putAdminRequestError } from "../../../../store/reducers/admin";
import { OptionType } from "./index";
import { ADD_OPTION_TYPE } from "../../../../apollo/gql/mutations/option";

export default function AddOptionTypePage() {
  const [fields, setFields] = useState<OptionType>({
    id: null,
    name: "",
    sort_order: null,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const [
    addOptionTypeRun,
    {
      loading: addOptionTypeLoading,
      error: addOptionTypeError,
      data: addOptionTypeResponse,
    },
  ] = useMutation(ADD_OPTION_TYPE);

  useEffect(() => {
    if (
      addOptionTypeResponse &&
      addOptionTypeResponse.addOptionType &&
      addOptionTypeResponse.addOptionType.id
    ) {
      router.push("/admin/secenekler/tipler");
    }
  }, [addOptionTypeResponse]);

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
      await addOptionTypeRun({
        variables: {
          input: {
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

  if (addOptionTypeLoading) {
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
        meta_title: "Seçenek Tipi Ekle - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-option-types-add-page admin-sub-page">
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
            Seçenek Tipi Ekle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
