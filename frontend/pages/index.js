import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Layout from "../components/Layout";
import IdeaOrder, { POPULAR } from "../components/IdeaOrder";

import IdeasCardList from "../components/IdeasCardList";
import PopularTagsAside from "../components/PopularTagsAside";
import TagLink from "../components/TagLink";
import SideMenu from "../components/SideMenu";

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const Index = ({ order }) => {
  const router = useRouter();
  const [orderType, setOrderType] = useState(order || POPULAR);
  const setOrder = (orderType) => {
    Router.replace({
      pathname: "/",
      query: { ...router.query, order: orderType },
    });
    setOrderType(orderType);
  };

  return (
    <Layout>
      <div className="columns">
        <div className="column is-one-quarter">
          <PopularTagsAside />
          <hr />
          <SideMenu />
        </div>
        <div className="column is-two-quarter">
          <IdeaOrder currentOrder={orderType} onOrderClick={setOrder} />
          <br />
          {router.query.tag ? (
            <div className="has-text-centered">
              <span className="is-size-3">
                #{router.query.tag}
                <TagLink>
                  <a
                    type="button"
                    className="is-size-5"
                    style={{ marginLeft: 20 }}
                  >
                    remove filter
                  </a>
                </TagLink>
              </span>
            </div>
          ) : null}
          <IdeasCardList orderType={orderType} filterTag={router.query.tag} />
        </div>
        <div className="column is-one-quarter"></div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      order: context.query.order || null,
    },
  };
}

export default Index;
