window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  const starLink = document.querySelector('.hiddenStar');
  if (localStorage.getItem('favsMovies')) {
    starLink.classList.toggle('hiddenStar')
  }


  fetch('http://localhost:3031/api/movies')
    .then(res => {
      return res.json();
    })
    .then((peliculas) => {
      let data = peliculas.data;

      data.forEach((movie) => {
        const link = document.createElement('a');
        const linkText = document.createElement('p');
        linkText.setAttribute("class", "moreLink");
        linkText.textContent = "Ver más";
        link.appendChild(linkText);
        link.setAttribute('href', `http://localhost:3031/formulario?id=${movie.id}`);

        const star = document.createElement('i');
        star.setAttribute('class', 'fa-solid fa-star homeStar')
        star.setAttribute('id', movie.id)


        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        container.appendChild(card);
        card.appendChild(star);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
        card.appendChild(link);
      });

      const favoriteStars = document.querySelectorAll('.homeStar');
      let favoriteToStorage = [];

      favoriteStars.forEach(star => {
        const localFavsMovies = localStorage.getItem('favsMovies');

        if (localFavsMovies) {
          const parsedLocalMoviesFavsJSON = JSON.parse(localFavsMovies)
          parsedLocalMoviesFavsJSON.forEach(movie => {
            if (movie.id == star.getAttribute("id")) star.classList.add('activeFavMovie')
          })
         

          star.addEventListener('click', function (e) {
            if (this.classList.contains('activeFavMovie')) {
              this.classList.toggle('activeFavMovie');
              let filteredFavs = parsedLocalMoviesFavsJSON.filter(movie => movie.id != this.getAttribute("id"));
              localStorage.setItem('favsMovies', JSON.stringify(filteredFavs));
            } else {
              this.classList.toggle('activeFavMovie');
              let favMovie = {
                id: +this.getAttribute("id")
              };

              parsedLocalMoviesFavsJSON.push(favMovie);
              localStorage.setItem('favsMovies', JSON.stringify(parsedLocalMoviesFavsJSON));
              starLink.classList.remove('hiddenStar')
            }
          });
        } else {
          star.addEventListener('click', function (e) {
            this.classList.toggle('activeFavMovie');
            let favMovie = {
              id: +this.getAttribute("id")
            };
            favoriteToStorage.push(favMovie);
            localStorage.setItem('favsMovies', JSON.stringify(favoriteToStorage));
          });
        }
        
      });
    })
    .catch(err => {
      console.log(err.message);
    });
};