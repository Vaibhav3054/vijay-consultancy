const bcrypt = require('bcrypt');
const hash = '$2b$10$afvXLDHTXCyuYu1uSSMZzuT25yk9XqMrk9kN3Euyy56IQpFXl76/C';
bcrypt.compare('Admin@Vijay2026', hash).then(console.log);
