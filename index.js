let body = document.querySelector('body')

//like button definition
let likeButton = document.createElement("button")
    likeButton.innerText = "Like <3"
    likeButton.classList.add("like-btn")

let divheader = document.querySelector('div.add-recipe')
let headerText = document.querySelector('.centered>p')
  headerText.innerText = 'Recipe Manager'


let divMain = document.createElement('div')
  divMain.className = ('main-display')
  body.append(divMain)
 
let toggleBtn = document.createElement('button')
  toggleBtn.innerText = 'Add new recipe'
divMain.append(toggleBtn)


let divBottom = document.createElement('div')
  divBottom.className = ('bottom-display')
  body.append(divBottom)

//let recipeNewForm = document.querySelector('.add-recipe-form')

fetch('http://localhost:3000/recipes')
  .then(res => res.json())
  .then((recipeArr) => {

    recipeArr.sort(function (a, b) {
      return b.likes - a.likes;
    });

    console.log(recipeArr)
    let Obj = recipeArr[0] 
    //title recipe variables
    let h3 = document.createElement('h3')
    let image = document.createElement('img')
    let ingredientLi = document.createElement('li')
    let instructionsLi = document.createElement("p")
      h3.innerText = Obj.name
      image.src = Obj.image
      ingredientLi.innerText = Obj.ingredients
      instructionsLi.innerText = Obj.instructions

      divMain.append(h3, image, ingredientLi, instructionsLi)


    recipeArr.forEach((recipeObj) => {
      let nameLi = document.createElement('li')
      nameLi.innerText = recipeObj.name

      divBottom.append(nameLi)

      //Event Listener in the same level  
    nameLi.addEventListener("click", (evt) => {

      h3.innerText = recipeObj.name
      image.src = recipeObj.image
      ingredientLi.innerText = recipeObj.ingredients
      instructionsLi.innerText = recipeObj.instructions
    })
    })
  })
//
  let recipeSubmit = document.querySelector(".add-recipe-form")
  recipeSubmit.addEventListener("submit", function(e) {
    e.preventDefault()
    let newRecipeName = document.querySelector(".recipe-name-input").value
    let newRecipeImg = document.querySelector(".recipe-img-input").value
    let newRecipeIngr = document.querySelector(".recipe-ingredient-input").value
    let newRecipeInstr = document.querySelector(".recipe-instructions-input").value
    recipeSubmit.reset()
    fetch("http://localhost:3000/recipes", {
      method:"POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "name": newRecipeName,
        "image": newRecipeImg,
        "ingredients": newRecipeIngr,
        "instructions": newRecipeInstr,
        "likes": 0
      })
    })
    .then(res => res.JSON)
    .then((newRecipe) => {
      console.log(newRecipe)
    })
  })
//like button event listener
  likeButton.addEventListener("click", (e) => {
    // UPDATE THE BACKEND: localhost:3000
    fetch("http://localhost:3000/recipes", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: recipe.likes + 1
      })
    })
      .then(res => res.json())
      .then((updatedRecipe) => {
        // UPDATE THE DOM: <HTML>
        recipeLikes.innerText = `${updatedRecipe.likes} Likes`
        // UPDATE THE OBJECT IN MEMORY: {}
        recipe.likes = updatedRecipe.likes
      })
  })

