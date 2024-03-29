import React from "react";
import "../styles/Cart.css";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

const Cart = () => {
  const cartContext = useContext(CartContext);

  let subtotal = cartContext.sumPrice();
  let iva = (cartContext.sumPrice() * 21) / 100;
  let total = subtotal + iva;

  return (
    <>
      {cartContext.cartList.length > 0 ? (
        cartContext.cartList.map((item) => {
          return (
            <div className="cartContainer">
              <div className="cartCard">
                <img className="cartImg" src={item.img} alt={item.alt} />
                <h2 className="cartName">{item.name}</h2>
                <p className="cartPriceUnidad">
                  Precio por unidad: <br />${item.price}
                </p>
                <div>
                  <div className="cartUPD">
                    <p className="cartQty">{item.qty} unidades</p>
                    <p className="cartPrice">${item.price * item.qty}</p>
                    <button
                      className="cartRemove"
                      onClick={() => cartContext.removeItem(item.id)}
                    >
                      Delete Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="carritoVacio">
          <h1>El carrito está vacío 🛒</h1>
          <Link to="/">
            <p>Volver al inicio</p>
          </Link>
        </div>
      )}

      {cartContext.cartList.length > 0 && (
        <div className="cartSelfContainer">
          <div className="cartContainer">
            <div className="footer">
              <Link to="/">
                <button className="cartClear">Agregar mas productos</button>
              </Link>
              <button className="cartClear" onClick={cartContext.clear}>
                Clear Items{" "}
              </button>
              <div className="total">
                <p>Subtotal: ${subtotal} </p>
                <p>IVA(21%): ${iva} </p>
                <p>
                  <b>Total: ${total}</b>
                </p>
              </div>
            </div>
            <Form />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
