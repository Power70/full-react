import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import DeleteItem from "../cart/DeleteItem";
import { formatCurrency } from "../../ultilities/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlices";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";


function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  // allow delete button to show only if the item is card
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart(){
    const newItem =  {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex py-24 gap-4">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut? "grayscale opacity-70" : ""}`}/>
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="capitalize italic text-stone-500">{ingredients.join(', ')}</p>

        <div className="mt-auto flex items-center justify-between">

          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p className="text-sm font-medium text-stone-500 uppercase">Sold out</p>}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity 
                currentQuantity={currentQuantity}
                pizzaId={id} />

              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && <Button onClick={handleAddToCart} type="primary">Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
