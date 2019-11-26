import axios from "axios";

export const TYPES = {
  FETCH_CAR_INFO_REQUEST: "FETCH_CAR_INFO_REQUEST",
  FETCH_CAR_INFO_SUCCESS: "FETCH_CAR_INFO_SUCCESS",
  FETCH_CAR_INFO_FAILURE: "FETCH_CAR_INFO_FAILURE"
};

export const fetchCarInfoAC = id => async dispatch => {
  dispatch({ type: TYPES.FETCH_CAR_INFO_REQUEST });

  try {
    const { data } = await axios.get(`/cars/${id}`, { id });
    dispatch({
      type: TYPES.FETCH_CAR_INFO_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({ type: TYPES.FETCH_CAR_INFO_FAILURE });
    console.log(err);
  }
};
