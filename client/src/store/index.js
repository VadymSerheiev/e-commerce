import { createStore } from "redux";

const shoppingCart = localStorage.getItem("shoppingCart");
const shoppingCartCount = JSON.parse(shoppingCart);

const counterReducer = (state = { counter: shoppingCartCount?.length || 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }

  if (action.type === "clean") {
    return {
      counter: 0,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
