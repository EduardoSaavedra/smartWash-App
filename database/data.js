var mysql = require('mysql');

const connection = mysql.createConnection({
  host   : 'localhost',
  user   :  'root',
  password  : 'holacode',
  database  : 'smartWash'
});

// post new user to database
const insertUser = function(email, userName, callback) {
  console.log("quiubo desde la db");
  connection.query(
    'INSERT INTO users (email, userName) VALUES (?, ?)',
    [email, userName],
    (err, results, fields) => {
      if (err) {
        callback(err, null);
        console.log(err);
      } else {
        console.log("a webo ya llego un usuario a la db pasele");
        callback(null, results);
      }
    }
  );
};

<<<<<<< HEAD
// get single user information
const selectUser = function(email) {
  return new Promise((resolve, reject) => {
  connection.query('SELECT * FROM posts WHERE email = ?', [email], (err, data) => {
    if(err){
      return reject(err);
     }
     return resolve(data);
  })
})
};


=======
const insertOrder= function (name, phone, address, size, specialInd, service, callback) {
  connection.query('INSERT INTO orders (name, phone, address, size, specialInd, service) VALUES (?,?,?,?,?,?)',
  [name, phone, address, size, specialInd, service], function(err, result, fields) {
    if (err) {
      callback(err, null);
    } else {
      console.log(err)
      callback(err, result);
    }
  })
}

module.exports.insertOrder = insertOrder;
>>>>>>> master
module.exports.insertUser = insertUser;
module.exports.selectUser = selectUser;
