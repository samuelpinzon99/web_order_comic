import { Link, useMatch, useResolvedPath } from "react-router-dom";
export const NavLinkk = (props) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return <Link {...props} className={match ? "active" : "non-active"} />;
};