import SEO from "../../../../../../components/Seo";
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
import { putAdminRequestError } from "../../../../../../store/reducers/admin";
import { TaxRate } from "./index";
import { GET_GEO_ZONES_ADMIN } from "../../../../../../apollo/gql/query/localization/geo_zone";
import { taxRateTypes as taxRateTypeFromIndex } from ".";
import { ADD_TAX_RATE } from "../../../../../../apollo/gql/mutations/localization/tax_rate";

export default function AddPage() {
  const [taxRateTypes] = useState(taxRateTypeFromIndex);
  const [fields, setFields] = useState<TaxRate>({
    id: null,
    sort_order: null,
    geo_zone_id: null,
    name: "",
    rate: 0,
    type: taxRateTypes[0].value,
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

  useEffect(() => {
    getGeoZones();
  }, []);

  const [
    addTaxRateRun,
    {
      loading: addTaxRateLoading,
      error: addTaxRateError,
      data: addTaxRateResponse,
    },
  ] = useMutation(ADD_TAX_RATE);

  useEffect(() => {
    if (geoZonesData && geoZonesData.geoZonesOnAdmin) {
      setGeoZones(geoZonesData.geoZonesOnAdmin);
      if (geoZonesData.geoZonesOnAdmin.length > 0) {
        setFields({
          ...fields,
          geo_zone_id: geoZonesData.geoZonesOnAdmin[0].id,
        });
      }
    }
  }, [geoZonesData]);

  useEffect(() => {
    if (
      addTaxRateResponse &&
      addTaxRateResponse.addTaxRate &&
      addTaxRateResponse.addTaxRate.id
    ) {
      router.push("/admin/ayarlar/yerellestirme/vergiler/vergi-oranlari");
    }
  }, [addTaxRateResponse]);

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
      await addTaxRateRun({
        variables: {
          input: {
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

  if (addTaxRateLoading || geoZonesLoading) {
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
        meta_title: "Vergi Oranı Ekle - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-tax-rates-add-page admin-sub-page">
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
            Vergi Oranı Ekle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
