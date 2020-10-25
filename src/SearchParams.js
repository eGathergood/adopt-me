import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle , WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    // Set animals or empty [] if nothing from API
    setPets(animals || []);
  }

  useEffect(
    () => {
      // initalise
      setBreeds([]);
      setBreed("");

      // API call on breeds for our selected animal (init as dog)
      pet.breeds(animal).then(({ breeds: apiBreeds }) => {
        //Map {breed.name} properrt to breedStrings
        const breedStrings = apiBreeds.map(({ name }) => name);
        setBreeds(breedStrings);
      }, console.error);
    },
    // If any of these change then run the effect
    // only animal is important here but all need to be included.
    [animal, setBreed, setBreeds]
  );

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          ThemeContext
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="firebrick">firebrick</option>
            <option value="darkblue">darkblue</option>
            <option value="pink">pink</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
