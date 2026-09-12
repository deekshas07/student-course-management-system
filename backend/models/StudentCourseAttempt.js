// models/StudentCourseAttempt.js
const { sql, poolPromise } = require('../config/db');

class StudentCourseAttempt {
  static async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.StudentCourseAttempt');
    return result.recordset;
  }
  static async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('AttemptID', sql.Int, id)
      .query('SELECT * FROM dbo.StudentCourseAttempt WHERE AttemptID = @AttemptID');
    return result.recordset[0];
  }
  static async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('StudentID',     sql.Int,      data.StudentID)
      .input('CourseID',      sql.Int,      data.CourseID)
      .input('YearTaken',     sql.SmallInt, data.YearTaken)
      .input('Semester',      sql.TinyInt,  data.Semester)
      .input('Marks',         sql.Decimal(5,2), data.Marks)
      .input('Grade',         sql.NChar(2), data.Grade)
      .input('AttemptNumber', sql.TinyInt,  data.AttemptNumber)
      .query(`INSERT INTO dbo.StudentCourseAttempt
                (StudentID,CourseID,YearTaken,Semester,Marks,Grade,AttemptNumber)
              VALUES
                (@StudentID,@CourseID,@YearTaken,@Semester,@Marks,@Grade,@AttemptNumber);
              SELECT SCOPE_IDENTITY() AS AttemptID`);
    return result.recordset[0];
  }
  static async update(id, data) {
    const pool = await poolPromise;
    await pool.request()
      .input('AttemptID',      sql.Int,      id)
      .input('StudentID',      sql.Int,      data.StudentID)
      .input('CourseID',       sql.Int,      data.CourseID)
      .input('YearTaken',      sql.SmallInt, data.YearTaken)
      .input('Semester',       sql.TinyInt,  data.Semester)
      .input('Marks',          sql.Decimal(5,2), data.Marks)
      .input('Grade',          sql.NChar(2), data.Grade)
      .input('AttemptNumber',  sql.TinyInt,  data.AttemptNumber)
      .query(`UPDATE dbo.StudentCourseAttempt
              SET StudentID     = @StudentID,
                  CourseID      = @CourseID,
                  YearTaken     = @YearTaken,
                  Semester      = @Semester,
                  Marks         = @Marks,
                  Grade         = @Grade,
                  AttemptNumber = @AttemptNumber
              WHERE AttemptID = @AttemptID`);
    return { AttemptID: id };
  }
  static async delete(id) {
    const pool = await poolPromise;
    await pool.request()
      .input('AttemptID', sql.Int, id)
      .query('DELETE FROM dbo.StudentCourseAttempt WHERE AttemptID = @AttemptID');
    return { AttemptID: id };
  }
}

module.exports = StudentCourseAttempt;
