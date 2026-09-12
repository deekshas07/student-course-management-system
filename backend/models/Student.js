// models/Student.js
const { sql, poolPromise } = require('../config/db');

class Student {
  static async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.Student');
    return result.recordset;
  }
  static async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('StudentID', sql.Int, id)
      .query('SELECT * FROM dbo.Student WHERE StudentID = @StudentID');
    return result.recordset[0];
  }
  static async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('StudentNumber', sql.NVarChar(20),  data.StudentNumber)
      .input('FirstName',     sql.NVarChar(50),  data.FirstName)
      .input('LastName',      sql.NVarChar(50),  data.LastName)
      .input('DOB',           sql.Date,          data.DOB)
      .input('EnrollmentYear',sql.SmallInt,      data.EnrollmentYear)
      .input('ProgramID',     sql.Int,           data.ProgramID)
      .query(`INSERT INTO dbo.Student
                (StudentNumber,FirstName,LastName,DOB,EnrollmentYear,ProgramID)
              VALUES
                (@StudentNumber,@FirstName,@LastName,@DOB,@EnrollmentYear,@ProgramID);
              SELECT SCOPE_IDENTITY() AS StudentID`);
    return result.recordset[0];
  }
  static async update(id, data) {
    const pool = await poolPromise;
    await pool.request()
      .input('StudentID',      sql.Int,           id)
      .input('StudentNumber',  sql.NVarChar(20),  data.StudentNumber)
      .input('FirstName',      sql.NVarChar(50),  data.FirstName)
      .input('LastName',       sql.NVarChar(50),  data.LastName)
      .input('DOB',            sql.Date,          data.DOB)
      .input('EnrollmentYear', sql.SmallInt,      data.EnrollmentYear)
      .input('ProgramID',      sql.Int,           data.ProgramID)
      .query(`UPDATE dbo.Student
              SET StudentNumber  = @StudentNumber,
                  FirstName      = @FirstName,
                  LastName       = @LastName,
                  DOB            = @DOB,
                  EnrollmentYear = @EnrollmentYear,
                  ProgramID      = @ProgramID
              WHERE StudentID = @StudentID`);
    return { StudentID: id };
  }
  static async delete(id) {
    const pool = await poolPromise;
    await pool.request()
      .input('StudentID', sql.Int, id)
      .query('DELETE FROM dbo.Student WHERE StudentID = @StudentID');
    return { StudentID: id };
  }
}

module.exports = Student;
