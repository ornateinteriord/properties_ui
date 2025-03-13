import moment from "moment";


export const BUDGET_RANGES: Record<string, [number, number]> = {
    "₹5k - ₹1 Lac": [5000, 100000],
    "₹1 Lac - ₹10 Lac": [100000, 1000000],
    "₹10 Lac - ₹25 Lac": [1000000, 2500000],
    "₹25 Lac - ₹50 Lac": [2500000, 5000000],
    "₹50 Lac - ₹75 Lac": [5000000, 7500000],
    "₹75 Lac - ₹1 Cr": [7500000, 10000000],
    "₹1 Cr - ₹2 Cr": [10000000, 20000000],
    "₹2 Cr+": [20000000, Infinity],
  };

  export const SQUARE_FEET_RANGES: Record<string, [number, number]> = {
    "0-1000": [0, 1000],
    "1000-3000": [1000, 3000],
    "3000-4000": [3000, 4000],
    "4000+": [4000, Infinity],
  };

  export const STATUS = {
    ACTIVE : "active",
    PENDING : "pending",
  }

  export const ActionMenyItems = [
    {
      label: "Active",
      payload:'status',
      value: STATUS.ACTIVE,
    },
    {
      label: "Promote",
      payload:'pramote',
      value : STATUS.ACTIVE
    },
    {
      label: "Edit",
      payload: "edit", 
      value: null,
    },
    {
      label: "Delete",
      payload: "delete", 
      value: null, 
    },
  ]
  
  export const getFormattedDate = (date: Date | string) => {
      const dateformats =[
          moment.ISO_8601,   // Handles "2025-02-14T19:18:09.013Z"
          "DD/MM/YYYY",      // Handles "21/02/2025"
          "DD-MM-YYYY",      // Handles "22-12-2025"
          "DD MMM , YYYY",   // Handles "20 Feb , 2025"
          "YYYY/MM/DD",      // Handles "2025/02/14"
          "YYYY-MM-DD",      // Handles "2025-02-14"
          "MM/DD/YYYY",      // Handles "02/14/2025" (US format)
          "MMMM D, YYYY",    // Handles "February 14, 2025"
          "MMM D, YYYY",     // Handles "Feb 14, 2025"
          "D MMM YYYY"       // Handles "14 Feb 2025" (without comma)
      ];
      
      if (!date) return "Invalid Date"; // Handle empty/null values
  
      const parsedDate = moment(date, dateformats, true);
      
      return parsedDate.isValid() ? parsedDate.format("DD MMM , YYYY") : "Invalid Date";
  };
  
  
  export const getFormattedName = (name: string) => {
      return name?.split(" ")?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(" ");
  }

  export const getRelativeTime = (date: string | Date): string => {
    const now = new Date();
    const inputDate = new Date(date);
    const timeDifference = now.getTime() - inputDate.getTime(); // difference in milliseconds
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  };
  