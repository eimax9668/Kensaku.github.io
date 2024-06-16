let cityNumbers = ["130010", "040010", "230010","390010","400040"];
let areaNames = ["東京", "仙台", "名古屋","高知","福岡"];
//それぞれ、東京、仙台、名古屋、高知、福岡。
//インデックスは0始まり。福岡→4

let index = 0;

window.onload;{
    loadarea();
    fetchdata();
}

function savearea(){
    localStorage.setItem("area",index);
    let savedindex =localStorage.getItem("area");
    console.log(savedindex);
console.log("保存Done");
}

function loadarea(){
    let savedindex =localStorage.getItem("area");
    index = Number(savedindex);
    if(index > 4 || index < 0){
        resetarea()
    }
}

function resetarea(){
    index = 0
    localStorage.clear();
    alert("エラー。天気の位置情報はリセットされました。");
}


document.querySelector('#changearea').addEventListener("click", function(event){
    console.log(event)
    event.preventDefault();
    fetchdata();
    disableClick();
});

function disableClick() {
    const targetElement = document.getElementById('changearea');
    targetElement.classList.add('disabled-click');
    document.getElementById('changearea').innerHTML = "変更中...";

    setTimeout(function() {
        document.getElementById('changearea').innerHTML = "場所を変更";
        targetElement.classList.remove('disabled-click');
    }, 1000); 
}

function fetchdata() {
    console.log(index);

    // APIエンドポイントのURL
    let apiUrl = "https://weather.tsukumijima.net/api/forecast/city/" + cityNumbers[index];

    // APIからデータを取得
    //一回消しておく
    document.getElementById("weather-forecast").innerHTML = "";
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayTodayWeather(data))
        .catch(error => console.error('Error:', error));
    console.log(apiUrl)
    let areaName = areaNames[index];
    document.getElementsByClassName('weather-area')[0].innerHTML = areaName;
}

// 今日の天気をHTMLに表示する関数
function displayTodayWeather(data) {
    const weatherForecast = document.getElementById('weather-forecast');
    
    // 今日の天気予報を取得
    const todayForecast = data.forecasts[0]; // 最初の要素が今日の天気予報
    
    // 今日の天気情報を表示するためのdivを作成
    const forecastDiv = document.createElement('div');
    forecastDiv.classList.add('forecast');

    // 日付と天気
    //const dateLabel = document.createElement('h3');
    //dateLabel.textContent = todayForecast.dateLabel + ' (' + todayForecast.date + ')';
    //forecastDiv.appendChild(dateLabel);

    // 天気画像
    const weatherImage = document.createElement('img');
    weatherImage.src = todayForecast.image.url;
    weatherImage.alt = todayForecast.image.title;
    forecastDiv.appendChild(weatherImage);

    // 天気の説明
    const weatherDesc = document.createElement('p');
    weatherDesc.textContent = todayForecast.telop;
    forecastDiv.appendChild(weatherDesc);
    weatherDesc.classList.add("weatherDesc");

    // forecastDivをweatherForecastに追加
    weatherForecast.appendChild(forecastDiv);
    savearea();
    index = index + 1
    if (index == 5) {
        index = 0;
    }
}
