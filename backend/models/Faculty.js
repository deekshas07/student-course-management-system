// models/Faculty.js
const { sql, poolPromise } = require('../config/db');

class Faculty {
  static async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.Faculty');
    return result.recordset;
  }
  static async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('FacultyID', sql.Int, id)
      .query('SELECT * FROM dbo.Faculty WHERE FacultyID = @FacultyID');
    return result.recordset[0];
  }
  static async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('FirstName', sql.NVarChar(50), data.FirstName)
      .input('LastName',  sql.NVarChar(50), data.LastName)
      .input('Email',     sql.NVarChar(100), data.Email)
      .input('Department',sql.NVarChar(100), data.Department)
      .query(`INSERT INTO dbo.Faculty (FirstName, LastName, Email, Department)
              VALUES (@FirstName, @LastName, @Email, @Department);
              SELECT SCOPE_IDENTITY() AS FacultyID`);
    return result.recordset[0];
  }
  static async update(id, data) {
    const pool = await poolPromise;
    await pool.request()
      .input('FacultyID', sql.Int, id)
      .input('FirstName', sql.NVarChar(50), data.FirstName)
      .input('LastName',  sql.NVarChar(50), data.LastName)
      .input('Email',     sql.NVarChar(100), data.Email)
      .input('Department',sql.NVarChar(100), data.Department)
      .query(`UPDATE dbo.Faculty
              SET FirstName = @FirstName,
                  LastName  = @LastName,
                  Email     = @Email,
                  Department= @Department
              WHERE FacultyID = @FacultyID`);
    return { FacultyID: id };
  }
  static async delete(id) {
    const pool = await poolPromise;
    await pool.request()
      .input('FacultyID', sql.Int, id)
      .query('DELETE FROM dbo.Faculty WHERE FacultyID = @FacultyID');
    return { FacultyID: id };
  }
}

module.exports = Faculty;
