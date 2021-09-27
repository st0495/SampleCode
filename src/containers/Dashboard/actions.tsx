import { useDispatch, useSelector } from "react-redux";

export const ADD_BILLS = "ADD_BILLS";
export const ADD_GRAPH_DATA = "ADD_GRAPH_DATA ";
const useDashBoard = (): {
  listOfBills: any;
  addGraphData: (bills: any) => void;
  addBills: (bills: any) => void;
  graphData: any;
} => {
  const dispatch = useDispatch();
  const listOfBills = useSelector(
    (state: any) => state.DashBoardScreenReducer.listOfBills
  );
  const graphData = useSelector(
    (state: any) => state.DashBoardScreenReducer.graphData
  );
  const addBills = (bills: any) => {
    dispatch({ type: ADD_BILLS, payload: bills });
  };
  const addGraphData = (bills: any) => {
    dispatch({ type: ADD_GRAPH_DATA, payload: bills });
  };
  return {
    listOfBills,
    addBills,
    addGraphData,
    graphData,
  };
};

export default useDashBoard;
