import { createContext, useCallback, useContext, useEffect, useReducer, useState,} from "react";
import City from "../Components/City";

// firest create the context context component 
// secodly create the provider component 
// thirdly consume the provider component

const BASE_URL = "http://localhost:8000";
// 1
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
}

function reducer(state, action){
  switch(action.type){
    case "loading":
      return{
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return{
        ...state, 
        isLoading: false,
        cities: action.payload,
      };

      case "city/loaded":
      return{
        ...state,
        isLoading: false,
        currentCity: action.payload,
      }

    case "city/created":
      // add new city using reducer
      return{
        ...state,
        isLoading: false,
        // allow the new city that will be added to be in sync with the remote state
        // this code will add a new city to the UI
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }

    case "city/deleted":
      return{
        // delete city using reducer
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      }

    case "rejected":
      return{
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default: 
    throw new Error("Uknown action type");
  }
}

// 2
function CitiesProvider({children}){
  const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState)
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});


  useEffect(function(){
    async function fetchCities(){
      dispatch({type: "loading"});

      try{
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({type: "cities/loaded", payload: data})
      }
      catch{
        dispatch ({ type: 'rejected', payload: 'There was an error loading cities...'});
      }
      // finally{
      //   setIsLoading(false);
      // }
    }
    fetchCities();
    
  }, []);  

  const getCity = useCallback(async function getCity(id){
    
    // check if the city we want to load is already the curreent city
    if(Number(id) === currentCity.id) return;

    dispatch({type: "loading"});  
      try{
        // setIsLoading(true);   
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({type: "city/loaded", payload: data})
        // setCurrentCity(data);
      }
      catch{
        dispatch ({ type: 'rejected', payload: 'There was an error loading the city...'});
      }
  }, [currentCity.id]);

  async function createCity(newCity){
    dispatch({type: "loading"});
    try{
      // This is standard way of creatng a post request to an api
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'Post',
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
    dispatch({type: "city/created", payload: data})
    //   console.log(data)
    //  setCities((cities) => [...cities, data]);
    }
    catch{
      dispatch ({ type: 'rejected', payload: 'There was an error creating city...'});
    }
}

async function deleteCity(id){
  dispatch({type: "loading"});
  try{
    // setIsLoading(true);

    // This is standard way of creatng a post request to an api
     await fetch(`${BASE_URL}/cities/${id}`, {
      method: 'DELETE',
    });
    dispatch({type: "city/deleted", payload: id})
    // delete the city from the the state
  //  setCities((cities) => cities.filter((City) => City.id !== id));
  // }
  } catch{
    dispatch ({ type: 'rejected', payload: 'There was an error deleting the city...'});
  }
  // finally{
  //   setIsLoading(false);
  // }

}
  return(
    <CitiesContext.Provider 
    value={{
      cities, 
      isLoading, 
      currentCity,
      error,
      getCity,
      createCity,
      deleteCity,
      }}>
    {children}
  </CitiesContext.Provider>
  ); 
} 

function useCities (){
  // 3
  // use need to specify to react which contentext you wan to use in this case is the citiesContext
    const context = useContext(CitiesContext);
    // check if you're trying to access the value of the context where you should'nt
    if(context === undefined) throw new Error ("citiesContext was used outside the Citiesprovider");
    return context; 
}

export {CitiesProvider, useCities};