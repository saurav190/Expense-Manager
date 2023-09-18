
import "../../assets/css/form.css" 
import { Button, Tooltip } from "@mui/material";
import React from "react";
import { setOpenPopup } from "../../redux/features/usertransaction/userTransactionSlice";
import { useAppDispatch } from "../../redux/store";

interface DataProps {
  Title: string;
}

const TransactionsPopup: React.FC<DataProps> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <div className="popup-container">
        <Tooltip title="Add Transactions">
      <Button
        variant="contained"
        className="plus-button"
        onClick={() => dispatch(setOpenPopup(true))}
      >
        {props.Title}
      </Button>
      </Tooltip>
    </div>
  );
};

export default TransactionsPopup;
