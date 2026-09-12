import React, { useEffect, useState } from 'react';
import { getStudents, deleteStudent } from '../services/studentService';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Typography, Stack
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function StudentList() {
  const [list, setList] = useState([]);
  useEffect(()=>{ load() },[]);
  const load=async()=>{ const r=await getStudents(); setList(r.data) };
  const remove=async id=>{ if(window.confirm('Delete?')){await deleteStudent(id); load()}};

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" component={RouterLink} to="/students/new">
          New Student
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['ID','Number','First','Last','DOB','EnrollYear','Program','Actions']
                .map(h=> <TableCell key={h}>{h}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(s=>(
              <TableRow key={s.StudentID}>
                <TableCell>{s.StudentID}</TableCell>
                <TableCell>{s.StudentNumber}</TableCell>
                <TableCell>{s.FirstName}</TableCell>
                <TableCell>{s.LastName}</TableCell>
                <TableCell>{s.DOB}</TableCell>
                <TableCell>{s.EnrollmentYear}</TableCell>
                <TableCell>{s.ProgramID}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to={`/students/${s.StudentID}/edit`}
                    >Edit</Button>
                    <Button variant="outlined" color="error" onClick={()=>remove(s.StudentID)}>
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
