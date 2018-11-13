const mongoose = global.db;
const formalStringType = {
  type: String,
  lowercase: true,
};
const User = mongoose.Schema({
  url: {
    type: String,
  },
  short_url_id: {
    type: String,
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('urls', User);
