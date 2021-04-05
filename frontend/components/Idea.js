import styles from "./Idea.module.sass";
import classNames from "classnames";
import { likeIdea } from "../apiClient";
import TagLink from "./TagLink";
import useTokenCookie from '../hooks/useTokenCookie';

const Idea = ({ id, title, description, tags, likes, clickedLike }) => {
  const token = useTokenCookie();
  const clickLike = async () => {
    let response = await likeIdea(id, token);
    clickedLike();
  };

  return (
    <div className={classNames("card", styles.idea)}>
      <div className="card-content">
        <p className="has-text-weight-bold is-size-5">{title}</p>
        <p className="subtitle">{description}</p>
        <p className="has-text-right is-size-6">
          {tags.map((tag) => (
            <TagLink tag={tag.value} key={tag.value}>
              <a>
                #{tag.value}
              </a>
            </TagLink>
          ))}
        </p>
      </div>
      <footer className="card-footer ">
        <a
          role="button"
          onClick={clickLike}
          className={classNames("card-footer-item", styles.cardFooterItem)}
        >
          <span>{likes} ❤️</span>
        </a>
      </footer>
    </div>
  );
};

export default Idea
