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
import { GET_LANGUAGES } from "../../../../../../apollo/gql/query/localization/language";
import { Country, CountryDescription } from "../index";
import { Language } from "../../../../ayarlar/yerellestirme/diller";
import Editor from "../../../../../../components/Editor";
import {
  GET_DESKTOP_MENU_ADMIN,
  GET_MOBILE_MENU_ADMIN,
} from "../../../../../../apollo/gql/query/menu";
import { DesktopMenu, MobileMenu } from "../../../../menuler";
import { UPDATE_PAGE } from "../../../../../../apollo/gql/mutations/page";
import { GET_PAGE_ADMIN } from "../../../../../../apollo/gql/query/page";
import { GET_COUNTRY_ADMIN } from "../../../../../../apollo/gql/query/localization/country";
import { UPDATE_COUNTRY } from "../../../../../../apollo/gql/mutations/localization/country";

export default function AddPage() {
  const [sampleDesc] = useState<CountryDescription>({
    name: "",
    language: "",
  });
  const [fields, setFields] = useState<Country>({
    id: null,
    sort_order: null,
    status: true,
    description: [sampleDesc],
  });
  const [languages, setLanguages] = useState<Language[] | undefined[]>([]);
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const [
    getCountry,
    { data: countryData, loading: countryLoading, error: countryError },
  ] = useLazyQuery(GET_COUNTRY_ADMIN, {
    fetchPolicy: "no-cache",
  });

  const [
    getLanguages,
    { data: languagesData, loading: languagesLoading, error: languagesError },
  ] = useLazyQuery(GET_LANGUAGES, {
    fetchPolicy: "no-cache",
  });

  const [
    updateCountryRun,
    {
      loading: updateCountryLoading,
      error: updateCountryError,
      data: updateCountryResponse,
    },
  ] = useMutation(UPDATE_COUNTRY);

  useEffect(() => {
    getLanguages();
  }, []);

  useEffect(() => {
    if (router.query.countryId) {
      getCountry({
        variables: {
          input: {
            id: router.query.countryId,
          },
        },
      });
    }
  }, [router.query.countryId]);

  useEffect(() => {
    if (
      languagesData &&
      languagesData.languages &&
      languagesData.languages.length > 0 &&
      countryData &&
      countryData.countryOnAdmin &&
      countryData.countryOnAdmin.id
    ) {
      let { id, status, sort_order, description } = countryData.countryOnAdmin;

      setFields({
        ...fields,
        status,
        sort_order,
        id,
        description: languagesData.languages.map((language) => {
          const tryFound = description.find(
            (c) => c.language === language.code
          );

          if (tryFound) {
            return tryFound;
          } else {
            return {
              ...sampleDesc,
              language: language.code,
            };
          }
        }),
      });

      const { code: activeLanguageCode } = languagesData.languages.find(
        (language) => language.is_default === true
      );
      setLanguages(languagesData.languages);
      setActiveLanguage(activeLanguageCode);
    }
  }, [languagesData, countryData]);

  useEffect(() => {
    if (
      updateCountryResponse &&
      updateCountryResponse.updateCountry &&
      updateCountryResponse.updateCountry.id
    ) {
      router.push("/admin/ayarlar/yerellestirme/ulkeler");
    }
  }, [updateCountryResponse]);

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
      await updateCountryRun({
        variables: {
          input: {
            id: fields.id,
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
              <Tab menu={{ pointing: true }} panes={getLanguagesForMenu} />
            </Form.Field>
            <Form.Field>
              <label>Ülke Adı</label>
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
  ];

  if (updateCountryLoading || languagesLoading) {
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
        meta_title: "Ülke Düzenle - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-countries-update-page admin-sub-page">
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
            Ülke Güncelle
          </Button>
        </Form>
      </section>
    </SEO>
  );
}
