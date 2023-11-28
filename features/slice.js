import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = "https://mines-manager.up.railway.app";
const Token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5ODIzMzA0MywiZXhwIjozODQ1NzE2NjkwfQ.9NGroKV45c2A56PpaA_xkbPI5QTd_E1XdoF1Ru1wU1jIGT2UBYG4sH4mXMUDjBAooqsUVBSzE0xKpr89KcFwmQ";

// Create an async thunk to handle API requests
const createAsyncApi = (name, url, method = "GET") => {
  return createAsyncThunk(name, async (params, { rejectWithValue }) => {
    try {
      let endpoint = url;
      if (method === "GET") {
        // Include parameters as query parameters in the URL
        endpoint = `${url}?${new URLSearchParams(params).toString()}`;
      }
      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        // Don't include a request body for GET requests
        body: method === "GET" ? null : JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
};


// Create async thunks for different actions
export const createStateUser = createAsyncApi("createUser", `${apiUrl}/state`, "POST");
export const deleteState = createAsyncApi("deleteUser", `${apiUrl}/state`, "DELETE");
export const updateStateUser = createAsyncApi("updateUser", `${apiUrl}/state`, "PUT");
export const fetchState = createAsyncApi("showUsers", `${apiUrl}/state/all`, "GET");

// Define the initial state
const initialState = {
  users: [],
  searchResults: [],
  loading: false,
  error: null,
  searchQuery: "",
  page: 1, // Starting page
  pageSize: 10,
  totalPages: 1,
};

// Create a userDetailSlice
const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(setSearchResults, (state, action) => {
      state.searchResults = action.payload;
    })
      .addCase(fetchState.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchState.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createStateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStateUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createStateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteState.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteState.fulfilled, (state, action) => {
        state.loading = false;
        // Handle successful delete
      })
      .addCase(deleteState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStateUser.fulfilled, (state, action) => {
        state.loading = false;
        // Handle successful update
      })
      .addCase(updateStateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setPageSize, setSearchQuery, setSearchResults } = userDetailSlice.actions;

export const selectData = (state) => state.userDetail.users;
export const selectSearchResults = (state) => state.userDetail.searchResults;

export default userDetailSlice.reducer;
