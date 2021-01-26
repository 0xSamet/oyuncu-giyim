import SEO from "../../../../../../../components/Seo";
import {
  Button,
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
import { putAdminRequestError } from "../../../../../../../store/reducers/admin";
import { GET_GEO_ZONES_ADMIN } from "../../../../../../../apollo/gql/query/localization/geo_zone";
import { TaxRate, taxRateTypes as taxRateTypesFromIndex } from "..";
import {
  ADD_TAX_RATE,
  UPDATE_TAX_RATE,
} from "../../../../../../../apollo/gql/mutations/localization/tax_rate";
import { GET_TAX_RATE_ADMIN } from "../../../../../../../apollo/gql/query/localization/tax_rate";

export default function AddPage() {
  const [taxRateTypes] = useState(taxRateTypesFromIndex);
  const [fields, setFields] = useState<TaxRate>({
    id: null,
    sort_order: null,
    geo_zone_id: null,
    name: null,
    rate: null,
    type: null,
  });
  const [geoZones, setGeoZones] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const [
    getGeoZones,
    { data: geoZonesData, loading: geoZonesLoading, error: geoZonesError },
  ] = useLazyQuery(GET_GEO_ZONES_ADMIN, {
    fetchPolicy: "no-cache",
  });

  const [
    getTaxRate,
    { data: taxRateData, loading: taxRateLoading, error: taxRateError },
  ] = useLazyQuery(GET_TAX_RATE_ADMIN, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    getGeoZones();
  }, []);

  useEffect(() => {
    if (router.query.taxRateId) {
      getTaxRate({
        variables: {
          input: {
            id: router.query.taxRateId,
          },
        },
      });
    }
  }, [router.query.taxRateId]);

  const [
    updateTaxRateRun,
    {
      loading: updateTaxRateLoading,
      error: updateTaxRateError,
      data: updateTaxRateResponse,
    },
  ] = useMutation(UPDATE_TAX_RATE);

  useEffect(() => {
    if (geoZonesData && geoZonesData.geoZonesOnAdmin) {
      setGeoZones(geoZonesData.geoZonesOnAdmin);
    }
  }, [geoZonesData]);

  useEffect(() => {
    if (
      taxRateData &&
      taxRateData.taxRateOnAdmin &&
      taxRateData.taxRateOnAdmin.id
    ) {
      const {
        id,
        name,
        sort_order,
        rate,
        type,
        geo_zone_id,
      } = taxRateData.taxRateOnAdmin;
      setFields({
        id,
        name,
        rate,
        type,
        geo_zone_id: String(geo_zone_id),
        sort_order,
      });
    }
  }, [taxRateData]);

  useEffect(() => {
    if (
      updateTaxRateResponse &&
      updateTaxRateResponse.updateTaxRate &&
      updateTaxRateResponse.updateTaxRate.id
    ) {
      router.push("/admin/ayarlar/yerellestirme/vergiler/vergi-oranlari");
    }
  }, [updateTaxRateResponse]);

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
      await updateTaxRateRun({
        variables: {
          input: {
            id: fields.id,
            name: fields.name,
            type: fields.type,
            rate: Number(fields.rate),
            sort_order: sortOrder,
            geo_zone_id: Number(fields.geo_zone_id),
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

  const getTaxRateTypesForOption = useMemo(() => {
    return taxRateTypes.map((taxRateType) => {
      return {
        key: taxRateType.value,
        value: taxRateType.value,
        text: taxRateType.name,
      };
    });
  }, [taxRateTypes]);

  const getGeoZonesForOption = useMemo(() => {
    return geoZones.map((geoZone) => {
      return {
        key: geoZone.id,
        value: geoZone.id,
        text: geoZone.name,
      };
    });
  }, [geoZones]);

  const panes = [
    {
      menuItem: "Genel",
      render: () => {
        return (
          <Tab.Pane attached={false}>
            <Form.Group
              style={{
                alignItems: "center",
              }}
            >
              <Form.Field width={8}>
                <label>Seçenek Tipi</label>
                <Select
                  options={getTaxRateTypesForOption}
                  value={fields.type || ""}
                  onChange={(_e, { value }: { value: string }) => {
                    setFields(
                      produce(fields, (draft) => {
                        draft.type = value;
                      })
                    );
                  }}
                />
              </Form.Field>
              <Form.Field width={8}>
                <label>Vergi Oranı</label>
                <input
                  type="number"
                  name="rate"
                  value={fields.rate || fields.rate == 0 ? fields.rate : ""}
                  onChange={handleNormalInputChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Bölge</label>
              <Select
                options={getGeoZonesForOption}
                value={
                  fields.geo_zone_id || fields.geo_zone_id == 0
                    ? fields.geo_zone_id
                    : ""
                }
                onChange={(_e, { value }: { value: string }) => {
                  setFields(
                    produce(fields, (draft) => {
                      draft.geo_zone_id = value;
                    })
                  );
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Vergi Oranı Adı</label>
              <input
                type="text"
                name="name"
                value={fields.name || ""}
                onChange={handleNormalInputChange}
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
          </Tab.Pane>
        );
      },
    },
  ];

  if (updateTaxRateLoading || geoZonesLoading) {
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
        meta_title: "Vergi Oranı Güncelle - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-tax-rates-update-page admin-sub-page">
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
            Vergi Oranını Güncelle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
