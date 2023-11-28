import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//crete action
const apiUrl = "https://mines-manager.up.railway.app/";
const Token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5ODIzMzA0MywiZXhwIjozODQ1NzE2NjkwfQ.9NGroKV45c2A56PpaA_xkbPI5QTd_E1XdoF1Ru1wU1jIGT2UBYG4sH4mXMUDjBAooqsUVBSzE0xKpr89KcFwmQ";
// country API
// country Add Api
export const createUser = createAsyncThunk(
  "add",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://mines-manager.up.railway.app/country",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// country hard delete
export const deleteCountry = createAsyncThunk(
  "delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}country/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Handle non-2xx HTTP response statuses here.
        const errorData = await response.json();
        return rejectWithValue(errorData); // Use rejectWithValue to pass non-serializable data.
      }

      return id; // Return the ID of the deleted country.
    } catch (error) {
      return rejectWithValue(error.message); // Use rejectWithValue to pass non-serializable data.
    }
  }
);

// country data read Api

export const showUser = createAsyncThunk(
  "show",
  async ({page, pageSize}, { rejectWithValue, dispatch }) => {
    console.log(page, pageSize)
    const response = await fetch(
      `${apiUrl}country/all?pageNumber=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      }
    );

    try {
      const result = await response.json();
      dispatch(setTotalPages(result.totalPages)); 
      console.log(result.totalPages)
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// search country data api
export const searchCountry = createAsyncThunk(
  "searchCountry",
  async ({page, pageSize, searchQuery}, { rejectWithValue }) => {
    const response = await fetch(
      `${apiUrl}country/search?keyword=${searchQuery}&pageNumber=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


// country Edit Data
export const updateUser = createAsyncThunk(
  "Edit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}country/${data.countryId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle non-2xx HTTP response statuses here.
        const errorData = await response.json();
        return rejectWithValue(errorData); // Use rejectWithValue to pass non-serializable data.
      }

      return id; // Return the ID of the deleted country.
    } catch (error) {
      return rejectWithValue(error.message); // Use rejectWithValue to pass non-serializable data.
    }
  }
);

// All state APIS

//state data read Api

export const fetchState = createAsyncThunk(
  "showState",
  async ({page, pageSize}, { rejectWithValue, dispatch }) => {
    const response = await fetch(
      `${apiUrl}state/all?pageSize=${pageSize}&pageNumber=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      }
    );

    try {
      const result = await response.json();
      dispatch(setTotalPages(result.totalPages)); 
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// state Edit data
export const updateStateUser = createAsyncThunk(
  "Editstate",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await fetch(`${apiUrl}state/${data.stateId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle non-2xx HTTP response statuses here.
        const errorData = await response.json();
        return rejectWithValue(errorData); // Use rejectWithValue to pass non-serializable data.
      }

      return id; // Return the ID of the deleted country.
    } catch (error) {
      return rejectWithValue(error.message); // Use rejectWithValue to pass non-serializable data.
    }
  }
);

// state add data
export const createStateUser = createAsyncThunk(
  "addState",
  async (data, { rejectWithValue }) => {
    const response = await fetch("https://mines-manager.up.railway.app/state", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// state search API
export const searchState = createAsyncThunk(
  "searchCountry",
  async ({page, pageSize, searchQuery}, { rejectWithValue }) => {
    const response = await fetch(
      `${apiUrl}state/search?keyword=${searchQuery}&pageNumber=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//state Hard delete
export const deleteState = createAsyncThunk(
  "delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}state/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Handle non-2xx HTTP response statuses here.
        const errorData = await response.json();
        return rejectWithValue(errorData); // Use rejectWithValue to pass non-serializable data.
      }

      return id; // Return the ID of the deleted country.
    } catch (error) {
      return rejectWithValue(error.message); // Use rejectWithValue to pass non-serializable data.
    }
  }
);

// District APIS
// District data read API
export const fetchDistrict = createAsyncThunk(
  "showDistrict",
  async ({page, pageSize}, { rejectWithValue, dispatch }) => {
    const response = await fetch(
      `${apiUrl}district/all?pageSize=${pageSize}&pageNumber=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      }
    );

    try {
      const result = await response.json();
      dispatch(setTotalPages(result.totalPages)); 
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Districts Edit API
export const updateDistrictUser = createAsyncThunk(
  "Editdistrict",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await fetch(`${apiUrl}district/${data.districtId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle non-2xx HTTP response statuses here.
        const errorData = await response.json();
        return rejectWithValue(errorData); // Use rejectWithValue to pass non-serializable data.
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message); // Use rejectWithValue to pass non-serializable data.
    }
  }
);
// District Delete API
export const deleteDistrict = createAsyncThunk(
  "deleteDis",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}district/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Handle non-2xx HTTP response statuses here.
        const errorData = await response.json();
        return rejectWithValue(errorData); // Use rejectWithValue to pass non-serializable data.
      }

      return id; // Return the ID of the deleted country.
    } catch (error) {
      return rejectWithValue(error.message); // Use rejectWithValue to pass non-serializable data.
    }
  }
);
// District Search API
export const searchDistrict = createAsyncThunk(
  "searchDistrict",
  async ({page, pageSize, searchQuery}, { rejectWithValue }) => {
    const response = await fetch(
      `${apiUrl}district/search?keyword=${searchQuery}&pageNumber=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// District Add API
export const createDistrictUser = createAsyncThunk(
  "addDistrict",
  async (data, { rejectWithValue }) => {
    const response = await fetch(`${apiUrl}district`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// main createSlice function

export const userDetails = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    searchResults:[],
    loading: false,
    error: null,
    searchQuery: "", // For storing the search query
    page: 0, // Current page
    pageSize: 10, // Items per page
    totalPages : 1,
    currentPage: 0,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setPage: (state, action) => {
      const { totalPages} = state;
      console.log(totalPages)
      state.page = Math.min(Math.max(0, action.payload), totalPages);
    },
    setPageSize: (state, action) => {
        state.pageSize = action.payload;
        state.page = 0;
    },
    setTotalPages:(state, action) => {
      state.totalPages = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("countryadded");
      // state.users.data.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [showUser.pending]: (state) => {
      state.loading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [showUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchState.pending]: (state) => {
      state.loading = true;
    },
    [fetchState.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [fetchState.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteCountry.pending]: (state) => {
      state.loading = true;
    },
    [deleteCountry.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      const id = action.payload;
      if (id) {
        state.users.data = state.users.data.filter(
          (item) => item.countryId !== id
        );
      }
    },
    [deleteCountry.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.data.map((item) =>
        item.countryId === action.payload.id ? action.payload : item
      );
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateStateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateStateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.data.map((item) =>
        item.stateId === action.payload.id ? action.payload : item
      );
    },
    [updateStateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createStateUser.pending]: (state) => {
      state.loading = true;
    },
    [createStateUser.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("stateadded");
    },
    [createStateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [searchCountry.pending]: (state) => {
      state.loading = true;
    },
    [searchCountry.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [searchCountry.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [searchState.pending]: (state) => {
      state.loading = true;
    },
    [searchState.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [searchState.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteState.pending]: (state) => {
      state.loading = true;
    },
    [deleteState.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      const id = action.payload;
      if (id) {
        state.users.data = state.users.data.filter(
          (item) => item.stateId !== id
        );
      }
    },
    [deleteState.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchDistrict.pending]: (state) => {
      state.loading = true;
    },
    [fetchDistrict.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [fetchDistrict.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateDistrictUser.pending]: (state) => {
      state.loading = true;
    },
    [updateDistrictUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.data.map((item) =>
        item.stateId === action.payload.id ? action.payload : item
      );
    },
    [updateDistrictUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteDistrict.pending]: (state) => {
      state.loading = true;
    },
    [deleteDistrict.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      const id = action.payload;
      if (id) {
        state.users.data = state.users.data.filter(
          (item) => item.districtId !== id
        );
      }
    },
    [deleteDistrict.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [searchDistrict.pending]: (state) => {
      state.loading = true;
    },
    [searchDistrict.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [searchDistrict.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createDistrictUser.pending]: (state) => {
      state.loading = true;
    },
    [createDistrictUser.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("districtadded");
    },
    [createDistrictUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userDetails.reducer;
export const { setPageSize, setSearchQuery, setTotalPages, setPage, setSearchResults } = userDetails.actions;
export const selectData = (state) => state.app.users;
export const selectSearchResults = (state) => state.app.searchResults;
