// import { products as initialProducts } from './mocks/products.json';
// import { Products } from './components/Products.jsx';
// import { Header } from './components/Header.jsx';
// import { Footer } from './components/Footer.jsx';
// import { IS_DEVELOPMENT } from './config.js';
// import { useFilters } from './hooks/useFilters.js';
// import { CartProvider } from './context/cart.jsx';
// import { Cart } from './components/Cart.jsx';
// import Checkout from './components/Checkout.jsx';


// function App() {
//   const { filterProducts } = useFilters();

//   const filteredProducts = filterProducts(initialProducts);

//   return (
//     <CartProvider>
//       <Header />
//       <Cart />
//       <div>
//         <Products products={filteredProducts} />
//       </div>
//       <Checkout />
//       {IS_DEVELOPMENT && <Footer />}
//     </CartProvider>
//   );
// }

// export default App;

import { products as initialProducts } from './mocks/products.json';
import { Products } from './components/Products.jsx';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { IS_DEVELOPMENT } from './config.js';
import { useFilters } from './hooks/useFilters.js';
import { CartProvider } from './context/cart.jsx';
import Cart from './components/Cart.jsx';

function App() {
  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(initialProducts);

  return (
    <CartProvider>
      <Header />
      <Cart />
      <div>
        <Products products={filteredProducts} />
      </div>
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  );
}

export default App;

