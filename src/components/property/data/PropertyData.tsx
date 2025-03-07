import { Property } from '../../../types';

export const ApartmentData: Property[] = [
  {
    id: '1',
    title: 'Flat for Sale in Devanahalli, Bangalore',
    location: 'Birla Trimaya Phase 3',
    price: 1560000,
    pricePerSqft: 12484,
    sqft: 1254,
    bhk: 3,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1565953522043-baea26b83b7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'UNDER_CONSTRUCTION',
    possession: 'Poss. by Aug \'30',
    furnishing: 'Unfurnished',
    parking:'bike & car'
  },
  {
    id: '2',
    title: 'Premium Villa in Whitefield, Bangalore',
    location: 'Prestige Golfshire',
    price: 45000000,
    pricePerSqft: 15000,
    sqft: 3000,
    bhk: 4,
    bathrooms: 4,
    image: 'https://images.unsplash.com/photo-1612637968894-660373e23b03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D',
    status: 'READY_TO_MOVE',
    possession: 'Ready to Move',
    furnishing: 'Semi-Furnished',
    parking:'bike & car'
  },
  {
    id: '3',
    title: 'Apartment in Electronic City, Bangalore',
    location: 'Sobha Silicon Oasis',
    price: 8500000,
    pricePerSqft: 8500,
    sqft: 1000,
    bhk: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    status: 'UNDER_CONSTRUCTION',
    possession: 'Poss. by Dec \'24',
    furnishing: 'Unfurnished',
    parking:'bike & car'
  }
];

export const landData: Property[] = [
    {
      id: '3',
      title: 'Residential Land for Sale in Devanahalli, Bangalore',
      location: 'Near Birla Trimaya',
      price: 5000000,
      pricePerSqft: 5000,
      sqft: 1000,
      bhk: 0, // Land doesn't have BHK
      bathrooms: 0, // Land doesn't have bathrooms
      image: 'https://plus.unsplash.com/premium_photo-1726848085271-f68f93ec20c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW1wdHklMjBzaXRlfGVufDB8fDB8fHww',
      status: 'READY_TO_MOVE',
      possession: 'Ready to Move',
      furnishing: 'N/A' ,
      parking:'N/A'
    },
    {
      id: '4',
      title: 'Commercial Land for Sale in Whitefield, Bangalore',
      location: 'Near Prestige Golfshire',
      price: 10000000,
      pricePerSqft: 10000,
      sqft: 1000,
      bhk: 0,
      bathrooms: 0,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      status: 'UNDER_CONSTRUCTION',
      possession: 'Poss. by Dec \'25',
      furnishing: 'N/A',
      parking:'N/A'
    }
  ];

  export const siteData: Property[] = [
    {
      id: '5',
      title: 'Residential Site for Sale in Electronic City, Bangalore',
      location: 'Near Sobha Silicon Oasis',
      price: 3000000,
      pricePerSqft: 3000,
      sqft: 1000,
      bhk: 0,
      bathrooms: 0,
      image: 'https://media.istockphoto.com/id/2191979120/photo/large-field-of-soil-in-the-middle-of-the-forest.jpg?s=612x612&w=0&k=20&c=JQT5bm-POEbVRbwvN9LmHPh9iSwxJ35st6aG0Tt5meI=',
      status: 'READY_TO_MOVE',
      possession: 'Ready to Move',
      furnishing: 'N/A',
      parking:'N/A'
    },
    {
      id: '6',
      title: 'Commercial Site for Sale in Whitefield, Bangalore',
      location: 'Near Prestige Golfshire',
      price: 8000000,
      pricePerSqft: 8000,
      sqft: 1000,
      bhk: 0,
      bathrooms: 0,
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      status: 'UNDER_CONSTRUCTION',
      possession: 'Poss. by Dec \'25',
      furnishing: 'N/A',
      parking:'N/A'
    }
  ];

  export const villaData: Property[] = [
    {
      id: '7',
      title: '4 BHK Premium Villa in Whitefield, Bangalore',
      location: 'Prestige Golfshire',
      price: 45000000,
      pricePerSqft: 15000,
      sqft: 3000,
      bhk: 4,
      bathrooms: 4,
      image: 'https://images.unsplash.com/photo-1657302157898-eda546941dde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwdmlsbGF8ZW58MHx8MHx8fDA%3D',
      status: 'READY_TO_MOVE',
      possession: 'Ready to Move',
      furnishing: 'Semi-Furnished',
      parking:'N/A'
    },
    {
      id: '8',
      title: '5 BHK Luxury Villa in Devanahalli, Bangalore',
      location: 'Birla Trimaya Phase 3',
      price: 60000000,
      pricePerSqft: 20000,
      sqft: 3000,
      bhk: 5,
      bathrooms: 5,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80',
      status: 'UNDER_CONSTRUCTION',
      possession: 'Poss. by Aug \'30',
      furnishing: 'Fully Furnished',
      parking:'N/A'
    }
  ];