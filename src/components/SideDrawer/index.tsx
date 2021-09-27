import { Button, DatePicker, Drawer, Form, Input, Typography } from "antd";
import { FunctionComponent } from "react";
import { IDrawerProps } from "./type";
import "./style.scss";

const SideDrawer: FunctionComponent<IDrawerProps> = (props) => {
  const { Text } = Typography;
  const {
    onClose,
    isVisible,
    category,
    amount,
    description,
    date,
    onSubmit,
    setCategory,
    setDescription,
    setAmount,
    setDate,
    isSubmitButtonDisbaled,
  } = props;

  const onDateChange = (date: any, dateString: any) => {
    setDate(dateString);
  };
  return (
    <Drawer
      title="Add a new bill"
      width={550}
      onClose={onClose}
      visible={isVisible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div className="button-container">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={onSubmit}
            type="primary"
            disabled={!isSubmitButtonDisbaled}
          >
            Submit
          </Button>
        </div>
      }
    >
      <div className="form-container">
        <div className="fields">
          <Text>Category*</Text>
          <Input
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </div>
        <div className="fields">
          <Text>Amount*</Text>
          <Input onChange={(e) => setAmount(e.target.value)} value={amount} />
        </div>
        <div className="fields">
          <Text>Description*</Text>
          <Input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="fields">
          <Text>Date*</Text>
          <DatePicker onChange={onDateChange} value={date} />
        </div>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
