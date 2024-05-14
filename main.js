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
