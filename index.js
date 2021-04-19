let body = document.querySelector('body')
  
let divMain = document.createElement('div')
  divMain.className = ('main-display')
  body.append(divMain)


fetch('http://localhost:3000/recipes/1')
.then(resp => resp.json())
.then(Obj => {
  console.log(Obj)
  let h3 = document.createElement('h3')
    h3.innerText = Obj.name
  let image = document.createElement('img')
    image.src = Obj.image
  let blankLi = document.createElement('li')
    blankLi.innerText = Obj.ingredients


    divMain.append(h3, image, blankLi)
  // let p = document.createElement('p')
  //   p.innerText = 

})









































// let blankUl = document.createElement('ul')
//   blankUl.className = 'main-recipe'
//   div.append(blankUl)