
const loadData =async (isShow) => {
    const response = await fetch('https://openapi.programming-hero.com/api/ai/tools')
    const data = await response.json();
    const tools = data.data.tools;
    displayData(tools, isShow);
}

const displayData = (tools, isShow) => {

    // hide and show the show button with a condition:

    const showButton = document.getElementById('all-show-button');
    if(tools.length > 6 && !isShow){
        showButton.classList.remove('hidden');
    }
    else{
        showButton.classList.add('hidden');
    }

    // display the specific number items if doesn't click the all show button at a time:
    if(!isShow){
        tools = tools.slice(0,6)
    }

    // clean the cardContainer before set the new one:
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';

    // to get the specific tool to use forEach loop:
    tools.forEach( (tool) => {
        const container = document.createElement('div');
        container.classList = 'card bg-base-100 shadow-xl justify-end';
        container.innerHTML = ` 
            <div class = "flex flex-col justify-between"> 
                <figure class="px-5 pt-5">
                <img src="${tool.image}" class="rounded-xl" />
                </figure>
                <div class="card-body flex-none pb-7">
                    <h1 class = "text-2xl font-bold"> Features </h1>
                    <ul class = "border-b-2 border-gray"> 
                        <li>${tool?.features[0]? tool.features[0] : ''}</li>
                        <li> ${tool?.features[1]? tool.features[1] : ''}</li>
                        <li> ${tool.features[2]? tool.features[2] : ''}</li>
                        <li> ${tool.features[3]? tool.features[3] : ''}</li>
                        <li class = "pb-5"> ${tool.features[4]? tool.features[4] : ''}</li>
                    </ul> 
                </div>
            </div>
            <div class="card-body pt-0 flex-none flex-end flex-row justify-between items-center "> 
                <div> 
                    <h1 class = "text-2xl font-bold"> ${tool.name} </h1>
                    <h1 class = "text-lg"> ${tool.published_in} </h1>
                </div>
                <div> 
                    <img src="images/right-long-solid.svg" />
                </div>
            </div>
        `
        cardContainer.appendChild(container);
    })
    handleSpinner(false)
}

// use the shot by date button call the api to get the response agaist our api request:
const getItems = (isShow)=> {
    handleSpinner(true)
    loadData(isShow)
}

// waiting period to get the request as a promise from the api , then use the loading spinner:
const handleSpinner = (isLoading) => {
    let spinnerLoading = document.getElementById('spinnerLoading');
        
    if(isLoading){
        spinnerLoading.classList.remove('hidden');
    }
    else{
        spinnerLoading.classList.add('hidden');
    }
}

// click the all show button and re-load all items from the api:
const allShowButton = () => {
    getItems(true);
}