document.addEventListener("DOMContentLoaded", function () {
    const rssUrl = "https://ascii.jp/digital/rss.xml";

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    async function fetchRSS(url) {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        return xml;
    }

    function parseRSS(xml) {
        const items = xml.querySelectorAll("item");
        const news = [];
        items.forEach(item => {
            const title = item.querySelector("title").textContent;
            const link = item.querySelector("link").textContent;
            news.push({ title, link });
        });
        return news;
    }

    function displayNews(news) {
        const container = document.getElementById("news-container");
        container.innerHTML = "";
        news.forEach(item => {
            const newsItem = document.createElement("div");
            newsItem.innerHTML = `<a href="${item.link}" target="_blank" >${item.title}</a>`;
            container.appendChild(newsItem);
        });
    }

    async function loadRandomNews() {
        try {
            const rssXML = await fetchRSS(rssUrl);
            let news = parseRSS(rssXML);
            const randomNews = [];
            const newsCount = Math.min(5, news.length);
            while (randomNews.length < newsCount) {
                const randomIndex = getRandomInt(news.length);
                if (!randomNews.includes(news[randomIndex])) {
                    randomNews.push(news[randomIndex]);
                }
            }
            displayNews(randomNews);
        } catch (error) {
            console.error("Error fetching or parsing RSS feed:", error);
        }
    }

    loadRandomNews();
});
