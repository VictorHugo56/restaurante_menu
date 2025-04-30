import { addItemToCart } from './cart.js';

const massasData = {
  tipos: [
    { id: 'penne', label: 'Penne' },
    { id: 'gravatinha', label: 'Gravatinha' },
    { id: 'espaguete', label: 'Espaguete' },
    { id: 'parafuso', label: 'Parafuso' },
  ],
  acompanhamentos: [
    { id: 'calabresa', label: 'Calabresa' },
    { id: 'bacon', label: 'Bacon' },
    { id: 'queijo', label: 'Queijo' },
    { id: 'presunto', label: 'Presunto' },
    { id: 'carne_moida', label: 'Carne moída' },
    { id: 'frango', label: 'Frango' },
    { id: 'milho', label: 'Milho' },
    { id: 'azeitona', label: 'Azeitona' },
    { id: 'catupiry', label: 'Catupiry' },
    { id: 'cheddar', label: 'Cheddar' },
  ],
  tamanhos: [
    { id: 'p', label: 'P', price: 15.0, maxAcompanhamentos: 4 },
    { id: 'm', label: 'M', price: 20.0, maxAcompanhamentos: 5 },
    { id: 'g', label: 'G', price: 25.0, maxAcompanhamentos: 6 },
  ],
  molhos: [
    { id: 'branco', label: 'Branco' },
    { id: 'vermelho', label: 'Vermelho' },
  ],
  adicional: [
    { id: 'calabresa', label: 'Calabresa', price: 2.0 },
    { id: 'bacon', label: 'Bacon', price: 2.0 },
    { id: 'queijo', label: 'Queijo', price: 2.0 },
    { id: 'presunto', label: 'Presunto', price: 2.0 },
    { id: 'carne_moida', label: 'Carne moída', price: 2.0 },
    { id: 'frango', label: 'Frango', price: 2.0 },
    { id: 'milho', label: 'Milho', price: 2.0 },
    { id: 'azeitona', label: 'Azeitona', price: 2.0 },
    { id: 'catupiry', label: 'Catupiry', price: 2.0 },
    { id: 'cheddar', label: 'Cheddar', price: 2.0 },
  ],
};

function createOption(value, label, type = 'radio', name = '', onChange = null, checked = false) {
  const wrapper = document.createElement('label');
  wrapper.className = 'option-card';
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.value = value;
  if (checked) input.checked = true;
  if (onChange) input.addEventListener('change', onChange);
  wrapper.appendChild(input);
  const span = document.createElement('span');
  span.textContent = label;
  wrapper.appendChild(span);
  return wrapper;
}

function render(container) {
  container.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = 'Macarrão';
  container.appendChild(title);

  let selectedTipo = null;
  let selectedTamanho = null;
  const selectedAcompanhamentos = new Set();
  const selectedMolhos = new Set();
  const selectedAdicionais = new Set();

  // Render tamanhos
  const tamanhoTitle = document.createElement('h3');
  tamanhoTitle.textContent = 'Tamanhos';
  container.appendChild(tamanhoTitle);
  const tamanhoGrid = document.createElement('div');
  tamanhoGrid.className = 'options-grid';
  massasData.tamanhos.forEach(tamanho => {
    const option = createOption(
      tamanho.id,
      `${tamanho.label} - R$ ${tamanho.price.toFixed(2)}`,
      'radio',
      'tamanhoMacarrao',
      (e) => {
        selectedTamanho = massasData.tamanhos.find(t => t.id === e.target.value);
        renderAcompanhamentos();
        renderMolhos();
        renderAdicionais();
        updateAddButton();
      },
      false
    );
    tamanhoGrid.appendChild(option);
  });
  container.appendChild(tamanhoGrid);

  // Render tipos
  const tipoTitle = document.createElement('h3');
  tipoTitle.textContent = 'Tipo de Macarrão';
  container.appendChild(tipoTitle);
  const tipoGrid = document.createElement('div');
  tipoGrid.className = 'options-grid';
  massasData.tipos.forEach(tipo => {
    const option = createOption(
      tipo.id,
      tipo.label,
      'radio',
      'tipoMacarrao',
      (e) => {
        selectedTipo = massasData.tipos.find(t => t.id === e.target.value);
        renderAcompanhamentos();
        renderMolhos();
        renderAdicionais();
        updateAddButton();
      },
      false
    );
    tipoGrid.appendChild(option);
  });
  container.appendChild(tipoGrid);

  // Containers for acompanhamentos, molhos, adicionais
  const acompanhamentosContainer = document.createElement('div');
  const molhosContainer = document.createElement('div');
  const adicionaisContainer = document.createElement('div');
  container.appendChild(acompanhamentosContainer);
  container.appendChild(molhosContainer);
  container.appendChild(adicionaisContainer);

  // Render acompanhamentos (checkboxes)
  function renderAcompanhamentos() {
    acompanhamentosContainer.innerHTML = '';
    if (!selectedTamanho) return;
    const title = document.createElement('h3');
    title.textContent = 'Acompanhamentos';
    acompanhamentosContainer.appendChild(title);

    massasData.acompanhamentos.forEach(acomp => {
      const isChecked = selectedAcompanhamentos.has(acomp.id);
      const option = createOption(
        acomp.id,
        acomp.label,
        'checkbox',
        'acompanhamentos',
        (e) => {
          if (e.target.checked) {
            if (selectedAcompanhamentos.size < selectedTamanho.maxAcompanhamentos) {
              selectedAcompanhamentos.add(acomp.id);
            } else {
              e.target.checked = false;
              alert(`O tamanho ${selectedTamanho.label} permite no máximo ${selectedTamanho.maxAcompanhamentos} acompanhamentos.`);
            }
          } else {
            selectedAcompanhamentos.delete(acomp.id);
          }
          updateAddButton();
        },
        isChecked
      );
      acompanhamentosContainer.appendChild(option);
    });
  }

  // Render molhos (checkboxes, max 2)
  function renderMolhos() {
    molhosContainer.innerHTML = '';
    if (!selectedTamanho) return;
    const title = document.createElement('h3');
    title.textContent = 'Molhos (Escolha 1 ou 2)';
    molhosContainer.appendChild(title);

    massasData.molhos.forEach(molho => {
      const isChecked = selectedMolhos.has(molho.id);
      const option = createOption(
        molho.id,
        molho.label,
        'checkbox',
        'molhos',
        (e) => {
          if (e.target.checked) {
            if (selectedMolhos.size < 2) {
              selectedMolhos.add(molho.id);
            } else {
              e.target.checked = false;
              alert('Por favor, selecione no máximo 2 molhos.');
            }
          } else {
            selectedMolhos.delete(molho.id);
          }
          updateAddButton();
        },
        isChecked
      );
      molhosContainer.appendChild(option);
    });
  }

  // Render adicionais (checkboxes)
  function renderAdicionais() {
    adicionaisContainer.innerHTML = '';
    if (!selectedTamanho) return;
    const title = document.createElement('h3');
    title.textContent = 'Adicional';
    adicionaisContainer.appendChild(title);

    massasData.adicional.forEach(item => {
      const isChecked = selectedAdicionais.has(item.id);
      const option = createOption(
        item.id,
        `${item.label} - R$ ${item.price.toFixed(2)}`,
        'checkbox',
        'adicionais',
        (e) => {
          if (e.target.checked) {
            selectedAdicionais.add(item.id);
          } else {
            selectedAdicionais.delete(item.id);
          }
          updateAddButton();
        },
        isChecked
      );
      adicionaisContainer.appendChild(option);
    });
  }

  // Add to cart button
  const addButton = document.createElement('button');
  addButton.textContent = 'Adicionar ao Carrinho';
  addButton.disabled = true;
  addButton.addEventListener('click', () => {
    if (!selectedTipo) {
      alert('Por favor, selecione o tipo de macarrão.');
      return;
    }
    if (!selectedTamanho) {
      alert('Por favor, selecione o tamanho.');
      return;
    }
    if (selectedAcompanhamentos.size > selectedTamanho.maxAcompanhamentos) {
      alert(`O tamanho ${selectedTamanho.label} permite no máximo ${selectedTamanho.maxAcompanhamentos} acompanhamentos.`);
      return;
    }
    if (selectedMolhos.size === 0 || selectedMolhos.size > 2) {
      alert('Por favor, selecione 1 ou 2 molhos.');
      return;
    }

    const acompanhamentosLabels = Array.from(selectedAcompanhamentos).map(id => {
      const acomp = massasData.acompanhamentos.find(a => a.id === id);
      return acomp ? acomp.label : '';
    });

    const molhosLabels = Array.from(selectedMolhos).map(id => {
      const molho = massasData.molhos.find(m => m.id === id);
      return molho ? molho.label : '';
    });

    const adicionaisArray = Array.from(selectedAdicionais).map(id => {
      return massasData.adicional.find(item => item.id === id);
    });

    const adicionaisPrice = adicionaisArray.reduce((sum, item) => sum + item.price, 0);

    const item = {
      category: 'Macarrão',
      tipo: selectedTipo,
      tamanho: selectedTamanho,
      acompanhamentos: acompanhamentosLabels,
      molhos: molhosLabels,
      adicionais: adicionaisArray,
      price: selectedTamanho.price + adicionaisPrice,
    };

    addItemToCart(item);
    alert('Macarrão adicionado ao carrinho!');
    // Reset selections
    selectedTipo = null;
    selectedTamanho = null;
    selectedAcompanhamentos.clear();
    selectedMolhos.clear();
    selectedAdicionais.clear();
    render(container);
  });
  container.appendChild(addButton);

  function updateAddButton() {
    addButton.disabled = !selectedTipo || !selectedTamanho || selectedMolhos.size === 0 || selectedMolhos.size > 2 || selectedAcompanhamentos.size > selectedTamanho.maxAcompanhamentos;
  }
}

export function initMassas() {
  const container = document.getElementById('massas');
  render(container);
}
