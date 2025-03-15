import { JSX } from "react";


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
    role:string;
    createdAt: Date;
  }

  export interface Product {
    userid: string;
    property_id: string;
    property_type: string;
    subtype: string;
    title: string;
    image: string;
    location: string;
    price: string;
    sqft: string;
    status: string; 
    pramote: string; 
    pricePerSqft: string;
    bhk: string;
    bathrooms: string;
    propertyStatus: string;
    possession: string;
    furnishing: string;
    parking: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }
  

  export interface SideBarMenuItemType {
    name: string;
    icon: JSX.Element;
    path: string;
    isExpandable?: boolean;
    subItems?: Array<{ name: string; path: string; icon: JSX.Element }>;
  }
  