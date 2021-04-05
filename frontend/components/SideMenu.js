import Link from 'next/link';

const SideMenu = () => {
  return (
    <aside className='menu'>
      <p className='menu-label'>Links</p>
      <ul className='menu-list'>
        <li>
          <Link href='/about'>
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href='/privacy'>
            <a>Privacy Policy</a>
          </Link>
        </li>
        <li>
          <Link href='/contact'>
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideMenu;
