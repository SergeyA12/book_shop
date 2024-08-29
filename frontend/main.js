const url = 'http://135.181.37.152:3022/all';
async function foo() {
fetch(url)
  .then(response => response.json())
  .then(data => {
    document.getElementsByTagName('button')[0].style.display = "none";
    const div = document.querySelector('#div');

    data.forEach(elm => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-4';

      const card = document.createElement('div');
      card.className = 'card h-100 text-center';

      if (elm.photo) {
        const img = document.createElement('img');
        img.src = elm.photo;
        img.alt = elm.name;
        img.className = 'card-img-top';
        card.appendChild(img);
      }

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';


      const cardTitle = document.createElement('h5');
      cardTitle.className = 'card-title';
      cardTitle.innerText = elm.name;
      cardBody.appendChild(cardTitle);

      const cardText = document.createElement('p');
      cardText.className = 'card-text';
      cardText.innerText = `Price: ${elm.price}`;
      cardBody.appendChild(cardText);



      card.appendChild(cardBody);
      col.appendChild(card);
      div.appendChild(col);
    });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
}