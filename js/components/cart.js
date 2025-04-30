let cart = [];

const cartContainerId = 'cart';

function getItemImageSrc(item) {
  if (item.category === 'Pizza') {
    if (item.sabores && item.sabores.length > 0 && item.sabores[0].img) {
      return item.sabores[0].img;
    }
    return 'images/pizza_generic.jpg';
  } else if (item.category === 'Esfiha') {
    if (item.sabor && item.sabor.img) {
      return item.sabor.img;
    }
    return 'images/esfiha_generic.jpg';
  } else if (item.category === 'Sobremesa') {
    return item.img || 'images/sobremesa_generic.jpg';
  } else if (item.category === 'Bebida') {
    return item.img || 'images/bebida_generic.jpg';
  }
  return '';
}

function formatItemText(item) {
  if (item.category === 'Pizza') {
    const sabores = item.sabores.map(s => s.label).join(', ');
    const sizeLabel = item.size === 'grande' ? 'Grande' : 'Broto';
    const optionLabel = item.option === '1sabor' ? '1 Sabor' : '2 Sabores';
    return `Pizza ${sizeLabel} (${optionLabel}): ${sabores} - R$ ${item.price.toFixed(2)}`;
  } else if (item.category === 'Esfiha') {
    const adicionaisText = item.adicionais && item.adicionais.length > 0
      ? ' + ' + item.adicionais.map(a => a.label).join(', ')
      : '';
    return `Esfiha ${item.sabor.label}${adicionaisText} - R$ ${item.price.toFixed(2)}`;
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
    return `Macarrão ${item.tipo.label} ${item.tamanho.label} - R$ ${item.price.toFixed(2)}\n${acompanhamentosText}\n${molhosText}\n${adicionaisText}`;
  } else if (item.category === 'Sobremesa') {
    return `${item.name} - R$ ${item.price.toFixed(2)}`;
  } else if (item.category === 'Bebida') {
    return `${item.name} - R$ ${item.price.toFixed(2)}`;
  }
  return '';
}

function renderCart() {
  const container = document.getElementById(cartContainerId);
  container.innerHTML = '<h2>Carrinho</h2>';
  if (cart.length === 0) {
    container.innerHTML += '<p>O carrinho está vazio.</p>';
    return;
  }
  const ul = document.createElement('ul');
  cart.forEach((item, index) => {
    const li = document.createElement('li');

    const textSpan = document.createElement('span');
    textSpan.textContent = formatItemText(item);
    li.appendChild(textSpan);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover';
    removeBtn.addEventListener('click', () => {
      removeItem(index);
    });
    li.appendChild(removeBtn);
    ul.appendChild(li);
  });
  container.appendChild(ul);

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const totalDiv = document.createElement('div');
  totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
  container.appendChild(totalDiv);
}

function addItemToCart(item) {
  cart.push(item);
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function getCartItems() {
  return cart;
}

export function initCart() {
  renderCart();
}

export { addItemToCart, getCartItems };
