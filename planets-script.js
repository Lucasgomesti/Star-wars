let currentPageUrl ='https://swapi.dev/api/planets/'

window.onload = async () =>{
    try{
        await loadCharacters(currentPageUrl);
    } catch (error){
        console.log(error);
        alert('Erro ao carregar Cards');
    }

    const nextButton = document.getElementById ('next-button')
    const backButton = document.getElementById ('back-button')

    nextButton.addEventListener ('click', loadNextPage)
    backButton.addEventListener ('click', loadPreviousPage)
};

async function loadCharacters (url){
    const mainContent = document.getElementById('main-content') ; // vai manipular os elementos da variavel pelo id dos cards 
    mainContent.innerHTML = ''; // limpar os resultados anteriores

    try{
        const response = await fetch (url)
        const responseJson = await response.json ()

        responseJson.results.forEach((character) => { // forEach irá para fazer um loop em todas as propriedades do objeto Json  
            const card = document.createElement ("div") // Isso ira criar um elemento tag HTML: ex div, h2 e outros          
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/planets/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const characterNameBg = document.createElement ("div")
            characterNameBg.className = "character-name-bg"

            const characterName = document.createElement ("div")
            characterName.className = "character-name"
            characterName.innerText = `${character.name.toLowerCase()}` // modifica o conteúdo de texto desse elemento

            characterNameBg.appendChild (characterName) // appendchind insere um elemento filho dentro deste elemento pai
            card.appendChild (characterNameBg)
  
            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility ="visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = '' // isso vai limpar todo conteúdo dentro de modalContent
                
                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage =
                `url('https://starwars-visualguide.com/assets/img/planets/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${character.name.toLowerCase()}`

                const height = document.createElement("span")
                height.className = "character-details"
                height.innerText = `Rotacao: ${covertHeight (character.rotation_period)}`

                const mass = document.createElement("span")
                mass.className = "character-details"
                mass.innerText = `Diametro: ${convertMass (character.diameter)}`

                const eyeColor = document.createElement("span")
                eyeColor.className = "character-details"
                eyeColor.innerText = `clima: ${convertEyeColor (character.climate)}`

                const birthYear = document.createElement("span")
                birthYear.className = "character-details"
                birthYear.innerText = `Populacao: ${convertBirthYear (character.population)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(height)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)
            }

            mainContent.appendChild (card)
        });

        const nextButton = document.getElementById ('next-button')
        const backButton = document.getElementById ('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url

    } catch (error){
        alert('Erro ao carregar os personagens');
        console.log(error);
        
    }
}

async function loadNextPage () {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log (error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage (){
    if(!currentPageUrl) return;

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters (responseJson.previous)

    } catch (error) {
        console.log (error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertEyeColor (eyeColor){
    const cores = {
    arid: "arido",
    temperate: "moderado",
    tropical: " moderado,tropical",
    frozen: "congelado",
    murky: "sombrio",
    hot: "quente",
    frigid: "gelado",
    artificialtemperate: "temperatura artificial",
    humid: "humido",
    unknown: "desconhecido",
    };

    return cores [eyeColor.toLowerCase()] || eyeColor;
}

function covertHeight (height){
    if (height === "unknown") {
    return "desconhecido"
    }

    return `${height} dias`;
}

function convertMass (mass) {
    if (mass === "unknown") {
    return "desconheido"
    }

    return `${mass} kg`;
}

function convertBirthYear (birthYear) {
    if (birthYear === "unknown") {
    return "desconheido"
    }

    return birthYear;
}

