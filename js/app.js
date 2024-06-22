//fetch data
async function loadData(){
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.data.tools);
}
loadData();