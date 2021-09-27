import { Button, Space, Table, Typography } from "antd";
import { FunctionComponent } from "react";
import { IListTableProps } from "./type";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./style.scss";

const ListTable: FunctionComponent<IListTableProps> = (props) => {
  const { Text } = Typography;
  const { source, editBill, deleteBill, minimumBillList } = props;
  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "25%",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "25%",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "25%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "25%",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Text>{record.date}</Text>
          <Button onClick={() => editBill(record, "edit")}>
            <EditOutlined />
          </Button>
          <Button onClick={() => deleteBill(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={source}
        rowClassName={(record, index) =>
          minimumBillList &&
          minimumBillList.find((item: { id: any }) => item.id === record.id) !==
            undefined
            ? "color"
            : "dark-color"
        }
      />
    </div>
  );
};
export default ListTable;
