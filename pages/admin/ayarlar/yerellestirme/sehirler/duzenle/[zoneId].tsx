import SEO from "../../../../../../components/Seo";
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Select,
  Segment,
  Dimmer,
  Loader,
  Tab,
} from "semantic-ui-react";
import { useEffect, useMemo, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import produce from "immer";
import { putAdminRequestError } from "../../../../../../store/reducers/admin";
import { Country } from "../../ulkeler";
import { GET_COUNTRIES_ADMIN } from "../../../../../../apollo/gql/query/localization/country";
import { UPDATE_ZONE } from "../../../../../../apollo/gql/mutations/localization/zone";
import { Zone } from "../.";
import { GET_ZONE_ADMIN } from "../../../../../../apollo/gql/query/localization/zone";

export default function AddPage() {
  const [fields, setFields] = useState<Zone>({
    id: null,
    sort_order: null,
    status: true,
    name: "",
    country: null,
    country_id: null,
  });
  const [countries, setCountries] = useState<Country[] | undefined[]>([]);

  const [
    getCountries,
    { data: countriesData, loading: countriesLoading, error: countriesError },
  ] = useLazyQuery(GET_COUNTRIES_ADMIN, {
    fetchPolicy: "no-cache",
  });

  const [
    getZone,
    { data: zoneData, loading: zoneLoading, error: zoneError },
  ] = useLazyQuery(GET_ZONE_ADMIN, {
    fetchPolicy: "no-cache",
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const [
    updateZoneRun,
    {
      loading: updateZoneLoading,
      error: updateZoneError,
      data: updateZoneResponse,
    },
  ] = useMutation(UPDATE_ZONE);

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (router.query.zoneId) {
      getZone({
        variables: {
          input: {
            id: router.query.zoneId,
          },
        },
      });
    }
  }, [router.query.zoneId]);

  useEffect(() => {
    if (zoneData && zoneData.zoneOnAdmin) {
      const {
        id,
        sort_order,
        status,
        name,
        country: { id: country_id },
      } = zoneData.zoneOnAdmin;
      setFields({
        ...fields,
        id,
        sort_order,
        status,
        country_id,
        name,
      });
    }
  }, [zoneData]);

  useEffect(() => {
    if (countriesData && countriesData.countriesOnAdmin) {
      setCountries(countriesData.countriesOnAdmin);
    }
  }, [countriesData]);

  useEffect(() => {
    if (
      updateZoneResponse &&
      updateZoneResponse.updateZone &&
      updateZoneResponse.updateZone.id
    ) {
      router.push("/admin/ayarlar/yerellestirme/sehirler");
    }
  }, [updateZoneResponse]);

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
      await updateZoneRun({
        variables: {
          input: {
            id: fields.id,
            sort_order: sortOrder,
            status: fields.status,
            name: fields.name,
            country_id: Number(fields.country_id),
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

  const getCountriesForOption = useMemo(() => {
    const a = [...countries]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((c) => {
        const { name } = c.description.find((c) => c.language === "tr");

        return {
          key: c.id,
          value: c.id,
          text: name,
        };
      });

    return a;
  }, [countries]);

  const panes = [
    {
      menuItem: "Genel",
      render: () => {
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
                value={
                  fields.sort_order || fields.sort_order == 0
                    ? fields.sort_order
                    : ""
                }
                onChange={handleNormalInputChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Şehir Adı</label>
              <input
                type="text"
                name="name"
                value={fields.name || ""}
                onChange={handleNormalInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Ülke</label>
              <Select
                options={getCountriesForOption}
                value={fields.country_id}
                onChange={(_e, { value }: { value: string }) => {
                  setFields({
                    ...fields,
                    country_id: value,
                  });
                }}
              />
            </Form.Field>
          </Tab.Pane>
        );
      },
    },
  ];

  if (countriesLoading || updateZoneLoading) {
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
        meta_title: "Şehir Güncelle - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-pages-add-page admin-sub-page">
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
            Güncelle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
