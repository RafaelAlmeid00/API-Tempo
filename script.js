//Constantes

const container_tempo = document.querySelector('.container-tempo');
const container_img = document.querySelector('.container-img');
const cidade = document.querySelector('.cidade')
const data = document.querySelector('.data');
let tempo = document.querySelector('.container-tempo p');
let medida = document.querySelector('.container-tempo span');
const clima = document.querySelector('.clima');
const ventos_hum = document.querySelector('.Ventos');
const cidadeinpt = document.querySelector('.form-control')
const min_max = document.querySelector('.min-max')
const btn = document.getElementById('buttonaddon2')


//Lógica de Programação

const api = {      //Declara os objetos (key e baseurl) da API;
    key: "878992c6",
    base: "https://api.hgbrasil.com/weather",
}

console.log(api);

window.addEventListener('load', () => {
    //Ativa a função de geolocalização e busca a latitude e longitude pelo navegador;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
    else {
        alert('navegador não suporta geolozalicação');
    }
    function setPosition(position) {
        console.log(position)
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        consultaCoord(lat, long) //Passa os parametros para a função de consulta por coordenada;
    }
    function showError(error) {
        alert(`erro: ${error.message}`);
    }
})

async function consultaCoord(lat, long) {
    //Cria a url de pesquisa da cidade pelas coordenadas;
    //E passa toda url de busca para uma variavel;
    const resp =  (`${api.base}?format=${"json-cors"}&key=${api.key}&lat=${lat}&lon=${long}&user_ip=${"remote"}`)
 {
     //Busca os resultados do objeto dentro da url com base na latitude e longitude;
     await fetch (resp).then(response => {
        if (!response.ok) {
            throw new Error(`http error: status ${response.status}`)
        }
        return response.json();
    })
    .catch(error => {
        alert(error.message)
    })
    .then(response => {
         displayResults(response) //Aciona troca de elementos do HMTL
    });
}
    console.log(resp);
}

async function constBtn() {
    //Cria a url de pesquisa da cidade pelo valor do input;
    //E passa toda url de busca para uma variavel;
    const resp2 =  (`${api.base}?format=${"json-cors"}&key=${api.key}&city_name=${cidadeinpt.value}`)
 {
     //Busca os resultados do objeto dentro da url com base na latitude e longitude;
     await fetch (resp2).then(response => {
        if (!response.ok) {
            throw new Error(`http error: status ${response.status}`)
        }
        return response.json();
    })
    .catch(error => {
        alert(error.message)
    })
    .then(response => {
         displayResults(response) //Aciona troca de elementos do HMTL
    });
}
    console.log(resp2);
}


//Troca os elementos do HTML com os resultados do objeto
function displayResults(weather) {
    console.log(weather);

    let now = new Date();

    //Troca a imagem pelo código de condição climatica
    let iconName = weather.results['condition_code'];
    container_img.innerHTML = `<img src="./icons/${iconName}.png">`

    min_max.innerText = weather.results.forecast[0].min + " cº  /  " + weather.results.forecast[0].max + " cº";
    cidade.innerText = weather.results['city'];
    data.innerText = dateBuilder(now);
    tempo.innerText = weather.results['temp'];
    clima.innerText = weather.results['description'];
    ventos_hum.innerText = weather.results['wind_speedy'] + "  /  " + weather.results['humidity'] + "% de humidade";

}

//Tranforma a data númerica 00/00/0000 em string: Terça, 3 Maio 2022
function dateBuilder(d) {
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let day = days[d.getDay()]; //Busca o dia da semana: 0-6
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`; //Retorna o texto
}

//Aciona pelo botão a função (constBtn) que busca os resultados do objeto
//Que aciona a troca de elementos do HTML
btn.addEventListener('click', function() {
    constBtn();
})

container_tempo.addEventListener('click', changeTemp)
//Altera valor em celsius para Faireheint
function changeTemp() {
    //Se estiver em Celsius, fazer conversão
    if (medida.innerHTML == "Cº") {
   let F = tempo.innerHTML * 1.8 + 32;
   console.log(F);
   medida.innerHTML = "Fº"
   tempo.innerHTML = F.toFixed(0)
}

else  {
    //Senão, (caso esteja em Faireheint), desfazer a conversão
    let C = (tempo.innerText - 32) / 1.8;
    console.log(C);
    medida.innerHTML = "Cº"
    tempo.innerHTML = C.toFixed(0)
}
}

