// *Create a class of product to store a key in the object
class Product {
  constructor(title, imageUrl, price, display, ram, storage) {
    this.imageUrl = imageUrl;
    this.title = title;
    this.price = price;
    this.Display = display;
    this.ram = ram;
    this.storage = storage;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId, false);
    this.orderProducts = () => {
      console.log('Ordering...');
      console.log(this.items);
    };
    this.render();
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    const orderButton = cartEl.querySelector('button');
    // orderButton.addEventListener('click', this.orderProducts.bind(this));
    // orderButton.addEventListener('click', () => this.orderProducts() );
    orderButton.addEventListener('click', this.orderProducts);

    this.totalOutput = cartEl.querySelector('h2');
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }
  addToCart() {
    console.log('Adding product to cart...');
    console.log(this.product);
    App.addProductToCart(this.product);
  }
  render() {
    const prodEl = this.createRootElement('li', 'product-item');

    prodEl.innerHTML = `
        <div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}">
            <div class="product-item__content">
                <h2>${this.product.title}</h2>
                <h3>\$ ${this.product.price}</h3>
                <p>${this.product.Display}</p>
                <p>${this.product.ram}</p>
                <p>${this.product.storage}</p>
                <button>Add to Cart</button>
            </div>
        </div>
    `;
    const cartButton = prodEl.querySelector('button');
    cartButton.addEventListener('click', this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  products = [];
  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = [
      new Product(
        'Apple MacBook Pro 16 M1 Pro chip macOS Monterey Laptop (16GB RAM, 512GB SSD, Apple M1 GPU, 41cm, MK183HN/A, Space Grey)',

        'https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1634724026/Croma%20Assets/Computers%20Peripherals/Laptop/Images/245226_rrkneu.png/mxw_2048,f_auto',

        3169.71,

        'Display: Liquid Retina XDR display, Up to 1,000 nits',
        'Ram: 16GB',
        'Storage: 1TB M.2'
      ),

      new Product(
        'Apple MacBook Air M1 Chip macOS Big Sur Laptop (8GB RAM, 256GB SSD, Apple M1 GPU, 33.78cm, MGN63HN/A, Space Grey)',

        'https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1606585888/Croma%20Assets/Computers%20Peripherals/Laptop/Images/9009479057438.png/mxw_2048,f_auto',

        1134.39,

        'Display: IPS Technology, 400 Nits Brightness,',
        'Ram: 8GB',
        'Storage: 512GB M.2'
      ),
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const item of this.products) {
      new ProductItem(item, 'prod-list');
    }
  }

  render() {
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list'),
    ]);
    if (this.products && this.products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() {
    // super();
    this.render();
  }

  render() {
    this.cart = new ShoppingCart('app');
    new ProductList('app');
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();

    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}
// App.cart;
App.init();
