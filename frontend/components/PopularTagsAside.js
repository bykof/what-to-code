import { useState, useEffect } from "react";
import { getPopularTags } from "../apiClient";
import { withRouter } from "next/router";
import classNames from "classnames";
import TagLink from "./TagLink";

const PopularTagsAside = ({ router }) => {
  const [popularTags, setPopularTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const setErrorToDefault = () => setError(null);
  const retrievePopularTags = async () => {
    try {
      setIsLoading(true);
      let response = await getPopularTags();
      setPopularTags(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
      setErrorToDefault();
    }
  };

  useEffect(() => {
    retrievePopularTags();
  }, []);

  let content = null;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>There was an error...</p>;
  } else {
    content = (
      <ul className="menu-list">
        {popularTags.map((tag) => (
          <li key={tag.value}>
            <TagLink tag={tag.value}>
              <a
                className={classNames({
                  "has-text-primary": tag.value === router.query.tag,
                })}
              >
                #{tag.value}
              </a>
            </TagLink>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <aside className="menu">
      <p className="menu-label">Popular Tags</p>
      {content}
    </aside>
  );
};

export default withRouter(PopularTagsAside);
