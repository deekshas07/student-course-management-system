import React, { useEffect, useState } from 'react';
import { getPrograms, deleteProgram } from '../services/programService';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Typography, Stack
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function ProgramList() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getPrograms();
    setPrograms(res.data);
  };

  const remove = async (id) => {
    if (window.confirm('Delete this program?')) {
      await deleteProgram(id);
      load();
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Programs</Typography>
        <Button variant="contained" component={RouterLink} to="/programs/new">
          New Program
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programs.map((p) => (
              <TableRow key={p.ProgramID}>
                <TableCell>{p.ProgramID}</TableCell>
                <TableCell>{p.ProgramName}</TableCell>
                <TableCell>{p.Description}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to={`/programs/${p.ProgramID}/edit`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => remove(p.ProgramID)}
                    >
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
