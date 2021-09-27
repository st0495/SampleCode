import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import FunnelPlotFilled from "@ant-design/icons/lib/icons/FunnelPlotFilled";
import { Dropdown, Menu, Typography } from "antd";
import { ReactChild, ReactFragment, ReactPortal, Key } from "react";
import "./styles.scss";

const FilterDropDown = (props: { billsList: any; OnSelect: any }) => {
  const { billsList, OnSelect } = props;
  const { Text } = Typography;
  const categoryList = billsList
    .map((item: { category: string }) => item.category)
    .filter(
      (value: any, index: any, self: string | any[]) =>
        self.indexOf(value) === index
    );
  const menu = (
    <Menu onClick={(value) => OnSelect(categoryList[value.key])}>
      {categoryList.map(
        (value: string | null | undefined, index: Key | null | undefined) => {
          return <Menu.Item key={index}>{value}</Menu.Item>;
        }
      )}
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <div className="dropdown">
        <FunnelPlotFilled style={{ color: "#042c55", marginRight: "10px" }} />
        <Text>Filter By Category </Text>
        <DownOutlined style={{ marginLeft: "10px" }} />
      </div>
    </Dropdown>
  );
};

export default FilterDropDown;
