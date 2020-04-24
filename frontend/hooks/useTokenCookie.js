import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";

export default () => {
  const [cookies, setCookie] = useCookies(["token"]);
  if (!cookies.token) {
    var inTenYears = new Date();
    inTenYears.setFullYear(inTenYears.getFullYear() + 10);
    console.log("set cookie");
    setCookie("token", uuidv4(), {
      expires: inTenYears,
    });
  }
  return cookies.token;
};
