// models/Course.js
const { sql, poolPromise } = require('../config/db');

class Course {
  static async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.Course');
    return result.recordset;
  }
  static async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('CourseID', sql.Int, id)
      .query('SELECT * FROM dbo.Course WHERE CourseID = @CourseID');
    return result.recordset[0];
  }
  static async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('CourseCode',       sql.NVarChar(20),  data.CourseCode)
      .input('CourseName',       sql.NVarChar(200), data.CourseName)
      .input('CreditPoints',     sql.Decimal(4,2),  data.CreditPoints)
      .input('CommencementYear', sql.SmallInt,      data.CommencementYear)
      .input('ProgramID',        sql.Int,           data.ProgramID)
      .input('FacultyID',        sql.Int,           data.FacultyID)
      .query(`INSERT INTO dbo.Course 
                (CourseCode,CourseName,CreditPoints,CommencementYear,ProgramID,FacultyID)
              VALUES
                (@CourseCode,@CourseName,@CreditPoints,@CommencementYear,@ProgramID,@FacultyID);
              SELECT SCOPE_IDENTITY() AS CourseID`);
    return result.recordset[0];
  }
  static async update(id, data) {
    const pool = await poolPromise;
    await pool.request()
      .input('CourseID',         sql.Int,           id)
      .input('CourseCode',       sql.NVarChar(20),  data.CourseCode)
      .input('CourseName',       sql.NVarChar(200), data.CourseName)
      .input('CreditPoints',     sql.Decimal(4,2),  data.CreditPoints)
      .input('CommencementYear', sql.SmallInt,      data.CommencementYear)
      .input('ProgramID',        sql.Int,           data.ProgramID)
      .input('FacultyID',        sql.Int,           data.FacultyID)
      .query(`UPDATE dbo.Course
              SET CourseCode       = @CourseCode,
                  CourseName       = @CourseName,
                  CreditPoints     = @CreditPoints,
                  CommencementYear = @CommencementYear,
                  ProgramID        = @ProgramID,
                  FacultyID        = @FacultyID
              WHERE CourseID = @CourseID`);
    return { CourseID: id };
  }
  static async delete(id) {
    const pool = await poolPromise;
    await pool.request()
      .input('CourseID', sql.Int, id)
      .query('DELETE FROM dbo.Course WHERE CourseID = @CourseID');
    return { CourseID: id };
  }
}

module.exports = Course;
