import { addItemToCart } from './cart.js';

const bebidasData = [
  { id: 'ponchito_laranja', label: 'Ponchito Laranja', price: 3.0, img: 'images/bebidas/ponchito_laranja.jpg' },
  { id: 'ponchito_maracuja', label: 'Ponchito Maracujá', price: 3.0, img: 'images/bebidas/ponchito_maracuja.jpg' },
  { id: 'coca_200', label: 'Coca 200ML', price: 3.0, img: 'images/bebidas/coca_200.jpg' },
  { id: 'guaraviton', label: 'Guaraviton', price: 4.0, img: 'images/bebidas/guaraviton.jpg' },
  { id: 'coca_ret', label: 'Coca Cola Retornável', price: 10.0, img: 'images/bebidas/coca_ret.jpg' },
  { id: 'it_laranja', label: 'It de Laranja 2L', price: 7.0, img: 'images/bebidas/it_laranja.jpg' },
  { id: 'it_guarana', label: 'It de Guaraná 2L', price: 7.0, img: 'images/bebidas/it_guarana.jpg' },
  { id: 'it_limao', label: 'It de Limão 2L', price: 7.0, img: 'images/bebidas/it_limao.jpg' },
  { id: 'natural_maracuja', label: 'Suco natual de Maracujá', price: 5.0, img: 'images/bebidas/natural_maracuja.jpg' },
  { id: 'natural_goiaba', label: 'Suco natural de Goiaba', price: 5.0, img: 'images/bebidas/natural_goiaba.jpg' },
];

function createOptionCard(item) {
  const label = document.createElement('label');
  label.className = 'option-card';

  if (item.img) {
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.label;
    img.className = 'option-image';
    label.appendChild(img);
  }

  const span = document.createElement('span');
  span.className = 'option-label';
  span.textContent = `${item.label} - R$ ${item.price.toFixed(2)}`;
  label.appendChild(span);

  const button = document.createElement('button');
  button.textContent = 'Selecionar';
  button.addEventListener('click', () => {
    addItemToCart({
      category: 'Bebida',
      id: item.id,
      name: item.label,
      price: item.price,
      img: item.img,
    });
    alert('Bebida adicionada ao carrinho!');
  });
  label.appendChild(button);

  return label;
}

function render(container) {
  container.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = 'Bebidas';
  container.appendChild(title);

  const grid = document.createElement('div');
  grid.className = 'options-grid';

  bebidasData.forEach(item => {
    const card = createOptionCard(item);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

export function initBebidas() {
  const container = document.getElementById('bebidas');
  render(container);
}
