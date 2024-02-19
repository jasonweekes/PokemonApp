import './App.css';
import useAxios from './hooks/useAxios';
import React, { useState } from 'react';

function App() {
  const [pokemonInput, setPokemonInput] = useState("")
  const [setUrl, data, loading, setLoading, error] = useAxios()
  
  function handleOnSubmit(e){
    // prevent from refreshing the page
    e.preventDefault()
     // Lowercase the input before setting the URL
     const lowercaseInput = pokemonInput.toLowerCase();
     setUrl(`https://pokeapi.co/api/v2/pokemon/${lowercaseInput}`);
     setLoading(true);
   }

  //. total chain of events
  // 1. A user types into the search bar(tracked by a state varialbe)
  // 2. user submits the text
  // 3. onSubmit, the text gets placed in a URL, and sent to useAxios. setLoading(true)
  // to trigger the userEffect on the useAxios side
  // 4. useAsios performs a GET request to the submitted URL. It return with `data`, `loading`, and `error` based on success/failure
  // 5. Back on the component side, the the `data` is rendered (!loading && data)
  
  return (
    <div className="App">
      <h1>This is now a Shiny Pokemon Search App!</h1>
      <form onSubmit={handleOnSubmit}>
        <input
        type="text"
        onChange={(e) => setPokemonInput(e.target.value)}
        />
        <button
        type="submit"
       >
        submit
        </button>
      </form>
      
      {!loading && data &&
      <div>
       <h1> My shiny {data.name}</h1>
       <h2>PokedexNo: {data.id}</h2>
       <img src = {data.sprites.other.home.front_shiny} alt={data.name}/>
       {/* {To use for adding video} */}
       {/* <video width="600" height="400" controls>
            <source src={videoUrl} type="video/mp4"/>
          </video>
       */}
       
      </div> 
      }
    </div>
  );
}

export default App;
