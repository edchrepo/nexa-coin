import { createSlice } from '@reduxjs/toolkit';

interface SelectedCoinsState {
    coins: string[];
}

const initialState: SelectedCoinsState = {
    coins: []
};

export const selectedCoinSlice = createSlice({
    name: 'selectedCoin',
    initialState,
    reducers: {
        // Action to add a coin
        addCoin: (state, action) => {
            if (!state.coins.includes(action.payload)) {
                state.coins.push(action.payload);
            }
        },
        // Action to remove a coin
        removeCoin: (state, action) => {
            state.coins = state.coins.filter(
                coin => coin !== action.payload
            );
        },
    },
});

export const { addCoin, removeCoin } = selectedCoinSlice.actions;

export default selectedCoinSlice.reducer;