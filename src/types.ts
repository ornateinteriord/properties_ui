export interface Property {
    id: string;
    title: string;
    location: string;
    price: number;
    pricePerSqft: number;
    sqft: number;
    bhk: number;
    bathrooms: number;
    image: string;
    status: 'NEWLY_LAUNCHED' | 'UNDER_CONSTRUCTION' | 'READY_TO_MOVE';
    possession: string;
    furnishing: string;
    
  }
  
  export interface Agent {
    id: string;
    name: string;
    image: string;
    properties: number;
    experience: number;
    rating: number;
  }