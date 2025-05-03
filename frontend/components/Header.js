import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/add-doctor">Add Doctor</Link>
      <Link href="/doctors">Doctor Listing</Link>
    </header>
  );
};

export default Header;
