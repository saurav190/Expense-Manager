import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { MoneyIcon , ShoppingBasketIcon } from "../../utils/icons/Icons"
import "../../assets/css/form.css";
import { expenseCategories, incomeCategories } from "../../utils/constants";

interface DialogProps {
  openPopup: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formik: any;
  getIconByCategory: (
    category: string,
    transactionType: string
  ) => React.ReactNode;
}

const DialogForm: React.FC<DialogProps> = ({
  openPopup,
  handleClose,
  handleSubmit,
  formik,
  getIconByCategory,
  handleChange,
}) => {
  return (
    <Dialog open={openPopup} onClose={handleClose}>
      <DialogTitle>Income Expense Form</DialogTitle>
      <DialogContent>
        <div className="form-container">
          {/* Form inside the dialog */}
          <form onSubmit={formik.handleSubmit}>
            {/* Transaction Type Dropdown */}

            <FormControl fullWidth className="formControlStyle">
              <InputLabel id="transaction-type-label" className="input-labelstyle">
                Transaction Type
              </InputLabel>
              <Select
                labelId="transaction-type-label"
                {...formik.getFieldProps("transactionType")}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem disabled value="select the option">
                  Select the option
                </MenuItem>
                <MenuItem value="income">
                  <MoneyIcon className="moneyIcon" /> Income
                </MenuItem>
                <MenuItem value="expense">
                  <ShoppingBasketIcon className="expenseIcon" /> Expense
                </MenuItem>
              </Select>
              {formik.touched.transactionType &&
                formik.errors.transactionType && (
                  <div className="error">{formik.errors.transactionType}</div>
                )}
            </FormControl>

            {/* Category Dropdown  */}
            <FormControl fullWidth className="formControlStyle">
              <InputLabel id="category-label" className="input-labelstyle">
                Category
              </InputLabel>
              <Select
                labelId="category-label"
                {...formik.getFieldProps("category")}
                onChange={handleChange}
                variant="outlined"
              >
                {formik.values.transactionType === "income" &&
                  incomeCategories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {getIconByCategory(option, formik.values.transactionType)}
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </MenuItem>
                  ))}
                {formik.values.transactionType === "expense" &&
                  expenseCategories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {getIconByCategory(option, formik.values.transactionType)}
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </MenuItem>
                  ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <div className="error">{formik.errors.category}</div>
              )}
            </FormControl>

            {/* Custom Category Text Field  */}
            {formik.values.category === "other" && (
              <TextField
                fullWidth
                label="Custom Category"
                {...formik.getFieldProps("customCategory")}
                style={{ marginTop: "20px" }}
                onChange={handleChange}
              />
            )}
            {formik.touched.customCategory && formik.errors.customCategory && (
              <div className="error">{formik.errors.customCategory}</div>
            )}

            {/* Description Text Field  */}
            <FormControl fullWidth>
              <TextField
                fullWidth
                label="Description"
                {...formik.getFieldProps("label")}
                style={{ marginTop: "20px" }}
                onChange={handleChange}
                inputProps={{ maxLength: 20 }}
              />
              {formik.touched.label && formik.errors.label && (
                <div className="error">{formik.errors.label}</div>
              )}
            </FormControl>

            {/* Amount Text Field  */}
            <FormControl fullWidth>
              <TextField
                fullWidth
                type="text" // Set the input type to text
                label="Amount"
                {...formik.getFieldProps("amount")}
                style={{ marginTop: "20px" }}
                onChange={handleChange}
              />
              {formik.touched.amount && formik.errors.amount && (
                <div className="error">{formik.errors.amount}</div>
              )}
            </FormControl>

            {/* Date Picker  */}
            <FormControl fullWidth>
              <TextField
                fullWidth
                type="date"
                label="Date"
                {...formik.getFieldProps("date")}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: new Date().toISOString().split("T")[0],
                }}
                style={{ marginTop: "20px" }}
                className="date-picker"
              />
              {formik.touched.date && formik.errors.date && (
                <div className="error">{formik.errors.date}</div>
              )}
            </FormControl>
            {/* Dialog Actions  */}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" className="btn">
                Submit
              </Button>
            </DialogActions>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
