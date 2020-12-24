import SEO from "../../../../components/Seo";
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Select,
  Input,
  Segment,
  Dimmer,
  Loader,
  Menu,
  Tab,
} from "semantic-ui-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import produce from "immer";
import { putAdminRequestError } from "../../../../store/reducers/admin";
import { GET_LANGUAGES } from "../../../../apollo/gql/query/language";
import { MobileMenu, MobileMenuDescription } from "../index";
import { Language } from "../../ayarlar/diller";
import { ADD_MOBILE_MENU } from "../../../../apollo/gql/mutations/menu";

export default function AddMobileMenu() {
  const [sampleDesc] = useState<MobileMenuDescription>({
    name: "",
    href: "",
    target: "_self",
    icon_url: "",
    language: "",
  });
  const [fields, setFields] = useState<MobileMenu>({
    sort_order: null,
    status: true,
    description: [sampleDesc],
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
    addMobileMenuRun,
    {
      loading: addMobileMenuLoading,
      error: addMobileMenuError,
      data: addMobileMenuResponse,
    },
  ] = useMutation(ADD_MOBILE_MENU);

  useEffect(() => {
    getLanguages();
  }, []);

  useEffect(() => {
    if (
      languagesData &&
      languagesData.languages &&
      languagesData.languages.length > 0
    ) {
      setFields({
        ...fields,
        description: languagesData.languages.map((language) => {
          return {
            ...fields.description[0],
            language: language.code,
          };
        }),
      });

      const { code: activeLanguageCode } = languagesData.languages.find(
        (language) => language.is_default === true
      );
      setLanguages(languagesData.languages);
      setActiveLanguage(activeLanguageCode);
    }
  }, [languagesData]);

  useEffect(() => {
    if (
      addMobileMenuResponse &&
      addMobileMenuResponse.addMobileMenu &&
      addMobileMenuResponse.addMobileMenu.id
    ) {
      router.push("/admin/menuler");
    }
  }, [addMobileMenuResponse]);

  const handleFormSubmit = async () => {
    let sortOrder;

    if (!isNaN(fields.sort_order) && fields.sort_order) {
      sortOrder = Number(fields.sort_order);
    } else {
      sortOrder = null;
    }

    console.log(fields);

    try {
      await addMobileMenuRun({
        variables: {
          input: {
            sort_order: sortOrder,
            status: fields.status,
            description: fields.description,
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

  const panes = [
    {
      menuItem: "Genel",
      render: () => {
        const fieldsToUse = fields.description.find(
          (description) => description.language === activeLanguage
        );
        return (
          <Tab.Pane attached={false}>
            <Form.Group style={{ justifyContent: "flex-end" }}>
              <Form.Field
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
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
            </Form.Group>
            <Form.Field>
              <label>Sıralama</label>
              <input
                type="number"
                name="sort_order"
                value={fields.sort_order || ""}
                onChange={handleNormalInputChange}
              />
            </Form.Field>
            <Form.Field>
              <Tab menu={{ pointing: true }} panes={getLanguagesForMenu} />
            </Form.Field>
            <Form.Field>
              <label>Menü Adı</label>
              <input
                type="text"
                name="name"
                value={fieldsToUse?.name || ""}
                onChange={handleLanguageInputChange}
              />
            </Form.Field>
            <Form.Group
              style={{
                alignItems: "center",
              }}
            >
              <Form.Field width={10}>
                <label>Gideceği Link</label>
                <Input
                  name="href"
                  value={fieldsToUse?.href || ""}
                  onChange={handleLanguageInputChange}
                />
              </Form.Field>
              <Form.Field width={6}>
                <label>Target</label>
                <Select
                  options={[
                    {
                      key: "_self",
                      value: "_self",
                      text: "_self",
                    },
                    {
                      key: "_blank",
                      value: "_blank",
                      text: "_blank",
                    },
                    {
                      key: "_parent",
                      value: "_parent",
                      text: "_parent",
                    },
                    {
                      key: "_top",
                      value: "_top",
                      text: "_top",
                    },
                  ]}
                  value={fieldsToUse?.target || ""}
                  onChange={(_e, { value }: { value: string }) => {
                    setFields(
                      produce(fields, (draft) => {
                        const findIndex = fields.description.findIndex(
                          (desc) => desc.language === activeLanguage
                        );
                        draft.description[findIndex].target = value;
                      })
                    );
                  }}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>İcon Linki</label>
              <input
                type="text"
                name="icon_url"
                value={fieldsToUse?.icon_url || ""}
                onChange={handleLanguageInputChange}
              />
            </Form.Field>
          </Tab.Pane>
        );
      },
    },
  ];

  if (addMobileMenuLoading || languagesLoading) {
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
        meta_title: "Mobil Menü Ekle - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-mobile-menu-add-page admin-sub-page">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          <Tab className="tabs" menu={{ pointing: true }} panes={panes} />
          <Button type="submit" fluid icon size="tiny" color="blue">
            <Icon name="add square" />
            Mobil Menü Ekle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
