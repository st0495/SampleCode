import { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Layout, Menu, Button, Typography, Input, InputNumber } from "antd";
import useDashBoard from "./actions";
import { Line } from "@ant-design/charts";
import Header from "../../components/Header";
import SideDrawer from "../../components/SideDrawer";
import moment from "moment";
import Table from "../../components/Table";
import { IBillTpye } from "./type";
import FilterDropDown from "../../components/FilterDropDown";
import AreaChartOutlined from "@ant-design/icons/lib/icons/AreaChartOutlined";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { Text } = Typography;
const DashBoardScreen = () => {
  const { listOfBills, addBills, addGraphData, graphData } = useDashBoard();
  const todaysDate = new Date().toISOString().split("T")[0];
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("add");
  const [date, setDate] = useState(todaysDate);
  const [editableRecord, setEditableRecord] = useState<IBillTpye>();
  const [tableData, setTableData] = useState(listOfBills);
  const [minBillsList, setMinBillsList] = useState();
  const [minExpenditure, setMinimumExpenditure] = useState(5000);
  const config = {
    data: graphData,
    height: 400,
    xField: "date",
    yField: "value",
    point: {
      size: 5,
      shape: "circle",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };
  const openDrawer = () => {
    setIsDrawerVisible(true);
  };

  const addCategory = (value: string) => {
    setCategory(value);
  };

  const addDescription = (value: string) => {
    setDescription(value);
  };

  const addAmount = (value: string) => {
    setAmount(value);
  };

  const addDate = (value: any) => {
    setDate(value);
  };

  const clearDrawer = () => {
    setCategory("");
    setDescription("");
    setAmount("");
    setDate(todaysDate);
  };

  useEffect(() => {
    createGraphData();
    generateMinimumBillList();
  }, []);

  useEffect(() => {
    generateMinimumBillList();
  }, [minExpenditure]);

  useEffect(() => {
    createGraphData();
    setTableData(listOfBills);
    generateMinimumBillList();
  }, [listOfBills]);

  // generateMinimumBillList function creates a list of minimum bills which one can pay based on their monthly budget
  const generateMinimumBillList = () => {
    let minimumBillList: any = [];
    let monthlyBudget = minExpenditure;
    let list = JSON.parse(JSON.stringify(listOfBills));
    const sortedList = list.sort(function (
      a: { amount: string },
      b: { amount: string }
    ) {
      return parseInt(b.amount, 10) - parseInt(a.amount, 10);
    });
    sortedList.forEach((value: { amount: number }) => {
      if (monthlyBudget >= 0 && monthlyBudget > value.amount) {
        monthlyBudget = monthlyBudget - value.amount;
        minimumBillList.push(value);
      }
    });
    setMinBillsList(minimumBillList);
  };

  // createGraphData creates a list based on current month
  const createGraphData = () => {
    const currentMonth = moment(todaysDate).format("M");
    let list: { date: string; value: any }[] = [];
    const totalNumberOfDays = moment(todaysDate).daysInMonth();
    for (let day = 1; day <= totalNumberOfDays; day++) {
      list.push({ date: day.toString(), value: 0 });
    }
    listOfBills.forEach(
      (value: { date: moment.MomentInput; amount: string }) => {
        if (moment(value.date).format("M") === currentMonth) {
          const data = {
            date: moment(value.date).format("D"),
            value: value.amount,
          };
          if (
            list[parseInt(moment(value.date).format("D"), 10) - 1].value > 0
          ) {
            list.splice(
              parseInt(moment(value.date).format("D"), 10) - 1,
              0,
              data
            );
          }
          list[parseInt(moment(value.date).format("D"), 10) - 1] = data;
        }
      }
    );
    addGraphData(list);
  };

  // handle submit is used for adding a new bill
  const handleSubmit = () => {
    const record = editableRecord;
    let list = JSON.parse(JSON.stringify(listOfBills));
    if (record) {
      const index = list.findIndex(
        (bill: { id: Number }) => bill.id === record.id
      );
      list[index].category =
        record.category !== category ? category : record.category;
      list[index].description =
        record.description !== description ? description : record.description;
      list[index].amount = record.amount ? amount : record.amount;
      list[index].date =
        record.date !== moment(date).format("MM-DD-YYYY")
          ? moment(date).format("MM-DD-YYYY")
          : record.amount;
      addBills(list);
      setIsDrawerVisible(false);
      clearDrawer();
    } else {
      setIsDrawerVisible(false);
      const bill = {
        id: listOfBills.length + 1,
        description: description,
        category: category,
        amount: amount,
        date: moment(date).format("YYYY-MM-DD"),
      };
      list.push(bill);
      addBills(list);
      clearDrawer();
    }
  };

  const handleEditBill = (value: any, mode: string) => {
    setMode(mode);
    setEditableRecord(value);
    setCategory(value.category);
    setDescription(value.description);
    setDate(moment(value.date).format("MM-DD-YYYY"));
    setAmount(value.amount);
    setIsDrawerVisible(true);
  };

  const handleDeleteBill = (record: any) => {
    let list = JSON.parse(JSON.stringify(listOfBills));
    const index = list.findIndex(
      (bill: { id: Number }) => bill.id === record.id
    );
    list.splice(index, 1);
    addBills(list);
  };

  const handleFilterSelection = (value: string) => {
    const filteredList = listOfBills.filter(
      (bill: { category: string }) => bill.category === value
    );
    setTableData(filteredList);
  };

  const clearFilter = () => {
    setTableData(listOfBills);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    clearDrawer();
  };

  // getTotalDue calculates the total amount for the present month
  const getTotalDue = (): any => {
    let due = 0;
    if (graphData.length > 0) {
      graphData.forEach((data: { value: string }) => {
        due = due + parseInt(data.value);
      });
    }
    return due;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<AreaChartOutlined />}>
            <Link to="/dashboard">DashBoard</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="dashboard-container">
        <div className="dashboard-header">
          <Header
            title="Billing Dashboard"
            onClick={openDrawer}
            subTitle={`${"Amount due for "}${moment().format(
              "MMMM"
            )}${" "}${getTotalDue()}`}
          />
        </div>
        <div className="dashboard-chart">
          <div>
            <Text>Bill Board For {moment().format("MMMM")} </Text>
          </div>
          <div className="dashboard-chart__container">
            <Line {...config} />;
          </div>
        </div>
        <div className="dashboard-filter">
          <div className="dashboard-filter__filter-container">
            <FilterDropDown
              billsList={listOfBills}
              OnSelect={handleFilterSelection}
            />
          </div>
          <div className="dashboard-filter__input-container">
            <Text>Monthly Budget-</Text>
            <InputNumber
              value={minExpenditure}
              onChange={(value) => setMinimumExpenditure(value)}
            />
          </div>
          <div className="dashboard-filter__button-container">
            <Button type="primary" onClick={clearFilter}>
              Clear
            </Button>
          </div>
        </div>
        <div className="dashboard-table">
          <Table
            source={tableData}
            editBill={handleEditBill}
            deleteBill={handleDeleteBill}
            minimumBillList={minBillsList}
          />
        </div>

        <SideDrawer
          isVisible={isDrawerVisible}
          onClose={closeDrawer}
          onSubmit={handleSubmit}
          setCategory={addCategory}
          setDescription={addDescription}
          setAmount={addAmount}
          setDate={addDate}
          category={category}
          description={description}
          amount={amount}
          date={moment(date)}
          isSubmitButtonDisbaled={
            category.length > 0 &&
            date.length > 0 &&
            description.length > 0 &&
            amount.length > 0
          }
        />
      </Layout>
    </Layout>
  );
};

export default DashBoardScreen;
