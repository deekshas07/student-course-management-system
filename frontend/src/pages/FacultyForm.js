import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getFacultyById,
  createFaculty,
  updateFaculty
} from '../services/facultyService';
import { TextField, Button, Paper, Typography, Stack } from '@mui/material';

export default function FacultyForm() {
  const [data, setData] = useState({ FirstName:'', LastName:'', Email:'', Department:'' });
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    if (id) getFacultyById(id).then(r => setData(r.data));
  }, [id]);

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    if (id) await updateFaculty(id, data);
    else   await createFaculty(data);
    nav('/faculty');
  };

  return (
    <Paper sx={{ p:3, maxWidth:600, mx:'auto' }}>
      <Typography variant="h5" mb={2}>{id?'Edit':'New'} Faculty</Typography>
      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        <TextField name="FirstName" label="First Name" value={data.FirstName} onChange={handleChange} required/>
        <TextField name="LastName"  label="Last Name"  value={data.LastName}  onChange={handleChange} required/>
        <TextField name="Email"     label="Email"      value={data.Email}     onChange={handleChange}/>
        <TextField name="Department"label="Department" value={data.Department}onChange={handleChange}/>
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained">{id?'Update':'Create'}</Button>
          <Button variant="outlined" onClick={()=>nav('/faculty')}>Cancel</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
