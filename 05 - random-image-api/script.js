
const button = document.querySelector('.btn')
const image = document.querySelector('.img')
  
    button.addEventListener('click', () => {
      getRandomCatImage()
        .then(imageUrl => {
            image.src = imageUrl;
        })
        .catch(error => {
          console.error('Error fetching random cat image:', error);
        });
    });
  
    function getRandomCatImage() {
      const apiUrl = 'https://api.thecatapi.com/v1/images/search';
      return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0 && data[0].url) {
            return data[0].url;
          } else {
            throw new Error('No cat image found in API response.');
          }
        });
    };

  