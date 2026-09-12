import React, { useEffect, useState } from 'react';
import { getAttempts, deleteAttempt } from '../services/attemptService';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Typography, Stack
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function AttemptList() {
  const [list, setList] = useState([]);
  useEffect(()=>{ load() },[]);
  const load=async()=>{ const r=await getAttempts(); setList(r.data)};
  const remove=async id=>{ if(window.confirm('Delete?')){await deleteAttempt(id); load()}};

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Course Attempts</Typography>
        <Button variant="contained" component={RouterLink} to="/attempts/new">
          New Attempt
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['ID','Student','Course','Year','Sem','Marks','Grade','Attempt#','Actions']
                .map(h=> <TableCell key={h}>{h}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(a=>(
              <TableRow key={a.AttemptID}>
                <TableCell>{a.AttemptID}</TableCell>
                <TableCell>{a.StudentID}</TableCell>
                <TableCell>{a.CourseID}</TableCell>
                <TableCell>{a.YearTaken}</TableCell>
                <TableCell>{a.Semester}</TableCell>
                <TableCell>{a.Marks}</TableCell>
                <TableCell>{a.Grade}</TableCell>
                <TableCell>{a.AttemptNumber}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to={`/attempts/${a.AttemptID}/edit`}
                    >Edit</Button>
                    <Button variant="outlined" color="error" onClick={()=>remove(a.AttemptID)}>
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
