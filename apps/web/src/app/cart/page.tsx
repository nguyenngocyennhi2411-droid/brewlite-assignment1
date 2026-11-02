"use client";

import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { useCart } from "../../components/cart-provider";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export default function CartPage() {
  const { items, hydrated, totalItems, totalPrice, increaseQuantity, decreaseQuantity, removeItem } = useCart();

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="cart-main">
        <div className="cart-heading">
          <div>
            <span className="section-kicker">BREWLITE SELECTION</span>
            <h1>Giỏ hàng <span>của bạn.</span></h1>
          </div>
          {hydrated && items.length > 0 && <span className="cart-item-count">{totalItems} sản phẩm</span>}
        </div>

        {!hydrated ? (
          <div className="cart-loading" role="status">Đang tải giỏ hàng...</div>
        ) : items.length === 0 ? (
          <section className="state-panel empty-cart">
            <span className="state-icon" aria-hidden="true">☕</span>
            <h2>Giỏ hàng đang trống</h2>
            <p>Chọn món yêu thích từ menu để bắt đầu.</p>
            <Link className="detail-action" href="/#menu">Khám phá menu</Link>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-items" aria-label="Các sản phẩm trong giỏ">
              {items.map((item) => (
                <article className="cart-item" key={item.key}>
                  <Link className="cart-item-image product-image" href={`/products/${encodeURIComponent(item.productId)}`} aria-label={`Xem ${item.name}`}>
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt="" />
                    ) : <span className="coffee-symbol" aria-hidden="true">☕</span>}
                  </Link>
                  <div className="cart-item-content">
                    <div className="cart-item-title">
                      <div>
                        <Link href={`/products/${encodeURIComponent(item.productId)}`}><h2>{item.name}</h2></Link>
                        <p>Size {item.size}{item.toppings.length > 0 ? ` · ${item.toppings.map((topping) => topping.name).join(", ")}` : ""}</p>
                      </div>
                      <button className="remove-cart-item" type="button" onClick={() => removeItem(item.key)} aria-label={`Xóa ${item.name}, size ${item.size}`}>
                        Xóa
                      </button>
                    </div>
                    <div className="cart-item-bottom">
                      <div className="quantity-control" aria-label={`Số lượng ${item.name}`}>
                        <button type="button" onClick={() => decreaseQuantity(item.key)} aria-label={`Giảm số lượng ${item.name}`}>−</button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button type="button" onClick={() => increaseQuantity(item.key)} aria-label={`Tăng số lượng ${item.name}`} disabled={item.quantity >= 99}>+</button>
                      </div>
                      <div className="cart-item-prices">
                        <span>Đơn giá {formatter.format(item.unitPrice)}</span>
                        <strong>{formatter.format(item.unitPrice * item.quantity)}</strong>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="cart-summary" aria-label="Tổng kết đơn hàng">
              <h2>Tổng giỏ hàng</h2>
              <p><span>Tạm tính ({totalItems} sản phẩm)</span><strong>{formatter.format(totalPrice)}</strong></p>
              <p className="cart-total"><span>Tổng cộng</span><strong>{formatter.format(totalPrice)}</strong></p>
              <button className="detail-action checkout-disabled" type="button" disabled title="Chức năng đặt hàng thuộc Task 6">
                Thanh toán (chưa khả dụng)
              </button>
              <Link className="continue-shopping" href="/#menu">← Tiếp tục chọn món</Link>
            </aside>
          </div>
        )}
      </main>
      <footer className="footer">
        <div><span className="footer-brand">Brew<span>Lite</span></span><p>Một chút cà phê, một ngày nhiều cảm hứng.</p></div>
        <div className="footer-right"><span>Đồ án học phần Công nghệ phần mềm · Trường Đại học Sài Gòn</span><small>© {new Date().getFullYear()} BrewLite</small></div>
      </footer>
    </div>
  );
}
