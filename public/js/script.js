// let addIngredientsBtn = document.getElementById('addIngredientsBtn');
// let ingredientList = document.querySelector('.ingredientList');
// let ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];

// addIngredientsBtn.addEventListener('click', function(){
//   let newIngredients = ingredeintDiv.cloneNode(true);
//   let input = newIngredients.getElementsByTagName('input')[0];
//   input.value = '';
//   ingredientList.appendChild(newIngredients);
// });


  const hum_menu=document.getElementById('nav-icon2')
  
  hum_menu.addEventListener("click" , function(){
		hum_menu.classList.toggle('open')
  })	

  hum_menu.addEventListener("click" , function(){
    let ul = document.querySelector("ul.nav")
    let mobile_nav = document.querySelector(".mobile-nav")
    ul.classList.toggle("hidden")
    mobile_nav.classList.toggle("open")

  })	