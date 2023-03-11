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

searchBtn.addEventListener('click', getMealsList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
searchBtn.addEventListener('click', () => {
    if (searchBtn('clicked' === false)) {

    }
})


function getMealsList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class = "meal-img">
                            <img src="${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href= "#" class = "recipe-btn">Get Recipe<span class="btn-arrow"><i class="fas fa-chevron-right"></i></span></a>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = `<p class="no-results">Oops! We don't have that item!</p>`;
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}


// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault()
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
    <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        
        <div class="recipe-link ">
            <a href="${meal.strYoutube}" target="_blank" class="recipe-btn">Watch Video<span class="btn-arrow"><i class="fas fa-chevron-right"></i></span></a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}