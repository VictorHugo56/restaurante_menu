import { getCartItems } from './cart.js';

const whatsappNumber = '5513981343707'; // Brazil country code + number without spaces or symbols

function createInput(labelText, id, type = 'text', required = true) {
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = labelText;
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.name = id;
  if (required) input.required = true;
  label.appendChild(input);
  return label;
}

function createSelect(labelText, id, options, required = true) {
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = labelText;
  const select = document.createElement('select');
  select.id = id;
  select.name = id;
  if (required) select.required = true;
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    select.appendChild(option);
  });
  label.appendChild(select);
  return label;
}

function render(container) {
  container.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = 'Checkout';
  container.appendChild(title);

  const form = document.createElement('form');
  form.id = 'checkoutForm';

  // Customer info fields
  form.appendChild(createInput('Nome:', 'nome'));
  form.appendChild(createInput('Rua:', 'rua'));
  form.appendChild(createInput('Número:', 'numero', 'text'));
  form.appendChild(createInput('Complemento (opcional):', 'complemento', 'text', false));
  // Neighborhood options with labels and fees
  const neighborhoodOptions = [
    { value: '', label: 'Selecione o Bairro', fee: 0 },
    { value: 'vila_ema', label: 'Vila Ema - R$3', fee: 3 },
    { value: 'vila_yolanda', label: 'Vila Yolanda - R$3', fee: 3 },
    { value: 'fazendinha', label: 'Fazendinha - R$3', fee: 3 },
    { value: 'vila_matias', label: 'Vila Matias - R$3', fee: 3 },
    { value: 'portelinha', label: 'Portelinha - R$3', fee: 3 },
    { value: 'vila_nova_sao_vicente', label: 'Vila Nova São Vicente - R$3', fee: 3 },
    { value: 'parque_das_bandeiras', label: 'Parque das Bandeiras - R$3', fee: 3 },
    { value: 'gleba', label: 'Gleba e Samaritá - R$3', fee: 3 },
    { value: 'rio_branco', label: 'Rio Branco - R$5', fee: 5 },
    { value: 'rio_negro', label: 'Rio Negro - R$6', fee: 6 },
    { value: 'quarentenario', label: 'Quarentenário - R$6', fee: 6 },
    { value: 'humaita', label: 'Humaitá - R$8', fee: 8 },
  ];
  form.appendChild(createSelect('Bairro:', 'bairro', neighborhoodOptions));

  // Payment method
  const paymentOptions = [
    { value: '', label: 'Selecione' },
    { value: 'credito', label: 'Crédito' },
    { value: 'debito', label: 'Débito' },
    { value: 'pix', label: 'Pix' },
    { value: 'cartao_refeicao', label: 'Cartão Refeição' },
    { value: 'dinheiro', label: 'Dinheiro' },
  ];
  form.appendChild(createSelect('Forma de pagamento:', 'pagamento', paymentOptions));

  // Troco (change) input, hidden by default
  const trocoDiv = document.createElement('div');
  trocoDiv.id = 'trocoDiv';
  trocoDiv.style.display = 'none';

  const trocoLabel = document.createElement('label');
  trocoLabel.textContent = 'Necessita troco?';

  const trocoSim = document.createElement('input');
  trocoSim.type = 'radio';
  trocoSim.name = 'trocoNecessario';
  trocoSim.value = 'sim';
  trocoSim.id = 'trocoSim';

  const trocoSimLabel = document.createElement('label');
  trocoSimLabel.htmlFor = 'trocoSim';
  trocoSimLabel.textContent = 'Sim';

  const trocoNao = document.createElement('input');
  trocoNao.type = 'radio';
  trocoNao.name = 'trocoNecessario';
  trocoNao.value = 'nao';
  trocoNao.id = 'trocoNao';
  trocoNao.checked = true;

  const trocoNaoLabel = document.createElement('label');
  trocoNaoLabel.htmlFor = 'trocoNao';
  trocoNaoLabel.textContent = 'Não';

  trocoLabel.appendChild(trocoSim);
  trocoLabel.appendChild(trocoSimLabel);
  trocoLabel.appendChild(trocoNao);
  trocoLabel.appendChild(trocoNaoLabel);

  trocoDiv.appendChild(trocoLabel);

  const trocoValorLabel = document.createElement('label');
  trocoValorLabel.htmlFor = 'trocoValor';
  trocoValorLabel.textContent = 'Valor para troco:';

  const trocoValorInput = document.createElement('input');
  trocoValorInput.type = 'number';
  trocoValorInput.id = 'trocoValor';
  trocoValorInput.name = 'trocoValor';
  trocoValorInput.min = '0';
  trocoValorInput.step = '0.01';
  trocoValorInput.disabled = true;

  trocoDiv.appendChild(trocoValorLabel);
  trocoDiv.appendChild(trocoValorInput);

  form.appendChild(trocoDiv);

  // Show/hide troco inputs based on payment method and trocoNecessario
  form.pagamento.addEventListener('change', () => {
    if (form.pagamento.value === 'dinheiro') {
      trocoDiv.style.display = 'block';
    } else {
      trocoDiv.style.display = 'none';
      trocoValorInput.value = '';
      trocoValorInput.disabled = true;
      form.trocoNecessario.value = 'nao';
    }
  });

  form.trocoNecessario.forEach(radio => {
    radio.addEventListener('change', () => {
      if (form.trocoNecessario.value === 'sim') {
        trocoValorInput.disabled = false;
        trocoValorInput.required = true;
      } else {
        trocoValorInput.disabled = true;
        trocoValorInput.required = false;
        trocoValorInput.value = '';
      }
    });
  });

  // Submit button
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Finalizar Pedido';
  form.appendChild(submitBtn);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const nome = formData.get('nome');
    const rua = formData.get('rua');
    const numero = formData.get('numero');
    const complemento = formData.get('complemento') || 'Sem complemento';
    const bairro = formData.get('bairro');
    // Map neighborhood value to delivery fee and label
    const neighborhoodMap = {
      vila_ema: { label: 'Vila Ema', fee: 3 },
      vila_yolanda: { label: 'Vila Yolanda', fee: 3 },
      fazendinha: { label: 'Fazendinha', fee: 3 },
      vila_matias: { label: 'Vila Matias', fee: 3 },
      portelinha: { label: 'Portelinha', fee: 3 },
      vila_nova_sao_vicente: { label: 'Vila Nova São Vicente', fee: 3 },
      parque_das_bandeiras: { label: 'Parque das Bandeiras', fee: 3 },
      gleba: { label: 'Gleba e Samaritá', fee: 3 },
      rio_branco: { label: 'Rio Branco', fee: 5 },
      rio_negro: { label: 'Rio Negro', fee: 6 },
      quarentenario: { label: 'Quarentenário', fee: 6 },
      humaita: { label: 'Humaitá', fee: 8 },
    };
    const neighborhoodInfo = neighborhoodMap[bairro] || { label: bairro, fee: 0 };
    const deliveryFee = neighborhoodInfo.fee;
    const bairroLabel = neighborhoodInfo.label;

    const pagamento = formData.get('pagamento');
    const trocoNecessario = formData.get('trocoNecessario') || 'nao';
    const trocoValor = formData.get('trocoValor') || '';

    if (!nome || !rua || !numero || !bairro || !pagamento) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const cartItems = getCartItems();
    if (cartItems.length === 0) {
      alert('O carrinho está vazio.');
      return;
    }

    // Format order message
    let message = `Pedido da Pizzaria:%0A`;
    message += `Nome: ${nome}%0A`;
    message += `Endereço: ${rua}, Nº ${numero}, ${complemento}, Bairro: ${bairroLabel}%0A`;
    message += `Taxa de entrega: R$ ${deliveryFee.toFixed(2)}%0A`;
    const itemsTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const totalWithDelivery = itemsTotal + deliveryFee;
    message += `Total do pedido: R$ ${totalWithDelivery.toFixed(2)}%0A`;
    message += `Forma de pagamento: ${pagamento}%0A`;
    if (pagamento === 'dinheiro' && trocoNecessario === 'sim') {
      message += `Necessita troco para: R$ ${trocoValor}%0A`;
    }
    message += `%0AItens:%0A`;
    cartItems.forEach(item => {
      if (item.category === 'Pizza') {
        const sizeLabel = item.size === 'grande' ? 'Grande' : 'Broto';
        const optionLabel = item.option === '1sabor' ? '1 Sabor' : '2 Sabores';
        const sabores = item.sabores.map(s => s.label).join(', ');
        message += `Pizza ${sizeLabel} (${optionLabel}): ${sabores} - R$ ${item.price.toFixed(2)}%0A`;
      } else if (item.category === 'Esfiha') {
        const adicionaisText = item.adicionais && item.adicionais.length > 0
          ? `\n - Adicionais: ${item.adicionais.map(a => a.label).join(', ')}`
          : '';
        message += `Esfiha ${item.sabor.label}${adicionaisText} - R$ ${item.price.toFixed(2)}%0A`;
      } else if (item.category === 'Macarrão') {
        const acompanhamentosText = item.acompanhamentos && item.acompanhamentos.length > 0
          ? `Acompanhamentos: ${item.acompanhamentos.join(', ')}`
          : '';
        const molhosText = item.molhos && item.molhos.length > 0
          ? `Molhos: ${item.molhos.join(', ')}`
          : '';
        const adicionaisText = item.adicionais && item.adicionais.length > 0
          ? `Adicionais: ${item.adicionais.map(a => a.label).join(', ')}`
          : '';
        message += `Macarrão ${item.tipo.label} ${item.tamanho.label} - R$ ${item.price.toFixed(2)}%0A${acompanhamentosText}%0A${molhosText}%0A${adicionaisText}%0A`;
      } else if (item.category === 'Sobremesa' || item.category === 'Bebida') {
        message += `${item.name} - R$ ${item.price.toFixed(2)}%0A`;
      }
    });

    // Open WhatsApp with message
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
  });

  container.appendChild(form);
}

export function initCheckout() {
  const container = document.getElementById('checkout');
  render(container);
}
