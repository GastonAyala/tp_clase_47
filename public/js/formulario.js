window.addEventListener('load', async function() {
    try {
        const inputId = document.querySelector("[name='id']");
        const title = document.querySelector('#title');
        const rating = document.querySelector('#rating');
        const awards = document.querySelector('#awards');
        const release_date = document.querySelector('#release_date');
        const length = document.querySelector('#length');
        const genre = document.querySelector('#genre');
        const formulario = document.querySelector('.formulario')

        const editButton = document.querySelector('.botonAgregar');
        const createButton = document.querySelector('.botonModificar');
        const deleteButton = document.querySelector('.botonBorrar');

        editButton.style.cursor = "pointer"
        createButton.style.cursor = "pointer"
        deleteButton.style.cursor = "pointer"
        
        const query = new URLSearchParams(location.search);
            
        formulario.addEventListener('submit', function(e) {
            e.preventDefault()
        })
        
        if(query.has('id')) {
            const id = query.get('id');
            const {data : movie } = await (await fetch(`http://localhost:3031/api/movies/${id}`)).json();
            inputId.value = movie.id;
            title.value = movie.title;
            genre.innerHTML += `<option value="${movie.genre?.id}">${movie.genre?.name}</option>`;
            rating.value = movie.rating;
            awards.value = movie.awards;
            release_date.value = movie.release_date.split('T', 1)[0];
            length.value = movie.length;

            const captureInputChange = (inputToListen) => {
                inputToListen.addEventListener('change', function(e) {
                    inputToListen.value = this.value
                });
            };

            captureInputChange(title);
            captureInputChange(rating);
            captureInputChange(awards);
            captureInputChange(release_date);
            captureInputChange(length);
            
            // UPDATE
            editButton.addEventListener('click', async function(e) {
                try {;
                    const data = {
                        id: inputId.value,
                        genre_id: genre.value,
                        title: title.value,
                        rating: rating.value,
                        awards: awards.value,
                        release_date: release_date.value,
                        length: length.value,
                    };

                    const settings = {
                        "method": 'PUT',
                        'headers': {
                            "Content-Type": 'application/json',
                        },
                        "body": JSON.stringify(data)
                    };

                    const info = await (await fetch(`http://localhost:3031/api/movies/update/${movie.id}`, settings)).json();
                    alert('Pelicula actualizada con éxito');
                } catch (err) {
                    console.log(err.message);
                }
            });
            createButton.addEventListener('click', function(e) {
                e.preventDefault();
                location.href = "http://localhost:3031/formulario";
            });

            // DELETE
            deleteButton.addEventListener('click', async function(e) {
                e.preventDefault();
                try {
                    const settings = {
                        'method': 'DELETE',
                    };
                    await fetch(`http://localhost:3031/api/movies//delete/${inputId.value}`, settings);
                    alert('Pelicula eliminada con éxito');
                    location.href="http://localhost:3031/";
                } catch (err) {
                    console.log(err.message)
                }
            });
        };

        // CREATE
        const { data } = await (await fetch('http://localhost:3031/api/genres')).json();
        data.forEach(g => {
            genre.innerHTML += `<option value="${g.id}">${g.name}</option>`
        });

        createButton.addEventListener('click', async function() {
            const data = {
                title: title.value,
                genre_id: genre.value,
                rating: rating.value,
                awards: awards.value,
                release_date: release_date.value,
                length: length.value,
            };

            const settings = {
                "method": 'POST',
                'headers': {
                    "Content-Type": 'application/json',
                },
                "body": JSON.stringify(data)
            };

            await fetch('http://localhost:3031/api/movies/create', settings);
            location.href = "http://localhost:3031/";
        })
    } catch (err) {
        console.log(err.message)
    }
});