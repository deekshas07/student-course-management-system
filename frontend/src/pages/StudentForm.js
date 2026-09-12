import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getStudent,
  createStudent,
  updateStudent
} from '../services/studentService';
import { getPrograms } from '../services/programService';
import {
  TextField, Button, Paper, Typography, Stack, MenuItem
} from '@mui/material';

export default function StudentForm() {
  const [data, setData] = useState({
    StudentNumber:'',FirstName:'',LastName:'',DOB:'',EnrollmentYear:new Date().getFullYear(),ProgramID:''
  });
  const [progs, setProgs] = useState([]);
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    getPrograms().then(r=>setProgs(r.data));
    if (id) getStudent(id).then(r=>setData({
      ...r.data,
      DOB: r.data.DOB?.split('T')[0] // strip time
    }));
  }, [id]);

  const handleChange = e => {
    let val = e.target.value;
    if (e.target.type==='number') val = Number(val);
    setData(prev=>({...prev,[e.target.name]:val}));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) await updateStudent(id, data);
    else    await createStudent(data);
    nav('/students');
  };

  return (
    <Paper sx={{ p:3, maxWidth:600, mx:'auto' }}>
      <Typography variant="h5" mb={2}>{id?'Edit':'New'} Student</Typography>
      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        <TextField name="StudentNumber" label="Student Number" value={data.StudentNumber} onChange={handleChange} required/>
        <TextField name="FirstName"     label="First Name"     value={data.FirstName}     onChange={handleChange} required/>
        <TextField name="LastName"      label="Last Name"      value={data.LastName}      onChange={handleChange} required/>
        <TextField
          name="DOB" label="Date of Birth" type="date"
          InputLabelProps={{ shrink:true }}
          value={data.DOB} onChange={handleChange} required
        />
        <TextField
          name="EnrollmentYear" label="Enrollment Year"
          type="number" value={data.EnrollmentYear}
          onChange={handleChange} required
        />
        <TextField
          select name="ProgramID" label="Program"
          value={data.ProgramID} onChange={handleChange} required
        >
          {progs.map(p=>(
            <MenuItem key={p.ProgramID} value={p.ProgramID}>
              {p.ProgramName}
            </MenuItem>
          ))}
        </TextField>
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained">{id?'Update':'Create'}</Button>
          <Button variant="outlined" onClick={()=>nav('/students')}>Cancel</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
