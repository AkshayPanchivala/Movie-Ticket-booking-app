import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId")
      state.isLoggedIn = false;
    },
  },
});

const theaterSlice=createSlice({
    name:"theater",
    initialState:{isLoggedIn:false},
    reducers:{
        login(state){
            state.isLoggedIn=true;
        },
        logout(state){
          localStorage.removeItem("adminId")
          localStorage.removeItem("token")

            state.isLoggedIn=false;
        }
    }
})
const adminSlice=createSlice({
  name:"admin",
  initialState:{isLoggedIn:false},
  reducers:{
      login(state){
          state.isLoggedIn=true;
      },
      logout(state){
        localStorage.removeItem("adminid")
        localStorage.removeItem("token")

          state.isLoggedIn=false;
      }
  }
})
export const userActions=userSlice.actions;
export const theaterActions=theaterSlice.actions;
export const adminActions=adminSlice.actions;

export const store=configureStore({
   reducer: {
    user:userSlice.reducer,
    theater:theaterSlice.reducer,
    admin:adminSlice.reducer
   }
})