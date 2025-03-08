export class Pet {
  constructor(pet_name, health, mood, hunger, physical) {
    this.pet_name = pet_name
    this.health = health,
      this.mood = mood,
      this.hunger = hunger,
      this.physical = physical

  }

  feed(foodSize, setPet) {
    try {
      fetch('https://cors-anywhere.herokuapp.com/https://hackaton.corpoeureka.net/pet/feed', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.pet_name,
          food_value: foodSize,
          mood: this.mood
        })
      })
        .then((res) => res.json())
        .then((data) => {
          this.hunger += data.hunger_mod
          this.mood += data.mood_mod
          setPet({
            pet_name: this.pet_name,
            health: this.health,
            mood: this.mood,
            hunger: this.hunger,
            physical: this.physical
          })
          return data
        })

    } catch (err) {
      console.error(err)
    }
  }

  play(toy, setPet) {
    try {
      fetch('https://cors-anywhere.herokuapp.com/https://hackaton.corpoeureka.net/pet/play', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.pet_name,
          play_with: toy,
          mood: this.mood,
          hunger: this.hunger
        })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          this.hunger += data.hunger_mod
          this.mood += data.mood_mod
          this.physical += data.physical_mod
          setPet({
            pet_name: this.pet_name,
            health: this.health,
            mood: this.mood,
            hunger: this.hunger,
            physical: this.physical
          })
          return data
        })

    } catch (err) {
      console.error(err)
    }
  }
  train(train_tier, setPet) {
    try {
      fetch('https://cors-anywhere.herokuapp.com/https://hackaton.corpoeureka.net/pet/train', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.pet_name,
          train_tier: train_tier,
          mood: this.mood,
          hunger: this.hunger
        })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          this.hunger += data.hunger_mod
          this.mood += data.mood_mod
          this.physical += data.physical_mod
          setPet({
            pet_name: this.pet_name,
            health: this.health,
            mood: this.mood,
            hunger: this.hunger,
            physical: this.physical
          })
          return data
        })

    } catch (err) {
      console.error(err)
    }
  }
  pet(setPet) {
    try {
      fetch('https://cors-anywhere.herokuapp.com/https://hackaton.corpoeureka.net/pet/pet', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.pet_name,
          mood: this.mood,
        })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          this.mood += data.mood_mod
          setPet({
            pet_name: this.pet_name,
            health: this.health,
            mood: this.mood,
            hunger: this.hunger,
            physical: this.physical
          })
          return data
        })

    } catch (err) {
      console.error(err)
    }
  }

  scold(setPet) {
    try {
      fetch('https://cors-anywhere.herokuapp.com/https://hackaton.corpoeureka.net/pet/scold', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.pet_name,
          mood: this.mood,
        })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          this.mood += data.mood_mod
          setPet({
            pet_name: this.pet_name,
            health: this.health,
            mood: this.mood,
            hunger: this.hunger,
            physical: this.physical
          })
          return data
        })

    } catch (err) {
      console.error(err)
    }
  }
  rest(setPet) {
    try {
      fetch('https://cors-anywhere.herokuapp.com/https://hackaton.corpoeureka.net/pet/rest')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)

          this.mood += data.mood_mod
          setPet({
            pet_name: this.pet_name,
            health: this.health,
            mood: this.mood,
            hunger: this.hunger,
            physical: this.physical
          })
          return data
        })

    } catch (err) {
      console.error(err)
    }
  }
}