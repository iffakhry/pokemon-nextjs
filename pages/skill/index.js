import Head from 'next/head'
import { useEffect, useState } from "react";
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

const SkillList = ({ skillName, id, onClick}) => (
  <li onClick={()=> onClick({id,skillName})} id={id}>{skillName}</li>
)

export default function Home() {
  const [skillsList, setSkillsList] = useState ([]);
//   const [activeIdClick, setActiveIdClick] = useState (null);

  useEffect(() =>{
    const getData = async()=>{
      const response = await fetch('https://pokeapi.co/api/v2/ability');
      const data = await response.json();
      const { results } = data;
      setSkillsList(results);
      console.log("data ", data);
    }
      getData();
  }, [])

  const handleClick = (e) => {
    console.log(e);
    if (e) {
      // setEmotion(e.target.value);
    //   setActiveIdClick(e.id);
      // setPokemonUrlSelected(e.id);
      // setPokemonNameSelected(e.pokemonName);
      console.log("click ",e.id);
      // console.log("nama ",e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <h1 className={styles.title}>
          Skill List
        </h1>
        <ul>
        {skillsList.map((skill) => (
          <SkillList 
            onClick={handleClick}
            key={skill.url} 
            skillName={skill.name}
            id={skill.url}
          />
        )
        )
        }
        </ul>

        
      </div>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
