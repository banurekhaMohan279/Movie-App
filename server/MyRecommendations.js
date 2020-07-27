var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var MovieSchema = new Schema(
	{
	  id: Number,
	  vote_average: Number,
	  title: String,
	  poster_path: String,
	  overview: String,
	  release_date: String
	}
);
module.exports = mongoose.model('Movie', MovieSchema);
