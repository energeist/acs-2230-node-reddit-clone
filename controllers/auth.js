const jwt = require('jsonwebtoken');
const User = require('../models/user');
const user = require('../models/user');

module.exports = (app) => {
  // SIGN UP FORM
  app.get('/sign-up', (req, res) => res.render('sign-up'));
  // SIGN UP POST ACTION
  app.post('/sign-up', async (req, res) => {
    try {
      // Create User
      const user = await new User(req.body);
      const savedUser = await user.save();
      const token = await jwt.sign(
        { _id: user._id }, 
        process.env.SECRET, 
        { expiresIn: '60 days' });
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      return res.redirect('/');
    } catch(err) {
      console.log(err.message);
      return res.status(400).send({ err });
    }
  });
  // LOGOUT
  app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    return res.redirect('/');
  });
  // LOGIN FORM
  app.get('/login', (req, res) => res.render('login'));
  // // LOGIN POST ACTION
  // app.post('/login', async (req, res) => {
  //   try {
  //     const { username, password } = req.body;
  //     foundUser = await User.findOne({ username }, 'username password')
  //   } catch(err) {
  //     console.log(err);
  //     return res.status(401).send({ message: 'Wrong Username or Password' });
  //   };
  //   try {
  //     user.comparePassword(password, (err, isMatch) => {
  //       if (!isMatch) {
  //         // Password does not match
  //         return res.status(401).send({ message: 'Wrong Username or password' });
  //       }
  //       // Create a token
  //       const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
  //         expiresIn: '60 days',
  //       });
  //       // Set a cookie and redirect to root
  //       res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
  //       return res.redirect('/');
  //     });
  //   } catch(err) {
  //     console.log(err);
  //     // return res.status(401).send({ message: 'Wrong Username or Password' });
  //   };
  // });
  // LOGIN
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Find this user name
    User.findOne({ username }, 'username password')
      .then((user) => {
        if (!user) {
          // User not found
          return res.status(401).send({ message: 'Wrong Username or Password' });
        }
        // Check the password
        user.comparePassword(password, (err, isMatch) => {
          if (!isMatch) {
            // Password does not match
            return res.status(401).send({ message: 'Wrong Username or password' });
          }
          // Create a token
          const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
            expiresIn: '60 days',
          });
          // Set a cookie and redirect to root
          res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
          return res.redirect('/');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};