// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import auth from '../../../Firebase/Firebase.config';

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Async actions for Redux Toolkit

export const createUser = createAsyncThunk(
  'auth/createUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Extract serializable user data
      const userData = {
        uid: user.uid,
        email: user.email,
      };

      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithEmail = createAsyncThunk(
  'auth/signInWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ name, photo }, { rejectWithValue }) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
        return { displayName: name, photoURL: photo };
      }
      return rejectWithValue('No user is signed in.');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Setup listener to persist user data in the Redux state
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Dispatch setUser action to update state with current user data
          dispatch(setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }));
        } else {
          dispatch(setUser(null));
        }
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload; // Set the user data from actions
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.error = null;
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
