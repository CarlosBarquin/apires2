import Slots from '@/components/Slots'
import Medic from '@/components/Medic'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {

  const [dni2 , setDni2]=  useState<string>("")
  const [dni , setDni]=  useState<string>("")


  return (
    <>
      <h1>MEDICO: </h1>
      <input type="text" placeholder="nombre" onChange={(e)=> setDni2(e.target.value)}></input>
      <Link href={`/medic/${dni2}`}>
        <button>entrar</button>
      </Link>

      <h1>PACIENTE: </h1>
      <input type="text" placeholder="DNI" onChange={(e)=> setDni(e.target.value)}></input>
      <Link href={`/pacient/${dni}`}>
        <button>entrar</button>
      </Link>
           
    </>
  )
}
