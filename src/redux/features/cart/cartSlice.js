import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },

  reducers: {
    add: (state, action) => {
      // console.log(action.payload, "action.payload");
      const itemInCart = state.cart.find(
        (item) => item.product._id === action.payload.product._id
      );

      if (itemInCart) {
        itemInCart.quantity = itemInCart.quantity + action.payload.quantity;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
    },
    incrementQuantity: (state, action) => {
      console.log(action.payload, "action.payload");
      const item = state.cart.find(
        (item) => item.product._id === action.payload
      );

      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.product._id === action.payload
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },

    remove(state, action) {
      const removeItem = state.cart.filter(
        (item) => item.product._id !== action.payload
      );
      state.cart = removeItem;
    },
    clear: (state, action) => {
      state.cart = [];
    },
  },
});

export const { add, remove, incrementQuantity, decrementQuantity, clear } =
  cartSlice.actions;
export default cartSlice.reducer;
