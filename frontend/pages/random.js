import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Idea from "../components/Idea";
import { getRandomIdea, getIdea } from "../apiClient";
import SideMenu from '../components/SideMenu';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default () => {
  const [idea, setIdea] = useState();
  const retrieveRandomIdea = async () => {
    try {
      const response = await getRandomIdea();
      setIdea(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const retrieveIdea = async (id) => {
    let response = await getIdea(id);
    setIdea(response.data);
  };

  useEffect(() => {
    retrieveRandomIdea().catch(console.error);
  }, []);

  let content = <div>Loading...</div>;
  if (idea) {
    content = (
      <Idea
        id={idea.id}
        title={idea.title}
        description={idea.description}
        tags={idea.tags}
        likes={idea.likes}
        clickedLike={() => {
          retrieveIdea(idea.id);
        }}
      />
    );
  }

  return (
    <Layout>
      <div className="columns">
        <div className="column is-one-quarter">
          <SideMenu />
        </div>
        <div className="column is-two-quarter">{content}</div>
        <div className="column is-one-quarter"></div>
      </div>
    </Layout>
  );
};
