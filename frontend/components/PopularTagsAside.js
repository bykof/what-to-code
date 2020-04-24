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
          <li key={tag[0]}>
            <TagLink tag={tag[0]}>
              <a
                className={classNames({
                  "has-text-primary": tag[0] === router.query.tag,
                })}
              >
                #{tag[0]}
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
