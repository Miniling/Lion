const APIKEY = "15f1697b977f82990f49e76d417ddcee";      // 개인 API키
const IMAGEURL = "https://image.tmdb.org/t/p/w500";     // 이미지 로드 링크(공통부분)

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
};

const nowPlayingURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + APIKEY + "&language=en-US&page=1"
const nowPlaying = document.getElementById("nowPlaying");   // 해당 id의 영역에 ele생성
fetch(nowPlayingURL, options)
    .then(response => response.json())
    .then(response => {
        response.results.forEach(element => {
            let movie = document.createElement("li");       // li태그 부분에 ele생성
            let moviediv = document.createElement("div");   // div태그 부분에 ele생성
            let backdrop = document.createElement("img");   // img태그 부분에 ele생성
            backdrop.setAttribute("src", IMAGEURL + element.backdrop_path);
            let title = document.createElement("h4");       // h4태그 부분에 ele생성
            title.innerText = element.title;
            let rate = document.createElement("span");      // span태그 부분에 ele생성
            rate.innerText = "★ " + element.vote_average;  // GET한 vote_average 사용
            moviediv.appendChild(backdrop);     // Child 등록
            moviediv.appendChild(title);
            moviediv.appendChild(rate);
            movie.appendChild(moviediv);
            nowPlaying.appendChild(movie);      // Child 등록
        });
    });

const popularURL = "https://api.themoviedb.org/3/movie/popular?api_key=" + APIKEY + "&language=en-US&page=1"
const popular = document.getElementById("popular");
fetch(popularURL, options)
    .then(response => response.json())
    .then(response => {
        response.results.forEach(element => {
            let movie = document.createElement("li");
            let moviediv = document.createElement("div");
            let backdrop = document.createElement("img");
            backdrop.setAttribute("src", IMAGEURL + element.backdrop_path);
            let title = document.createElement("h4");
            title.innerText = element.title;
            let rate = document.createElement("span");
            rate.innerText = "★ " + element.vote_average;
            moviediv.appendChild(backdrop);
            moviediv.appendChild(title);
            moviediv.appendChild(rate);
            movie.appendChild(moviediv);
            popular.appendChild(movie);
        });
    });

const topRatedURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + APIKEY + "&language=en-US&page=1"
const topRated = document.getElementById("topRated");
fetch(topRatedURL, options)
    .then(response => response.json())
    .then(response => {
        response.results.forEach(element => {
            let movie = document.createElement("li");
            let moviediv = document.createElement("div");
            let backdrop = document.createElement("img");
            backdrop.setAttribute("src", IMAGEURL + element.backdrop_path);
            let title = document.createElement("h4");
            title.innerText = element.title;
            let rate = document.createElement("span");
            rate.innerText = "★ " + element.vote_average;
            moviediv.appendChild(backdrop);
            moviediv.appendChild(title);
            moviediv.appendChild(rate);
            movie.appendChild(moviediv);
            topRated.appendChild(movie);
        });
    });

const upComingURL = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + APIKEY + "&language=en-US&page=1"
const upComing = document.getElementById("upComing");
fetch(upComingURL, options)
    .then(response => response.json())
    .then(response => {
        response.results.forEach(element => {
            let movie = document.createElement("li");
            let moviediv = document.createElement("div");
            let backdrop = document.createElement("img");
            backdrop.setAttribute("src", IMAGEURL + element.backdrop_path);
            let title = document.createElement("h4");
            title.innerText = element.title;
            let rate = document.createElement("span");
            rate.innerText = "★ " + element.vote_average;
            moviediv.appendChild(backdrop);
            moviediv.appendChild(title);
            moviediv.appendChild(rate);
            movie.appendChild(moviediv);
            upComing.appendChild(movie);
        });
    });