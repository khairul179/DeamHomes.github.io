import express from 'express';
import { listProducts, searchProperties, getLocationTrends } from '../controller/propertyController.js'; // <-- include listProducts

const router = express.Router();
router.get('/products/list', listProducts);
router.get('/products/list', listProducts); // Route to list all properties
// Route to search for properties
router.post('/properties/search', searchProperties);

// Route to get location trends
router.get('/locations/:city/trends', getLocationTrends);

export default router;