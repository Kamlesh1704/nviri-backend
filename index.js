const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

const app = express();
const PORT = 3005;

app.use(express.json());
const dbPath = path.join(__dirname, "nviriDatabase.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    console.log("Database connected successfully!");

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bussinessName TEXT,
        email TEXT,
        password TEXT

      );
    `;
    await db.run(createTableQuery);

    const createTableTechnicians = `
      CREATE TABLE IF NOT EXISTS technicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        photo TEXT,
        specialization TEXT,
        rating NUMBER,
        description TEXT
      )
    `
    await db.run(createTableTechnicians)

  //   const insertTechniciansQ = `
  //   INSERT INTO technicians (name, photo, specialization, rating, description) VALUES
  //   ('Arjun Sharma', 'https://randomuser.me/api/portraits/men/1.jpg', 'Electrician', 4.5, 'Expert in residential wiring and appliance repairs.'),
  //   ('Rajiv Kumar', 'https://randomuser.me/api/portraits/men/2.jpg', 'Plumber', 4.7, 'Specializes in pipe fittings and bathroom installations.'),
  //   ('Amit Gupta', 'https://randomuser.me/api/portraits/men/3.jpg', 'Painter', 4.4, 'Experienced in interior and exterior painting projects.'),
  //   ('Suresh Rathi', 'https://randomuser.me/api/portraits/men/4.jpg', 'Carpenter', 4.6, 'Professional in modular furniture and custom wooden designs.'),
  //   ('Vikram Chauhan', 'https://randomuser.me/api/portraits/men/5.jpg', 'Mechanic', 4.8, 'Specialist in two-wheeler and four-wheeler servicing.'),
  //   ('Manoj Patel', 'https://randomuser.me/api/portraits/men/6.jpg', 'Gardener', 4.2, 'Expert in landscaping and plant care.'),
  //   ('Deepak Verma', 'https://randomuser.me/api/portraits/men/7.jpg', 'Mason', 4.3, 'Experienced in bricklaying and concrete structures.'),
  //   ('Ramesh Singh', 'https://randomuser.me/api/portraits/men/8.jpg', 'Cleaner', 4.5, 'Expert in house cleaning and waste management.'),
  //   ('Karan Mehta', 'https://randomuser.me/api/portraits/men/9.jpg', 'Painter', 4.1, 'Provides high-quality painting services at affordable rates.'),
  //   ('Prakash Nair', 'https://randomuser.me/api/portraits/men/10.jpg', 'Electrician', 4.9, 'Highly skilled in industrial and residential wiring.'),
  //   ('Anil Deshmukh', 'https://randomuser.me/api/portraits/men/11.jpg', 'Plumber', 4.0, 'Handles complex plumbing installations with ease.'),
  //   ('Mahesh Yadav', 'https://randomuser.me/api/portraits/men/12.jpg', 'Mechanic', 4.6, 'Reliable and experienced automobile technician.'),
  //   ('Santosh Tiwari', 'https://randomuser.me/api/portraits/men/13.jpg', 'Electrician', 4.7, 'Specializes in home and office electrical solutions.'),
  //   ('Jatin Joshi', 'https://randomuser.me/api/portraits/men/14.jpg', 'Carpenter', 4.8, 'Creates durable and elegant wooden furniture.'),
  //   ('Gopal Das', 'https://randomuser.me/api/portraits/men/15.jpg', 'Painter', 4.3, 'Known for precision and timely delivery.'),
  //   ('Rahul Kapoor', 'https://randomuser.me/api/portraits/men/16.jpg', 'Mechanic', 4.5, 'Focuses on eco-friendly vehicle maintenance solutions.'),
  //   ('Ajay Bhatt', 'https://randomuser.me/api/portraits/men/17.jpg', 'Mason', 4.4, 'Constructs sturdy and aesthetic structures.'),
  //   ('Kunal Sethi', 'https://randomuser.me/api/portraits/men/18.jpg', 'Gardener', 4.2, 'Innovative and sustainable gardening techniques.'),
  //   ('Vivek Agarwal', 'https://randomuser.me/api/portraits/men/19.jpg', 'Cleaner', 4.1, 'Committed to spotless cleaning and hygiene services.'),
  //   ('Ravi Saxena', 'https://randomuser.me/api/portraits/men/20.jpg', 'Electrician', 4.9, 'Offers emergency electrical repair services 24/7.');
  // `;
  
  // await db.run(insertTechniciansQ);

    const createTableAppQ = `
    CREATE TABLE IF NOT EXISTS appliance_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `
  await db.run(createTableAppQ)

//   const insertAppliances = `
//     INSERT INTO appliance_types (name)
// VALUES 
//     ('Refrigerator'),
//     ('Washing Machine'),
//     ('Microwave Oven'),
//     ('Air Conditioner'),
//     ('Water Heater'),
//     ('Ceiling Fan'),
//     ('Dishwasher'),
//     ('Vacuum Cleaner'),
//     ('Television'),
//     ('Laptop'),
//     ('Desktop Computer'),
//     ('Smartphone'),
//     ('Tablet'),
//     ('Mixer Grinder'),
//     ('Coffee Maker'),
//     ('Electric Kettle'),
//     ('Toaster'),
//     ('Hair Dryer'),
//     ('Room Heater'),
//     ('Electric Iron'),
//     ('Air Purifier'),
//     ('Water Purifier'),
//     ('Gaming Console'),
//     ('Bluetooth Speaker'),
//     ('Home Theater System'),
//     ('Induction Cooktop'),
//     ('Sewing Machine'),
//     ('Juicer'),
//     ('Food Processor'),
//     ('Rice Cooker'),
//     ('Chimney'),
//     ('OTG (Oven Toaster Grill)'),
//     ('Projector'),
//     ('Electric Scooter Charger'),
//     ('Robot Vacuum Cleaner'),
//     ('Smartwatch Charger'),
//     ('Treadmill'),
//     ('Elliptical Trainer'),
//     ('Dehumidifier'),
//     ('Geyser'),
//     ('Blender'),
//     ('Pressure Cooker'),
//     ('Electric Griddle'),
//     ('Slow Cooker'),
//     ('Electric Tandoor'),
//     ('Cordless Drill'),
//     ('Lawn Mower'),
//     ('Water Dispenser'),
//     ('Electric BBQ Grill'),
//     ('Smart Doorbell');

//   `
//   await db.run(insertAppliances)

    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();


app.post("/login", async (req, res) => {
  try {
    const { email, password, bussinessName } = req.body;
      const insertUserQuery = `INSERT INTO users (bussinessName, email, password) VALUES (?, ?, ?)`;
      const result = await db.run(insertUserQuery, [bussinessName, email, password]);
      const newUserId = result.lastID;
      const token = jwt.sign({ userId: newUserId, email }, SECRET_KEY, { expiresIn: "1h" });
      return res.status(201).json({ message: "User login successfully!", token });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

const locations = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Jaipur",
  "Ahmedabad",
  "Pune",
  "Lucknow",
  "Varanasi",
  "Bhopal",
  "Chandigarh",
  "Goa",
  "Kochi",
  "Surat",
  "Indore",
  "Vadodara",
  "Nagpur",
  "Agra",
  "Visakhapatnam",
  "Patna",
  "Coimbatore",
  "Madurai",
  "Kanpur",
  "Rajkot",
];

app.get('/locations', async(req, res) => {
    res.status(201).json({locations: locations});
})

app.get('/technicians', async(req,res) => {
  const fetchTechnicians = `SELECT * FROM technicians`
  const data = await db.all(fetchTechnicians);
  res.status(201).json({technicians: data});
})

app.get("/appliances", async (req,res) => {
  const fetchAppliances = `SELECT * FROM appliance_types`
  const data = await db.all(fetchAppliances);
  res.status(201).json({appliances: data});
})