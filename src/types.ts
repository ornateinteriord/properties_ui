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
    status: 'UNDER_CONSTRUCTION' | 'READY_TO_MOVE';
    possession: string;
    furnishing: string;
    parking:string
  }
  
  export interface Agent {
    id: string;
    name: string;
    image: string;
    properties: number;
    experience: number;
    rating: number;
  }

  export interface profile{
    username:string;
    fullname:string;
    email:string;
    mobileno:string;
    password:string;
    gender:string;
  }