document.addEventListener("DOMContentLoaded", async function () {
  const baseUrl = "https://rickandmortyapi.com/api/"
  let modalOpen = false // Variable to track if modal is open
  let page = 1
  const totalPages = 42 // Total pages according to the API documentation
  let characters = []

  function fetchData(url) {
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching data:", error))
  }

  function displayCharacters(characters) {
    const mainContent = document.getElementById("main-content")

    characters.forEach((character) => {
      const characterCard = document.createElement("div")
      characterCard.classList.add("character-card")

      const characterImage = document.createElement("img")
      characterImage.src = character.image

      const characterName = document.createElement("h2")
      characterName.textContent = character.name

      // Add click event listener to open modal
      characterCard.addEventListener("click", () => {
        if (!modalOpen) {
          displayCharacterDetails(character)
        } else {
          closeModal() // Close currently open modal
          displayCharacterDetails(character)
        }
      })

      characterCard.appendChild(characterImage)
      characterCard.appendChild(characterName)

      mainContent.appendChild(characterCard)

      
    })

    
  }

  

  function displayCharacterDetails(character) {
    // Create modal card content
    const modalCard = document.createElement("div")
    modalCard.classList.add("modal-card")

    const characterImage = document.createElement("img")
    characterImage.src = character.image

    const textContainer = document.createElement("div")
    textContainer.classList.add("text-container")

    const characterName = document.createElement("h2")
    characterName.textContent = character.name

    textContainer.appendChild(characterName)

    const status = document.createElement("p")
    status.textContent = "Status: " + character.status

    const species = document.createElement("p")
    species.textContent = "Species: " + character.species

    const gender = document.createElement("p")
    gender.textContent = "Gender: " + character.gender

    const origin = document.createElement("p")
    origin.textContent = "Origin: " + character.origin.name

    const location = document.createElement("p")
    location.textContent = "Location: " + character.location.name

    // Close button
    const closeButton = document.createElement("button")
    closeButton.textContent = "✕"
    closeButton.classList.add("close-button")
    closeButton.addEventListener("click", () => {
      closeModal()
    })

    modalCard.appendChild(closeButton)
    modalCard.appendChild(characterImage)
    textContainer.appendChild(status)
    textContainer.appendChild(species)
    textContainer.appendChild(gender)
    textContainer.appendChild(origin)
    textContainer.appendChild(location)
    modalCard.appendChild(textContainer)

    // Append modal card to body
    document.body.appendChild(modalCard)

    modalOpen = true // Set modalOpen to true
  }

  function closeModal() {
    const modal = document.querySelector(".modal-card")
    if (modal) {
      modal.parentNode.removeChild(modal)
      modalOpen = false // Set modalOpen to false
    }
  }

  async function loadMoreCharacters() {
    if (page <= totalPages) {
      const charactersUrl = baseUrl + "character?page=" + page
      const data = await fetchData(charactersUrl)

      if (data.results.length > 0) {
        characters = characters.concat(data.results)
        displayCharacters(data.results)
        page++
      }
    }
  }

  // Load initial characters when the page is loaded
  const charactersUrl = baseUrl + "character?page=" + page
  const data = await fetchData(charactersUrl)

  if (data.results.length > 0) {
    characters = data.results
    displayCharacters(characters)
    page++
  }

  // Add event listener for scroll
  window.addEventListener("scroll", () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement

    if (scrollTop + clientHeight >= scrollHeight - 5 && !modalOpen) {
      loadMoreCharacters()
    }
  })
})
