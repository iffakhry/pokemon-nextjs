import Head from 'next/head'
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

const Pokemon = ({ pokemonName, classActiveId, id, onClick}) => (
  <li onClick={()=> onClick({id,pokemonName})} id={id} className={classActiveId === id ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action false" }>{pokemonName}</li>
)

// const Pokemon = ({ pokemonName, id, url}) => (
//   <Link key={id} href={`pokemon/${id}`} passHref><p>{pokemonName}</p></Link>
// )

const myLoader = ({ src, width, quality }) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
  }
  
  const MyImage = (props) => {
    return (
      <Image
        loader={myLoader}
        src="me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
    )
  }

export default function Home() {
    const [pokemonName, setPokemonName] = useState([]);
    const [photoUrl, setPhotoUrl] = useState("/vercel.svg");

    const { query } = useRouter();
    const id = query?.id;
    console.log("query", query);

    useEffect(() =>{
        const getData = async()=>{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        const { name , abilities, sprites } = data;
        setPokemonName(name);
        setPhotoUrl(sprites.front_default);
        console.log("data ", data);
        console.log("photo ", sprites.front_default);
        console.log("photoUrl ", photoUrl);
        }
        if (id) {
            // handle ketika id undefined
            getData();
          }
    }, [id, photoUrl])

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
        <h3>{pokemonName}</h3>
        <Image src={photoUrl} alt="imagepokemon" width={200} height={200}/>

        </div>
    )
}
