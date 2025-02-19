const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=10"

//1a
const getPokemon = () => {
    const links = `${baseUrl}/users`
    fetch(links)
    .then((response) => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
    })
    .then((dataJSON) => {
        console.log(dataJSON.results)
    })
    .catch((err) => {
        if(err instanceof Error) console.log(err.message)
    })
}
// getPokemon()

//1b
const getAbilities = () => {
    const links = `${baseUrl}/users`
    fetch(links)
    .then((response) => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
    })
    .then((dataJSON) => {
        const dataPoke = dataJSON.results
        dataPoke.forEach((el) => {
            fetch(el.url)
            .then((abilityResponse) => {
                if (!abilityResponse.ok) throw new Error(abilityResponse.statusText)
                return abilityResponse.json()
            })
            .then((linkAbilities) => {
                const dataPokemon = linkAbilities.abilities
                console.log(dataPokemon)
            })
        })
    })
    .catch((err) => {
        if(err instanceof Error) console.log(err.message)
    })
}
// getAbilities()

//1c
const arrPokemon = () => {
    const links = `${baseUrl}/users`
    fetch(links)
    .then((response) => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
    })
    .then((dataJSON) => {
        const dataPoke = dataJSON.results
        return Promise.all(
            dataPoke.map((el) =>
                fetch(el.url)
                    .then((abilityResponse) => {
                        if (!abilityResponse.ok) throw new Error(abilityResponse.statusText);
                        return abilityResponse.json();
                    })
                    .then((linkAbilities) => ({
                        name: el.name,
                        abilities: linkAbilities.abilities.map((i) => i.ability.name),
                    }))
            )
        );
    })
    .then((pokemonData) => {
        console.log(pokemonData);
    })
    .catch((err) => {
        if (err instanceof Error) console.log(err.message);
    });
};
arrPokemon()

