import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getCourse,
  createCourse,
  updateCourse
} from '../services/courseService';
import { getPrograms } from '../services/programService';
import { getFaculty }  from '../services/facultyService';
import {
  TextField, Button, Paper, Typography, Stack, MenuItem
} from '@mui/material';

export default function CourseForm() {
  const [data, setData] = useState({
    CourseCode:'',CourseName:'',CreditPoints:0,
    CommencementYear:new Date().getFullYear(),
    ProgramID:'',FacultyID:''
  });
  const [programs, setPrograms] = useState([]);
  const [faculty,  setFaculty]  = useState([]);
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    getPrograms().then(r=>setPrograms(r.data));
    getFaculty().then(r=>setFaculty(r.data));
    if(id) getCourse(id).then(r=>setData(r.data));
  },[id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]:
        e.target.type==='number'
          ? Number(value)
          : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) await updateCourse(id, data);
    else    await createCourse(data);
    nav('/courses');
  };

  return (
    <Paper sx={{ p:3, maxWidth:600, mx:'auto' }}>
      <Typography variant="h5" mb={2}>{id?'Edit':'New'} Course</Typography>
      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        <TextField name="CourseCode" label="Code"     value={data.CourseCode} onChange={handleChange} required/>
        <TextField name="CourseName" label="Name"     value={data.CourseName} onChange={handleChange} required/>
        <TextField name="CreditPoints" label="Credits" type="number" value={data.CreditPoints} onChange={handleChange} required/>
        <TextField name="CommencementYear" label="Year" type="number" value={data.CommencementYear} onChange={handleChange} required/>
        <TextField
          select name="ProgramID" label="Program" value={data.ProgramID} onChange={handleChange} required
        >
          {programs.map(p=>(
            <MenuItem key={p.ProgramID} value={p.ProgramID}>
              {p.ProgramName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select name="FacultyID" label="Faculty" value={data.FacultyID} onChange={handleChange} required
        >
          {faculty.map(f=>(
            <MenuItem key={f.FacultyID} value={f.FacultyID}>
              {f.FirstName} {f.LastName}
            </MenuItem>
          ))}
        </TextField>
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained">{id?'Update':'Create'}</Button>
          <Button variant="outlined" onClick={()=>nav('/courses')}>Cancel</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
