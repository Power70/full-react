import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCardPrice, getTotalCardQuantity } from "./cartSlices";
import {formatCurrency} from "../../ultilities/helpers"

function CartOverview() {
  const totalCardQuantity = useSelector(getTotalCardQuantity);
  const totalCardPrice = useSelector(getTotalCardPrice);

  if(!totalCardQuantity) return null;


  return (
    <div
      className="flex items-center justify-between 
      bg-stone-800 px-4 py-4 text-sm
      font-semibold uppercase text-stone-200 sm:px-6 md:text-base"
    >
      <p className="text-tone-300 space-x-4 font-semibold sm:space-x-6">
        <span>{totalCardQuantity} pizzas</span>
        <span>{formatCurrency(totalCardPrice)}</span>
      </p>
      <Link to="/cart"> Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
