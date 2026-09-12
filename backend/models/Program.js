// models/Program.js
const { sql, poolPromise } = require('../config/db');

class Program {
  static async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.Program');
    return result.recordset;
  }
  static async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('ProgramID', sql.Int, id)
      .query('SELECT * FROM dbo.Program WHERE ProgramID = @ProgramID');
    return result.recordset[0];
  }
  static async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('ProgramName', sql.NVarChar(100), data.ProgramName)
      .input('Description', sql.NVarChar(500), data.Description)
      .query(`INSERT INTO dbo.Program (ProgramName, Description)
              VALUES (@ProgramName, @Description);
              SELECT SCOPE_IDENTITY() AS ProgramID`);
    return result.recordset[0];
  }
  static async update(id, data) {
    const pool = await poolPromise;
    await pool.request()
      .input('ProgramID', sql.Int, id)
      .input('ProgramName', sql.NVarChar(100), data.ProgramName)
      .input('Description', sql.NVarChar(500), data.Description)
      .query(`UPDATE dbo.Program
              SET ProgramName = @ProgramName,
                  Description = @Description
              WHERE ProgramID = @ProgramID`);
    return { ProgramID: id };
  }
  static async delete(id) {
    const pool = await poolPromise;
    await pool.request()
      .input('ProgramID', sql.Int, id)
      .query('DELETE FROM dbo.Program WHERE ProgramID = @ProgramID');
    return { ProgramID: id };
  }
}

module.exports = Program;
