import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalAmount: 0, // tổng tiền
  totalQuantity: 0, //số lượng sản phẩm

  cartItemsFavotite: [],
  totalAmountFavorite: 0, // tổng tiền favorite
  totalQuantityFavorite: 0, //số lượng sản phẩm yêu thích
};

// let initialState = JSON.parse(localStorage.getItem('item')) || {
//   cartItems: [],
//   totalAmount: 0, // tổng tiền
//   totalQuantity: 0, //số lượng sản phẩm

//   cartItemsFavotite: [],
//   totalAmountFavorite: 0, // tổng tiền favorite
//   totalQuantityFavorite: 0, //số lượng sản phẩm yêu thích
// };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload; // payload chứa các thông tin của newItem sẽ được sử lý bằng action
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);
      /**
       * THÊM SẢN PHẨM VÀO GIỎ HÀNG
       * kiểm tra xem sp đã có trong cart hay chưa => trả về item nếu có
       * nếu chưa có thì push item mới vào (bao gồm các thông tin: id, name, image, price, quantity, totalPrice)
       * nếu có rồi thì thêm số lượng thêm thôi, thêm cả tiền vào nữa
       * tổng tiền tất cả sẽ bằng tổng của item* số lượng tương ứng
       */
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price);
      }
      state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);

      // localStorage.setItem(
      //   'item',
      //   JSON.stringify({
      //     cartItems: state.cartItems,
      //     totalAmount: state.totalAmount,
      //     totalQuantity: state.totalQuantity,
      //   }),
      // );
    },

    favoriteItem: (state, action) => {
      const newItem = action.payload; // payload chứa các thông tin của newItem sẽ được sử lý bằng action
      const existingItemFavorite = state.cartItemsFavotite.find((item) => item.id === newItem.id);
      state.totalQuantityFavorite++;
      if (!existingItemFavorite) {
        state.cartItemsFavotite.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItemFavorite.quantity++;
        existingItemFavorite.totalPrice = Number(existingItemFavorite.totalPrice) + Number(newItem.price);
      }
      state.totalAmountFavorite = state.cartItemsFavotite.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);

      // localStorage.setItem(
      //   'item',
      //   JSON.stringify({
      //     cartItemsFavotite: state.cartItemsFavotite,
      //     totalAmountFavorite: state.totalAmountFavorite,
      //     totalQuantityFavorite: state.totalQuantityFavorite,
      //   }),
      // );
    },

    // favoriteItem: (state, action) => {
    //   const newItem = action.payload; // payload chứa các thông tin của newItem sẽ được sử lý bằng action
    //   const existingItem = state.cartItemsFavotite.find((item) => item.id === newItem.id);
    //   state.totalQuantityFavorite++;
    //   if (!existingItem) {
    //     state.cartItemsFavotite.push({
    //       id: newItem.id,
    //       productName: newItem.productName,
    //       imgUrl: newItem.imgUrl,
    //       price: newItem.price,
    //       quantity: 1,
    //       totalPrice: newItem.price,
    //     });
    //   } else {
    //     existingItem.quantity++;
    //     existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price);
    //   }
    //   state.totalAmountFavorite = state.cartItemsFavotite.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);

    //   localStorage.setItem(
    //     'item',
    //     JSON.stringify({
    //       cartItemsFavotite: state.cartItemsFavotite,
    //       totalAmountFavorite: state.totalAmountFavorite,
    //       totalQuantityFavorite: state.totalQuantityFavorite,
    //     }),
    //   );
    // },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);

      // localStorage.setItem(
      //   'item',
      //   JSON.stringify({
      //     cartItems: state.cartItems,
      //     totalAmount: state.totalAmount,
      //     totalQuantity: state.totalQuantity,
      //   }),
      // );
    },

    deleteItemFavorite: (state, action) => {
      const id = action.payload;
      const existingItemFavorite = state.cartItemsFavotite.find((item) => item.id === id);

      if (existingItemFavorite) {
        state.cartItemsFavotite = state.cartItemsFavotite.filter((item) => item.id !== id);
        state.totalQuantityFavorite = state.totalQuantityFavorite - existingItemFavorite.quantity;
      }
      state.totalAmountFavorite = state.cartItemsFavotite.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);

      // localStorage.setItem(
      //   'item',
      //   JSON.stringify({
      //     cartItemsFavotite: state.cartItemsFavotite,
      //     totalAmountFavorite: state.totalAmountFavorite,
      //     totalQuantityFavorite: state.totalQuantityFavorite,
      //   }),
      // );
    },
  },
});

// export const { addItem } = cartSlice.actions;
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
