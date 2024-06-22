//fetch data
const loadingSpinner = document.getElementById('loading');
async function loadData(isShowall) {
    loadingSpinner.classList.remove('hidden');
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const response = await fetch(url);
    const data = await response.json();
    displayData(data.data.tools, isShowall);
}

//display data on card
const dataContainer = document.getElementById('data-container');
function displayData(tools, isShowall) {
    dataContainer.innerHTML = ``;
    if(!isShowall && tools.length > 6){
        document.getElementById('show-all-btn').classList.remove('hidden');
        tools = tools.splice(0, 6);
    }
    else{
        document.getElementById('show-all-btn').classList.add('hidden');
    }
    tools.map(tool => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'bg-base-100', 'shadow-xl');
        cardDiv.innerHTML = `
        <figure class="px-6 pt-6">
            <img src="${tool.image}" alt="No pictures available" class="rounded-xl" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Features</h2>
            <ol id="feature-ol-${tool.id}">

            </ol>
            <hr class="mt-5">
            <div class="flex justify-between items-center mt-5">
                <div class="">
                    <h2 class="text-xl font-bold">${tool.name}</h2>
                    <p><i class="fa-regular fa-calendar mr-2 mt-2"></i> ${tool.published_in}</p>
                </div>
                <button class="btn btn-danger-outline rounded-full"><i
                        class="text-red-300 fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
        `
        loadingSpinner.classList.add('hidden');
        dataContainer.appendChild(cardDiv);
        addFeatureList(tool);
    })
}
function addFeatureList(tool) {
    let count = 1;
    const featureOl = document.getElementById(`feature-ol-${tool.id}`);
    tool.features.map(feature => {
        const featureLi = document.createElement('li');
        featureLi.innerText =count + ". " + feature;
        featureOl.append(featureLi);
        count ++;
    })
}

document.getElementById('show-all-btn').addEventListener('click', function(){
    loadData(true);
})

loadData(false);