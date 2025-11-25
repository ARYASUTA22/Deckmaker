'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'active-btn' : '';
  };

  return (
    <nav className="modern-navbar mb-4">
      <div className="container d-flex justify-content-between align-items-center">
         <div className="d-flex align-items-center gap-2">
            <span className="fw-bold fs-4 text-primary" style={{letterSpacing: '-1px'}}>DeckMaker</span>
         </div>
         
         <div className="d-flex gap-2">
            <Link href="/explore" className={`nav-link-custom ${isActive('/explore')}`}>
              Explore
            </Link>
            <Link href="/create" className={`nav-link-custom ${isActive('/create')}`}>
              Buat Deck
            </Link>
            <Link href="/profile" className={`nav-link-custom ${isActive('/profile')}`}>
              Profile
            </Link>
         </div>
      </div>
    </nav>
  );
}