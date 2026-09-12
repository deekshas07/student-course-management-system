import React, { useEffect, useState } from 'react';
import {
  Grid, Card, CardContent, Typography, Box, Skeleton
} from '@mui/material';
import SchoolIcon     from '@mui/icons-material/School';
import PeopleIcon     from '@mui/icons-material/People';
import BookIcon       from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PollIcon       from '@mui/icons-material/Poll';

import { getPrograms } from '../services/programService';
import { getFaculty }  from '../services/facultyService';
import { getCourses }  from '../services/courseService';
import { getStudents } from '../services/studentService';
import { getAttempts } from '../services/attemptService';

const stats = [
  { label: 'Programs',   icon: <SchoolIcon fontSize="large" />,   fetch: getPrograms, key: 'length' },
  { label: 'Faculty',    icon: <PeopleIcon fontSize="large" />,   fetch: getFaculty,  key: 'length' },
  { label: 'Courses',    icon: <BookIcon fontSize="large" />,     fetch: getCourses,  key: 'length' },
  { label: 'Students',   icon: <PeopleIcon fontSize="large" />,   fetch: getStudents, key: 'length' },
  { label: 'Attempts',   icon: <AssignmentIcon fontSize="large" />,fetch: getAttempts, key: 'length' },
];

export default function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(stats.map(s => s.fetch().then(r => r.data.length)))
      .then(counts => {
        const map = {};
        stats.forEach((s, i) => { map[s.label] = counts[i]; });
        setData(map);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {stats.map(({ label, icon }) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={label}>
            <Card elevation={3} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ p: 2, color: 'primary.main' }}>{icon}</Box>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  {label}
                </Typography>
                {loading
                  ? <Skeleton width={32} />
                  : <Typography variant="h5">{data[label]}</Typography>
                }
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Example: Add a chart card */}
        <Grid item xs={12} md={8}>
          <Card elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Enrollment Trends
            </Typography>
            {/* You could integrate a chart here (e.g., Recharts or Chart.js) */}
            <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PollIcon sx={{ fontSize: 80, color: 'action.disabled' }} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
