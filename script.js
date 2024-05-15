

document.addEventListener("DOMContentLoaded", async () => {


  const detailSound = new Audio("./audio/pop.mp3")
  detailSound.volume = 0.5
  const hoverSound = new Audio("./audio/Click_Electronic_10.mp3")
  hoverSound.volume = 0.2
  const closeSound = new Audio("./audio/Mouth_42.mp3")
  closeSound.volume = 0.3
  const baseUrl = "https://rickandmortyapi.com/api/"
  let modalOpen = false
  let page = 1
  const totalPages = 42
  let characters = []
  let selectedStatus = ""
  let selectedSpecies = ""
  let selectedGender = ""

  const fetchData = async (url) => {
    try {
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

const displayCharacters = (characters) => {
  const mainContent = document.getElementById("main-content")
  characters.forEach((character) => {
    const characterCard = document.createElement("div")
    characterCard.className = "character-card"
    characterCard.innerHTML = `
      <img src="${character.image}">
      <h2>${character.name}</h2>
    `
    characterCard.addEventListener("mouseover", () => {
      hoverSound.play()
    })
    characterCard.addEventListener("click", () => {
      !modalOpen
        ? displayCharacterDetails(character)
        : (closeModal(), displayCharacterDetails(character))
    })
    mainContent.appendChild(characterCard)
  })
}

const displayCharacterDetails = (character) => {
  const modalCard = document.createElement("div")
  modalCard.className = "modal-card"
  modalCard.innerHTML = `
    <button class="close-button">✕</button>
    <img src="${character.image}">
    <div class="text-container">
      <h2>${character.name}</h2>
      <p>Status: ${character.status}</p>
      <p>Species: ${character.species}</p>
      <p>Gender: ${character.gender}</p>
      <p>Origin: ${character.origin.name}</p>
      <p>Location: ${character.location.name}</p>
    </div>
  `
  modalCard
    .querySelector(".close-button")
    .addEventListener("click", () => closeModal())
  document.body.appendChild(modalCard)
  modalOpen = true

  // Reproducir el sonido cuando se abre el modal
  detailSound.play()
}
  const closeModal = () => {
    closeSound.play()
    const modal = document.querySelector(".modal-card")
    modal && (modal.parentNode.removeChild(modal), (modalOpen = false))
   
  }

  // Function to build the API URL with filters
  const buildApiUrlWithFilters = () => {
    let url = `${baseUrl}character/?page=${page}`
    if (selectedStatus) url += `&status=${selectedStatus}`
    if (selectedSpecies) url += `&species=${selectedSpecies}`
    if (selectedGender) url += `&gender=${selectedGender}`
    return url
  }

  // Update the loadMoreCharacters function to use the new URL builder
  const loadMoreCharacters = async () => {
    if (page <= totalPages) {
      const urlWithFilters = buildApiUrlWithFilters()
      const {results} = await fetchData(urlWithFilters)
      if (results.length > 0) {
        characters.push(...results)
        displayCharacters(results)
        page++
      }
    }
  }

    document.getElementById("status").addEventListener("change", (event) => {
      selectedStatus = event.target.value
      page = 1
      characters = []
      document.getElementById("main-content").innerHTML = ""
      loadMoreCharacters()
    })

    document.getElementById("species").addEventListener("change", (event) => {
      selectedSpecies = event.target.value
      page = 1
      characters = []
      document.getElementById("main-content").innerHTML = ""
      loadMoreCharacters()
    })

    document.getElementById("gender").addEventListener("change", (event) => {
      selectedGender = event.target.value
      page = 1
      characters = []
      document.getElementById("main-content").innerHTML = ""
      loadMoreCharacters()
    })

  const initializePage = async () => {
    const {results} = await fetchData(`${baseUrl}character?page=${page}`)
    if (results.length > 0) {
      characters = results
      displayCharacters(results)
      page++
    }
  }

  initializePage()
  

  

  window.addEventListener("scroll", async () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 5 && !modalOpen) {
      await loadMoreCharacters()
    }
  })
})
