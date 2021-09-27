export interface IDrawerProps {
  onClose: () => void;
  isVisible: boolean;
  onSubmit: () => void;
  setCategory: (e: any) => void;
  setDescription: (e: any) => void;
  setAmount: (e: any) => void;
  setDate: (e: any) => void;
  category: string;
  amount: string;
  description: string;
  date: any;
  isSubmitButtonDisbaled: boolean;
}
