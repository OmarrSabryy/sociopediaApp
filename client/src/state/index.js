import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    updateUserFriends: (state, action) => {
      state.user.friends = action.payload.friends;
    },
    setFriends: (state, action) => {
      if (state.user) state.friends = action.payload.friends;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {
  setMode,
  setLogin,
  updateUserFriends,
  setFriends,
  setPosts,
  setPost,
  setLogout,
} = authSlice.actions;
export default authSlice.reducer;
