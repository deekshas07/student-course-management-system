import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getAttempt,
  createAttempt,
  updateAttempt
} from '../services/attemptService';
import { getStudents } from '../services/studentService';
import { getCourses  } from '../services/courseService';
import {
  TextField, Button, Paper, Typography, Stack, MenuItem
} from '@mui/material';

export default function AttemptForm() {
  const [data, setData] = useState({
    StudentID:'',CourseID:'',YearTaken:new Date().getFullYear(),
    Semester:1,Marks:'',Grade:'',AttemptNumber:1
  });
  const [students, setStudents] = useState([]);
  const [courses,  setCourses]  = useState([]);
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    getStudents().then(r=>setStudents(r.data));
    getCourses().then(r=>setCourses(r.data));
    if (id) getAttempt(id).then(r=>setData(r.data));
  },[id]);

  const handleChange = e => {
    let val = e.target.value;
    if (['YearTaken','Semester','AttemptNumber'].includes(e.target.name))
      val = Number(val);
    setData(prev=>({...prev,[e.target.name]:val}));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) await updateAttempt(id, data);
    else    await createAttempt(data);
    nav('/attempts');
  };

  return (
    <Paper sx={{ p:3, maxWidth:600, mx:'auto' }}>
      <Typography variant="h5" mb={2}>{id?'Edit':'New'} Attempt</Typography>
      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        <TextField select name="StudentID" label="Student" value={data.StudentID} onChange={handleChange} required>
          {students.map(s=>(
            <MenuItem key={s.StudentID} value={s.StudentID}>
              {s.StudentNumber} — {s.FirstName} {s.LastName}
            </MenuItem>
          ))}
        </TextField>
        <TextField select name="CourseID" label="Course" value={data.CourseID} onChange={handleChange} required>
          {courses.map(c=>(
            <MenuItem key={c.CourseID} value={c.CourseID}>
              {c.CourseCode} — {c.CourseName}
            </MenuItem>
          ))}
        </TextField>
        <TextField name="YearTaken" label="Year" type="number" value={data.YearTaken} onChange={handleChange} required/>
        <TextField name="Semester"  label="Semester" type="number" value={data.Semester} onChange={handleChange} required/>
        <TextField name="Marks"     label="Marks"       value={data.Marks} onChange={handleChange}/>
        <TextField name="Grade"     label="Grade"       value={data.Grade} onChange={handleChange}/>
        <TextField name="AttemptNumber" label="Attempt #" type="number" value={data.AttemptNumber} onChange={handleChange} required/>
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained">{id?'Update':'Create'}</Button>
          <Button variant="outlined" onClick={()=>nav('/attempts')}>Cancel</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
