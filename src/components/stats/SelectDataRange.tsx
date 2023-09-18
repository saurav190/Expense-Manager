import React from 'react';
import { Typography, ToggleButton, ToggleButtonGroup, Box } from '@mui/material';

interface SelectDataRangeProps {
  value: string,
  handleDataRangeChange: (value: string) => void;
}

const SelectDataRange: React.FC<SelectDataRangeProps> = ({ value, handleDataRangeChange }) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newDataRange: string
  ) => {
    handleDataRangeChange(newDataRange);
  };

  return (
      <Box display="flex" gap={2} alignItems="center" marginBottom={1}>
        <Typography variant={'h6'} display={"flex"}>Data of Current </Typography>
        <ToggleButtonGroup
          color="standard"
          value={value}
          exclusive
          size='small'
          onChange={handleChange}
          aria-label="range"
        >
          <ToggleButton value="day">Week</ToggleButton>
          <ToggleButton value="week">Month</ToggleButton>
          <ToggleButton value="month">Year</ToggleButton>
        </ToggleButtonGroup>
    </Box>
  );
};

export default SelectDataRange;
