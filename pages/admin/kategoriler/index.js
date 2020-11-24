import { GetStaticProps } from "next";
import SEO from "../../../components/Seo";
import { Icon, Label, Menu, Table, Button } from "semantic-ui-react";
import { useState } from "react";

export default function AdminDashboard() {
  const [categories, setCategories] = useState([]);

  return (
    <SEO
      seo={{
        meta_title: "Kategoriler - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <section className="admin-categories-page">
        <Table celled className="categories-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Kategoriler</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Sıralama
              </Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="center">
                Butonlar
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Sweatshirt</Table.Cell>
              <Table.Cell textAlign="center">0</Table.Cell>
              <Table.Cell singleLine>
                <Button icon labelPosition="left" size="tiny" color="teal">
                  <Icon name="edit" />
                  Düzenle
                </Button>
                <Button icon="trash" size="tiny" color="red"></Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <Menu floated="right" pagination>
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
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </section>
    </SEO>
  );
}
