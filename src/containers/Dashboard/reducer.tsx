import { ADD_BILLS, ADD_GRAPH_DATA } from "./actions";

const initialState = {
  listOfBills: [
    {
      id: 1,
      description: "Dominoes",
      category: "FoodNDining",
      amount: "430",
      date: "09-02-2021",
    },
    {
      id: 2,
      description: "Car wash",
      category: "utility",
      amount: "500",
      date: "09-06-2021",
    },
    {
      id: 3,
      description: "Amazon",
      category: "shopping",
      amount: "2030",
      date: "09-07-2021",
    },
    {
      id: 4,
      description: "House rent",
      category: "Food & Dining",
      amount: "35900",
      date: "09-03-2021",
    },
    {
      id: 5,
      description: "Tuition",
      category: "education",
      amount: "2200",
      date: "09-12-2021",
    },
    {
      id: 6,
      description: "Laundry",
      category: "Personal Care",
      amount: "320",
      date: "09-14-2021",
    },
    {
      id: 7,
      description: "Vacation",
      category: "Travel",
      amount: "3430",
      date: "09-18-2021",
    },
  ],
  graphData: [],
};

const DashBoardScreenReducer = (
  state = initialState,
  action: { type: any; payload?: any }
) => {
  switch (action.type) {
    case ADD_BILLS:
      return {
        ...state,
        listOfBills: action.payload,
      };
    case ADD_GRAPH_DATA:
      return {
        ...state,
        graphData: action.payload,
      };
    default:
      return state;
  }
};

export default DashBoardScreenReducer;
