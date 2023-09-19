
import axios from 'axios';
import { toast } from "react-toastify";
import {
   CHANGE_SECTION
} from '../constants/sectionConstant';




export const sectionChange = (section) => async (dispatch) => {
    dispatch({
        type: CHANGE_SECTION,
        payload: section
    });
     
}
