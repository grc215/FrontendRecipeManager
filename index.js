let body = document.querySelector('body')
let ingredientCount = 1


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

  function objToMainHtml (recipeArr){
    recipeArr.sort(function (a, b) {
      return b.likes - a.likes;
    });
  
    let Obj = recipeArr[0] 
    //title recipe variables
    let h3 = document.createElement('h3')
      h3.innerText = Obj.name
    let likeButton = document.createElement("button")
      likeButton.innerText = "Like <3"
      likeButton.classList.add("like-btn")
    // let likeLi = document.createElement("li")
    //   likeLi.innerText = ""
    //   likeLi.className("likes")
    let image = document.createElement('img')
      image.src = Obj.image
    let ingredientLi = document.createElement('li')
      ingredientLi.innerText = Obj.ingredients
    let instructionsLi = document.createElement("p")
      instructionsLi.innerText = Obj.instructions
    divMain.append(h3, likeButton, image, ingredientLi, instructionsLi)
  
    
  
    recipeArr.forEach(recipeObj => {
      let nameLi = document.createElement('li')
        nameLi.innerText = recipeObj.name
      divBottom.append(nameLi)
  
      let likeButton = document.createElement("button")
        likeButton.innerText = "Like <3"
        likeButton.classList.add("like-btn")
      console.log(likeButton)
      likeButton.addEventListener("click", (e) => {
        console.log(e)
        let recipeLikes = recipeObj.likes
      // let addLike =  recipeObj.
      // UPDATE THE BACKEND: localhost:3000
        fetch("http://localhost:3000/recipes", {
          method: "PATCH",
          headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "likes": recipeLikes + 1
          })
        }
        .then(res => res.json())
        .then((updatedRecipe) => {
          console.log(updatedRecipe)
          // UPDATE THE DOM: <HTML>
          recipeLikes.innerText = `${updatedRecipe.likes} Likes`
          // UPDATE THE OBJECT IN MEMORY: {}
          recipeLikes = updatedRecipe.likes
        })
        )
      })  
      //Event Listener to change the featured recipe 
      nameLi.addEventListener("click", () => {
  
        h3.innerText = recipeObj.name
        image.src = recipeObj.image
        ingredientLi.innerText = recipeObj.ingredients
        instructionsLi.innerText = recipeObj.instructions
    })
    })
  }

//Code for posting new recipes
  let recipeSubmit = document.querySelector(".add-recipe-form")
  recipeSubmit.addEventListener("submit", function(e) {
    e.preventDefault()
    let newRecipeName = document.querySelector(".recipe-name-input").value
    let newRecipeImg = document.querySelector(".recipe-img-input").value
      //generating ingredient array
      let i = 1
      console.log(ingredientCount)
      let newRecipeIngrArr = []
      for (i = 1; i < ingredientCount + 1; i++) {
        let RecipeIngrName = document.querySelector(`.recipe-ingredient-name-input${i}`).value
        let RecipeIngrQty = document.querySelector(`.recipe-ingredient-qty-input${i}`).value
        console.log(document.getElementById(`unitList${i}`) )
        let ingrUnit = document.getElementById(`unitList${i}`)  
        let RecipeIngrUnit = ingrUnit.options[ingrUnit.selectedIndex].text
        let ingredient = ` ${RecipeIngrQty} ${RecipeIngrUnit} of ${RecipeIngrName}`
        newRecipeIngrArr.push(ingredient)
        console.log(newRecipeIngrArr)

      }


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
        "ingredients":  newRecipeIngrArr,
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

  // dropdown menu function created with the help of https://www.javatpoint.com/how-to-create-dropdown-list-using-javascript
  function dropDownUnit() {  
    let unitList = document.getElementById(`unitList${ingredientCount}`)  
    ingredientUnit = unitList.options[unitList.selectedIndex].text
    //console.log(ingredientUnit)
    } 
  
  //generates more ingredient lines
  let addMoreIngredientsButton = document.querySelector(".add-more-ingedient-fields")

  addMoreIngredientsButton.addEventListener("click", (e) => {
    e.preventDefault()
   

    ingredientCount = ingredientCount + 1 //originally defined as 1 globally

    newNameField = document.createElement("input")
    newNameField.className = `recipe-ingredient-name-input${ingredientCount}`
    newNameField.placeholder = "Ingredient Name"
    //recipeSubmit.append(newNameField)

    newQtyField = document.createElement("input")
    newQtyField.className = `recipe-ingredient-qty-input${ingredientCount}`
    newQtyField.placeholder = "Ingredient Qty"
    //recipeSubmit.append(newQtyField)

    let measurements = ["---Choose unit---", "each", "lb", "oz", "cup", "tbsp", "tsp", "g", "fl oz", "l", "ml"]
    let measurementOptions = document.createElement("select")
    measurementOptions.id = `unitList${ingredientCount}` 
    measurementOptions.onchange = "dropDownUnit()"
    measurements.forEach((opt) => {
      let option = document.createElement("option")
      option.innerText = opt
      measurementOptions.append(option)
    })
    let createBreak = document.createElement("Br")
    let ingredientsDiv = document.querySelector(".inputIngredients")
    ingredientsDiv.prepend(newNameField, newQtyField, measurementOptions, createBreak)
    
  })

  