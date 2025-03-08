"use client"
import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import useOnlineStatus from '../hooks/useOnlineStatus'
import useApi from '../hooks/useApi'
import RequestQueue from './RequestQueue'
import Animation from './Animation'


const PetComponent = ({ pet, setPet, handleCreatePet }) => {
  const { sendRequest } = useApi();
  const [showStats, setShowStats] = useState()
  const [showActions, setShowActions] = useState()
  const [showAvailableFood, setShowAvailableFood] = useState()
  const [showAvailableToys, setShowAvailableToys] = useState()
  const [showAvailableTrain, setShowAvailableTrain] = useState()
  const [newNotification, setNewNotification] = useState()
  const [showRequestQueue, setShowRequestQueue] = useState(false)
  const [countdown, setCountdown] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showPetDie, setShowPetDie] = useState(false)

  const [isEating, setIsEating] = useState(false);
  const [isScar, setIsScar] = useState(false);



  const handleShowFoodMenu = () => {
    setShowAvailableFood(true)
    setShowActions(false)
    setShowAvailableTrain(false)
    setShowAvailableToys(false)
  }
  const handleShowToysMenu = () => {
    setShowAvailableToys(true)
    setShowActions(false)
    setShowAvailableFood(false)
    setShowAvailableTrain(false)
  }
  const handleShowTrainMenu = () => {
    setShowAvailableTrain(true)
    setShowActions(false)
    setShowAvailableFood(false)
    setShowAvailableToys(false)
  }

  const handleFeedPet = async (foodSize) => {
    setShowAvailableFood(false);
    try {
      const data = await sendRequest('https://cors-anywhere.herokuapp.com/https://hackaton.corpoeureka.net/pet/feed', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pet.pet_name,
          food_value: foodSize,
          mood: pet.mood
        })
      });

      setPet(prevPet => ({
        ...prevPet,
        hunger: Math.min(prevPet.hunger + data.result.hunger_mod, 100),
        mood: Math.min(prevPet.mood + data.result.mood_mod, 100)
      }));
      setNewNotification({
        msg: data.result.msj,
        result: data.result.result,
      })
      setIsEating(true)
      setTimeout(() => {
        setIsEating(false)
        setNewNotification(false)
      }, 3000);

      return data;
    } catch (err) {
      console.error('Fetch error: ', err);
    }
  };
  const handlePlayPet = async (toy) => {
    setShowAvailableToys(false)
    try {
      const data = await sendRequest('https://cors-anywhere.herokuapp.com/https://hackaton.corpoeureka.net/pet/play', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pet.pet_name,
          play_with: toy,
          mood: pet.mood,
          hunger: pet.hunger
        })
      });
      console.log("data", data);

      setPet(prevPet => ({
        ...prevPet,
        hunger: Math.min(prevPet.hunger + data.result.hunger_mod, 100),
        mood: Math.min(prevPet.mood + data.result.mood_mod, 100),
        physical: prevPet.physical + data.result.physical_mod
      }));
      setNewNotification({
        msg: data.result.msj,
        result: data.result.result,
      })
      setIsEating(true)
      setTimeout(() => {
        setIsEating(false)
        setNewNotification(false)
      }, 5000);

      return data;

    } catch (err) {
      console.error('Fetch error: ', err);
    }
  };

  const handleTrainPet = async (train_tier) => {
    setShowAvailableTrain(false);
    try {
      const data = await sendRequest('https://cors-anywhere.herokuapp.com/https://hackaton.corpoeureka.net/pet/train', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pet.pet_name,
          train_tier: train_tier,
          mood: pet.mood,
          hunger: pet.hunger
        })
      });

      console.log("data", data);

      let newHunger = Math.min(pet.hunger + data.result.hunger_mod, 100);
      let newMood = Math.min(pet.mood + data.result.mood_mod, 100);
      let newHealth = pet.health;

      // Restar 1 de vida si hunger o mood se reducen a 0
      if (newHunger <= 0 || newMood <= 0) {
        newHealth = Math.max(pet.health - 1, 0);

      }

      setPet(prevPet => ({
        ...prevPet,
        hunger: newHunger,
        mood: newMood,
        physical: prevPet.physical + data.result.physical_mod,
        health: newHealth
      }));
      setNewNotification({
        msg: data.result.msj,
        result: data.result.result,
      });
      setIsEating(true)
      setTimeout(() => {
        setIsEating(false)
        setNewNotification(false);
      }, 5000);

      if (newHealth == 0) {
        setShowPetDie(true)
      }

      return data;

    } catch (err) {
      console.error('Fetch error: ', err);
    }
  };

  const handlePetPet = async () => {
    try {
      const data = await sendRequest('https://cors-anywhere.herokuapp.com/https://hackaton.corpoeureka.net/pet/pet', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pet.pet_name,
          mood: pet.mood,
        })
      });

      console.log("data", data);

      setPet(prevPet => ({
        ...prevPet,
        mood: Math.min(prevPet.mood + data.result.mood_mod, 100)
      }));

      setNewNotification({
        msg: data.result.msj,
        result: data.result.result,
      })
      setIsEating(true)
      setTimeout(() => {
        setIsEating(false)
        setNewNotification(false)
      }, 5000);
      return data;


    } catch (err) {
      console.error('Fetch error: ', err);
    }
  };
  const handleScoldPet = async () => {
    try {
      const data = await sendRequest('https://cors-anywhere.herokuapp.com/https://hackaton.corpoeureka.net/pet/scold', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pet.pet_name,
          mood: pet.mood,
        })
      });

      console.log("data", data);

      setPet(prevPet => ({
        ...prevPet,
        mood: Math.min(prevPet.mood + data.result.mood_mod, 100)
      }));

      setNewNotification({
        msg: data.result.msj,
        result: data.result.result,
      })
      setIsScar(true)
      setTimeout(() => {
        setIsScar(false)
        setNewNotification(false)
      }, 5000);
      return data;

    } catch (err) {
      console.error('Fetch error: ', err);
    }
  };
  const handleRestPet = async () => {
    try {
      const data = await sendRequest('https://cors-anywhere.herokuapp.com/https://hackaton.corpoeureka.net/pet/rest', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("data", data);

      setPet(prevPet => ({
        ...prevPet,
        mood: Math.min(prevPet.mood + data.mood_mod, 100)
      }));

      setNewNotification({
        msg: data.msj,
        result: "success",
      })
      setTimeout(() => {
        setNewNotification(false)
      }, 3000);

      setCountdown(data.rest_time);
      setIsRunning(true);
      return data;



    } catch (err) {
      console.error('Fetch error: ', err);
    }
  };

  const handleStopTimer = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    const reduceHungerInterval = setInterval(() => {
      setPet(prevPet => {
        const randomHungerReduction = Math.floor(Math.random() * 21) + 5; // 5 a 25
        let newHunger = Math.max(prevPet.hunger - randomHungerReduction, 0);
        let newHealth = prevPet.health;

        if (newHunger <= 0) {
          newHealth = Math.max(prevPet.health - 1, 0);
        }
        if (newHealth == 0) {
          setShowPetDie(true)
        }

        return {
          ...prevPet,
          hunger: newHunger,
          health: newHealth,
        };
      });

    }, 60000); // 60000 ms = 1 minuto

    // Cleanup interval on component unmount
    return () => clearInterval(reduceHungerInterval);
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => Math.max((prevCountdown - 1).toFixed(2), 0));
      }, 1000);
    } else if (countdown === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, countdown]);

  const isOnline = useOnlineStatus()
  console.log(isOnline)

  return (
    <div className='w-full flex flex-col px-8 min-h-screen items-center h-full justify-center py-4'>
      {newNotification && (<Notification notification={newNotification} />)}
      {isRunning && (
        <>
          <div className='absolute w-full h-full min-h-screen z-20 mx-auto bg-black top-0 left-0 opacity-30'>
          </div>
          <div className='absolute bg-amber-300 text-xl text-black z-60 rounded-xl px-2 py-6 flex flex-col items-center justify-center w-72'>
            <p className='text-4xl text-balance text-center'>!Tu mascota está durmiendo¡</p>
            <button className='bg-red-500 text-xl px-4 py-1 rounded-xl text-white mt-4 ' onClick={handleStopTimer}>Detener temporizador</button>
            <p className='text-red-600 mt-2 text-2xl text-center'>Cuenta regresiva: {countdown !== null ? countdown : "No iniciado"}</p>
          </div>
        </>)}
      {showPetDie && (
        <>
          <div className='absolute w-full min-h-screen z-20 mx-auto bg-black top-0 left-0 opacity-30 '>
          </div>
          <div className='absolute bg-amber-300 text-xl text-black z-60 rounded-xl px-2 py-6 flex flex-col items-center justify-center w-72'>
            <p className='text-5xl text-balance text-center'>!Tu mascota Ha Muerto ¡</p>
            <button className='bg-green-500 text-xl px-4 py-1 rounded-xl text-white mt-4 ' onClick={() => {
              handleCreatePet()
              setShowPetDie(false)
            }}>Crear otra mascota</button>
          </div>
        </>
      )}
      {isOnline ? (
        <>
          <div className='absolute z-20 mx-auto top-0 right-0 rounded-lg mt-2 mr-2'>
            <p className='text-green-600 text-xl bg-amber-300 px-4 rounded-lg'>Estas conectado a internet</p>
          </div>
        </>
      ) : (<>
        <div className='absolute z-20 mx-auto top-0 right-0 rounded-lg mt-2 mr-2 flex flex-col'>
          <p className='text-red-500 text-xl bg-amber-300 px-4 rounded-lg'>Estas desconectado de la red</p>
          <button className='bg-blue-500 text-white' onClick={() => setShowRequestQueue(true)}>Mostrar cola de solicitudes</button>
        </div>
      </>)}
      {!isOnline && showRequestQueue && (<RequestQueue />)
      }
      <p className="text-center text-5xl pb-4">{pet.pet_name}</p>
      <div className='relative flex flex-col items-center'>
        {isEating && (<Animation action="eating" />)}
        {isScar && (<Animation action="scar" />)}
        <img src='slime_monster_preview.png' className='z-10 w-40 flex' />
        <div className='absolute top-4/12 s z-1 bg-black opacity-15 w-34 h-14 rounded-full '>

        </div>
      </div>
      <div className='w-full flex justify-center items-center gap-x-8 px-4 py-2'>
        <button className='bg-amber-800 rounded-lg px-4 text-emerald-50 text-2xl cursor-pointer' onClick={() => { showStats ? setShowStats(false) : setShowStats(true), setShowActions(false), setShowAvailableFood(false) }}>Estadisticas</button>
        <button className='bg-amber-800 rounded-lg px-4 text-emerald-50 text-2xl cursor-pointer' onClick={() => { showActions ? setShowActions(false) : setShowActions(true), setShowStats(false), setShowAvailableFood(false), setShowAvailableToys(false), setShowAvailableTrain(false) }}>Acciones</button>
      </div>
      {showStats && (<ul className='flex flex-col px-4 w-full gap-y-2 bg-amber-400 rounded py-4 max-w-3xs mx-auto'>
        <li className='text-red-600 flex flex-col text-lg'>
          <div className='flex justify-between'>
            <p>Salud</p>
            <p>{pet.health}/24</p>
          </div>
          <progress value={pet.health} max={24} className='"[&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full   [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-red-500 [&::-moz-progress-bar]:bg-violet-400"' />
        </li>
        <li className='text-violet-600 flex flex-col text-lg'>
          <div className='flex justify-between'>
            <p>Mood</p>
            <p>{pet.mood}/100</p>
          </div>

          <progress value={pet.mood} max={100} className='"[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-violet-600 [&::-moz-progress-bar]:bg-violet-400"' />
        </li>
        <li className='text-amber-800 flex flex-col text-lg'>
          <div className='flex justify-between'>
            <p>Hambre</p>
            <p>{pet.hunger}/100</p>
          </div>
          <progress value={pet.hunger} max={100} className='"[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-amber-800 [&::-moz-progress-bar]:bg-violet-400"' />
        </li>
        <li className='text-blue-600 flex flex-col text-lg'>
          <div className='flex justify-between'>
            <p>Condicion Física</p>
            <p>{pet.physical}</p>
          </div>
          <progress value={pet.physical} className='"[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-blue-500 [&::-moz-progress-bar]:bg-violet-400"' />
        </li>
      </ul>)}
      {showActions && (
        <ul className='grid grid-cols-2 gap-x-4 gap-y-4 text-lg place-content-center place-items-center px-4 mt-2 max-w-3xs mx-auto'>
          <li className='bg-amber-300 w-24 text-center text-xl rounded-lg py-1' onClick={handleShowFoodMenu}>Alimentar</li>
          {isOnline && (
            <>
              <li className='bg-amber-300 w-24 text-center px-2 text-lg rounded-lg py-1' onClick={handleShowToysMenu}>Jugar</li>
              <li className='bg-amber-300 w-24 text-center px-2 text-lg rounded-lg py-1' onClick={handleShowTrainMenu}>Entrenar</li>
            </>
          )}

          <li className='bg-amber-300  w-24 text-center px-2 text-lg rounded-lg py-1' onClick={handlePetPet}>Acariciar</li>
          <li className='bg-amber-300 w-24 text-center px-2 text-lg rounded-lg py-1' onClick={handleScoldPet}>Regañar</li>
          <li className='bg-amber-300 w-24 text-center px-2 text-lg rounded-lg py-1' onClick={handleRestPet}>Descansar</li>
        </ul>
      )}
      {showAvailableFood && (
        <div className='flex flex-col'>
          <h2 className='text-black text-3xl text-balance text-center'>¿Con que quieres alimentar a tu mascota?</h2>
          <ul className='flex items-center justify-center w-full gap-x-4 mt-4'>
            <li className='bg-amber-200 rounded-full px-3 py-2 border border-amber-700 cursor-pointer' onClick={() => { handleFeedPet("sm") }}>
              <img src='./manzana.png' />
            </li>
            <li className='bg-amber-200 rounded-full px-3 py-2 border border-amber-700 cursor-pointer' onClick={() => { handleFeedPet("md") }}>
              <img src='./pollo.png' />
            </li>
            <li className='bg-amber-200 rounded-full px-3 py-2 border border-amber-700 cursor-pointer'
              onClick={() => { handleFeedPet("bg") }}>
              <img src='./pescado.png' />
            </li>

          </ul>
        </div>
      )
      }
      {showAvailableToys && (
        <div className='flex flex-col'>
          <h2 className='text-black text-3xl text-balance text-center'>¿Con que quieres que juegue tu mascota?</h2>
          <ul className='flex items-center justify-center w-full gap-x-4 mt-4'>
            <li className='bg-amber-200 rounded-full px-3 py-2 border border-amber-700 cursor-pointer' onClick={() => { handlePlayPet("ball") }}>
              <img src='./arco.png' />
            </li>
            <li className='bg-amber-200 rounded-full px-3 py-2 border border-amber-700 cursor-pointer' onClick={() => { handlePlayPet("hide") }}>
              <img src='./mazo.png' />
            </li>
            <li className='bg-amber-200 rounded-full px-3 py-2 border border-amber-700 cursor-pointer'
              onClick={() => { handlePlayPet("draw") }}>
              <img src='./moneda.png' />
            </li>

          </ul>
        </div>
      )
      }
      {showAvailableTrain && (
        <div className='flex flex-col'>
          <h2 className='text-black text-3xl text-balance text-center'>¿Con que quieres entrenar tu mascota?</h2>
          <ul className='flex items-center justify-center w-full gap-x-4 mt-4'>
            <li className='bg-amber-200 rounded-full px-3 py-2 border border-amber-700 cursor-pointer' onClick={() => { handleTrainPet("lw") }}>
              <img src='./pala.png' />
            </li>
            <li className='bg-amber-200 rounded-full px-3 py-2 border border-amber-700 cursor-pointer' onClick={() => { handleTrainPet("md") }}>
              <img src='./pico.png' />
            </li>
            <li className='bg-amber-200 rounded-full px-3 py-2 border border-amber-700 cursor-pointer'
              onClick={() => { handleTrainPet("st") }}>
              <img src='./libro.png' />
            </li>

          </ul>
        </div>
      )
      }
    </div >
  )
}

export default PetComponent
