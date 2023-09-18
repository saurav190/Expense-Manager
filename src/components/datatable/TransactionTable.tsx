import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { addTransaction, deleteTransaction, setOpenPopup, updateTransaction } from '../../redux/features/usertransaction/userTransactionSlice';
import { RootState } from '../../redux/store';
import { AccountBalanceIcon, BusinessIcon, CurrencyRupeeIcon, EmojiTransportationIcon, FastfoodIcon, FavoriteIcon, HomeIcon, LocalHospitalIcon, MiscellaneousServicesIcon, MovieIcon, SchoolIcon, ShowChartIcon, WorkIcon } from '../../utils/icons/Icons';
import { Transaction } from '../../utils/types';
import '../../assets/css/form.css';
import DataTable from './DataTable';
import DialogForm from './DialogForm';
import { exportToExcel, generatePDF } from '../../utils/transactionFunctions';


interface TableProp {
  transactions: Transaction[];
}

const validationSchema = yup.object().shape({
  transactionType: yup
    .string()
    .notOneOf(["select the option"], "Please select a transaction type")
    .required(),
  category: yup.string().required('Please select a category'),
  label: yup.string().required('Please add a brief description'),
  amount: yup
    .number()
    .typeError('Please enter only number')
    .positive('Please enter a positive amount')
    .required('Please enter an amount'),
  date: yup.date().required('Please select a date'),
});

const TransactionTable: React.FC<TableProp> = ({ transactions }) => {
  const dispatch = useDispatch();
  const { openPopup } = useSelector((state: RootState) => state.transactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [generatingPDF, setGeneratingPDF] = useState<boolean>(false);


  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    formik.setValues({
      id: transaction.id,
      transactionType: transaction.type,
      category: transaction.category,
      customCategory: transaction.category === 'other' ? 'other' : '',
      label: transaction.label,
      amount: transaction.amount.toString(),
      date: transaction.date,
    });
    dispatch(setOpenPopup(true));
  };

  const getIconByCategory = (category: string, transactionType: string) => {
    const incomeIcons: { [key: string]: React.ReactNode } = {
      stock: <ShowChartIcon className="icons-green" />,
      Salary: <CurrencyRupeeIcon className="icons-blue" />,
      BusinessIncome: <BusinessIcon className="icons-purple" />,
      Freelance: <WorkIcon className="icons-orange" />,
      Donations: <FavoriteIcon className="icons-red" />,
      other: <MiscellaneousServicesIcon className="icons-tomato" />,
    };

    const expenseIcons: { [key: string]: React.ReactNode } = {
      Food: <FastfoodIcon className="icons-red" />,
      Transportation: <EmojiTransportationIcon className="icons-orange" />,
      Housing: <HomeIcon className="icons-green" />,
      Salary: <CurrencyRupeeIcon className="icons-blue" />,
      Insurance: <LocalHospitalIcon className="icons-purple" />,
      Healthcare: <FavoriteIcon className="icons-pink" />,
      Entertainment: <MovieIcon className="icons-orange" />,
      Education: <SchoolIcon className="icons-blue" />,
      Taxes: <AccountBalanceIcon className="icons-green" />,
      other: <MiscellaneousServicesIcon className="icons-tomato" />,

    };

    return transactionType === "income"
      ? incomeIcons[category]
      : expenseIcons[category];
  };


  const handleDelete = (transactionId: string) => {
    dispatch(deleteTransaction(transactionId));
  };
  // Initialize form using useFormik
  const formik = useFormik({
    initialValues: {
      transactionType: '',
      category: '',
      customCategory: '',
      label: '',
      amount: '',
      date: '',
      id: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Create a new transaction object
      const amountAsNumber = isNaN(parseFloat(values.amount)) ? 0 : parseFloat(values.amount);
      const selectedCategory = values.category;
      const newTransaction: Transaction = {
        id: values.id,
        type: values.transactionType,
        category: selectedCategory,
        amount: amountAsNumber,
        label: values.label,
        date: values.date,
      };
      if (selectedTransaction) {
        dispatch(updateTransaction(newTransaction));
        setSelectedTransaction(null);
      } else {
        newTransaction.id = uuidv4();
        dispatch(addTransaction(newTransaction));
      }
      // Update transactions and reset the form
      formik.resetForm();
      dispatch(setOpenPopup(false));
    },
  });

  const handleClose = () => {
    dispatch(setOpenPopup(false));
    formik.resetForm();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    formik.setFieldTouched(e.target.name, true, false);
  };

  const handlePrintPDF = () => {
    generatePDF(transactions);
  };

  const handleExportExcel = () => {
    exportToExcel(transactions);
  };
  return (
    <div className='container'>
      <DialogForm
        openPopup={openPopup}
        handleClose={handleClose}
        handleSubmit={formik.handleSubmit}
        formik={formik}
        getIconByCategory={getIconByCategory}
        handleChange={handleChange}
      />
      <div className="table-container"><DataTable
        transactions={transactions}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        getIconByCategory={getIconByCategory}
        handleExportExcel={handleExportExcel}
        handlePrintPDF={handlePrintPDF}
        generatingPDF={generatingPDF}
      /></div>
    </div>
  );
};

export default TransactionTable;
