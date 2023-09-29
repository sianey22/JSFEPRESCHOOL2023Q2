const inputData = document.getElementById('input-info');
const gridContainer = document.querySelector('.img-container');
const searchForm = document.querySelector('.search-form')
const closeButton = document.querySelector('.close-button')

const ACCESS_KEY = '71Sh7rbj6WuGdxbF1O5aYgUh78Zug6pSYg7k_9mln-4'

const activeCloseButton = ()=>{
    closeButton.classList.add('active');
    if(inputData.value==''){
        closeButton.classList.remove('active');
    }
}

const deleteInput = ()=> {
    inputData.value='';
    closeButton.classList.remove('active');
    inputData.focus();
}

async function getQuotes(quotes) {  
    const val = inputData.value
    if (val===""){
        quotes = `https://api.unsplash.com/search/photos?per_page=30&query=summer&client_id=71Sh7rbj6WuGdxbF1O5aYgUh78Zug6pSYg7k_9mln-4`;
    }
    else{
        gridContainer.innerHTML='';
        quotes = `https://api.unsplash.com/search/photos?per_page=30&query=${val}&client_id=71Sh7rbj6WuGdxbF1O5aYgUh78Zug6pSYg7k_9mln-4`;
    }
    const res = await fetch(quotes);
    const data = await res.json(); 

    data.results.map((el)=>{
        const image = document.createElement('img');
        const imageDiv = document.createElement('div');

        image.src = el['urls']['small']
        image.alt = el.alt_description;

        image.classList.add("img");
        imageDiv.classList.add("img-div");

        imageDiv.appendChild(image)
        gridContainer.appendChild(imageDiv);
    })
  }

getQuotes();

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    getQuotes();})

inputData.addEventListener("input", activeCloseButton)

closeButton.addEventListener("click", deleteInput)