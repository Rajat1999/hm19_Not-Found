const express = require('express');
const debug = require('debug')('howls:user');

const validator = require('../middlewares/validator');
const saveUser = require('../DB/createUsers');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('register', { title: 'Registration - Howls' });
});

router.post('/', validator, (req, res, next) => {
  // use this if block if validation fails
  if (req.errors.length > 0) {
    res.status(200).render('register', {
      title: 'Registration - Howls',
      email: req.body.email,
      username: req.body.username,
      errors: req.errors,
    });
  } else {
    saveUser(req.body.username, req.body.email, req.body.password)
      .then(() => {
        req.flash('email', req.body.email);
        res.status(304).redirect('/auth/emailPrompt');
      })
      .catch((err) => {
        debug(err);
        next(err);
      });
  }
});

module.exports = router;
