import { addItemToCart } from './cart.js';

const pizzaData = {
  grande: {
    basePrice: 48.0,
    options: [
      { id: '1sabor', label: '1 Sabor', maxChoices: 1, img: 'https://obrima.com.br/wp-content/uploads/2023/12/pizza-calabresa-O-Brima.webp' },
      { id: '2sabores', label: '2 Sabores', maxChoices: 2, img: 'https://obrima.com.br/wp-content/uploads/2023/12/pizza-meia-calabresa-meia-mussarela-O-Brima.webp' },
    ],
    sizes: ['grande', 'broto'],
    brotoBasePrice: 30.0,
  },
  sabores: [
    { id: 'mussarela', label: 'Mussarela', price: 0 },
    { id: 'calabresa', label: 'Calabresa', price: 5 },
    { id: 'portuguesa', label: 'Portuguesa', price: 7 },
    { id: 'frango', label: 'Frango', price: 6 },
    { id: 'quatro_queijos', label: 'Quatro Queijos', price: 8 },
    { id: 'pepperoni', label: 'Pepperoni', price: 9 },
  ],
};

let currentSelection = {
  size: 'grande',
  option: '1sabor',
  sabores: [],
};

function createOptionRadio(option) {
  const label = document.createElement('label');
  label.className = 'option-card large-option-card';
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'pizzaOption';
  input.value = option.id;
  if (option.id === '1sabor') input.checked = true;
  input.addEventListener('change', () => {
    currentSelection.option = input.value;
    currentSelection.sabores = [];
    renderSabores();
    updateSelectedOptions();
  });
  label.appendChild(input);
  const img = document.createElement('img');
  img.src = option.img;
  img.alt = option.label;
  label.appendChild(img);
  const span = document.createElement('span');
  span.className = 'option-label';
  span.textContent = option.label;
  label.appendChild(span);
  return label;
}

function createSizeRadio(size) {
  const label = document.createElement('label');
  label.className = 'option-card';
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'pizzaSize';
  input.value = size;
  if (size === 'grande') input.checked = true;
  input.addEventListener('change', () => {
    currentSelection.size = input.value;
    renderSabores();
    updateSelectedOptions();
  });
  label.appendChild(input);
  const span = document.createElement('span');
  span.className = 'option-label';
  span.textContent = size.charAt(0).toUpperCase() + size.slice(1);
  label.appendChild(span);
  return label;
}

function createSaborCheckbox(sabor) {
  const label = document.createElement('label');
  label.className = 'option-card';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.value = sabor.id;
  input.addEventListener('change', () => {
    if (input.checked) {
      if (currentSelection.sabores.length < getMaxChoices()) {
        currentSelection.sabores.push(sabor);
        label.classList.add('selected');
      } else {
        input.checked = false;
        alert(`Você pode escolher no máximo ${getMaxChoices()} sabor(es).`);
      }
    } else {
      currentSelection.sabores = currentSelection.sabores.filter(s => s.id !== sabor.id);
      label.classList.remove('selected');
    }
  });
  label.appendChild(input);
  const span = document.createElement('span');
  span.className = 'option-label';
  span.textContent = `${sabor.label} (+R$${sabor.price.toFixed(2)})`;
  label.appendChild(span);
  return label;
}

function getMaxChoices() {
  const option = pizzaData.grande.options.find(o => o.id === currentSelection.option);
  return option ? option.maxChoices : 1;
}

function renderOptions(container) {
  container.innerHTML = '<h3>Opções</h3>';
  pizzaData.grande.options.forEach(option => {
    container.appendChild(createOptionRadio(option));
  });
}

function renderSizes(container) {
  container.innerHTML = '<h3>Tamanhos</h3>';
  pizzaData.grande.sizes.forEach(size => {
    container.appendChild(createSizeRadio(size));
  });
}

function renderSabores() {
  const saboresContainer = document.getElementById('pizzaSabores');
  saboresContainer.innerHTML = '<h3>Sabores</h3>';
  const grid = document.createElement('div');
  grid.className = 'options-grid';
  pizzaData.sabores.forEach(sabor => {
    grid.appendChild(createSaborCheckbox(sabor));
  });
  saboresContainer.appendChild(grid);
}

function updateSelectedOptions() {
  // Update selected class for options and sizes
  const optionRadios = document.querySelectorAll('input[name="pizzaOption"]');
  optionRadios.forEach(radio => {
    if (radio.checked) {
      radio.parentElement.classList.add('selected');
    } else {
      radio.parentElement.classList.remove('selected');
    }
  });
  const sizeRadios = document.querySelectorAll('input[name="pizzaSize"]');
  sizeRadios.forEach(radio => {
    if (radio.checked) {
      radio.parentElement.classList.add('selected');
    } else {
      radio.parentElement.classList.remove('selected');
    }
  });
}

function calculatePrice() {
  if (currentSelection.sabores.length === 0) return 0;
  const basePrice = currentSelection.size === 'grande' ? pizzaData.grande.basePrice : pizzaData.grande.brotoBasePrice;
  if (currentSelection.option === '1sabor') {
    const saborPrice = currentSelection.sabores[0].price;
    return basePrice + saborPrice;
  } else if (currentSelection.option === '2sabores') {
    const maxSaborPrice = Math.max(...currentSelection.sabores.map(s => s.price));
    return basePrice + maxSaborPrice;
  }
  return basePrice;
}

function render(container) {
  container.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = 'Pizza';
  container.appendChild(title);

  const optionsDiv = document.createElement('div');
  optionsDiv.id = 'pizzaOptions';
  container.appendChild(optionsDiv);
  renderOptions(optionsDiv);

  const sizesDiv = document.createElement('div');
  sizesDiv.id = 'pizzaSizes';
  container.appendChild(sizesDiv);
  renderSizes(sizesDiv);

  const saboresDiv = document.createElement('div');
  saboresDiv.id = 'pizzaSabores';
  container.appendChild(saboresDiv);
  renderSabores();

  const addButton = document.createElement('button');
  addButton.textContent = 'Adicionar ao Carrinho';
  addButton.addEventListener('click', () => {
    if (currentSelection.sabores.length === 0) {
      alert('Por favor, selecione pelo menos um sabor.');
      return;
    }
    const price = calculatePrice();
    const item = {
      category: 'Pizza',
      size: currentSelection.size,
      option: currentSelection.option,
      sabores: [...currentSelection.sabores],
      price,
    };
    addItemToCart(item);
    alert('Pizza adicionada ao carrinho!');
  });
  container.appendChild(addButton);
  updateSelectedOptions();
}

export function initPizza() {
  const container = document.getElementById('pizza');
  render(container);
}
