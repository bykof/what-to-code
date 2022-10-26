import Link from "next/link";
import Layout from "../components/Layout";
import SideMenu from '../components/SideMenu';

const Contact = () => {
  return (
    <Layout>
      <div className="columns">
        <div className="column is-one-quarter">
          <SideMenu />
        </div>
        <div className="column is-two-quarter">
          <p className="is-size-2">Contact</p>
          <hr />
          <p className="is-size-4">
            Email: <Link href="mailto:bykof@me.com">bykof@me.com</Link>
          </p>
          <br />
          <p className="is-size-4">
            Please make a GitHub issue for feature requests:
            <br />
            <Link href="https://github.com/bykof/what-to-code" target="_blank">
              https://github.com/bykof/what-to-code
            </Link>
            .
          </p>
        </div>
        <div className="column is-one-quarter"></div>
      </div>
    </Layout>
  );
};

export default Contact;
