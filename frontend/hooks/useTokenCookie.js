import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';

const useTokenCookie = () => {
  const [cookies, setCookie] = useCookies(['token']);
  if (!cookies.token) {
    const inTenYears = new Date();
    inTenYears.setFullYear(inTenYears.getFullYear() + 10);
    console.log('set cookie');
    setCookie('token', uuidv4(), {
      expires: inTenYears,
    });
  }
  return cookies.token;
};

export default useTokenCookie;
