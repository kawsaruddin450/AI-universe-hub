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
    if (!isShowall && tools.length > 6) {
        document.getElementById('show-all-btn').classList.remove('hidden');
        tools = tools.splice(0, 6);
    }
    else {
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
                <button class="btn btn-danger-outline rounded-full" onclick="showModalData('${tool.id}')"><i
                        class="text-red-300 fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
        `
        loadingSpinner.classList.add('hidden');
        dataContainer.appendChild(cardDiv);
        const featureOl = document.getElementById(`feature-ol-${tool.id}`);
        addFeatureList(tool, featureOl);
    })
}

function addFeatureList(tool, featureParent) {
    let count = 1;
    tool.features.map(feature => {
        const featureLi = document.createElement('li');
        featureLi.innerText = count + ". " + feature;
        featureParent.append(featureLi);
        count++;
    })
}
//show data in modal
const modalContent = document.getElementById('modal-content');
async function showModalData(id) {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const tool = data.data;
    modalContent.innerHTML = `
    <div class="bg-rose-100 p-5 rounded-xl">
        <p class="text-2xl font-semibold text-center">${tool.description}</p>
        <div class="flex justify-center gap-5 my-6">
            <div class="bg-white rounded-xl p-4 text-green-500 text-xl font-semibold text-center">
                <p class="">${tool.pricing ? tool.pricing[0].price : ""}</p>
                <p>${tool.pricing ? tool.pricing[0].plan : "Free"}</p>
            </div>
            <div class="bg-white rounded-xl p-4 text-orange-500 text-xl font-semibold text-center">
                <p class="">${tool.pricing ? tool.pricing[1].price : ""}</p>
                <p>${tool.pricing ? tool.pricing[1].plan : "Free"}</p>
            </div>
            <div class="bg-white rounded-xl p-4 text-red-500 text-xl font-semibold text-center">
                <p class="">${tool.pricing ? tool.pricing[2].price : ""}</p>
                <p>${tool.pricing ? tool.pricing[2].plan : "Free"}</p>
            </div>
        </div>
        <div class="flex gap-5 flex-col sm:flex-row text-center sm:text-left justify-around">
            <div>
                <h2 class="text-2xl font-semibold my-3">Features: </h2>
                <ul id="feature-ul"></ul>
            </div>
            <div>
                <h2 class="text-2xl font-semibold my-3">Integrations: </h2>
                <ul id="integration-ul"></ul>
            </div>
        </div>
    </div>
    <div class="rounded-xl border-2 border-s-slate-800">
        <img src="${tool.image_link[0]}" alt="No image found!">
        <h2 class="text-2xl font-semibold text-center my-4">${tool.input_output_examples ? tool.input_output_examples[0].input : "No data found"}</h2>
        <p class="text-center my-4">${tool.input_output_examples ? tool.input_output_examples[0].output : "No data found"}</p>
    </div>
    `
    dataModal.showModal();
    const featureUl = document.getElementById('feature-ul')
    const integrationUl = document.getElementById('integration-ul')
    addFeatureModal(tool, featureUl);
    addIntegrationModal(tool, integrationUl);
}

function addFeatureModal(tool, featureParent) {
    // console.log(tool.features);
    const arr = Object.keys(tool.features);
    let count = 1;
    arr.map(k => {
        const feature = tool.features[k].feature_name;
        const modalLi = document.createElement('li');
        modalLi.innerText = count + ". " + feature;
        featureParent.appendChild(modalLi);
        count++;
    })
}

function addIntegrationModal(tool, integrationParent) {
    if (tool.integrations === null) {
        integrationParent.innerHTML = `
        <h2 class="text-2xl text-center">No Data Found!</h2>
        `
    }

    else {
        const items = tool.integrations;
        let count = 1;
        items.forEach(item => {
            integrationLi = document.createElement('li');
            integrationLi.innerText = count + ". " + item;
            integrationParent.appendChild(integrationLi);
            count++;
        });
    }
}


document.getElementById('show-all-btn').addEventListener('click', function () {
    loadData(true);
})

loadData(false);