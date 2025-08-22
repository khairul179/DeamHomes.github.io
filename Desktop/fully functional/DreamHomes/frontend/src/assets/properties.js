// properties.js
import { features } from '../src/assets/featuredata.js';  // Import features data

export const property = features.map((feature, index) => ({
  id: index + 1,  // Use index to assign a unique ID
  title: feature.name,
  location: feature.address,
  price: feature.discountPrice,  // Using discountPrice as the main price
  image: feature.imageUrls[0],  // First image
  type: feature.type,
  availability: feature.offer ? 'Rent' : 'Sale',  // Dynamically setting availability based on offer
  beds: feature.bedrooms,
  baths: feature.bathrooms,
  sqft: 1500,  // Example value, replace with actual if available
}));
