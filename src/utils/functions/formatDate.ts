export default function formatDate(date: Date | string) {
   const dateObj = new Date(date);
   
   const day = dateObj.getDate();
   const month = dateObj.toLocaleDateString("en-US", { month: "long" });
   const year = dateObj.getFullYear();
   
   // Add ordinal suffix to day
   const getOrdinalSuffix = (day: number) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
         case 1: return 'st';
         case 2: return 'nd';
         case 3: return 'rd';
         default: return 'th';
      }
   };
   
   return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
}
