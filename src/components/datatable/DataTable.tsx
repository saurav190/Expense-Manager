import {
  ArrowDownward,
  ArrowUpward,
  Delete,
  Edit,
  Print,
  SaveAlt
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import "../../assets/css/form.css";
import { expenseCategories, incomeCategories } from "../../utils/constants";
import { InfoIcon, MoneyIcon, ShoppingBasketIcon } from "../../utils/icons/Icons";
import { Transaction } from "../../utils/types";
import { InputLabel } from "@material-ui/core";

interface DataProps {
  transactions: Transaction[];
  handleEdit: (transaction: Transaction) => void;
  handleDelete: (transactionId: string) => void;
  handlePrintPDF: () => void;
  handleExportExcel: () => void;
  getIconByCategory: (
    category: string,
    transactionType: string
  ) => React.ReactNode;
  generatingPDF: boolean;
}

const DataTable: React.FC<DataProps> = ({
  transactions,
  handleEdit,
  handleDelete,
  getIconByCategory,
  handlePrintPDF,
  handleExportExcel,
  generatingPDF,
}) => {
  const [selectedTransactionType, setSelectedTransactionType] = useState<
    string
  >("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortByDate, setSortByDate] = useState<"asc" | "desc" | undefined>(
    "asc"
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<
    Transaction | null
  >(null);

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortByDate === "asc") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortByDate === "desc") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  const filteredTransactions = sortedTransactions?.filter((transaction) => {
    if (
      selectedTransactionType &&
      transaction.type !== selectedTransactionType
    ) {
      return false;
    }
    if (selectedCategory && transaction.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const totalTransactions = filteredTransactions?.length;

  const handleTransactionTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedTransactionType(event.target.value);
    setPage(0);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
    setPage(0);
  };

  const toggleSortByDate = () => {
    setSortByDate(sortByDate === "asc" ? "desc" : "asc");
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedTransactions = filteredTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenConfirmDelete = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setConfirmDeleteOpen(true);
  };

  const handleCloseConfirmDelete = () => {
    setTransactionToDelete(null);
    setConfirmDeleteOpen(false);
  };

  const handleConfirmDelete = () => {
    if (transactionToDelete) {
      handleDelete(transactionToDelete.id);
    }
    handleCloseConfirmDelete();
  };

  return (
    <>
      <div className="container">
        <Paper elevation={3} className="table-container">
          <div className="selectPosition">
            <FormControl fullWidth style={{ marginTop: "20px" }} className="formControlStyle">
              <InputLabel id="transaction-type-label" className="input-labelstyle">
                Transaction Type
              </InputLabel>
              <Select
                labelId="transaction-type-label"
                size="small"
                value={selectedTransactionType}
                onChange={handleTransactionTypeChange}
                variant="outlined"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="income"><MoneyIcon className="moneyIcon" />Income</MenuItem>
                <MenuItem value="expense"><ShoppingBasketIcon className="expenseIcon" />Expense</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: "20px" }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                size="small"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="category-select"
              >
                <MenuItem value="">All</MenuItem>
                {incomeCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {getIconByCategory(category, selectedTransactionType)}{" "}
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
                {expenseCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {getIconByCategory(category, selectedTransactionType)}{" "}
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
           
          </div>
          <div className="btnPosition">
          <Button
              onClick={handleExportExcel}
              startIcon={<SaveAlt />}
              className="btnActions"
              disabled={transactions.length === 0}
            >
              Export As Excel
            </Button>
            <Button
              onClick={handlePrintPDF}
              startIcon={<Print />}
              className="btnActions"
              disabled={generatingPDF || transactions.length === 0}
            >
              {generatingPDF ? "Generating PDF..." : "Print"}
            </Button>
          </div>
          <div className="table-responsive">

          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell>Transaction Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>
                  <Button onClick={toggleSortByDate}>
                    Date
                    {sortByDate === "asc" ? (
                      <ArrowUpward fontSize="small" />
                    ) : (
                      <ArrowDownward fontSize="small" />
                    )}
                  </Button>
                </TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {totalTransactions === 0 ? (
    <TableRow>
      <TableCell colSpan={6} align="center">
        No data available.
      </TableCell>
    </TableRow>
  ) : (paginatedTransactions.map((transaction, index) => (
    <TableRow key={index}>
      <TableCell>{transaction.type}</TableCell>
      <TableCell>
            {getIconByCategory(
              transaction.category,
              transaction.type
            )}{" "}
            {transaction.category.charAt(0).toUpperCase() +
              transaction.category.slice(1)}
      </TableCell>
      <TableCell>{transaction.label}</TableCell>
      <TableCell>{transaction.date}</TableCell>
      <TableCell
        className={
          transaction.type === "income"
            ? "income-cell"
            : "expense-cell"
        }
      >
        {transaction.type === "income" ? (
          <ArrowUpward className="income-icon" fontSize="small" />
        ) : (
          <ArrowDownward
            className="expense-icon"
            fontSize="small"
          />
        )}
        {transaction.amount.toFixed(2)}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => handleEdit(transaction)}
          startIcon={<Edit />}
          className="btnActions"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleOpenConfirmDelete(transaction)}
          startIcon={<Delete />}
          className="btnDelete"
        >
          Delete
        </Button>
      </TableCell>
   
    </TableRow>
  )))}
              
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {totalTransactions === 0 ? (
                      <InfoIcon
                        className="infoIcon"
                        style={{ marginRight: "4px", color: "red" }}
                      />
                    ) : (
                      <InfoIcon
                        className="infoIcon"
                        style={{ marginRight: "4px", color: "green" }}
                      />
                    )}
                    <span>Total Records: {totalTransactions}</span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </div>
          <Dialog
            open={confirmDeleteOpen}
            onClose={handleCloseConfirmDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this transaction?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmDelete} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={totalTransactions}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

    </>
  );
};

export default DataTable;
