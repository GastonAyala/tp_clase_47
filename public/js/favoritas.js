window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  const maintitle = document.querySelector('.main');
  const clearStorage = app.querySelector('span')
  
  clearStorage.style.cursor = "pointer"
  clearStorage.addEventListener('click', function() {
    localStorage.clear()
    location.reload()
  })

  if (!localStorage.getItem('favsMovies')) {
    maintitle.innerText = "Aún no tienes películas favoritas";
  } else {
    maintitle.innerText = "Mis películas favoritas";
  }

  fetch('http://localhost:3031/api/movies')
    .then(res => {
      return res.json();
    })
    .then((peliculas) => {
      const data = peliculas.data;
      const localFavMovies = localStorage.getItem('favsMovies')
      const parsedLocalMoviesFavsJSON = JSON.parse(localFavMovies)
      let favoriteMovies = [];
      for (let i = 0; i < data.length; i++) {
        const movie = data[i];
        for (let i = 0; i < parsedLocalMoviesFavsJSON.length; i++) {
          const localMovie = parsedLocalMoviesFavsJSON[i];

          if (movie.id == localMovie.id) {
            favoriteMovies.push(movie)
          }
        }
      }

      favoriteMovies.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        const link = document.createElement('a');
        const linkText = document.createElement('p');
        linkText.setAttribute("class", "moreLink");
        linkText.textContent = "Ver más";
        link.appendChild(linkText);
        link.setAttribute('href', `http://localhost:3031/formulario?id=${movie.id}`);


        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
        card.appendChild(link);
      })
    }
  );
};