import SEO from "../../../../../../components/Seo";
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
import { putAdminRequestError } from "../../../../../../store/reducers/admin";
import { GET_COUNTRIES_ADMIN } from "../../../../../../apollo/gql/query/localization/country";
import { GET_ZONES_ADMIN_FOR_OPTION } from "../../../../../../apollo/gql/query/localization/zone";
import { ADD_GEO_ZONE } from "../../../../../../apollo/gql/mutations/localization/geo_zone";
import { GeoZone } from "../../bolgeler";
import { GET_TAX_RATES_ADMIN } from "../../../../../../apollo/gql/query/localization/tax_rate";
import { ADD_TAX_CLASS } from "../../../../../../apollo/gql/mutations/localization/tax_class";
import { GET_TAX_CLASS_ADMIN } from "../../../../../../apollo/gql/query/localization/tax_class";
import { TaxClass, TaxRule } from ".";

export default function AddPage() {
  const [sampleTaxRule] = useState<TaxRule>({
    id: null,
    tax_rate_id: null,
    priority: 0,
  });
  const [fields, setFields] = useState<TaxClass>({
    id: null,
    name: "",
    description: "",
    sort_order: null,
    tax_rules: [],
  });

  const [taxRates, setTaxRates] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const [
    getTaxRates,
    { data: taxRatesData, loading: taxRatesLoading, error: taxRatesError },
  ] = useLazyQuery(GET_TAX_RATES_ADMIN, {
    fetchPolicy: "no-cache",
  });

  const [
    addTaxClassRun,
    {
      loading: addTaxClassLoading,
      error: addTaxClassError,
      data: addTaxClassResponse,
    },
  ] = useMutation(ADD_TAX_CLASS);

  useEffect(() => {
    getTaxRates();
  }, []);

  useEffect(() => {
    if (taxRatesData && taxRatesData.taxRatesOnAdmin) {
      setTaxRates(
        taxRatesData.taxRatesOnAdmin.sort((a, b) => a.sort_order - b.sort_order)
      );
    }
  }, [taxRatesData]);

  useEffect(() => {
    if (
      addTaxClassResponse &&
      addTaxClassResponse.addTaxClass &&
      addTaxClassResponse.addTaxClass.id
    ) {
      router.push("/admin/ayarlar/yerellestirme/vergiler/vergi-siniflari");
    }
  }, [addTaxClassResponse]);

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
      await addTaxClassRun({
        variables: {
          input: {
            name: fields.name,
            description: fields.description,
            sort_order: sortOrder,
            tax_rules: fields.tax_rules.map((z) => {
              return {
                tax_rate_id: Number(z.tax_rate_id),
                priority: Number(z.priority),
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

  const handletaxRateInputChange = (e, taxRateId) => {
    const findIndex = fields.tax_rules.findIndex(
      (taxRate) => taxRate.id === taxRateId
    );

    if (findIndex || findIndex === 0) {
      return setFields(
        produce(fields, (draft) => {
          draft.tax_rules[findIndex][e.target.name] = e.target.value;
        })
      );
    }
  };

  const getTaxRatesForOption = useMemo(() => {
    if (taxRates.length < 1) {
      return [];
    }

    return taxRates.map((taxRate) => {
      return {
        key: taxRate.id,
        value: taxRate.id,
        text: taxRate.name,
      };
    });
  }, [taxRates]);

  const addNewTaxRateToForm = () => {
    if (taxRates.length > 0) {
      setFields({
        ...fields,
        tax_rules: [
          ...fields.tax_rules,
          {
            ...sampleTaxRule,
            id: String(fields.tax_rules.length + 1),
            tax_rate_id: taxRates[0].id,
          },
        ],
      });
    } else {
      dispatch(putAdminRequestError("Vergi Oranı Bulunamadı"));
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
              <label>Vergi Sınıfı Adı</label>
              <input
                type="text"
                name="name"
                value={fields.name || ""}
                onChange={handleNormalInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Vergi Sınıfı Açıklaması</label>
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
      menuItem: "Vergi Oranları",
      render: () => {
        return (
          <Tab.Pane attached={false}>
            {fields.tax_rules.map((taxRate) => {
              return (
                <Segment raised key={taxRate.id}>
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
                        const currentTaxRateId = taxRate.id;
                        setFields({
                          ...fields,
                          tax_rules: fields.tax_rules.filter((taxRate) => {
                            return taxRate.id !== currentTaxRateId;
                          }),
                        });
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Vergi Oranı</label>
                    <Select
                      options={getTaxRatesForOption}
                      value={taxRate.tax_rate_id}
                      onChange={(_e, { value }: { value: string }) => {
                        setFields(
                          produce(fields, (draft) => {
                            const taxRateId = taxRate.id;
                            const findIndex = draft.tax_rules.findIndex(
                              (taxRate) => taxRate.id === taxRateId
                            );
                            draft.tax_rules[findIndex].tax_rate_id = value;
                          })
                        );
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Öncelik</label>
                    <input
                      type="text"
                      name="priority"
                      value={
                        taxRate.priority || taxRate.priority == 0
                          ? taxRate.priority
                          : ""
                      }
                      onChange={(e) => handletaxRateInputChange(e, taxRate.id)}
                    />
                  </Form.Field>
                </Segment>
              );
            })}

            <Segment raised textAlign="center" size="mini">
              <Button
                as="div"
                onClick={addNewTaxRateToForm}
                primary
                size="tiny"
              >
                Vergi Oranı Ekle
              </Button>
            </Segment>
          </Tab.Pane>
        );
      },
    },
  ];

  if (addTaxClassLoading || taxRatesLoading) {
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
        meta_title: "Vergi Sınıfı Ekle - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-tax-classes-add-page admin-sub-page">
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
            Vergi Sınıfı Ekle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
