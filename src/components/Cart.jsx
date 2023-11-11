import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useId } from '@reach/auto-id';
import { CartIcon } from './Icons';
import { useCart } from '../hooks/useCart';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const initialFormState = {
  name: '',
  email: '',
};

// function CartItem({ thumbnail, price, title, quantity, addToCart }) {
//   return (
//     <li>
//       <img src={thumbnail} alt={title} />
//       <div>
//         <strong>{title}</strong> - ${price}
//       </div>

//       <footer>
//         <small> Cant.: {quantity}</small>
//         <button onClick={addToCart}>+</button>
//       </footer>
//     </li>
//   );
// }

// export function Cart() {
//   const cartCheckboxId = useId();
//   const { cart, clearCart, addToCart } = useCart();
//   const [total, setTotal] = useState(0);
//   const [shippingAddress, setShippingAddress] = useState('');
//   const [customerInfo, setCustomerInfo] = useState(initialFormState);

//   const calculateTotal = () => {
//     const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
//     setTotal(totalPrice);
//   };

//   useEffect(() => {
//     calculateTotal();
//   }, [cart]);

//   const handleShippingAddressChange = (e) => {
//     setShippingAddress(e.target.value);
//   };

//   const handleCustomerInfoChange = (e, field) => {
//     const value = e.target.value;

//     if (field === 'name') {
//       if (value.length > 0 && !/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(value)) {
//         alert('Ingresa un solo nombre con letras en el campo de nombre.');
//         return;
//       }
//     }

//     setCustomerInfo({ ...customerInfo, [field]: value });
//   };

//   const clearForm = () => {
//     setCustomerInfo(initialFormState);
//     setShippingAddress('');
//   };

//   const handleCheckout = async () => {
//     if (!customerInfo.name || !shippingAddress || !customerInfo.email) {
//       alert('Completa todos los campos antes de realizar la compra.');
//       return;
//     }

//     const orderInfo = {
//       productos: cart,
//       total: total,
//       shippingInfo: {
//         name: customerInfo.name,
//         address: shippingAddress,
//         email: customerInfo.email,
//       },
//     };

//     const ordersCollection = collection(firestore, 'ordenes');

//     try {
//       const docRef = await addDoc(ordersCollection, orderInfo);
//       const orderNumber = generateOrderNumber();
//       alert('¡Gracias por tu compra! Tu pedido llegará en 3 días. Número de Orden: ' + orderNumber);
//       clearCart();
//       clearForm();
//     } catch (e) {
//       console.error('Error al generar la orden:', e);
//       alert('Error al procesar la compra. Por favor, inténtalo de nuevo.');
//     }
//   };

//   const generateOrderNumber = () => {
//     const date = new Date();
//     const year = date.getFullYear();
//     const month = date.getMonth() + 1;
//     const day = date.getDate();
//     const randomDigits = Math.floor(Math.random() * 1000);
  
//     return `${year}${month}${day}-${randomDigits}`;
//   };

//   return (
//     <>
//       <label className="cart-button" htmlFor={cartCheckboxId}>
//         <CartIcon />
//       </label>
//       <input id={cartCheckboxId} type="checkbox" hidden />

//       <aside className="cart">
//         <ul>
//           {cart.map((product) => (
//             <CartItem key={product.id} addToCart={() => addToCart(product)} {...product} />
//           ))}
//         </ul>

//         <div className="cart-form">
//           <div>
//             <label htmlFor="customerName">Nombre:</label>
//             <input
//               type="text"
//               id="customerName"
//               value={customerInfo.name}
//               onChange={(e) => handleCustomerInfoChange(e, 'name')}
//             />
//           </div>

//           <div className="form">
//             <label htmlFor="shippingAddress">Dirección de Envío:</label>
//             <input
//               type="text"
//               id="shippingAddress"
//               value={shippingAddress}
//               onChange={handleShippingAddressChange}
//             />
//           </div>

//           <div className="form">
//             <label htmlFor="customerEmail">Correo Electrónico:</label>
//             <input
//               type="email"
//               id="customerEmail"
//               value={customerInfo.email}
//               onChange={(e) => handleCustomerInfoChange(e, 'email')}
//             />
//           </div>

//           <p className='pay'>Total a Pagar: ${total}</p>
//           <button className="clear" onClick={clearCart}> Limpiar Carrito </button>
//           <button className="clear" onClick={clearForm}> Limpiar Formulario </button>
//           <button className="clear" onClick={() => handleCheckout()}
//             disabled={cart.length === 0 || !customerInfo.name || !shippingAddress || !customerInfo.email}>
//             Realizar Compra
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

function CartItem({ id, thumbnail, price, title, quantity, addToCart, removeProduct }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small> Cant.: {quantity}</small>
        <div>
          <button onClick={() => addToCart()}>+</button>
          <button className="button" onClick={() => removeProduct()}>Eliminar</button>
        </div>
      </footer>
    </li>
  );
}


// En tu componente Cart
export function Cart() {
  const cartCheckboxId = useId(); // Agrega esta línea

  const { cart, clearCart, addToCart, removeFromCart, removeProduct } = useCart();
  const [total, setTotal] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [customerInfo, setCustomerInfo] = useState(initialFormState);

  const calculateTotal = () => {
    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    setTotal(totalPrice);
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleCustomerInfoChange = (e, field) => {
    const value = e.target.value;

    if (field === 'name') {
      if (value.length > 0 && !/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(value)) {
        alert('Ingresa un solo nombre con letras en el campo de nombre.');
        return;
      }
    }

    setCustomerInfo({ ...customerInfo, [field]: value });
  };

  const clearForm = () => {
    setCustomerInfo(initialFormState);
    setShippingAddress('');
  };

  const handleCheckout = async () => {
    if (!customerInfo.name || !shippingAddress || !customerInfo.email) {
      alert('Completa todos los campos antes de realizar la compra.');
      return;
    }

    const orderInfo = {
      productos: cart,
      total: total,
      shippingInfo: {
        name: customerInfo.name,
        address: shippingAddress,
        email: customerInfo.email,
      },
    };

    const ordersCollection = collection(firestore, 'ordenes');

    try {
      const docRef = await addDoc(ordersCollection, orderInfo);
      const orderNumber = generateOrderNumber();
      alert('¡Gracias por tu compra! Tu pedido llegará en 3 días. Número de Orden: ' + orderNumber);
      clearCart();
      clearForm();
    } catch (e) {
      console.error('Error al generar la orden:', e);
      alert('Error al procesar la compra. Por favor, inténtalo de nuevo.');
    }
  };

  const generateOrderNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const randomDigits = Math.floor(Math.random() * 1000);
  
    return `${year}${month}${day}-${randomDigits}`;
  };

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />

      <aside className="cart">
        <ul>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              {...product}
              addToCart={() => addToCart(product)}
              removeFromCart={() => removeFromCart(product)}
              removeProduct={() => removeProduct(product.id)}
            />
          ))}
        </ul>

        <div className="cart-form">
          <div>
            <label htmlFor="customerName">Nombre:</label>
            <input
              type="text"
              id="customerName"
              value={customerInfo.name}
              onChange={(e) => handleCustomerInfoChange(e, 'name')}
            />
          </div>

          <div className="form">
            <label htmlFor="shippingAddress">Dirección de Envío:</label>
            <input
              type="text"
              id="shippingAddress"
              value={shippingAddress}
              onChange={handleShippingAddressChange}
            />
          </div>

          <div className="form">
            <label htmlFor="customerEmail">Correo Electrónico:</label>
            <input
              type="email"
              id="customerEmail"
              value={customerInfo.email}
              onChange={(e) => handleCustomerInfoChange(e, 'email')}
            />
          </div>

          <p className='pay'>Total a Pagar: ${total}</p>
          <button className="clear" onClick={clearCart}> Limpiar Carrito </button>
          <button className="clear" onClick={clearForm}> Limpiar Formulario </button>
          <button className="clear" onClick={() => handleCheckout()}
            disabled={cart.length === 0 || !customerInfo.name || !shippingAddress || !customerInfo.email}>
            Realizar Compra
          </button>
        </div>
      </aside>
    </>
  );
}

export default Cart;

