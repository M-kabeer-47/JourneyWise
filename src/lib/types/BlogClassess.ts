// Simple class mapping for blog display
 const blogClasses = {
    // Container
    container: "max-w-full px-[300px] py-[50px]",
    
    // Heading
    heading: {
      h1: "text-3xl md:text-5xl font-[800] mb-6 font-raleway  text-black",
      h2: "text-2xl md:text-4xl font-[800] mb-6 font-raleway text-black", 
      h3: "text-xl md:text-3xl font-[800] mb-6 font-raleway text-black"
    },
    
    // Paragraph
    paragraph: "text-charcoal mb-4 leading-relaxed",
    
    // Image
    image: {
      small: "max-w-md",
      medium: "max-w-2xl",
      large: "max-w-3xl", 
      full: "",
      caption: "text-sm text-center text-charcoal/80 mt-2"
    },
    
    // List
    list: {
      numbered: "space-y-2 list-decimal  ",
      bulleted: "space-y-2",
      item: "flex items-center "
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
    },
    
    
  };
export default blogClasses;