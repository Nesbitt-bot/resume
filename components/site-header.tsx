'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import type { SiteData } from '@/lib/types';

export function SiteHeader({ site }: { site: SiteData }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function toggleTheme() {
    const next = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <header className="site-header">
      <div className="identity-bar page-container">
        <Link href="/" className="identity-mark" aria-label={`${site.name} home`}>{site.name}</Link>

        <nav id="primary-navigation" className={open ? 'primary-nav is-open' : 'primary-nav'} aria-label="Primary navigation">
          <div className="nav-inner">
            <div className="nav-primary-links">
              {site.navigation.map((item) => {
                const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="nav-profile-links" aria-label="Profile links">
              {site.profiles.map((profile) => (
                <a key={profile.href} href={profile.href} target="_blank" rel="noreferrer">
                  {profile.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <div className="header-actions">
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle color theme">
            <Moon className="theme-icon-light" size={19} />
            <Sun className="theme-icon-dark" size={19} />
          </button>
          <button
            className="icon-button menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="primary-navigation"
            aria-label="Toggle navigation"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}
