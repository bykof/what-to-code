import styles from "./Idea.module.sass";
import classNames from "classnames";
import { likeIdea } from "../apiClient";
import TagLink from "./TagLink";
import useTokenCookie from '../hooks/useTokenCookie';
import useLikesCookie from "../hooks/useLikesCookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart} from "@fortawesome/free-regular-svg-icons";

export default ({ id, title, description, tags, likes, clickedLike }) => {
  const token = useTokenCookie();
  const { isLiked, updateLikes } = useLikesCookie();

  const clickLike = async () => {
    let response = await likeIdea(id, token);
    updateLikes(id);
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
          <span>{likes} {isLiked(id)
            ? <FontAwesomeIcon icon={fasHeart} size="md" color="red" />
            : <FontAwesomeIcon icon={farHeart} size="md" />
          }
          </span>
        </a>
      </footer>
    </div>
  );
};
