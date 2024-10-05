
import React from 'react';
import { Checkbox, FormControlLabel, Button, Select, MenuItem, FormGroup } from '@mui/material';

const PrivacySetting = () => {
  return (
    <div className="p-5 w-full max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Privacy</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Phone Number</h3>
        <Button variant="contained" color="primary">Change</Button>
      </div>

      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Read receipts" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Typing indicators" />
      </FormGroup>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Disappearing messages</h3>
        <Select defaultValue="Off">
          <MenuItem value="Off">Off</MenuItem>
          {/* Add other options */}
        </Select>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Stories</h3>
        <Button variant="contained" color="secondary">Turn off stories</Button>
      </div>
    </div>
  );
};

export default PrivacySetting;

