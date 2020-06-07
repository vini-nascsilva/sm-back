const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
      username: {type: String, required: true, unique: true, lowercase: true},
      name: {type: String, required: true},
      password: {type: String, required: true, select: false},
      datecreated: {type: Date, default: Date.now}

});

UserSchema.pre('save', function (next){
      const user = this;

      if(!user.isModified('password')) return next();
     
      bcrypt.genSalt(10, (err, salt) => {
       if(err) return next(err);
     
            bcrypt.hash(user.password, salt, null, function(err, hash){
                  if(err) return next(err);
            
                  user.password = hash;
                  next();
            });
      });
});

module.exports = mongoose.model('Users', UserSchema);