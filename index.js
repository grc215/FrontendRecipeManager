let body = document.querySelector('body')
let likeInteger
let ingredientCount = 1
let divheader = document.querySelector('div.add-recipe')
let headerText = document.querySelector('.centered>p')
  headerText.innerText = 'Recipe Manager'
let divMain = document.createElement('div')
  divMain.className = ('main-display')
  body.append(divMain)
let toggleBtn = document.createElement('button')
  toggleBtn.innerText = 'Add New Recipe'
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
    toggleBtn.innerText = 'Cancel New Recipe'
  }else{
    toggleDiv.style.display = "none"
    toggleBtn.innerText = 'Add New Recipe'
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
    //console.log(Obj)
    //title recipe variables
    let ingredientTitle = document.createElement("h4")
      ingredientTitle.innerText = "Ingredients"
    let instructionsTitle = document.createElement("h4")
      instructionsTitle.innerText = "Instructions"
    let recipeBankTitle = document.createElement("h4")
      recipeBankTitle.innerText = "Recipe Bank"
    let h3 = document.createElement('h3')
      h3.innerText = Obj.name
    let objId= Obj.id
    let likeButton = document.createElement("button")
      likeButton.innerText = "Like <3"
      likeButton.classList.add(`like-btn-${Obj.id}`)
    let numOfLikes = document.createElement("p")
      numOfLikes.innerText = Obj.likes + " " + 'Likes'
      numOfLikes.classList.add("likes")
    likeInteger = Obj.likes
    let image = document.createElement('img')
      image.src = Obj.image
    let ingredientLi = document.createElement('li')
      ingredientLi.innerText = Obj.ingredients
    let instructionsLi = document.createElement("p")
      instructionsLi.innerText = Obj.instructions
    divMain.append(h3, numOfLikes, likeButton, image, ingredientTitle, ingredientLi, instructionsTitle, instructionsLi, recipeBankTitle)
    //console.log(recipeArr[0].name)
    //console.log(h3.innerText)

    likeButton.addEventListener("click", () => {
//console.log(likeInteger)

      fetch(`http://localhost:3000/recipes/${objId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: likeInteger + 1
        }),
      })
      .then(resp => resp.json())
      .then((updatedObj) => {
        // console.log(updatedMainObj)
        likeInteger = updatedObj.likes
        numOfLikes.innerText = `${likeInteger} Likes`
        // Update local memory
        //likeInteger = likeInteger + 1
        document.querySelector(`.li${objId}`).innerText = updatedObj.name + " " + "-" + " " + likeInteger + " " + "Likes"
        });
    })
    recipeArr.forEach(recipeObj => {
      let nameLi = document.createElement('li')
      //let updatedRecipe = 
        nameLi.innerText = recipeObj.name + " " + "-" + " " + recipeObj.likes + " " + "Likes"
        nameLi.classList = `li${recipeObj.id}`
      divBottom.append(nameLi)
      //Event Listener to change the featured recipe 
      nameLi.addEventListener("click", () => {
        objId = recipeObj.id
        fetch(`http://localhost:3000/recipes/${objId}`)
        .then(resp => resp.json())
        .then((recipeObj) => {
          h3.innerText = recipeObj.name
          image.src = recipeObj.image
          ingredientLi.innerText = recipeObj.ingredients
          instructionsLi.innerText = recipeObj.instructions
          numOfLikes.innerText = recipeObj.likes + " " + 'Likes'
          likeInteger = recipeObj.likes
          //console.log(recipeObj.likes)
        })
           //likeButton.addEventListener("click", () => {
           //if(h3.innerText !== recipeArr[0].name) {
            //fetch(`http://localhost:3000/recipes/${recipeObj.id}`, {
              //method: "PATCH",
              //headers: {
                //"Content-Type": "application/json",
              //},
              //body: JSON.stringify({
                //likes: recipeObj.likes + 1
              //}),
            //})
            //.then(resp => resp.json())
            //.then((updatedRecipeObj) => {
              //// console.log(updatedMainObj)
              //numOfLikes.innerText = `${updatedRecipeObj.likes} Likes`
              //// Update local memory
              //recipeObj.likes = updatedRecipeObj.likes
              //nameLi.innerText = recipeObj.name + " " + "-" + " " + recipeObj.likes + " " + "Likes"
            //});
          //}
        //})
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
      //console.log(ingredientCount)
      let newRecipeIngrArr = []
      for (i = 1; i < ingredientCount + 1; i++) {
        let RecipeIngrName = document.querySelector(`.recipe-ingredient-name-input${i}`).value
        let RecipeIngrQty = document.querySelector(`.recipe-ingredient-qty-input${i}`).value
        //console.log(document.getElementById(`unitList${i}`) )
        let ingrUnit = document.getElementById(`unitList${i}`)  
        let RecipeIngrUnit = ingrUnit.options[ingrUnit.selectedIndex].text
        let ingredient = ` ${RecipeIngrQty} ${RecipeIngrUnit} of ${RecipeIngrName}`
        newRecipeIngrArr.push(ingredient)
        //console.log(newRecipeIngrArr)
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
      //console.log(newRecipe)
    })
    location.reload()
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
    console.log(measurementOptions.id)
    let createBreak = document.createElement("Br")
    createBreak.className = `break${ingredientCount}`
    let ingredientsDiv = document.querySelector(".inputIngredients")
    ingredientsDiv.append(newNameField, newQtyField, measurementOptions, createBreak)
  })
  //add less ingredients Event Listener
  let addLessIngredientsButton = document.querySelector(".remove-ingedient-fields")
  addLessIngredientsButton.addEventListener("click", (e) => {
    e.preventDefault()
    let measurementOptionsToRemove = document.querySelector(`#unitList${ingredientCount}`)
    let newNewFieldToRemove = document.querySelector(`.recipe-ingredient-name-input${ingredientCount}`)
    let newQtyFieldToRemove = document.querySelector(`.recipe-ingredient-qty-input${ingredientCount}`)
    let newBreakToRemove = document.querySelector(`.break${ingredientCount}`)
    if (newNewFieldToRemove.className !== "recipe-ingredient-name-input1"){
      measurementOptionsToRemove.remove()
      newNewFieldToRemove.remove()
      newQtyFieldToRemove.remove()
      newBreakToRemove.remove()
    ingredientCount = ingredientCount - 1
    }
  })
