import { Box } from "@mui/material";
import { PropertyCard } from "../../components/property/card/PropertyCard";
import { getUserProperties } from "../../api/product";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { LoadingComponent } from "../../App";


const MyProperty = () => {

 const { data: properties, isError, error, isLoading } = getUserProperties();

   useEffect(() => {
     if (isError) {
       const err = error as any
       toast.error(err?.response?.data?.message );
     }
   }, [isError, error]);

   if(!properties || properties.length === 0){
      return <Box sx={{mt:15,mb:12,minHeight: "100vh",display:"flex",flexDirection:"column",alignItems:"center" , color : "#000"}}>No properties found</Box>
    }
    
  return (
    <Box sx={{mt:15,mb:12,minHeight: "100vh",display:"flex",flexDirection:"column",alignItems:"center",ml:2,mr:2}}>
        {properties?.map((property:any,idx : any)=>(
            <PropertyCard key={`${property.id}-${idx}`} property={property} />
        ))}
   {isLoading && <LoadingComponent />}
</Box>
  )
}

export default MyProperty
