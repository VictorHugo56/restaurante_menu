import { addItemToCart } from './cart.js';

const sobremesasData = [
  { id: 'pudim', label: 'Pudim', price: 10.0, img: 'images/pudim.jpeg' },
  { id: 'brigadeiro', label: 'Brigadeiro', price: 8.0, img: 'images/brigadeiro.jpg' },
  { id: 'mousse', label: 'Mousse', price: 9.0, img: 'images/mousse.jpg' },
  { id: 'bolo_chocolate', label: 'Bolo de Chocolate', price: 12.0, img: 'images/bolo_chocolate.jpg' },
];

function createSobremesaCard(item) {
  const label = document.createElement('label');
  label.className = 'option-card';
  const img = document.createElement('img');
  img.src = item.img;
  img.alt = item.label;
  label.appendChild(img);
  const span = document.createElement('span');
  span.className = 'option-label';
  span.textContent = `${item.label} - R$ ${item.price.toFixed(2)}`;
  label.appendChild(span);
  const button = document.createElement('button');
  button.textContent = 'Adicionar ao Carrinho';
  button.addEventListener('click', () => {
    addItemToCart({
      category: 'Sobremesa',
      id: item.id,
      name: item.label,
      price: item.price,
    });
    alert('Sobremesa adicionada ao carrinho!');
  });
  label.appendChild(button);
  return label;
}

function render(container) {
  container.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = 'Sobremesas';
  container.appendChild(title);

  const grid = document.createElement('div');
  grid.className = 'options-grid';
  sobremesasData.forEach(item => {
    grid.appendChild(createSobremesaCard(item));
  });
  container.appendChild(grid);
}

export function initSobremesas() {
  const container = document.getElementById('sobremesas');
  render(container);
}
