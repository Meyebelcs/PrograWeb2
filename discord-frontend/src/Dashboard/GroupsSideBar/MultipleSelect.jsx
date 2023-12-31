import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 12;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({friends, setSelectedUsers}) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setSelectedUsers(
      // On autofill we get a stringified value.
      event.target.value.map((selectedValue) => {
        const friend = friends.find((friend) => friend.mail === selectedValue);
        return friend.id;
      })
    );
  };

  return (
    <div>
        <FormControl sx={{ width: '100%', marginTop:'15px' }}>
        <InputLabel id="demo-multiple-checkbox-label">Usuarios</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Usuarios" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {friends.map((name) => (
            <MenuItem key={name.id} value={name.mail}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name.username} />
            </MenuItem>
          ))}
        </Select>
        </FormControl>
    </div>
  );
}