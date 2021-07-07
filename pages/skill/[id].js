import Head from 'next/head'
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

// const Pokemon = ({ pokemonName, id, onClick}) => (
//   <li onClick={()=> onClick({id,pokemonName})} id={id} >{pokemonName}</li>
// )

const Pokemon = ({ pokemonName, id, url}) => (
  <Link key={id[6]} href={`/pokemon/${id[6]}`} passHref><li>{pokemonName}</li></Link>
)

export default function Home() {
    const [skillName, setSkillName] = useState("-");
    const [pokemonList, setPokemonList] = useState([]);

    const { query } = useRouter();
    const id = query?.id;
    console.log("query", query);

    useEffect(() =>{
        const getData = async()=>{
        const response = await fetch(`https://pokeapi.co/api/v2/ability/${id}`);
        const data = await response.json();
        const { name, pokemon } = data;
        setSkillName(name);
        setPokemonList(pokemon)
        // setPhotos(sprites.front_default);
        console.log("data ", data);
        // console.log("pokemon list ", pokemon_encounters);
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
        console.log("click ",e.id[6]);
        // console.log("nama ",e.target.value);
        }
    };

    return (
        <div className={styles.container}>
        {/* <Image src={photos} alt="imagepokemon" width={500} height={500}/> */}
        <h2>{skillName}</h2>
        <ul>
          {pokemonList.map((pokemon, index) => (
            <Pokemon 
              key={pokemon.pokemon.url} 
              pokemonName={pokemon.pokemon.name}
              id={pokemon.pokemon.url.split("/")} 
              url={pokemon.pokemon.url}
            />
          )
          )
          }
        </ul>

        </div>
    )
}
