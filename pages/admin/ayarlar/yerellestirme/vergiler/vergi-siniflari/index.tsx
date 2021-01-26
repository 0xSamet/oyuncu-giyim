import SEO from "../../../../../../components/Seo";
import {
  Icon,
  Table,
  Button,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { ReactText, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { putAdminRequestError } from "../../../../../../store/reducers/admin";
import { DELETE_COUNTRY } from "../../../../../../apollo/gql/mutations/localization/country";
import { changeDesktopMenuIndex } from "../../../../../../store/reducers/menu";
import { GET_TAX_CLASSES_ADMIN } from "../../../../../../apollo/gql/query/localization/tax_class";
import { DELETE_TAX_CLASS } from "../../../../../../apollo/gql/mutations/localization/tax_class";

export interface TaxRule {
  id: ReactText;
  tax_class_id?: string | number;
  tax_rate_id: string | number;
  priority: string | number;
}

export interface TaxClass {
  id: ReactText;
  name: string;
  description: string;
  sort_order: number;
  tax_rules: TaxRule[];
}

interface TaxClassRowType {
  taxClass: TaxClass;
}

export default function AdminDashboard() {
  const [taxClasses, setTaxClasses] = useState([]);
  const dispatch = useDispatch();

  const [getTaxClasses, { data, loading, error }] = useLazyQuery(
    GET_TAX_CLASSES_ADMIN,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [
    deleteTaxClassRun,
    {
      loading: deleteTaxClassLoading,
      error: deleteTaxClassError,
      data: deleteTaxClassResponse,
    },
  ] = useMutation(DELETE_TAX_CLASS);

  useEffect(() => {
    getTaxClasses();
    dispatch(changeDesktopMenuIndex(15));
  }, []);

  useEffect(() => {
    if (data && data.taxClassesOnAdmin) {
      setTaxClasses(data.taxClassesOnAdmin);
    }
  }, [data]);

  const TaxClassRow: React.FC<TaxClassRowType> = ({ taxClass }) => {
    return (
      <Table.Row key={taxClass.id}>
        <Table.Cell>{taxClass.name}</Table.Cell>
        <Table.Cell textAlign="center">{taxClass.sort_order}</Table.Cell>
        <Table.Cell singleLine>
          <Link
            href={`/admin/ayarlar/yerellestirme/vergiler/vergi-siniflari/duzenle/${taxClass.id}`}
          >
            <a>
              <Button icon labelPosition="left" size="tiny" color="teal">
                <Icon name="edit" />
                Düzenle
              </Button>
            </a>
          </Link>
          <Button
            icon="trash"
            size="tiny"
            color="red"
            onClick={() => handleDeleteTaxClass(taxClass.id)}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  const handleDeleteTaxClass = async (taxClassId) => {
    try {
      await deleteTaxClassRun({
        variables: {
          input: {
            id: taxClassId,
          },
        },
      });
    } catch (err) {
      console.log(err);
      dispatch(putAdminRequestError(err.message));
    }

    getTaxClasses();
  };

  if (loading || deleteTaxClassLoading) {
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
        meta_title: "Vergi Sınıfları - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-tax-classes-page">
        <Table
          celled
          compact
          className="admin-results-table admin-results-table-top"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3" textAlign="right">
                <Link href="/admin/ayarlar/yerellestirme/vergiler/vergi-siniflari/ekle">
                  <a>
                    <Button icon labelPosition="left" size="tiny" color="blue">
                      <Icon name="add square" />
                      Vergi Sınıfı Ekle
                    </Button>
                  </a>
                </Link>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
        <Table celled compact className="admin-results-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Vergi Sınıfları</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Sıralama
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Butonlar
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {taxClasses && taxClasses.length > 0 ? (
              [...taxClasses]
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((taxClass) => {
                  return <TaxClassRow key={taxClass.id} taxClass={taxClass} />;
                })
            ) : (
              <Table.Row>
                <Table.HeaderCell colSpan="3" textAlign="center">
                  Vergi Sınıfı Bulunamadı
                </Table.HeaderCell>
              </Table.Row>
            )}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="3" textAlign="right">
                {/* <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu> */}
                {"Pagination yapılacak"}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </section>
    </SEO>
  );
}
