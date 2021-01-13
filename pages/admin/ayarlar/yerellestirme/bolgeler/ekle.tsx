import SEO from "../../../../../components/Seo";
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
  TextArea,
  Menu,
  Tab,
  FlagNameValues,
} from "semantic-ui-react";
import { useEffect, useMemo, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import produce from "immer";
import { putAdminRequestError } from "../../../../../store/reducers/admin";
import { GET_COUNTRIES_ADMIN } from "../../../../../apollo/gql/query/localization/country";
import { GET_ZONES_ADMIN_FOR_OPTION } from "../../../../../apollo/gql/query/localization/zone";
import { ADD_GEO_ZONE } from "../../../../../apollo/gql/mutations/localization/geo_zone";
import { GeoZone } from ".";

export default function AddPage() {
  const [sampleZone] = useState({
    id: null,
    country_id: null,
    zone_id: null,
  });
  const [fields, setFields] = useState({
    id: null,
    name: "",
    description: "",
    sort_order: null,
    zones: [],
  });
  const [countries, setCountries] = useState([]);
  const [zones, setZones] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const [
    getCountries,
    { data: countriesData, loading: countriesLoading, error: countriesError },
  ] = useLazyQuery(GET_COUNTRIES_ADMIN, {
    fetchPolicy: "no-cache",
  });

  const [
    getZones,
    { data: zonesData, loading: zonesLoading, error: zonesError },
  ] = useLazyQuery(GET_ZONES_ADMIN_FOR_OPTION, {
    fetchPolicy: "no-cache",
  });

  const [
    addGeoZoneRun,
    {
      loading: addGeoZoneLoading,
      error: addGeoZoneError,
      data: addGeoZoneResponse,
    },
  ] = useMutation(ADD_GEO_ZONE);

  useEffect(() => {
    getCountries();
    getZones();
  }, []);

  useEffect(() => {
    if (countriesData && countriesData.countriesOnAdmin) {
      setCountries(countriesData.countriesOnAdmin);
    }
  }, [countriesData]);

  useEffect(() => {
    if (zonesData && zonesData.zonesOnAdmin) {
      setZones(zonesData.zonesOnAdmin);
    }
  }, [zonesData]);

  useEffect(() => {
    if (
      addGeoZoneResponse &&
      addGeoZoneResponse.addGeoZone &&
      addGeoZoneResponse.addGeoZone.id
    ) {
      router.push("/admin/ayarlar/yerellestirme/bolgeler");
    }
  }, [addGeoZoneResponse]);

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
      await addGeoZoneRun({
        variables: {
          input: {
            name: fields.name,
            description: fields.description,
            sort_order: sortOrder,
            zones: fields.zones.map((z) => {
              return {
                zone_id: Number(z.zone_id),
                country_id: Number(z.country_id),
              };
            }),
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
    if (countries.length < 1) {
      console.log("direct return");
      return [];
    }

    return countries.map((country) => {
      const countryName = country.description.find((description) => {
        return description.language === "tr";
      }).name;
      return {
        key: country.id,
        value: country.id,
        text: countryName,
      };
    });
  }, [countries]);

  const getZonesForOptionMemo = useMemo(() => {
    if (zones.length < 1) {
      console.log("direct return");
      return [];
    }

    const formatZones = zones.map((zone) => {
      return {
        key: zone.id,
        value: zone.id,
        text: zone.name,
        country_id: zone.country.id,
      };
    });

    return [
      {
        key: "0",
        value: "0",
        text: "Tüm Şehirler",
      },
      ...formatZones,
    ];
  }, [zones]);

  const getZonesForOption = (countryId) => {
    return getZonesForOptionMemo.filter((zone: any) => {
      return zone.country_id === countryId || zone.key == 0;
    });
  };

  const addNewZoneToForm = () => {
    if (countries.length > 0) {
      setFields({
        ...fields,
        zones: [
          ...fields.zones,
          {
            ...sampleZone,
            id: String(fields.zones.length + 1),
            country_id: countries[0].id,
            zone_id: "0",
          },
        ],
      });
    } else {
      dispatch(putAdminRequestError("Ülke Bulunamadı"));
    }
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
              <label>Bölge Adı</label>
              <input
                type="text"
                name="name"
                value={fields.name || ""}
                onChange={handleNormalInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Bölge Açıklaması</label>
              <textarea
                name="description"
                rows={3}
                value={fields.description || ""}
                onChange={handleNormalInputChange}
              ></textarea>
            </Form.Field>
          </Tab.Pane>
        );
      },
    },
    {
      menuItem: "Bölgeler",
      render: () => {
        return (
          <Tab.Pane attached={false}>
            {fields.zones.map((zone) => {
              return (
                <Segment raised key={zone.id}>
                  <Form.Field
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <Icon
                      name="trash"
                      color="red"
                      circular
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const currentZoneId = zone.id;
                        setFields({
                          ...fields,
                          zones: fields.zones.filter((zone) => {
                            return zone.id !== currentZoneId;
                          }),
                        });
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Ülke</label>
                    <Select
                      options={getCountriesForOption}
                      value={zone.country_id}
                      onChange={(_e, { value }: { value: string }) => {
                        setFields(
                          produce(fields, (draft) => {
                            const zoneId = zone.id;
                            const findIndex = draft.zones.findIndex(
                              (zone) => zone.id === zoneId
                            );

                            draft.zones[findIndex].country_id = value;
                            draft.zones[findIndex].zone_id = "0";
                          })
                        );
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Şehir</label>
                    <Select
                      options={getZonesForOption(zone.country_id)}
                      value={zone.zone_id}
                      onChange={(_e, { value }: { value: string }) => {
                        setFields(
                          produce(fields, (draft) => {
                            const zoneId = zone.id;
                            const findIndex = draft.zones.findIndex(
                              (zone) => zone.id === zoneId
                            );

                            if (findIndex) {
                              draft.zones[findIndex].zone_id = value;
                            }
                          })
                        );
                      }}
                    />
                  </Form.Field>
                </Segment>
              );
            })}

            <Segment raised textAlign="center" size="mini">
              <Button as="div" onClick={addNewZoneToForm} primary size="tiny">
                Bölge Ekle
              </Button>
            </Segment>
          </Tab.Pane>
        );
      },
    },
  ];

  if (addGeoZoneLoading || countriesLoading || zonesLoading) {
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
        meta_title: "Bölge Ekle - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-geo-zones-add-page admin-sub-page">
        <pre>{JSON.stringify(fields, null, 2)}</pre>
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
            Bölge Ekle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
