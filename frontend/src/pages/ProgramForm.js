import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProgram, createProgram, updateProgram } from '../services/programService';
import { TextField, Button, Paper, Typography, Stack } from '@mui/material';

export default function ProgramForm() {
  const [program, setProgram] = useState({ ProgramName: '', Description: '' });
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    if (id) {
      getProgram(id).then(res => setProgram(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setProgram({ ...program, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateProgram(id, program);
    } else {
      await createProgram(program);
    }
    nav('/programs');
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" mb={2}>
        {id ? 'Edit' : 'New'} Program
      </Typography>
      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="ProgramName"
          value={program.ProgramName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="Description"
          value={program.Description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained">
            {id ? 'Update' : 'Create'}
          </Button>
          <Button variant="outlined" onClick={() => nav('/programs')}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
