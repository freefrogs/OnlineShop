const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Imię nie może być puste'],
    minlength: [2, 'Zbyt krótkie imię'], 
    maxlength: [20, 'Zbyt długie imię'], 
    trim: true
  },
  surname: {
    type: String,
    required: [true, 'Nazwisko nie może być puste'],
    minlength: [2, 'Zbyt krótkie nazwisko'], 
    maxlength: [50, 'Zbyt długie nazwisko'], 
    trim: true
  },
  email: {
    type: String,
    required: [true, 'E-mail nie może być pusty'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Błędny adres e-mail'
    ],
    minlength: 6,
    maxlength: 60,
    lowercase: true,
    unique: true,
    trim: true, 
  },
  phone: {
    type: String, 
    required: [true, 'Numer telefonu nie może być pusty'],
    minlength: 9,
    maxlength: 22, 
    trim: true
  }, 
  address: {
    type: String, 
    required: [true, 'Adres nie może być pusty'],
    minlength: [3, 'Zbyt krótki adres'],
    maxlength: [120, 'Zbyt długi adres'],
    trim: true
  }, 
  post_code: {
    type: String, 
    required: [true,  'Kod pocztowy nie może być pusty'],
    match: [
      /\d{2}-\d{3}/,
      'Błędny kod pocztowy'
    ]
  }, 
  city: {
    type: String, 
    required: [true,  'Miejscowość nie może być pusta'],
    minlength: [2, 'Zbyt krótka nazwa miejscowości'],
    maxlength: [50, 'Zbyt długa nazwa miejscowości'],
    trim: true
  }, 
  password: {
    type: String,
    required: [true, "Password field cannot be empty"],
    minlength: 8,
    maxlength: 500,
    trim: true
  },
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    surname: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(6).max(60).required(),
    phone: Joi.string().min(9).max(22).required(), 
    address: Joi.string().min(3).max(120).required(), 
    postal_code: Joi.string().pattern(new RegExp('\d{2}-\d{3}')).required(),
    city: Joi.string().min(2).max(50).required(), 
    password: Joi.string().min(8).max(50).pattern(new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}$')).required(), 
    repeat_password: Joi.ref('password')
  }).with('password', 'repeat_password');

  return schema.validate(user)
};

exports.User = User;
esports.validateUser = validateUser;
