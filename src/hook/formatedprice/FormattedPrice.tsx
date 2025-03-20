// useFormatPrice.ts
import { useMemo } from 'react';

const useFormatPrice = (price: number): string => {
    return useMemo(() => {
        if (price >= 10000000) {
            return `₹${(price / 10000000).toFixed(2)} Cr`; // Convert to Crore
        } else if (price >= 100000) {
            return `₹${(price / 100000).toFixed(2)} Lac`; // Convert to Lakh
        } else if (price >= 1000) {
            return `₹${(price / 1000).toFixed(2)} K`; // Convert to Thousand
        }
        return `₹${price}`; // If less than 1000, show the exact price
    }, [price]); // Re-run only if `price` changes
};

export default useFormatPrice;