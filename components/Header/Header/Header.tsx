'use client';

import { useState } from 'react';
import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={css.header}>
      <Link
        href="/"
        aria-label="Home"
        className={css.headerLink}
        onClick={closeMenu}
      >
        NoteHub
      </Link>

      <button
        className={css.burger}
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        ☰
      </button>

      <nav
        aria-label="Main Navigation"
        className={`${css.nav} ${menuOpen ? css.open : ''}`}
      >
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <TagsMenu onLinkClick={closeMenu} />
          </li>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink} onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className={css.navigationItem} onClick={closeMenu}>
            <AuthNavigation />
          </li>
        </ul>
      </nav>
    </header>
  );
}
