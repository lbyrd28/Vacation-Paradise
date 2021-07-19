const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 200; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;

		const camp = new Campground({
			author: '60e2796bfa65b242ffda7b84',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque corrupti tempore praesentium non. Dolor officiis distinctio qui unde! Repellat quia quos ipsa quod, consectetur non ullam blanditiis pariatur delectus ut. Suscipit illo id sed quae ipsam natus soluta fugit numquam nostrum voluptate molestias, veritatis unde eligendi, vero delectus.Amet quis repellendus dolore odit dolor nesciunt sequi sapiente ut porro.',
			price,
			geometry: {
				type: 'Point',
				coordinates: [ cities[random1000].longitude, cities[random1000].latitude ]
			},
			images: shuffle(images)
		});
		await camp.save();
	}
};

const images = [
	{
		url:
			'https://res.cloudinary.com/dtvgqkde7/image/upload/v1626760885/YelpCamp/georgia-airbnb-1617052538_qy5lvj.jpg',
		filename: 'YelpCamp/georgia-airbnb-1617052538_qy5lvj'
	},
	{
		url:
			'https://res.cloudinary.com/dtvgqkde7/image/upload/v1626760884/YelpCamp/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1_delep2.jpg',
		filename: 'YelpCamp/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1_delep2'
	},
	{
		url: 'https://res.cloudinary.com/dtvgqkde7/image/upload/v1626760884/YelpCamp/cancun-luxury-airbnb_i1zua6.jpg',
		filename: 'YelpCamp/cancun-luxury-airbnb_i1zua6'
	}
];

function shuffle(array) {
	var currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[ array[currentIndex], array[randomIndex] ] = [ array[randomIndex], array[currentIndex] ];
	}

	return array;
}

seedDB().then(() => {
	mongoose.connection.close();
});
