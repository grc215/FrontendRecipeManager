let body = document.querySelector('body')
  
let divMain = document.createElement('div')
  divMain.className = ('main-display')
  body.append(divMain)

let h3 = document.createElement('h3')
let image = document.createElement('img')
let ingredientLi = document.createElement('li')

let divBottom = document.createElement('div')
  divBottom.className = ('bottom-display')
  body.append(divBottom)


fetch('http://localhost:3000/recipes/1')
.then(resp => resp.json())
.then(Obj => {
  console.log(Obj)
  
    h3.innerText = Obj.name
    image.src = Obj.image
    ingredientLi.innerText = Obj.ingredients

    divMain.append(h3, image, ingredientLi)
  // let p = document.createElement('p')
  //   p.innerText = 
})

fetch('http://localhost:3000/recipes')
  .then(res => res.json())
  .then((recipeArr) => {
    recipeArr.forEach((recipeObj) => {
      let nameLi = document.createElement('li')
      nameLi.innerText = recipeObj.name

      divBottom.append(nameLi)

      //Event Listener in the same level  
      nameLi.addEventListener("click", (evt) => {

        h3.innerText = recipeObj.name
        image.src = recipeObj.image
        ingredientLi.innerText = recipeObj.ingredients
        
    })
    })
  })
