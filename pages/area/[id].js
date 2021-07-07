import Head from 'next/head'
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

const Pokemon = ({ pokemonName, id, onClick}) => (
  <li onClick={()=> onClick({id,pokemonName})} id={id} >{pokemonName}</li>
)

// const Pokemon = ({ pokemonName, id, url}) => (
//   <Link key={id} href={`pokemon/${id}`} passHref><p>{pokemonName}</p></Link>
// )

export default function Home() {
    const [areaName, setAreaName] = useState();
    const [pokemonList, setPokemonList] = useState([]);

    const { query } = useRouter();
    const id = query?.id;
    console.log("query", query);

    useEffect(() =>{
        const getData = async()=>{
        const response = await fetch(`https://pokeapi.co/api/v2/location-area/${id}`);
        const data = await response.json();
        const { name, pokemon_encounters } = data;
        setAreaName(name);
        setPokemonList(pokemon_encounters)
        // setPhotos(sprites.front_default);
        console.log("data ", data);
        console.log("pokemon list ", pokemon_encounters);
        }
        if (id) {
            // handle ketika id undefined
            getData();
          }
    }, [id])

    const handleClick = (e) => {
        console.log(e);
        if (e) {
        // setEmotion(e.target.value);
        // setActiveIdClick(e.id);
        // setPokemonUrlSelected(e.id);
        // setPokemonNameSelected(e.pokemonName);
        console.log("click ",e.id);
        // console.log("nama ",e.target.value);
        }
    };

    return (
        <div className={styles.container}>
        {/* <Image src={photos} alt="imagepokemon" width={500} height={500}/> */}
        <p>{areaName}</p>
        {pokemonList.map((pokemon, index) => (
          <Pokemon 
            onClick={handleClick}
            key={pokemon.pokemon.url} 
            pokemonName={pokemon.pokemon.name}
            id={pokemon.pokemon.url}
        />
        )
        )
        }

        </div>
    )
}
