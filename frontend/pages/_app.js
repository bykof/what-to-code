import "../styles.sass";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default ({ Component, pageProps }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LfSn7YiAAAAAGNmHjUU8SGTEkSUf6iGN3-NfdC3">
      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
};
