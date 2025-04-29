let cart = [];

const cartContainerId = 'cart';

function getItemImageSrc(item) {
  if (item.category === 'Pizza') {
    // Use first sabor image or a generic pizza image
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
    const complemento = item.complemento ? ` + ${item.complemento.label}` : '';
    return `Esfiha ${item.sabor.label}${complemento} - R$ ${item.price.toFixed(2)}`;
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

    // Removed image element for cart items
    // const imgSrc = getItemImageSrc(item);
    // if (imgSrc) {
    //   const img = document.createElement('img');
    //   img.src = imgSrc;
    //   img.alt = item.name || item.sabor?.label || 'Item';
    //   li.appendChild(img);
    // }

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
