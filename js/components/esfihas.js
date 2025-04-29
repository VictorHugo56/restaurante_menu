import { addItemToCart } from './cart.js';

const esfihasData = {
  salgados: [
    { id: 'carne', label: 'Carne', price: 3.0 },
    { id: 'frango', label: 'Frango', price: 3.0 },
    { id: 'queijo', label: 'Queijo', price: 3.0 },
    { id: 'calabresa', label: 'Calabresa', price: 3.0 },
    { id: 'carne_queijo', label: 'Carne com Queijo', price: 4.0 },
    { id: 'carne_catupiry', label: 'Carne com Catupiry', price: 4.0 },
    { id: 'carne_cheddar', label: 'Carne com Cheddar', price: 4.0 },
    { id: 'frango_queijo', label: 'Frango com Queijo', price: 4.0 },
    { id: 'frango_catupiry', label: 'Frango com Catupiry', price: 4.0 },
    { id: 'frango_cheddar', label: 'Frango com Cheddar', price: 4.0 },
    { id: 'calabresa_queijo', label: 'Calabresa com Queijo', price: 4.0 },
    { id: 'calabresa_catupiry', label: 'Calabresa com Catupiry', price: 4.0 },
    { id: 'calabresa_cheddar', label: 'Calabresa com Cheddar', price: 4.0 },
    { id: 'portuguesa', label: 'Portuguesa', price: 4.0 },
    { id: 'tres_queijos', label: '3 Queijos', price: 4.0 },
    { id: 'carne_seca_queijo', label: 'Carne Seca com Queijo', price: 5.0 },
    { id: 'carne_seca_catupiry', label: 'Carne Seca com Catupiry', price: 5.0 },
    { id: 'carne_seca_cheddar', label: 'Carne Seca com Cheddar', price: 5.0 },
  ],
  doces: [
    { id: 'doce_de_leite', label: 'Doce de Leite', price: 4.5 },
    { id: 'brigadeiro', label: 'Brigadeiro', price: 4.5 },
    { id: 'nutella', label: 'Nutella', price: 4.5 },
    { id: 'brigadeiro_mm', label: 'Brigadeiro com MM', price: 4.5 },
    { id: 'romeu_julieta', label: 'Romeu e Julieta', price: 4.5 },
  ],
};

function createEsfihaCard(item) {
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
      category: 'Esfiha',
      id: item.id,
      sabor: item,
      price: item.price,
    });
    alert('Esfiha adicionada ao carrinho!');
  });
  label.appendChild(button);
  return label;
}

function render(container) {
  container.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = 'Esfihas';
  container.appendChild(title);

  const salgadosTitle = document.createElement('h3');
  salgadosTitle.textContent = 'Salgados';
  container.appendChild(salgadosTitle);

  const salgadosGrid = document.createElement('div');
  salgadosGrid.className = 'options-grid';
  esfihasData.salgados.forEach(item => {
    salgadosGrid.appendChild(createEsfihaCard(item));
  });
  container.appendChild(salgadosGrid);

  const docesTitle = document.createElement('h3');
  docesTitle.textContent = 'Doces';
  container.appendChild(docesTitle);

  const docesGrid = document.createElement('div');
  docesGrid.className = 'options-grid';
  esfihasData.doces.forEach(item => {
    docesGrid.appendChild(createEsfihaCard(item));
  });
  container.appendChild(docesGrid);
}

export function initEsfihas() {
  const container = document.getElementById('esfihas');
  render(container);
}
