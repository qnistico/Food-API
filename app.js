const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const mealList = document.getElementById('meal')
const mealDetailsContent = document.querySelector('.meal-details-content')
const recipeCloseBtn = document.getElementById('close-recipe-btn')

searchBtn.addEventListener('click', getMealsList);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getMealsList()
    }
})
mealList.addEventListener('click', getMealRecipe)

function getMealsList() {
    let searchInputText = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
        .then(response => response.json())
        .then(data => {
            let html = '';
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}"
                                alt="food">
                        </div>
                        <div class="meal-item-content">
                            <h3>${meal.strMeal}</h3>
                            <div class="recipe-btn-container">
                                <button class="recipe-btn-sizing"><a href="#" class="recipe-btn">View Recipe <span class="btn-arrow"><i class="fas fa-chevron-right"></i></span></a></button>
                            </div>
                            </div>
                        </div>
                        `
                })
              //  mealList.classList.remove('no-result');
            } else {
                html = `<p class="no-results">Oops! We don't have that recipe!</p>`
            }
            mealList.innerHTML = html;
        })

}
getMealsList()

function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}