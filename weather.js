// APIエンドポイントのURL
const apiUrl = 'https://weather.tsukumijima.net/api/forecast/city/130010';

// APIからデータを取得
fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayTodayWeather(data))
    .catch(error => console.error('Error:', error));

// 今日の天気をHTMLに表示する関数
function displayTodayWeather(data) {
    const weatherForecast = document.getElementById('weather-forecast');
    
    // 今日の天気予報を取得
    const todayForecast = data.forecasts[0]; // 最初の要素が今日の天気予報
    
    // 今日の天気情報を表示するためのdivを作成
    const forecastDiv = document.createElement('div');
    forecastDiv.classList.add('forecast');

    // 日付と天気
    const dateLabel = document.createElement('h3');
    dateLabel.textContent = todayForecast.dateLabel + ' (' + todayForecast.date + ')';
    forecastDiv.appendChild(dateLabel);

    // 天気画像
    const weatherImage = document.createElement('img');
    weatherImage.src = todayForecast.image.url;
    weatherImage.alt = todayForecast.image.title;
    forecastDiv.appendChild(weatherImage);

    // 天気の説明
    const weatherDesc = document.createElement('p');
    weatherDesc.textContent = todayForecast.telop;
    forecastDiv.appendChild(weatherDesc);

    // forecastDivをweatherForecastに追加
    weatherForecast.appendChild(forecastDiv);
}
