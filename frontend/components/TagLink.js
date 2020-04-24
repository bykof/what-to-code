import { withRouter } from "next/router";
import Link from "next/link";

const TagLink = ({ tag, router, children }) => {
  let query = { ...router.query };
  if (tag === undefined && query.tag !== undefined) {
    delete query.tag;
  } else {
    query.tag = tag;
  }
  return (
    <Link href={{ pathname: "/", query }} replace>
      {children}
    </Link>
  );
};

export default withRouter(TagLink);
