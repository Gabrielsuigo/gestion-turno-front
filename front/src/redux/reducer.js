import { createSlice } from "@reduxjs/toolkit";

const inicialState = {
  userActive: {},
  userAppointment: [],
};
export const userSlice = createSlice({
  name: "userDate",
  initialState: inicialState,
  reducers: {
    addUser: (state, action) => {
      state.userActive = action.payload;
    },

     logoutUser: (state) => {
      state.userActive = {}; // 🔹 Limpia los datos del usuario
      state.userAppointment = []; // 🔹 Limpia los turnos
    },


    addUserAppointments: (state, action) => {
      state.userAppointment = action.payload;
    },

    cancelAppointmentAction: (state, action) => {
      state.userAppointment = state.userAppointment.map(appointment => {
        if (appointment.id === action.payload) {
          return {...appointment, status: "cancelled" };
        }
        return appointment;
      });
    },
  },
});

export const { addUser, addUserAppointments, cancelAppointmentAction, logoutUser } = userSlice.actions;
// export default userSlice.reducer;
