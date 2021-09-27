import { PageHeader, Button } from "antd";
import React, { FunctionComponent } from "react";
import { IHeaderProps } from "./type";
import { PlusOutlined } from "@ant-design/icons";
const Header: FunctionComponent<IHeaderProps> = (props) => {
  const { title, onClick, subTitle } = props;
  return (
    <div>
      <PageHeader
        ghost={false}
        title={title}
        subTitle={subTitle}
        extra={[
          <Button
            key="1"
            type="primary"
            icon={<PlusOutlined />}
            onClick={onClick}
          >
            Add Bill
          </Button>,
        ]}
      ></PageHeader>
    </div>
  );
};
export default Header;
