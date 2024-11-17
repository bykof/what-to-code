import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import classNames from "classnames";
import useTokenCookie from "../hooks/useTokenCookie";

const Layout = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  useTokenCookie();
  return (
    <>
      <Head>
        <title>What to Code</title>
        <meta
          name="description"
          content="Search or Create Ideas for Your Next Coding Project. Without Ads and Registration"
        />
        <meta
          name="keywords"
          content="ideas,code,programming,what to code,coding project,no ads,no registration,project,programming project"
        />
        <link
          key="apple-touch-57"
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicons/apple-icon-57x57.png"
        />
        <link
          key="apple-touch-60"
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicons/apple-icon-60x60.png"
        />
        <link
          key="apple-touch-72"
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicons/apple-icon-72x72.png"
        />
        <link
          key="apple-touch-76"
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicons/apple-icon-76x76.png"
        />
        <link
          key="apple-touch-114"
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicons/apple-icon-114x114.png"
        />
        <link
          key="apple-touch-120"
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicons/apple-icon-120x120.png"
        />
        <link
          key="apple-touch-144"
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicons/apple-icon-144x144.png"
        />
        <link
          key="apple-touch-152"
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicons/apple-icon-152x152.png"
        />
        <link
          key="apple-touch-180"
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-icon-180x180.png"
        />
        <link
          key="favicon-192"
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-icon-192x192.png"
        />
        <link
          key="favicon-32"
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          key="favicon--96"
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicons/favicon-96x96.png"
        />
        <link
          key="favicon--16"
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link key="manifest" rel="manifest" href="/favicons/manifest.json" />
        <meta
          key="msapplication-tilecolor"
          name="msapplication-TileColor"
          content="#f4e04d"
        />
        <meta
          key="msapplication-tileimage"
          name="msapplication-TileImage"
          content="/favicons/ms-icon-144x144.png"
        />
        <meta key="theme-color" name="theme-color" content="#f4e04d" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <header className="mb-1">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              <Link href="/" className="navbar-item is-justify-content-center">
                <img src="/img/idea.svg" />
                <span>What to Code?</span>
              </Link>
              <div
                onClick={() => setIsActive(!isActive)}
                role="button"
                className={classNames("navbar-burger burger", {
                  "is-active": isActive,
                })}
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarmenu"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </div>
            </div>
            <div
              className={classNames("navbar-menu", { "is-active": isActive })}
            >
              {/* <div className="navbar-start">
                <div className="navbar-item">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Search..."
                    />
                  </div>
                </div>
              </div> */}
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <a href="/random" className="button is-default">
                      Random Idea
                    </a>
                  </div>
                </div>
                <div className="navbar-item">
                  <div className="buttons">
                    <Link href="/submit" className="button is-primary submit-button">
                        Submit What to Code
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <section className="section">
        <div className="container">{children}</div>
      </section>
    </>
  );
};

export default Layout;
