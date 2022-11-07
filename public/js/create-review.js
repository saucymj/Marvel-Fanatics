const heroSearch = async (event) => {
  event.preventDefault();

  const timeStamp = 1;
  const publicKey = 'f79d9f55b6fc2ff8f3d6789530ba6b66';
  const hashValue = 'edc7ae7c8bae7c1213a1628793658da4'
  const queryParameterName = document.querySelector('#name').value;

  const url = `https://gateway.marvel.com:443/v1/public/characters?name=${queryParameterName}&ts=${timeStamp}&apikey=${publicKey}&hash=${hashValue}`

    try {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            showHero(data);
            console.log(data.data.results);
          });
    } catch (err) {
      console.log(err);
    }
};

function showHero(character) {
  const heroString = document.querySelector("#heroList");

  let list = ` <div class="row">
  <div class="col s6 offset-s3">
    <div class="card grey lighten-2">
      <div class="card-image">
        <img src="${character.data.results[0].thumbnail.path}.${character.data.results[0].thumbnail.extension}">
      </div>
      <div class="card-content">
      <div class=" hide hero-id">${character.data.results[0].id}</div>
      <span class="card-title blue-text text-darken-2 ">${character.data.results[0].name}</span>
        <p>${character.data.results[0].description}</p>
      </div>
    </div>
  </div>
</div>`

  heroString.innerHTML = list;

}




document.querySelector("#searchHeroButton").addEventListener("click", heroSearch);
