import { addItemToCart } from './cart.js';

const esfihasData = {
  salgados: [
    { id: 'carne', label: 'Carne', price: 3.0, img: 'images/esfihas/carne.jpg' },
    { id: 'frango', label: 'Frango', price: 3.0, img: 'images/esfihas/frango.jpg' },
    { id: 'queijo', label: 'Queijo', price: 3.0, img: 'images/esfihas/queijo.jpg' },
    { id: 'calabresa', label: 'Calabresa', price: 3.0, img: 'images/esfihas/calabresa.jpg' },
    { id: 'carne_queijo', label: 'Carne com Queijo', price: 4.0, img: 'images/esfihas/carne_queijo.jpg' },
    { id: 'carne_catupiry', label: 'Carne com Catupiry', price: 4.0, img: 'images/esfihas/carne_catupiry.jpg' },
    { id: 'carne_cheddar', label: 'Carne com Cheddar', price: 4.0, img: 'images/esfihas/carne_cheddar.jpg' },
    { id: 'frango_queijo', label: 'Frango com Queijo', price: 4.0, img: 'images/esfihas/frango_queijo.jpg' },
    { id: 'frango_catupiry', label: 'Frango com Catupiry', price: 4.0, img: 'images/esfihas/frango_catupiry.jpg' },
    { id: 'frango_cheddar', label: 'Frango com Cheddar', price: 4.0, img: 'images/esfihas/frango_cheddar.jpg' },
    { id: 'calabresa_queijo', label: 'Calabresa com Queijo', price: 4.0, img: 'images/esfihas/calabresa_queijo.jpg' },
    { id: 'calabresa_catupiry', label: 'Calabresa com Catupiry', price: 4.0, img: 'images/esfihas/calabresa_catupiry.jpg' },
    { id: 'calabresa_cheddar', label: 'Calabresa com Cheddar', price: 4.0, img: 'images/esfihas/calabresa_cheddar.jpg' },
    { id: 'portuguesa', label: 'Portuguesa', price: 4.0, img: 'images/esfihas/portuguesa.jpg' },
    { id: 'tres_queijos', label: '3 Queijos', price: 4.0, img: 'images/esfihas/tres_queijos.jpg' },
    { id: 'carne_seca_queijo', label: 'Carne Seca com Queijo', price: 5.0, img: 'images/esfihas/carne_seca_queijo.jpg' },
    { id: 'carne_seca_catupiry', label: 'Carne Seca com Catupiry', price: 5.0, img: 'images/esfihas/carne_seca_catupiry.jpg' },
    { id: 'carne_seca_cheddar', label: 'Carne Seca com Cheddar', price: 5.0, img: 'images/esfihas/carne_seca_cheddar.jpg' },
  ],
  doces: [
    { id: 'doce_de_leite', label: 'Doce de Leite', price: 4.5, img: 'images/esfihas/doce_de_leite.jpg' },
    { id: 'brigadeiro', label: 'Brigadeiro', price: 4.5, img: 'images/esfihas/brigadeiro.jpg' },
    { id: 'nutella', label: 'Nutella', price: 4.5, img: 'images/esfihas/nutella.jpg' },
    { id: 'brigadeiro_mm', label: 'Brigadeiro com MM', price: 4.5, img: 'images/esfihas/brigadeiro_mm.jpg' },
    { id: 'romeu_julieta', label: 'Romeu e Julieta', price: 4.5, img: 'images/esfihas/romeu_julieta.jpg' },
  ],
  adicional: [
    { id: 'calabresa', label: 'Calabresa', price: 2.0 },
    { id: 'bacon', label: 'Bacon', price: 2.0 },
    { id: 'queijo', label: 'Queijo', price: 2.0 },
    { id: 'presunto', label: 'Presunto', price: 2.0 },
    { id: 'carne', label: 'Carne', price: 2.0 },
    { id: 'frango', label: 'Frango', price: 2.0 },
    { id: 'milho', label: 'Milho', price: 2.0 },
    { id: 'azeitona', label: 'Azeitona', price: 2.0 },
    { id: 'catupiry', label: 'Catupiry', price: 2.0 },
    { id: 'cheddar', label: 'Cheddar', price: 2.0 },
  ],
};

function createOptionCard(item, onClick, isSelected = false, isCheckbox = false) {
  const label = document.createElement('label');
  label.className = 'option-card';
  if (isSelected) {
    label.classList.add('selected');
  }

  // Create image element
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

  if (isCheckbox) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isSelected;
    checkbox.addEventListener('change', () => {
      onClick(item, checkbox.checked);
      label.classList.toggle('selected', checkbox.checked);
    });
    label.insertBefore(checkbox, span);
  } else {
    const button = document.createElement('button');
    button.textContent = 'Selecionar';
    button.addEventListener('click', () => {
      onClick(item);
    });
    label.appendChild(button);
  }

  return label;
}

function render(container) {
  container.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = 'Esfihas';
  container.appendChild(title);

  // State to track selected esfiha and adicionais
  let selectedEsfiha = null;
  const selectedAdicionais = new Set();

  // Function to render adicionais section
  function renderAdicionais() {
    // Remove existing adicionais section if any
    const existingAdicionalSection = container.querySelector('#adicional-section');
    if (existingAdicionalSection) {
      container.removeChild(existingAdicionalSection);
    }
    if (!selectedEsfiha) return;

    const adicionalSection = document.createElement('div');
    adicionalSection.id = 'adicional-section';

    const adicionalTitle = document.createElement('h3');
    adicionalTitle.textContent = 'Adicional';
    adicionalSection.appendChild(adicionalTitle);

    const adicionalGrid = document.createElement('div');
    adicionalGrid.className = 'options-grid';

    esfihasData.adicional.forEach(item => {
      const isSelected = selectedAdicionais.has(item.id);
      const card = createOptionCard(
        item,
        (item, checked) => {
          if (checked) {
            selectedAdicionais.add(item.id);
          } else {
            selectedAdicionais.delete(item.id);
          }
          updateTotalPrice();
        },
        isSelected,
        true
      );
      adicionalGrid.appendChild(card);
    });

    adicionalSection.appendChild(adicionalGrid);

    // Total price display
    const totalPriceDisplay = document.createElement('p');
    totalPriceDisplay.id = 'total-price';
    adicionalSection.appendChild(totalPriceDisplay);

    // Add to cart button
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Adicionar ao Carrinho';
    addToCartButton.addEventListener('click', () => {
      if (!selectedEsfiha) {
        alert('Por favor, selecione uma esfiha.');
        return;
      }
      const adicionaisArray = Array.from(selectedAdicionais).map(id =>
        esfihasData.adicional.find(item => item.id === id)
      );
      const totalPrice = selectedEsfiha.price + adicionaisArray.reduce((sum, item) => sum + item.price, 0);
      addItemToCart({
        category: 'Esfiha',
        id: selectedEsfiha.id,
        sabor: selectedEsfiha,
        adicionais: adicionaisArray,
        price: totalPrice,
      });
      alert('Esfiha com adicionais adicionada ao carrinho!');
      // Reset selections
      selectedEsfiha = null;
      selectedAdicionais.clear();
      render(container);
    });
    adicionalSection.appendChild(addToCartButton);

    container.appendChild(adicionalSection);

    function updateTotalPrice() {
      const adicionaisArray = Array.from(selectedAdicionais).map(id =>
        esfihasData.adicional.find(item => item.id === id)
      );
      const totalPrice = selectedEsfiha.price + adicionaisArray.reduce((sum, item) => sum + item.price, 0);
      totalPriceDisplay.textContent = `Preço total: R$ ${totalPrice.toFixed(2)}`;
    }

    updateTotalPrice();
  }

  // Render salgados and doces as selectable options
  const salgadosTitle = document.createElement('h3');
  salgadosTitle.textContent = 'Salgados';
  container.appendChild(salgadosTitle);

  const salgadosGrid = document.createElement('div');
  salgadosGrid.className = 'options-grid';
  esfihasData.salgados.forEach(item => {
    const card = createOptionCard(item, (item) => {
      selectedEsfiha = item;
      selectedAdicionais.clear();
      renderAdicionais();
      // Highlight selected esfiha
      Array.from(salgadosGrid.children).forEach(child => child.classList.remove('selected'));
      card.classList.add('selected');
      // Also clear selection in doces
      Array.from(docesGrid.children).forEach(child => child.classList.remove('selected'));
    });
    salgadosGrid.appendChild(card);
  });
  container.appendChild(salgadosGrid);

  const docesTitle = document.createElement('h3');
  docesTitle.textContent = 'Doces';
  container.appendChild(docesTitle);

  const docesGrid = document.createElement('div');
  docesGrid.className = 'options-grid';
  esfihasData.doces.forEach(item => {
    const card = createOptionCard(item, (item) => {
      selectedEsfiha = item;
      selectedAdicionais.clear();
      renderAdicionais();
      // Highlight selected doce
      Array.from(docesGrid.children).forEach(child => child.classList.remove('selected'));
      card.classList.add('selected');
      // Also clear selection in salgados
      Array.from(salgadosGrid.children).forEach(child => child.classList.remove('selected'));
    });
    docesGrid.appendChild(card);
  });
  container.appendChild(docesGrid);
}

export function initEsfihas() {
  const container = document.getElementById('esfihas');
  render(container);
}
