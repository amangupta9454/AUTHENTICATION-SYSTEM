const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  avatar: { type: String },
  isVerified: { type: Boolean, default: true }  
});
userSchema.pre('save', async function() {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('User', userSchema);