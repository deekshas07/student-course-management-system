import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout       from './components/Layout';
import Dashboard    from './pages/Dashboard';
import ProgramList  from './pages/ProgramList';
import ProgramForm  from './pages/ProgramForm';
import FacultyList  from './pages/FacultyList';
import FacultyForm  from './pages/FacultyForm';
import CourseList   from './pages/CourseList';
import CourseForm   from './pages/CourseForm';
import StudentList  from './pages/StudentList';
import StudentForm  from './pages/StudentForm';
import AttemptList  from './pages/AttemptList';
import AttemptForm  from './pages/AttemptForm';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"                   element={<Dashboard />} />
        <Route path="/programs"           element={<ProgramList />} />
        <Route path="/programs/new"       element={<ProgramForm />} />
        <Route path="/programs/:id/edit"  element={<ProgramForm />} />

        <Route path="/faculty"            element={<FacultyList />} />
        <Route path="/faculty/new"        element={<FacultyForm />} />
        <Route path="/faculty/:id/edit"   element={<FacultyForm />} />

        <Route path="/courses"            element={<CourseList />} />
        <Route path="/courses/new"        element={<CourseForm />} />
        <Route path="/courses/:id/edit"   element={<CourseForm />} />

        <Route path="/students"           element={<StudentList />} />
        <Route path="/students/new"       element={<StudentForm />} />
        <Route path="/students/:id/edit"  element={<StudentForm />} />

        <Route path="/attempts"           element={<AttemptList />} />
        <Route path="/attempts/new"       element={<AttemptForm />} />
        <Route path="/attempts/:id/edit"  element={<AttemptForm />} />
      </Routes>
    </Layout>
  );
}
