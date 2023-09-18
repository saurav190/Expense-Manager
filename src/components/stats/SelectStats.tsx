import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography, Box } from "@mui/material";


interface SelectStatsProps {
    handleSelectedValueChange: (value: string) => void;
  }
  const SelectStats: React.FC<SelectStatsProps> = ({ handleSelectedValueChange }) => {
    const [selectedValue, setSelectedValue] = React.useState("Income");
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSelectedValue(value);
      handleSelectedValueChange(value); 
      
    };
  return (
    <FormControl>
      <Box display="flex" gap={2} alignItems="center" marginBottom={1}>
        <Typography variant="h6" display={"flex"}>
          Select Transaction Type
        </Typography>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={selectedValue}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Income"
            control={
              <Radio
                sx={{
                  color: "green",
                  "&.Mui-checked": { color: "#022c22" },
                }}
              />
            }
            label="Income"
            style={{ color: "#022c22" }}
          />
          <FormControlLabel
            value="Expense"
            control={
              <Radio sx={{ color: "#022c22", "&.Mui-checked": { color: "#022c22" } }} />
            }
            label="Expense"
            style={{ color: "#022c22" }}
          />
        </RadioGroup>
      </Box>
    </FormControl>
  );
};

export default SelectStats;
