const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { mongoDB, User } = require("./db");
const Cars = require("./models/Cars");
const multer = require('multer');
const Booking = require("./models/Book");
const app = express();
const port = 5001;
const bcrypt = require("bcrypt");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoDB();
const { body, validationResult } = require('express-validator');
const axios = require('axios');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () =>
    console.log(`app started and listening on ${port}`)
);

const jwt = require('jsonwebtoken');

app.post('/api/userlogin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "No user found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ success: false, message: "Password is incorrect" });
        }

        // Generate JWT token
        const authToken = jwt.sign({ email: email }, 'ishan123');
        res.json({ success: true, authToken });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Server error" });
    }
});



app.post('/api/usersignup', async (req, res) => {

    try {
        const { email, password, name, number } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword, name, number });
        await newUser.save();
        res.json({ success: true, message: "Data added successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


app.post('/api/adminaddcar', upload.single('image'), async (req, res) => {
    try {
        const { name, company, type, capacity, fueltype, rate } = req.body;
        const image = req.file.buffer.toString('base64'); // Convert image buffer to base64 string
        const newCar = new Cars({ name, company, type, capacity, fueltype, rate, image });
        await newCar.save();
        res.json({ success: true, message: "data added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "server error" });
    }
});


app.get('/api/displaydata', async (req, res) => {
    try {
        const cars = await Cars.find({});
        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "server error" });
    }
});



app.get('/api/admincarmanage', async (req, res) => {
    try {
        const cars = await Cars.find({});
        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "server error" });
    }
});

app.get('/api/displaydata/:id', async (req, res) => {
    try {
        const carId = req.params.id;
     
        const car = await Cars.findById(carId);
        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        
        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


app.put('/api/adminupdatecar/:id', async (req, res) => {
    try {
        const carId = req.params.id;
        const updatedCar = await Cars.findByIdAndUpdate(carId, req.body, { new: true });
        if (!updatedCar) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        
        res.json({ success: true, data: updatedCar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.delete('/api/admindeletecar/:id', async (req, res) => {
    try {
        const carId = req.params.id;
        const deletedCar = await Cars.findByIdAndDelete(carId);
        if (!deletedCar) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        res.json({ success: true, message: 'Car deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

app.get('/api/displaydata/:id', async (req, res) => {
    try {
        const carId = req.params.id;
        const car = await Cars.findById(carId);
        if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }
        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post('/api/bookcar', async (req, res) => {
    try {
      const { carId, name, number, city, state, startDate, endDate, startTime, endTime } = req.body;
      const booking = new Booking({
        car: carId, 
        user: { name, number, city, state },
        startDate,
        endDate,
        startTime,
        endTime
      });
  
      await booking.save();
  
      res.json({ success: true, message: "Booking successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
});


app.get('/bookcar/:bookingId', async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});