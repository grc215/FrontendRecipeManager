let body = document.querySelector('body')

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

let recipeNewForm = document.querySelector('.add-recipe-form')

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

recipeNewForm.addEventListener('submit', (evt) => {
  evt.preventDefault()

  let nameNew = evt.target['recipe-name'].value
  let imageNew = evt.target['recipe-img'].value
  let ingredientsNew = evt.target['recipe-ingredients'].value
  let instructionsNew = evt.target['recipe-instructions'].value
    console.log(nameNew, imageNew, ingredientsNew, instructionsNew)
})
