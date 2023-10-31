import { useEffect, useState } from "react";

export default function EasyEx (){
  const [enteredAmount, setEnteredAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(function(){
    async function fetchConverter(){

      setIsLoading(true);

      const res = await fetch(`https://api.frankfurter.app/latest?amount=${enteredAmount}&from=${fromCurrency}&to=${toCurrency}`);

      const data = await res.json();
      console.log(data)

      setConvertedAmount(data.rates[toCurrency]);

      setIsLoading(false);
      
    }
    if(fromCurrency === toCurrency) return setConvertedAmount(enteredAmount);
      fetchConverter();

  }, [enteredAmount, fromCurrency, toCurrency]);
  return(
    <div>
        <input type="text" 
        value={enteredAmount}
        onChange={(e) => setEnteredAmount(Number(e.target.value))}
        disabled={isLoading}
         />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} disabled={isLoading}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} disabled={isLoading}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p>${convertedAmount} ${toCurrency}</p>
      </div>
  );
}