export interface IListTableProps {
  source: any;
  editBill: (value: any, mode: string) => void;
  deleteBill: (record: any) => void;
  minimumBillList: any;
}
