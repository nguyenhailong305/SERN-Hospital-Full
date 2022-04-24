import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("GENDER" ,"ROLE" , "POSITION");
      if (res && res.errCode === 0) {
        console.log('check get state' , getState);
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("error", e);
    }
  };
};
export const fetchGenderSuccess = (genderData , roleData , positionData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
  data1: roleData,
  data2: positionData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//start doing end
