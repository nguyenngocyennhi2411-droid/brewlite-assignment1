"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";

export function SiteHeader({ home = false }: { home?: boolean }) {
  const { hydrated, totalItems } = useCart();

  return (
    <header className="header">
      <Link href="/" className="brand" aria-label="BrewLite - trang chủ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="BrewLite" width="166" height="45" />
      </Link>
      <nav className="nav" aria-label="Điều hướng chính">
        {home ? <><a href="#gioi-thieu">Giới thiệu</a><a href="#menu">Menu</a></> : <><Link href="/#gioi-thieu">Giới thiệu</Link><Link href="/#menu">Menu</Link></>}
      </nav>
      <div className="header-actions">
        {home && <a className="header-button" href="#menu">Xem menu <span aria-hidden="true">↗</span></a>}
        {!home && <Link className="header-button" href="/#menu">← Quay lại menu</Link>}
        <Link className="cart-header-link" href="/cart" aria-label={`Giỏ hàng${hydrated ? `, ${totalItems} sản phẩm` : ""}`}>
          <span aria-hidden="true">🛒</span><span className="cart-header-text">Giỏ hàng</span>
          <span className="cart-badge" aria-live="polite">{hydrated ? totalItems : 0}</span>
        </Link>
      </div>
    </header>
  );
}
