import { GetStaticProps } from "next";
import SEO from "../../components/Seo";
import {
  Accordion,
  Icon,
  Dimmer,
  Loader,
  Segment,
  Button,
  TextArea,
  Form,
} from "semantic-ui-react";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PAGES } from "../../apollo/gql/query/page";

export default function AdminDashboard({ page }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, loading, error } = useQuery(GET_PAGES);

  const handleClick = (index) => {
    const newIndex = activeIndex === index ? -1 : index;
    return setActiveIndex(newIndex);
  };

  if (loading) {
    return (
      <Segment className="page-loader">
        <Dimmer active>
          <Loader size="medium">Yükleniyor</Loader>
        </Dimmer>
      </Segment>
    );
  }

  if (error) {
    console.log(error);
  }

  console.log(data);

  return (
    <SEO seo={page}>
      <section className="admin-menu-page">
        <Accordion styled className="menu-accordion">
          {data.pages && data.pages.length > 0 ? (
            data.pages.map((page) => {
              return (
                <div
                  key={page.id}
                  className={
                    activeIndex === page.id
                      ? "item-wrapper active"
                      : "item-wrapper"
                  }
                >
                  <Accordion.Title
                    active={activeIndex === page.id}
                    index={page.id}
                    onClick={() => handleClick(page.id)}
                  >
                    <Icon name="dropdown" />
                    {page.name}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === page.id}>
                    <Form>
                      <Form.Field>
                        <label>Meta Title</label>
                        <input placeholder="First Name" />
                      </Form.Field>

                      <Form.Field control={TextArea} label="Meta Description" />
                      <Form.Field control={TextArea} label="Meta Keyword" />

                      <Button primary fluid>
                        Kaydet
                      </Button>
                    </Form>
                  </Accordion.Content>
                </div>
              );
            })
          ) : (
            <div>error</div>
          )}
        </Accordion>
      </section>
    </SEO>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      page: {
        meta_title: "Menüler - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      },
    },
  };
};
