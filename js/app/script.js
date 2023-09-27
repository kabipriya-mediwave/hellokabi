// let favMovies = [
    //   {
    //     id: '1694415809280',
    //     title: 'Matrix',
    //     releaseDate: '1998',
    //     isEdit: false,
    //   },
    //   {
    //     id: '1694415816447',
    //     title: 'Ghost in the Shell',
    //     releaseDate: '1994',
    //     isEdit: false,
    //   },
    //   {
    //     id: '1694415816450',
    //     title: 'Jurassic Park',
    //     releaseDate: '1995',
    //     isEdit: false,
    //   }
    // ];
    
    let favMovies = []
    
    /**
     * <div class="movie-card">
          <h2>Matrix</h2>
          <h3>1998</h3>
        </div>
     *
     */
    function makeMovieDiv(movie) {
    
      if (movie.isEdit) {
        // show edit form
        const div = document.createElement('div')
        div.setAttribute('class', 'movie-card')
    
        /**
        <input type="text" name="movie-name"
          placeholder="Enter movie name"
          id="movie-name"
          value="Ghost"/>
    
        <input type="number" name="movie-year"
          placeholder="Enter movie year"
          id="movie-year"
          value="1998"/>
    
        <button>Update</button>
         */
    
        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text')
        nameInput.setAttribute('name', `edit-${movie.id}-name`)
        nameInput.setAttribute('placeholder', 'Enter movie name')
        nameInput.setAttribute('id', `edit-${movie.id}-name`)
        nameInput.setAttribute('value', movie.title)
    
        const yearInput = document.createElement('input');
        yearInput.setAttribute('type', 'number')
        yearInput.setAttribute('name', `edit-${movie.id}-year`)
        yearInput.setAttribute('placeholder', 'Enter movie year')
        yearInput.setAttribute('id', `edit-${movie.id}-year`)
        yearInput.setAttribute('value', movie.releaseDate)
    
        const button = document.createElement('button')
        button.innerText = 'Update movie'
    
        button.addEventListener('click', function() {
          const newTitle = document.querySelector(`#edit-${movie.id}-name`).value
          const newYear = document.querySelector(`#edit-${movie.id}-year`).value
    
          const toUpdateIndex = favMovies.findIndex((m) => m.id == movie.id)
          if (toUpdateIndex != -1) {
            favMovies[toUpdateIndex]['title'] = newTitle
            favMovies[toUpdateIndex]['releaseDate'] = newYear
            favMovies[toUpdateIndex]['isEdit'] = false
            updateMovieListUI()
          }
        })
    
        div.appendChild(nameInput)
        div.appendChild(yearInput)
        div.appendChild(button)
    
        return div;
      } else {
        // show card
        // outer div
        const div = document.createElement('div')
        div.setAttribute('class', 'movie-card')
    
        const id = `movie-${movie['id']}`
        div.setAttribute('id', id)
    
        // title
        const h2 = document.createElement('h2')
        h2.innerText = movie['title'];
    
        const h3 = document.createElement('h3')
        h3.innerText = movie['releaseDate']
    
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = '❌';
        deleteBtn.addEventListener('click', function() {
          removeMovie(movie['id'])
        })
    
        const editBtn = document.createElement('button');
        editBtn.innerText = '✐';
        editBtn.addEventListener('click', function() {
          editMovie(movie['id'])
        })
    
        div.appendChild(h2)
        div.appendChild(h3)
        div.appendChild(deleteBtn)
        div.appendChild(editBtn)
    
    
        return div;
      }
    }
    
    function removeMovie(movieId) {
      console.log('Deleting ', movieId)
      // const filteredArray = favMovies.filter(function(movie) {
      //   return movie.id != movieId
      // })
      const filteredArray = favMovies.filter((movie) => movie.id != movieId)
      favMovies = filteredArray;
      updateMovieListUI()
    }
    
    function editMovie(movieId) {
      console.log('Editing ', movieId)
      const toEditIndex = favMovies.findIndex((movie) => movie.id == movieId)
      if (toEditIndex != -1) {
        favMovies[toEditIndex]['isEdit'] = true
        updateMovieListUI()
      }
    }
    
    function addMovie(movie) {
      favMovies.push(movie)
      updateMovieListUI()
      saveToLocalStorage()
    }
    
    function appendToApp(movieDiv) {
      const app = document.querySelector('#app');
      app.appendChild(movieDiv)
    }
    
    function clearApp() {
      const app = document.querySelector('#app');
      app.innerHTML = ''
    }
    
    function updateMovieListUI() {
      clearApp()
      for(let i=0 ;i<favMovies.length; i++) {
        const movieDiv = makeMovieDiv(favMovies[i])
        appendToApp(movieDiv)
      }
    }
    
    function hookForm() {
      const form = document.querySelector('#add-movie-form')
      form.addEventListener('submit', function(e) {
        e.preventDefault()
        const name = document.querySelector('#movie-name').value
        const year = document.querySelector('#movie-year').value
    
        /**
        {
          id: '1694415809280',
          title: 'Matrix',
          releaseDate: '1998'
        }
        **/
        const movie = {
          id: new Date().getTime(),
          title: name,
          releaseDate: year,
          isEdit: false
        }
        addMovie(movie);
      })
    }
    
    function saveToLocalStorage() {
      const str = JSON.stringify(favMovies)
      localStorage.setItem('my-movie-list', str)
    }
    
    function getFromLocalStorage() {
      const str = localStorage.getItem('my-movie-list')
      if (!str) {
        favMovies =  []
      } else {
        favMovies = JSON.parse(str)
      }
    }
    
    // start of app
    getFromLocalStorage()
    updateMovieListUI()
    hookForm()
    
    // C - create
    // R - read
    // U - update
    // D - delete