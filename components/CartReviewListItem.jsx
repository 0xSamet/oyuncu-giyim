import CancelIcon from "../public/static/icons/cancel.svg";
import ArrowIcon from "../public/static/icons/arrow.svg";
import PlusIcon from "../public/static/icons/plus.svg";
import MinusIcon from "../public/static/icons/minus.svg";

export default function CartReviewListItem({ productId }) {
  return (
    <li className="product">
      <div className="product-image">
        <img src={`/static/products/valorant-sweat-${productId}.jpg`} />
      </div>
      <div className="product-informations">
        <h3 className="product-name">Valorant Sweat Gri</h3>
        <span className="product-price">
          99.90&#8378; <span className="old-price">129.90&#8378;</span>
        </span>
      </div>
      <div className="product-piece-wrapper">
        <span className="product-piece-up">
          <PlusIcon />
        </span>
        <span className="product-piece">
          <input type="text" defaultValue={1} />
        </span>
        <span className="product-piece-down">
          <MinusIcon />
        </span>
      </div>
      <div className="product-remove-btn">
        <CancelIcon />
      </div>
    </li>
  );
}
