// Test ID: IIDSAT
import { useFetcher, useLoaderData } from "react-router-dom";
import OrderItem from "./OrderItem"
import { getOrder } from "../../services/apiRestaurant";
import { calcMinutesLeft, formatCurrency, formatDate } from "../../ultilities/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";




function Order() {
  const order = useLoaderData();
  // if you want to fetch something in another route without using usenavigate 
  // we make use of the useFetcher hook
  const fetcher = useFetcher();

  // to use the data as the component mount 
  // we use the use effect hook and call our fetcher on inside it
  //  then on our fetcher we call the load and pass the route into it
  useEffect(function(){
    if(!fetcher.data && fetcher.state === "idle")fetcher.load("/menu")
  }, [fetcher]);
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-semibold text-xl">Order # {id} status</h2>

        <div className="space-x-2">
          {priority && <span className="rounded-full text-red-50 bg-red-500 py-1 px-3 font-semibold uppercase tracking-wide">Priority</span>}
          <span className="rounded-full text-green-50 bg-green-500 py-1 px-3 font-semibold uppercase tracking-wide">{status} order</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => 
          (<OrderItem 
          item={item} 
          key={item.pizzaId}
          isLoadingIngredients={fetcher.state === "loading"}
          ingredients={
            fetcher?.data?.find((el) => el.id === item.pizzaId)?.ingredients ?? []
          }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({params}){
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
