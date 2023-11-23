import Spinner from './Spinner';
import styles from './CountryList.module.css';
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from '../Contexts/CitiesContext';

function CountryList() {
    const {cities, isLoading} = useCities();
    if (isLoading ) return <Spinner />;

    if (!cities.length)  
        return(
            <Message message="Add your first country by clicking on a country on the map" />
        );
        // to render list of country/and to create a new arr where the city name is unique
    const countries = cities.reduce((arr, city) => {
        if(!arr.map((el) => el.country).includes(city.country))
        // if the current country is not in the arr we are creating here 
        // return a new arr that will contain all current el and a new one
        return [...arr, {country: city.country, emoji: city.emoji}];
    else return arr; 
    }, []);
    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (<CountryItem country={country} key={country.country}/>)) }
        </ul>
    );

}

export default CountryList;

