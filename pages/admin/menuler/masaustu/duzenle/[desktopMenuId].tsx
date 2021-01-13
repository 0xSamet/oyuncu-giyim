import SEO from "../../../../../components/Seo";
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
import { putAdminRequestError } from "../../../../../store/reducers/admin";
import { GET_LANGUAGES } from "../../../../../apollo/gql/query/localization/language";
import { DesktopMenu, DesktopMenuDescription } from "../../index";
import { Language } from "../../../ayarlar/yerellestirme/diller";
import { UPDATE_DESKTOP_MENU } from "../../../../../apollo/gql/mutations/menu";
import { GET_DESKTOP_MENU_ADMIN_ONE } from "../../../../../apollo/gql/query/menu";

export default function AddCategory() {
  const [sampleDesc] = useState<DesktopMenuDescription>({
    name: "",
    href: "",
    target: "_self",
    icon_url: "",
    language: "",
  });
  const [fields, setFields] = useState<DesktopMenu>({
    sort_order: null,
    status: true,
    is_divider: false,
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
    getDesktopMenuRun,
    {
      data: desktopMenuData,
      loading: desktopMenuLoading,
      error: desktopMenuError,
    },
  ] = useLazyQuery(GET_DESKTOP_MENU_ADMIN_ONE, {
    fetchPolicy: "no-cache",
  });

  const [
    updateDesktopMenuRun,
    {
      loading: updateDesktopMenuLoading,
      error: updateDesktopMenuError,
      data: updateDesktopMenuResponse,
    },
  ] = useMutation(UPDATE_DESKTOP_MENU);

  useEffect(() => {
    getLanguages();
  }, []);

  useEffect(() => {
    if (router.query.desktopMenuId) {
      getDesktopMenuRun({
        variables: {
          input: {
            id: router.query.desktopMenuId,
          },
        },
      });
    }
  }, [router.query.desktopMenuId]);

  useEffect(() => {
    if (
      languagesData &&
      languagesData.languages &&
      languagesData.languages.length > 0 &&
      desktopMenuData &&
      desktopMenuData.desktopMenuOnAdminOne.id
    ) {
      let {
        id,
        status,
        is_divider,
        sort_order,
        description,
      } = desktopMenuData.desktopMenuOnAdminOne;

      const menuId = router.query.desktopMenuId;
      setFields({
        ...fields,
        status,
        is_divider,
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
  }, [languagesData, desktopMenuData]);

  useEffect(() => {
    if (
      updateDesktopMenuResponse &&
      updateDesktopMenuResponse.updateDesktopMenu &&
      updateDesktopMenuResponse.updateDesktopMenu.id
    ) {
      router.push("/admin/menuler");
    }
  }, [updateDesktopMenuResponse]);

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
      await updateDesktopMenuRun({
        variables: {
          input: {
            ...fields,
            sort_order: sortOrder,
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
              <Form.Field>
                <label>Divider ?</label>
                <Checkbox
                  toggle
                  checked={fields.is_divider}
                  onChange={() => {
                    return setFields({
                      ...fields,
                      is_divider: !fields.is_divider,
                    });
                  }}
                />
              </Form.Field>
              <Form.Field>
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

  if (updateDesktopMenuLoading || desktopMenuLoading || languagesLoading) {
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
        meta_title: "Masaüstü Menü Düzenle - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-menu-update-page admin-sub-page">
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
