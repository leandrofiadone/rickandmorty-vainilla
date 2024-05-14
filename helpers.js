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
