import { wrapper } from "../store";
import { handleIconMode } from "../utils";

import SEO from "../components/Seo";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { initializeApollo } from "../apollo/client";
// import { GET_DESKTOP_MENU, GET_MOBILE_MENU } from "../apollo/gql/query/menu";
import { GET_PAGE } from "../apollo/gql/query/page";
import NotFound from "../components/NotFound";

export default function DynamicPage({}) {
  // if (notFound) {
  //   return <NotFound />;
  // }

  return (
    <SEO seo={{ meta_title: "", meta_description: "", meta_keyword: "" }}>
      <section className="listing-page">
        <div className="subcategories-wrapper">
          <div className="subcategory">Valorant SweatShirt</div>
        </div>
        <div className="product-filter-title-wrapper">
          <h3>Filtrele</h3>
        </div>
        <div className="product-filter-wrapper">
          <ul className="filter">
            <li className="filter-el">
              <span className="filter-el-title">
                Beden Seç
                <img
                  className="filter-down-icon"
                  src="/static/icons/arrow.svg"
                />
              </span>
              <span className="filter-options">
                <ul>
                  <li>S</li>
                  <li>M</li>
                  <li>L</li>
                </ul>
              </span>
            </li>
            <li className="filter-el">
              <span className="filter-el-title">
                Cinsiyet Seç
                <img
                  className="filter-down-icon"
                  src="/static/icons/arrow.svg"
                />
              </span>
              <span className="filter-desc"></span>
            </li>
            <li className="filter-el">
              <span className="filter-el-title">
                Fiyat Seç
                <img
                  className="filter-down-icon"
                  src="/static/icons/arrow.svg"
                />
              </span>
              <span className="filter-desc"></span>
            </li>
          </ul>
        </div>
        <div className="product-listing-wrapper">
          <div className="product">
            <div className="product-image">
              <img src="/static/products/valorant-sweat-1.jpg" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Valorant Sweat - 1</h3>
              <div className="product-price-wrapper">
                <span className="product-price">
                  99.90&#8378;
                  <span className="old-price">129.90&#8378;</span>
                </span>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product-image">
              <img src="/static/products/valorant-sweat-1.jpg" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Valorant Sweat - 1</h3>
              <div className="product-price-wrapper">
                <span className="product-price">
                  99.90&#8378;
                  <span className="old-price">129.90&#8378;</span>
                </span>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product-image">
              <img src="/static/products/valorant-sweat-1.jpg" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Valorant Sweat - 1</h3>
              <div className="product-price-wrapper">
                <span className="product-price">
                  99.90&#8378;
                  <span className="old-price">129.90&#8378;</span>
                </span>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product-image">
              <img src="/static/products/valorant-sweat-1.jpg" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Valorant Sweat - 1</h3>
              <div className="product-price-wrapper">
                <span className="product-price">
                  99.90&#8378;
                  <span className="old-price">129.90&#8378;</span>
                </span>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product-image">
              <img src="/static/products/valorant-sweat-1.jpg" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Valorant Sweat - 1</h3>
              <div className="product-price-wrapper">
                <span className="product-price">
                  99.90&#8378;
                  <span className="old-price">129.90&#8378;</span>
                </span>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product-image">
              <img src="/static/products/valorant-sweat-1.jpg" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Valorant Sweat - 1</h3>
              <div className="product-price-wrapper">
                <span className="product-price">
                  99.90&#8378;
                  <span className="old-price">129.90&#8378;</span>
                </span>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product-image">
              <img src="/static/products/valorant-sweat-1.jpg" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Valorant Sweat - 1</h3>
              <div className="product-price-wrapper">
                <span className="product-price">
                  99.90&#8378;
                  <span className="old-price">129.90&#8378;</span>
                </span>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product-image">
              <img src="/static/products/valorant-sweat-1.jpg" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Valorant Sweat - 1</h3>
              <div className="product-price-wrapper">
                <span className="product-price">
                  99.90&#8378;
                  <span className="old-price">129.90&#8378;</span>
                </span>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product-image">
              <img src="/static/products/valorant-sweat-1.jpg" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Valorant Sweat - 1</h3>
              <div className="product-price-wrapper">
                <span className="product-price">
                  99.90&#8378;
                  <span className="old-price">129.90&#8378;</span>
                </span>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product-image">
              <img src="/static/products/valorant-sweat-1.jpg" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Valorant Sweat - 1</h3>
              <div className="product-price-wrapper">
                <span className="product-price">
                  99.90&#8378;
                  <span className="old-price">129.90&#8378;</span>
                </span>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product-image">
              <img src="/static/products/valorant-sweat-1.jpg" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Valorant Sweat - 1</h3>
              <div className="product-price-wrapper">
                <span className="product-price">
                  99.90&#8378;
                  <span className="old-price">129.90&#8378;</span>
                </span>
              </div>
            </div>
          </div>
          <div className="product"></div>
        </div>
      </section>
    </SEO>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ store, req, res, ...ctx }) => {

//     handleIconMode(store, req);
//     const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();

//     await apolloClient.query({
//       query: GET_DESKTOP_MENU,
//     });

//     await apolloClient.query({
//       query: GET_MOBILE_MENU,
//     });

//     const { data } = await apolloClient.query({
//       query: GET_PAGE,
//       variables: {
//         slug: `/${ctx.params.dynamicUrl}`
//       }
//     });

//     if (data.page) {
//       handleMenuIndex(store, data);
//     } else {
//       res.statusCode = 404;
//     }

//     return {
//       props: {
//         initialApolloState: apolloClient.cache.extract(),
//         notFound: data.page === null,
//         page: data.page
//       },
//     };
//   }
// );
