let body = document.querySelector('body')

//like button definition --------------Where is this going?
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

  // Toggle Add new recipe form
let toggleDiv = document.querySelector('.add-recipe-form')
  toggleDiv.style.display = 'none'
toggleBtn.addEventListener('click', ()=>{
  if (toggleDiv.style.display === "none"){
    toggleDiv.style.display = 'block'
  }else{
    toggleDiv.style.display = "none"
  }
})


fetch('http://localhost:3000/recipes')
  .then(resp => resp.json())
  .then((recipeArr) => {
    objToMainHtml (recipeArr)
  })

//Code for posting new recipes
  let recipeSubmit = document.querySelector(".add-recipe-form")
  recipeSubmit.addEventListener("submit", function(e) {
    e.preventDefault()
    let newRecipeName = document.querySelector(".recipe-name-input").value
    let newRecipeImg = document.querySelector(".recipe-img-input").value
    let newRecipeIngrArr = []
    let RecipeIngrName = document.querySelector(".recipe-ingredient-name-input").value
    let RecipeIngrQty = document.querySelector(".recipe-ingredient-qty-input").value
    let RecipeIngrUnit = ingredientUnit
    newRecipeIngrArr.push(RecipeIngrName, RecipeIngrQty, RecipeIngrUnit)
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
        "ingredients": newRecipeIngrArr,
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

  // dropdown menu function created with the help of https://www.javatpoint.com/how-to-create-dropdown-list-using-javascript
  function dropDownUnit() {  
    let unitlist = document.getElementById("unitList")  
    ingredientUnit = unitList.options[unitlist.selectedIndex].text
    //console.log(ingredientUnit)
    } 

function objToMainHtml (recipeArr){
  recipeArr.sort(function (a, b) {
    return b.likes - a.likes;
  });

  let Obj = recipeArr[0] 
  //title recipe variables
  let h3 = document.createElement('h3')
    h3.innerText = Obj.name
  let image = document.createElement('img')
    image.src = Obj.image
  let ingredientLi = document.createElement('li')
    ingredientLi.innerText = Obj.ingredients
  let instructionsLi = document.createElement("p")
    instructionsLi.innerText = Obj.instructions
  divMain.append(h3, image, ingredientLi, instructionsLi)

  recipeArr.forEach(recipeObj => {
    let nameLi = document.createElement('li')
      nameLi.innerText = recipeObj.name
    divBottom.append(nameLi)

    //Event Listener to change the featured recipe 
    nameLi.addEventListener("click", () => {

      h3.innerText = recipeObj.name
      image.src = recipeObj.image
      ingredientLi.innerText = recipeObj.ingredients
      instructionsLi.innerText = recipeObj.instructions
  })
  })
}
  