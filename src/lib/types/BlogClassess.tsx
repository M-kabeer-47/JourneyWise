// Simple class mapping for blog display
 const blogClasses = {
    // Container
    container: "max-w-full px-4 py-8",
    
    // Heading
    heading: {
      h1: "text-3xl md:text-4xl font-bold mb-6 font-raleway text-charcoal",
      h2: "text-2xl md:text-3xl font-bold mb-4 font-raleway text-charcoal", 
      h3: "text-xl md:text-2xl font-semibold mb-3 font-raleway text-charcoal"
    },
    
    // Paragraph
    paragraph: "text-charcoal mb-4 leading-relaxed",
    
    // Image
    image: {
      container: "mb-8",
      small: "max-w-md",
      medium: "max-w-2xl",
      large: "max-w-4xl", 
      full: "w-full mx-0",
      caption: "text-sm text-center text-charcoal/80 mt-2 italic"
    },
    
    // List
    list: {
      numbered: "space-y-2 list-decimal pl-5 mb-4",
      bulleted: "space-y-2 list-disc pl-5 mb-4",
      item: "pl-2"
    },
    
    // Alignment
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    },
    
    // Text styles
    textStyle: {
      bold: "font-bold",
      italic: "italic",
      underline: "underline"
    },
    imageAlign:{
      left: "mr-auto ml-0",
      center: "mx-auto",
      right: "ml-auto mr-0"
    }
  };
export default blogClasses;