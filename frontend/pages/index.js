import React, { useState } from "react";
import Router, { withRouter } from "next/router";
import Layout from "../components/Layout";
import IdeaOrder, { POPULAR } from "../components/IdeaOrder";

import IdeasCardList from "../components/IdeasCardList";
import PopularTagsAside from "../components/PopularTagsAside";
import TagLink from "../components/TagLink";

const Index = ({ router }) => {
  const [orderType, setOrderType] = useState(router.query.order || POPULAR);
  console.log(router.query.order);
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
          <aside className="menu">
            <p className="menu-label">Links</p>
            <ul className="menu-list">
              <li>
                <a>About</a>
              </li>
              <li>
                <a>Privacy Policy</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
            </ul>
          </aside>
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

export default withRouter(Index);
