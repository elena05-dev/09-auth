import React from 'react';
import SidebarNotes from './SidebarNotes';
import css from './SidebarLayout.module.css';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css.wrapper}>
      <aside className={css.sidebar}>
        <SidebarNotes />
      </aside>

      <main className={css.mainContent}>{children}</main>
    </div>
  );
}
