import axios from "axios";

import { transfersActions } from "../slices/transfers.slice";

const API_URL = "http://localhost:4000/api/v1/users";

export const getUsersTransfers = (userId) => {
  return async (dispatch) => {
    try {
      // API REQUEST

      const res = await axios.post(`${API_URL}/${userId}/history`);

      const { tranfers } = res.data;

      dispatch(transfersActions.getTransfers({ tranfers }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const newTransfer = (accountNumber, sendAccoundNumber, amount) => {
  return async (dispatch) => {
    try {
      // API REQUEST

      const transferData = { accountNumber, sendAccoundNumber, amount };

      const res = await axios.post(`${API_URL}/transfers`, transferData);

      const { newTransfer } = res.data;
      dispatch(transfersActions.newTransfer({ newTransfer }));
    } catch (error) {
      console.log(error);
    }
  };
};
