import Layout from "../components/Layout";
import SideMenu from "../components/SideMenu";
import Link from "next/link";

const About = () => {
  return (
    <Layout>
      <div className="columns">
        <div className="column is-one-quarter">
          <SideMenu />
        </div>
        <div className="column is-two-quarter">
          <p className="is-size-2">About</p>
          <hr />
          <p className="is-size-4">
            What To Code was created during the corona pandemic. <br />
            <br />
            It helps developers to gather ideas for their next coding project.
          </p>
          <br />
          <p className="is-size-4">
            The software is completely{" "}
            <Link href="https://github.com/bykof/what-to-code" target="_blank">
              open source
            </Link>{" "}
            and the hosting costs are paid by the maintainer.
            <br />
            There will be <u>no ads</u>, <u>no registration</u>, and{" "}
            <u>no tracking</u> in the future.<br />
            I promise 🤞!
          </p>
          <br />
          <p className="is-size-4">
            Michael Bykovski (
            <Link href="http://bykovski.de">http://bykovski.de</Link>) is the creator
            of this project. Feel free to contact him via the{" "}
            <Link href="/contact">
              Contact Page
            </Link>
            .
          </p>
          <br />
          <p className="is-size-4">
            This page is built with{" "}
            <Link href="https://nextjs.org/" target="_blank">
              Next.js
            </Link>{" "}
            and <Link href="https://fastapi.tiangolo.com/">FastAPI</Link> and ❤️.
          </p>
        </div>
        <div className="column is-one-quarter"></div>
      </div>
    </Layout>
  );
};

export default About;
