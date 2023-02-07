import './App.css';
import { useState, useEffect } from 'react';
import { Pokemon, Pokemons } from './interface';
import axios from 'axios';
import { TagPokemon } from './components/TagPokemon';

const App: React.FC = () => {
  const [listPokemon, setListPokemon] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      const pokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`);
      console.log(pokemons);
      setNextUrl(pokemons.data.next);

      pokemons.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setListPokemon((p) => [...p, poke.data,]);
      });
    };
    getData();
  }, [])

  // console.log(listPokemon);

  const handleClickLoading = async () => {
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setListPokemon((p) => [...p, poke.data,]);
    })
  }

  return (
    <div className="App">
      <div className="header">Pokemon</div>
      <div className="content">
        {listPokemon?.map((pokemon, index) => {
          return <TagPokemon key={index} pokemon={pokemon} />
        })}
      </div>
      <div className="btn-load">
        <button className='btn' onClick={handleClickLoading}>Load more</button>
      </div>
    </div>
  );
}

export default App;
