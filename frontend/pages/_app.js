import "../styles.sass";

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
