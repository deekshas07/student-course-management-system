// server.js
const express     = require('express');
const dotenv      = require('dotenv');
const bodyParser  = require('body-parser');
const cors        = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// import routes
app.use('/api/programs', require('./routes/programRoutes'));
app.use('/api/faculty',  require('./routes/facultyRoutes'));
app.use('/api/courses',  require('./routes/courseRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/attempts', require('./routes/attemptRoutes'));

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
