import React, { useEffect, useState } from 'react';
import { getCourses, deleteCourse } from '../services/courseService';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Typography, Stack
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function CourseList() {
  const [list, setList] = useState([]);
  useEffect(()=>{ load() },[]);
  const load = async()=>{ const r=await getCourses(); setList(r.data); };
  const remove=async id=>{ if(window.confirm('Delete?')){ await deleteCourse(id); load() }};

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Courses</Typography>
        <Button variant="contained" component={RouterLink} to="/courses/new">
          New Course
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['ID','Code','Name','Credits','Year','Program','Faculty','Actions']
                .map(h=> <TableCell key={h}>{h}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(c=>(
              <TableRow key={c.CourseID}>
                <TableCell>{c.CourseID}</TableCell>
                <TableCell>{c.CourseCode}</TableCell>
                <TableCell>{c.CourseName}</TableCell>
                <TableCell>{c.CreditPoints}</TableCell>
                <TableCell>{c.CommencementYear}</TableCell>
                <TableCell>{c.ProgramID}</TableCell>
                <TableCell>{c.FacultyID}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to={`/courses/${c.CourseID}/edit`}
                    >Edit</Button>
                    <Button variant="outlined" color="error" onClick={()=>remove(c.CourseID)}>
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
