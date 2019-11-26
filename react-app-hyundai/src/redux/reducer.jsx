import { TYPES } from "./types";
import { eachDayOfInterval } from "date-fns";

const initialState = {
  id: "1",
  model: "creta",
  license: "А111АА750",
  reservations: [
    ...eachDayOfInterval({
      start: new Date("2019/01/01"),
      end: new Date("2019/01/05")
    }),
    new Date("2019/01/10")
  ]
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.FETCH_CAR_INFO_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false
      };
    }

    case TYPES.FETCH_CAR_INFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        ...payload
      };
    }

    case TYPES.FETCH_CAR_INFO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false
      };
    }

    default:
      return state;
  }
};
