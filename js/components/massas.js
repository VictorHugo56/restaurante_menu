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
};

function createOption(value, label, type = 'radio', name = '') {
  const wrapper = document.createElement('label');
  wrapper.className = 'option-card';
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.value = value;
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

  // Tamanhos (radio buttons)
  const tamanhoTitle = document.createElement('h3');
  tamanhoTitle.textContent = 'Tamanhos';
  container.appendChild(tamanhoTitle);
  massasData.tamanhos.forEach(tamanho => {
    const option = createOption(
      tamanho.id,
      `${tamanho.label} - R$ ${tamanho.price.toFixed(2)}`,
      'radio',
      'tamanhoMacarrao'
    );
    container.appendChild(option);
  });

  // Tipo de macarrão (radio buttons)
  const tipoTitle = document.createElement('h3');
  tipoTitle.textContent = 'Tipo de Macarrão';
  container.appendChild(tipoTitle);
  massasData.tipos.forEach(tipo => {
    const option = createOption(tipo.id, tipo.label, 'radio', 'tipoMacarrao');
    container.appendChild(option);
  });

  // Acompanhamentos (checkboxes)
  const acompanhamentoTitle = document.createElement('h3');
  acompanhamentoTitle.textContent = 'Acompanhamentos';
  container.appendChild(acompanhamentoTitle);
  massasData.acompanhamentos.forEach(acomp => {
    const option = createOption(acomp.id, acomp.label, 'checkbox', 'acompanhamentos');
    container.appendChild(option);
  });

  // Molhos (checkboxes, max 2)
  const molhoTitle = document.createElement('h3');
  molhoTitle.textContent = 'Molhos (Escolha 1 ou 2)';
  container.appendChild(molhoTitle);
  massasData.molhos.forEach(molho => {
    const option = createOption(molho.id, molho.label, 'checkbox', 'molhos');
    container.appendChild(option);
  });

  // Add to cart button
  const button = document.createElement('button');
  button.textContent = 'Adicionar ao Carrinho';
  button.addEventListener('click', () => {
    const tipo = container.querySelector('input[name="tipoMacarrao"]:checked');
    const tamanho = container.querySelector('input[name="tamanhoMacarrao"]:checked');
    const acompanhamentos = Array.from(container.querySelectorAll('input[name="acompanhamentos"]:checked'));
    const molhos = Array.from(container.querySelectorAll('input[name="molhos"]:checked'));

    if (!tipo) {
      alert('Por favor, selecione o tipo de macarrão.');
      return;
    }
    if (!tamanho) {
      alert('Por favor, selecione o tamanho.');
      return;
    }
    const tamanhoData = massasData.tamanhos.find(t => t.id === tamanho.value);
    if (acompanhamentos.length > tamanhoData.maxAcompanhamentos) {
      alert(`O tamanho ${tamanhoData.label} permite no máximo ${tamanhoData.maxAcompanhamentos} acompanhamentos.`);
      return;
    }
    if (molhos.length === 0 || molhos.length > 2) {
      alert('Por favor, selecione 1 ou 2 molhos.');
      return;
    }

    const acompanhamentosLabels = acompanhamentos.map(input => {
      const acomp = massasData.acompanhamentos.find(a => a.id === input.value);
      return acomp ? acomp.label : '';
    });

    const molhosLabels = molhos.map(input => {
      const molho = massasData.molhos.find(m => m.id === input.value);
      return molho ? molho.label : '';
    });

    const item = {
      category: 'Macarrão',
      tipo: massasData.tipos.find(t => t.id === tipo.value),
      tamanho: tamanhoData,
      acompanhamentos: acompanhamentosLabels,
      molhos: molhosLabels,
      price: tamanhoData.price,
    };

    addItemToCart(item);
    alert('Macarrão adicionado ao carrinho!');
  });
  container.appendChild(button);
}

export function initMassas() {
  const container = document.getElementById('massas');
  render(container);
}
