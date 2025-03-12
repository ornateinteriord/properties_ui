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
    
  return (
    <Box sx={{mt:15,mb:12,display:"flex",alignItems:"center",ml:{xs:0,md:6,xl:8}}}>
        {properties?.map((property:any)=>(
            <PropertyCard key={property.id} property={property} />
        ))}
   {isLoading && <LoadingComponent />}
</Box>
  )
}

export default MyProperty
