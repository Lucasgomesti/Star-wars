let currentPageUrl ='https://swapi.dev/api/people/'

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
            `url('./assets/${character.url.replace(/\D/g, "")}.jpg')`
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
                `url('./assets/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${character.name.toLowerCase()}`

                const height = document.createElement("span")
                height.className = "character-details"
                height.innerText = `Altura: ${covertHeight (character.height)}`

                const mass = document.createElement("span")
                mass.className = "character-details"
                mass.innerText = `peso: ${convertMass (character.mass)}`

                const eyeColor = document.createElement("span")
                eyeColor.className = "character-details"
                eyeColor.innerText = `cor dos olhos: ${convertEyeColor (character.eye_color)}`

                const birthYear = document.createElement("span")
                birthYear.className = "character-details"
                birthYear.innerText = `Nascimento: ${convertBirthYear (character.birth_year)}`

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
    blue: "azul",
    green: "verde",
    yellow: " amarelo",
    red: "vermelho",
    brown: "castanho",
    pink: "rosa",
    orange: "laranja",
    black: "preto",
    hazel: "avela",
    unknown: "desconhecido",
    };

    return cores [eyeColor.toLowerCase()] || eyeColor;
}

function covertHeight (height){
    if (height === "unknown") {
    return "desconhecido"
    }

    return (height / 100).toFixed(2);
}

function convertMass (mass) {
    if (mass === "unknown") {
    return "desconhecido"
    }

    return `${mass} kg`;
}

function convertBirthYear (birthYear) {
    if (birthYear === "unknown") {
    return "desconhecido"
    }

    return birthYear;
}