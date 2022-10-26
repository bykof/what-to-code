import Link from "next/link";

const SideMenu = () => {
  return (
    <aside className="menu">
      <p className="menu-label">Links</p>
      <ul className="menu-list">
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/privacy">Privacy Policy</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideMenu;
