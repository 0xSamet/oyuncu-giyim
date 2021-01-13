import SEO from "../../../../components/Seo";
import {
  Button,
  Form,
  Icon,
  Select,
  Segment,
  Dimmer,
  Loader,
  Menu,
  Tab,
} from "semantic-ui-react";
import { useEffect, useMemo, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import produce from "immer";
import { putAdminRequestError } from "../../../../store/reducers/admin";
import {
  Option,
  OptionDescription,
  OptionType,
  OptionValue,
  OptionValueDescription,
} from "../index";
import { Language } from "../../ayarlar/yerellestirme/diller";
import { UPDATE_OPTION } from "../../../../apollo/gql/mutations/option";
import { GET_LANGUAGES } from "../../../../apollo/gql/query/localization/language";
import { GET_OPTION_ADMIN } from "../../../../apollo/gql/query/option";

export default function AddOptionPage() {
  const [optionTypes, setOptionTypes] = useState<OptionType[] | undefined[]>([
    {
      name: "select",
      sort_order: 0,
    },
  ]);
  const [sampleOptionValueDescription] = useState<OptionValueDescription>({
    name: "",
    language: "",
  });
  const [sampleOptionValue] = useState<OptionValue>({
    id: null,
    sort_order: null,
    description: [sampleOptionValueDescription],
  });
  const [sampleOptionDescription] = useState<OptionDescription>({
    name: "",
    language: "",
  });
  const [fields, setFields] = useState<Option>({
    id: null,
    sort_order: null,
    type: optionTypes[0].name,
    option_values: [sampleOptionValue],
    description: [sampleOptionDescription],
  });

  const [languages, setLanguages] = useState<Language[] | undefined[]>([]);
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const [
    getLanguages,
    { data: languagesData, loading: languagesLoading, error: languagesError },
  ] = useLazyQuery(GET_LANGUAGES, {
    fetchPolicy: "no-cache",
  });

  const [
    getOption,
    { data: optionData, loading: optionLoading, error: optionError },
  ] = useLazyQuery(GET_OPTION_ADMIN, {
    fetchPolicy: "no-cache",
  });

  const [
    updateOptionRun,
    {
      loading: updateOptionLoading,
      error: updateOptionError,
      data: updateOptionResponse,
    },
  ] = useMutation(UPDATE_OPTION);

  useEffect(() => {
    if (router.query.optionId) {
      getOption({
        variables: {
          input: {
            id: router.query.optionId,
          },
        },
      });
    }
  }, [router.query.optionId]);

  useEffect(() => {
    getLanguages();
  }, []);

  useEffect(() => {
    if (
      languagesData &&
      languagesData.languages &&
      languagesData.languages.length > 0 &&
      optionData &&
      optionData.optionOnAdmin &&
      optionData.optionOnAdmin.id
    ) {
      let {
        id,
        sort_order,
        description,
        option_values,
      } = optionData.optionOnAdmin;

      setFields({
        ...fields,
        id,
        sort_order,
        description: languagesData.languages.map((language) => {
          const tryFound = description.find(
            (c) => c.language === language.code
          );

          if (tryFound) {
            return tryFound;
          } else {
            return {
              ...sampleOptionDescription,
              language: language.code,
            };
          }
        }),
        option_values: option_values.map((optionValue: OptionValue) => {
          return {
            ...sampleOptionValue,
            id: optionValue.id,
            sort_order: optionValue.sort_order,
            description: languagesData.languages.map((language) => {
              const tryFound = optionValue.description.find(
                (c) => c.language === language.code
              );
              if (tryFound) {
                return tryFound;
              } else {
                return {
                  ...sampleOptionValueDescription,
                  language: language.code,
                };
              }
            }),
          } as OptionValue;
        }),
      });

      const { code: activeLanguageCode } = languagesData.languages.find(
        (language) => language.is_default === true
      );
      setLanguages(languagesData.languages);
      setActiveLanguage(activeLanguageCode);
    }
  }, [languagesData, optionData]);

  useEffect(() => {
    if (
      updateOptionResponse &&
      updateOptionResponse.updateOption &&
      updateOptionResponse.updateOption.id
    ) {
      router.push("/admin/secenekler");
    }
  }, [updateOptionResponse]);

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
      await updateOptionRun({
        variables: {
          input: {
            id: fields.id,
            type: fields.type,
            sort_order: sortOrder,
            description: fields.description,
            option_values: fields.option_values.map((optionValue) => {
              return {
                sort_order: optionValue.sort_order,
                description: optionValue.description,
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

  const handleLanguageInputChange = (e) => {
    return setFields(
      produce(fields, (draft) => {
        const foundIndex = fields.description.findIndex(
          (c) => c.language === activeLanguage
        );

        draft.description[foundIndex][e.target.name] = e.target.value;
      })
    );
  };

  const handleOptionValueNormalInputChange = (e, id) => {
    return setFields(
      produce(fields, (draft) => {
        const foundValueIndex = draft.option_values.findIndex(
          (c) => c.id === id
        );

        draft.option_values[foundValueIndex][e.target.name] = e.target.value;
      })
    );
  };

  const handleOptionValueLanguageInputChange = (e, id) => {
    return setFields(
      produce(fields, (draft) => {
        const foundValueIndex = draft.option_values.findIndex(
          (c) => c.id === id
        );

        const foundValueDescriptionIndex = draft.option_values[
          foundValueIndex
        ].description.findIndex((c) => c.language === activeLanguage);

        draft.option_values[foundValueIndex].description[
          foundValueDescriptionIndex
        ][e.target.name] = e.target.value;
      })
    );
  };

  const handleAddOptionValue = () => {
    return setFields(
      produce(fields, (draft) => {
        const lastIndex = draft.option_values.length - 1;

        draft.option_values.push({
          ...sampleOptionValue,
          id: Number(draft.option_values[lastIndex].id) + 1,
          sort_order: Number(draft.option_values[lastIndex].sort_order) + 1,
          description: (languages as Language[]).map((language) => {
            return {
              ...sampleOptionValueDescription,
              name: "",
              language: language.code,
            };
          }),
        });
      })
    );
  };

  const handleDeleteOptionValue = (optionValueId) => {
    return setFields(
      produce(fields, (draft) => {
        if (draft.option_values.length > 1) {
          draft.option_values = draft.option_values.filter(
            (optionValue) => optionValue.id !== optionValueId
          );
        }
      })
    );
  };

  const getLanguagesForMenu = useMemo(() => {
    return (languages as Language[]).map((language) => {
      return {
        menuItem: (
          <Menu.Item
            key={language.code}
            content={language.name}
            onClick={() => setActiveLanguage(language.code)}
            active={language.code === activeLanguage}
          ></Menu.Item>
        ),
      };
    });
  }, [languages, activeLanguage]);

  const getOptionTypesForOption = useMemo(() => {
    return (optionTypes as OptionType[]).map((optionType) => {
      return {
        key: optionType.name,
        value: String(optionType.name),
        text: optionType.name,
      };
    });
  }, [optionTypes]);

  const panes = [
    {
      menuItem: "Genel",
      render: () => {
        const fieldsToUse = fields.description.find(
          (description) => description.language === activeLanguage
        );
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
                  options={getOptionTypesForOption}
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
            </Form.Group>

            <Form.Field>
              <Tab menu={{ pointing: true }} panes={getLanguagesForMenu} />
            </Form.Field>
            <Form.Field>
              <label>Seçenek Adı</label>
              <input
                type="text"
                name="name"
                value={fieldsToUse?.name || ""}
                onChange={handleLanguageInputChange}
              />
            </Form.Field>
          </Tab.Pane>
        );
      },
    },
    {
      menuItem: "Seçenek Değerleri",
      render: () => {
        return (
          <Tab.Pane attached={false}>
            {fields.option_values.map((optionValue) => {
              const fieldsToUse = optionValue.description.find(
                (description) => description.language === activeLanguage
              );
              return (
                <Segment raised key={optionValue.id}>
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
                      onClick={() => handleDeleteOptionValue(optionValue.id)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Sıralama</label>
                    <input
                      type="number"
                      name="sort_order"
                      value={
                        optionValue.sort_order || optionValue.sort_order == 0
                          ? optionValue.sort_order
                          : ""
                      }
                      onChange={(e) =>
                        handleOptionValueNormalInputChange(e, optionValue.id)
                      }
                    />
                  </Form.Field>
                  <Form.Field>
                    <Tab
                      menu={{ pointing: true }}
                      panes={getLanguagesForMenu}
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>Seçenek Değer Adı</label>
                    <input
                      type="text"
                      name="name"
                      value={fieldsToUse?.name || ""}
                      onChange={(e) =>
                        handleOptionValueLanguageInputChange(e, optionValue.id)
                      }
                    />
                  </Form.Field>
                </Segment>
              );
            })}
            <Segment raised textAlign="center" size="mini">
              <Button
                as="div"
                onClick={handleAddOptionValue}
                primary
                size="tiny"
              >
                Seçenek Değeri Ekle
              </Button>
            </Segment>
          </Tab.Pane>
        );
      },
    },
  ];

  if (updateOptionLoading || languagesLoading) {
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
        meta_title: "Seçenek Düzenle - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-options-update-page admin-sub-page">
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
            Seçeneği Güncelle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
