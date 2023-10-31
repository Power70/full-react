import React,{ useState } from 'react';
import ReactDOM from 'react-dom/client';
import MapMe from './MapMe';
// import EasyEx from './EasyEx';
// import './index.css';
// import App from './App';

// import StarRating from './StarRating';
// import TextExtender from './TextExtender';

// function Test () {
//   const [movieRating, setMovieRting] = useState(0);
  

//   return(
//     <div>
//       <StarRating color="blue" maxRating={10} onSetRating={setMovieRting} />
//       <p>This movie was rated {movieRating} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* { <StarRating maxRating={5} messages = {["Terrible", "Bad", "Okay", "Good", "Awesome"]}/> } */}
    {/* {<Test />} */}
    {/* <TextExtender /> */}
    {/* <EasyEx /> */}
    <MapMe />
  </React.StrictMode>
);



