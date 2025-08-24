// backend/seed.js  (ESM)
import mongoose from "mongoose";
import dotenv from "dotenv";
import Property from "./models/propertymodel.js"; // <- make sure this path/filename matches your model

dotenv.config(); // loads backend/.env (expects MONGO_URI=...)

// ---------- Northern Bangladesh seed data (10 items) ----------
const data = [
  {
    title: "Rajshahi Luxury Duplex",
    location: "Rajshahi City, Rajshahi",
    price: 25000000,
    image: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1280&auto=format&fit=crop&q=80" // cozy living/dining
    ],
    beds: 4, baths: 3, sqft: 2800, type: "Villa", availability: "Buy",
    description: "Premium duplex near the Padma riverside with modern interiors.",
    amenities: ["Parking","Lift","Generator Backup","Security 24/7","Roof Terrace"],
    phone: "+8801711000001"
  },
  {
    title: "Bogura Modern Apartment",
    location: "Sadar, Bogura",
    price: 18500000,
    image: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1280&auto=format&fit=crop&q=80" // classic house exterior
    ],
    beds: 3, baths: 2, sqft: 1800, type: "Apartment", availability: "Rent",
    description: "Bright, airy unit close to commercial area and schools.",
    amenities: ["Lift","CCTV","Covered Parking","Fire Safety"],
    phone: "+8801711000002"
  },
  {
    title: "Rangpur Townhouse",
    location: "Jahaj Company Mor, Rangpur",
    price: 12000000,
    image: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1280&auto=format&fit=crop&q=80"],
    beds: 3, baths: 3, sqft: 2200, type: "House", availability: "Buy",
    description: "Spacious townhouse with balconies and garden view.",
    amenities: ["Garden","Servant Room","Solar Backup"],
    phone: "+8801711000003"
  },
  {
    title: "Dinajpur Family Flat",
    location: "College Area, Dinajpur",
    price: 13500000,
    image: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1280&auto=format&fit=crop&q=80"],
    beds: 3, baths: 2, sqft: 1450, type: "Apartment", availability: "Buy",
    description: "Family-friendly flat near parks and marketplaces.",
    amenities: ["Lift","Generator","Community Hall"],
    phone: "+8801711000004"
  },
  {
    title: "Joypurhat Corner Apartment",
    location: "Railway Station Area, Joypurhat",
    price: 16500000,
    image: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1280&auto=format&fit=crop&q=80" // clean apartment interior
    ],
    beds: 3, baths: 3, sqft: 1700, type: "Apartment", availability: "Buy",
    description: "Corner unit with great light and cross-ventilation.",
    amenities: ["Lift","Doorman","Power Backup","Community Area"],
    phone: "+8801711000005"
  },
  {
    title: "Nilphamari Lake-Side Flat",
    location: "Saidpur Road, Nilphamari",
    price: 12500000,
    image: ["https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1280&auto=format&fit=crop&q=80"],
    beds: 3, baths: 2, sqft: 1350, type: "Apartment", availability: "Rent",
    description: "Lake-side living with jogging track and kids’ play area.",
    amenities: ["Lift","Play Area","Parking"],
    phone: "+8801711000006"
  },
  {
    title: "Kurigram Hilltop House",
    location: "Phulbari Road, Kurigram",
    price: 19500000,
    image: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1280&auto=format&fit=crop&q=80"],
    beds: 4, baths: 4, sqft: 2600, type: "House", availability: "Buy",
    description: "Elevated residence with wide views and private garden.",
    amenities: ["Garage","Garden","Security Cabin"],
    phone: "+8801711000007"
  },
  {
    title: "Gaibandha Business Apartment",
    location: "Sadar, Gaibandha",
    price: 11000000,
    image: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1280&auto=format&fit=crop&q=80"],
    beds: 2, baths: 2, sqft: 1200, type: "Apartment", availability: "Rent",
    description: "Ideal for professionals; quick access to offices and markets.",
    amenities: ["Lift","CCTV","Standby Generator"],
    phone: "+8801711000008"
  },
  {
    title: "Naogaon Riverside Villa",
    location: "Atrai River Area, Naogaon",
    price: 21000000,
    image: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1280&auto=format&fit=crop&q=80" // townhouse / villa exterior
    ],
    beds: 4, baths: 4, sqft: 3000, type: "Villa", availability: "Buy",
    description: "Tranquil villa by the river with large lawn.",
    amenities: ["Garden","Parking","Servant Quarter"],
    phone: "+8801711000009"
  },
  {
    title: "Thakurgaon City Apartment",
    location: "Sadar, Thakurgaon",
    price: 9500000,
    image: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1280&auto=format&fit=crop&q=80"],
    beds: 3, baths: 2, sqft: 1250, type: "Apartment", availability: "Buy",
    description: "Well-lit apartment close to schools and hospitals.",
    amenities: ["Lift","Parking","Generator"],
    phone: "+8801711000010"
  }
];

const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
if (!uri) {
  console.error("❌ No DB URI. Set MONGO_URI in backend/.env");
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(uri);
    await Property.deleteMany({});
    const inserted = await Property.insertMany(data);
    console.log(`✅ Seeded ${inserted.length} properties`);
  } catch (e) {
    console.error("❌ Seeding failed:", e);
  } finally {
    await mongoose.disconnect();
  }
})();
