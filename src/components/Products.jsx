// import './Products.css'
// import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'
// import { useCart } from '../hooks/useCart.js'

// export function Products ({ products }) {
//   const { addToCart, removeFromCart, cart } = useCart()

//   const checkProductInCart = product => {
//     return cart.some(item => item.id === product.id)
//   }

//   return (
//     <main className='products'>
//       <ul>
//         {products.slice(0, 10).map(product => {
//           const isProductInCart = checkProductInCart(product)

//           return (
//             <li key={product.id}>
//               <img
//                 src={product.thumbnail}
//                 alt={product.title}
//               />
//               <div>
//                 <strong>{product.title}</strong> - ${product.price}
//               </div>
//               <div>
//                 <button
//                   style={{ backgroundColor: isProductInCart ? 'orange' : 'white' }} onClick={() => {
//                     isProductInCart
//                       ? removeFromCart(product)
//                       : addToCart(product)
//                   }}
//                 >
//                   {
//                     isProductInCart
//                       ? <RemoveFromCartIcon />
//                       : <AddToCartIcon />
//                   }
//                 </button>
//               </div>
//             </li>
//           )
//         })}
//       </ul>
//     </main>
//   )
// }

import React from 'react';
import './Products.css';
import Swal from 'sweetalert2';
import { useCart } from '../hooks/useCart.js';
import { AddToCartIcon } from './Icons.jsx';

export function Products({ products }) {
  const { addToCart, cart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  const openDetailsModal = (product) => {
    Swal.fire({
      title: product.title,
      html: `
        <img src="${product.thumbnail}" alt="${product.title}" style="max-width: 100%; height: auto;" />
        <div><strong>Precio:</strong> $${product.price}</div>
        <div><strong>Stock:</strong> ${product.stock}</div>
        <div><strong>Descripción:</strong> ${product.description}</div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        image: 'custom-sweetalert-image-class', 
      },
    });
  };

  return (
    <main className="products">
      <ul>
        {products.slice(0, 10).map((product) => {
          const isProductInCart = checkProductInCart(product);

          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div className="product-buttons">
              <button
  className="add-to-cart-button"
  style={{ backgroundColor: isProductInCart ? 'orange' : 'white' }}
  onClick={() => {
    if (isProductInCart) {
      // Si ya está en el carrito, disminuye la cantidad o elimínalo si es 1
      removeFromCart(product);
    } else {
      // Si no está en el carrito, agrégalo
      addToCart(product);
    }
  }}
>
  <AddToCartIcon />
</button>


              <button
                className="view-more-button"
                onClick={() => openDetailsModal(product)}>Ver más
              </button>
            </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
