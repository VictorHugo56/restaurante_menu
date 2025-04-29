import { addItemToCart } from './cart.js';

const bebidasData = [
  { id: 'coca_retornavel', label: 'Coca retornável', price: 10.0 },
  { id: 'it_guarana', label: 'It guaraná', price: 7.0 },
  { id: 'it_limao', label: 'It limão', price: 7.0 },
  { id: 'it_laranja', label: 'It laranja', price: 7.0 },
  { id: 'coca_200ml', label: 'Coca de 200ml', price: 3.0 },
  { id: 'guaraviton', label: 'Guaraviton', price: 4.0 },
  { id: 'pochito_maracuja', label: 'Pochito de maracujá', price: 3.0 },
  { id: 'pochito_laranja', label: 'Pochito de laranja', price: 3.0 },
  { id: 'suco_maracuja', label: 'Suco natural maracujá', price: 5.0 },
  { id: 'suco_goiaba', label: 'Suco natural goiaba', price: 5.0 },
];

function createBebidaCard(item) {
  const label = document.createElement('label');
  label.className = 'option-card';
  const span = document.createElement('span');
  span.className = 'option-label';
  span.textContent = `${item.label} - R$ ${item.price.toFixed(2)}`;
  label.appendChild(span);
  const button = document.createElement('button');
  button.textContent = 'Adicionar ao Carrinho';
  button.addEventListener('click', () => {
    addItemToCart({
      category: 'Bebida',
      id: item.id,
      name: item.label,
      price: item.price,
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
    grid.appendChild(createBebidaCard(item));
  });
  container.appendChild(grid);
}

export function initBebidas() {
  const container = document.getElementById('bebidas');
  render(container);
}

