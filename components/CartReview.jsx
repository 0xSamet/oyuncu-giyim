import CartReviewListItem from "./CartReviewListItem";
import { useDispatch } from "react-redux";
import GoBackIcon from "../public/icons/go-back.svg";
import WalletIcon from "../public/icons/wallet.svg";

export default function CartReview() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="cart-review">
        <div className="cart-review-top">
          <span className="cart-review-title">Sepetiniz</span>
          <span
            className="cart-review-go-back"
            onClick={() => {
              dispatch({
                type: "CLEAN_MODALS",
              });
            }}
          >
            <GoBackIcon />
          </span>
        </div>
        <ul className="products">
          <CartReviewListItem productId={1} />
          <CartReviewListItem productId={2} />
          <CartReviewListItem productId={3} />
          <CartReviewListItem productId={4} />
          <CartReviewListItem productId={5} />
          <CartReviewListItem productId={6} />
          <CartReviewListItem productId={1} />
          <CartReviewListItem productId={2} />
          <CartReviewListItem productId={3} />
          <CartReviewListItem productId={4} />
          <CartReviewListItem productId={5} />
          <CartReviewListItem productId={6} />
        </ul>
      </div>
      <div className="cart-review-status">
        <span className="cart-review-continue">
          <span className="cart-review-icon">
            <GoBackIcon />
          </span>
          Alışverişe Devam Et
        </span>
        <div className="cart-review-price-wrapper">
          <span className="cart-review-price-text">Toplam Fiyat</span>
          <span className="cart-review-price">100&#8378;</span>
        </div>
        <span className="cart-review-checkout">
          <span className="cart-review-icon">
            <WalletIcon />
          </span>
          Ödemeye Geç
        </span>
      </div>
    </>
  );
}
