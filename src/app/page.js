"use client"

import React, { useEffect, useState } from 'react'
import PetStats from "./components/PetStats";
import PetComponent from "./components/PetComponent";
import { Pet } from './utils/Pet';
const API_URL = 'https://cors-anywhere.herokuapp.com/http://hackaton.corpoeureka.net'



export default function Home() {

  const [pet, setPet] = useState(null)
  const handleCreatePet = async () => {
    try {
      const request = await fetch(`${API_URL}/pet/create`)
      const response = await request.json()
      console.log(response)
      const newPet = new Pet(response.pet_name, response.health, response.mood, response.hunger, response.physical)
      setPet(newPet)

    } catch (err) {
      console.error(err)

    }

  }

  return (
    <div className="w-full min-h-screen flex bg-linear-to-b from-[#FFDEE9] to-[#B5FFFC] font-jersey text-black">
      {pet ? (
        <div className="flex flex-col justify-center items-center w-full  gap-y-4">
          <PetComponent pet={pet} setPet={setPet} handleCreatePet={handleCreatePet} />
        </div>)
        : (<div className="flex flex-col justify-center items-center w-full  gap-y-4">
          <p className="text-5xl text-center text-balance">
            <p className="text-5xl text-center text-balance lg:text-7xl">!Bienvenido a tu mascota virtual!</p>
            <button className="bg-amber-300 rounded-lg px-4 cursor-pointer text-xl py-1 lg:text-4xl lg:px-8 lg:py-2 lg:mt-8" onClick={handleCreatePet}>Crea tu mascota ahora</button>
          </p>
        </div>)
      }    </div>
  );

}
