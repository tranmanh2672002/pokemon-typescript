import React from 'react'
import { Pokemon } from '../../interface';
import './TagPokemon.css';

interface Props {
  pokemon: Pokemon,
}

export const TagPokemon: React.FC<Props> = (props) => {
  const { pokemon } = props;
  return (
    <div className="tag__wrapper">
      <div className="tag__img">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <span className="tag__name">{pokemon.name}</span>
    </div>
  )
}
