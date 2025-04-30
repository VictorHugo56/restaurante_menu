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

function createOptionCheckbox(item, onChange, isChecked = false) {
  const label = document.createElement('label');
  label.className = 'option-card';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = isChecked;
  checkbox.addEventListener('change', () => {
    onChange(item, checkbox.checked);
  });
  label.appendChild(checkbox);

  const span = document.createElement('span');
  span.textContent = item.label + (item.price ? ` - R$ ${item.price.toFixed(2)}` : '');
  label.appendChild(span);

  return label;
}

function createOptionCard(item, onClick) {
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
    onClick(item);
  });
  label.appendChild(button);

  return label;
}

function render(container) {
  container.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = 'Esfihas';
  container.appendChild(title);

  let selectedEsfiha = null;
  const selectedAdicionais = new Set();

  // Modal container
  const modal = document.createElement('div');
  modal.id = 'esfiha-modal';
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';

  const modalContent = document.createElement('div');
  modalContent.style.backgroundColor = '#fff';
  modalContent.style.padding = '20px';
  modalContent.style.borderRadius = '8px';
  modalContent.style.maxWidth = '400px';
  modalContent.style.width = '90%';
  modalContent.style.maxHeight = '80%';
  modalContent.style.overflowY = 'auto';
  modal.appendChild(modalContent);

  container.appendChild(modal);

  function openModal(item) {
    selectedEsfiha = item;
    selectedAdicionais.clear();
    modalContent.innerHTML = '';

    const header = document.createElement('h3');
    header.textContent = `Personalize sua Esfiha: ${item.label}`;
    modalContent.appendChild(header);

    const adicionaisTitle = document.createElement('h4');
    adicionaisTitle.textContent = 'Adicionais';
    modalContent.appendChild(adicionaisTitle);

    esfihasData.adicional.forEach(adicional => {
      const checkbox = createOptionCheckbox(adicional, (adicional, checked) => {
        if (checked) {
          selectedAdicionais.add(adicional);
        } else {
          selectedAdicionais.delete(adicional);
        }
      });
      modalContent.appendChild(checkbox);
    });

    const addButton = document.createElement('button');
    addButton.textContent = 'Adicionar ao Carrinho';
    addButton.addEventListener('click', () => {
      const adicionaisArray = Array.from(selectedAdicionais);
      const totalPrice = selectedEsfiha.price + adicionaisArray.reduce((sum, item) => sum + item.price, 0);
      addItemToCart({
        category: 'Esfiha',
        id: selectedEsfiha.id,
        sabor: selectedEsfiha,
        adicionais: adicionaisArray,
        price: totalPrice,
      });
      alert('Esfiha com adicionais adicionada ao carrinho!');
      closeModal();
    });
    modalContent.appendChild(addButton);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cancelar';
    closeButton.style.marginLeft = '10px';
    closeButton.addEventListener('click', closeModal);
    modalContent.appendChild(closeButton);

    modal.style.display = 'flex';
  }

  function closeModal() {
    modal.style.display = 'none';
    selectedEsfiha = null;
    selectedAdicionais.clear();
  }

  // Render salgados and doces as selectable options
  const salgadosTitle = document.createElement('h3');
  salgadosTitle.textContent = 'Salgados';
  container.appendChild(salgadosTitle);

  const salgadosGrid = document.createElement('div');
  salgadosGrid.className = 'options-grid';
  esfihasData.salgados.forEach(item => {
    const card = createOptionCard(item, openModal);
    salgadosGrid.appendChild(card);
  });
  container.appendChild(salgadosGrid);

  const docesTitle = document.createElement('h3');
  docesTitle.textContent = 'Doces';
  container.appendChild(docesTitle);

  const docesGrid = document.createElement('div');
  docesGrid.className = 'options-grid';
  esfihasData.doces.forEach(item => {
    const card = createOptionCard(item, openModal);
    docesGrid.appendChild(card);
  });
  container.appendChild(docesGrid);
}

export function initEsfihas() {
  const container = document.getElementById('esfihas');
  render(container);
}
