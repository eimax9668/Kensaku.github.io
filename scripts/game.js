function playgame(url,element){
    fetch(`${url}`)
    .then((response) => response.text())
    .then((data) => document.querySelector(`${element}`).innerHTML = data);
  }
document.querySelector("#cleanthesea-play").addEventListener("click",function(event){
    event.preventDefault();
    playgame("games/cleanthesea.html","#cleanthesea");
})
document.querySelector("#irairagame-play").addEventListener("click",function(event){
    event.preventDefault();
    playgame("games/irairagame.html","#irairagame");
})

document.querySelector("#cleanthesea-stop").addEventListener("click",function(event){
    event.preventDefault();
    document.querySelector("#cleanthesea").innerHTML = '<img class="gameimg" src="/gameimg/cleanthesea.png" />' ;
})

document.querySelector("#irairagame-stop").addEventListener("click",function(event){
    event.preventDefault();
    document.querySelector("#irairagame").innerHTML = '<img class="gameimg" src="/gameimg/IraIragame.png" />' ;
})