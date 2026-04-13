import apiClient from "@/api/client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// --- Fetch Wishlist ---
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/wishlist/get-wishlists`, {
        userId,
      });

      return res.data?.wishlists || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// --- Add to Wishlist ---
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, product }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/wishlist/create", {
        user: userId,
        items: [{ product, qty: 1 }],
      });
      return product;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// --- Remove from Wishlist ---
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      await apiClient.delete("/wishlist/delete", {
        user: userId,
        productId,
      });
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // For instant UI feedback (optimistic toggle)
    toggleWishlistLocal: (state, action) => {
      const exists = state.items.find(
        (p) => p.product._id === action.payload.id
      );
      if (exists) {
        state.items = state.items.filter(
          (p) => p.product._id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const exists = state.items.find((p) => p.id === action.payload.id);
        if (!exists) state.items.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { toggleWishlistLocal } = wishlistSlice.actions;
export default wishlistSlice.reducer;
