import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as weatheActionCreator from "../store/actionCreator/weather";

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(weatheActionCreator, dispatch)
}