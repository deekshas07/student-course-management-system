import React, { useEffect, useState } from 'react';
import { getFaculty, deleteFaculty } from '../services/facultyService';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Typography, Stack
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function FacultyList() {
  const [list, setList] = useState([]);

  useEffect(() => { load(); }, []);
  const load = async () => {
    const res = await getFaculty();
    setList(res.data);
  };
  const remove = async id => {
    if (window.confirm('Delete this faculty?')) {
      await deleteFaculty(id);
      load();
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Faculty</Typography>
        <Button variant="contained" component={RouterLink} to="/faculty/new">
          New Faculty
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(f => (
              <TableRow key={f.FacultyID}>
                <TableCell>{f.FacultyID}</TableCell>
                <TableCell>{f.FirstName}</TableCell>
                <TableCell>{f.LastName}</TableCell>
                <TableCell>{f.Email}</TableCell>
                <TableCell>{f.Department}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to={`/faculty/${f.FacultyID}/edit`}
                    >
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => remove(f.FacultyID)}>
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
