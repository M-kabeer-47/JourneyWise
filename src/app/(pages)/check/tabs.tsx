// tabs.tsx

// This is a server component that properly waits for 5 seconds

// Helper function to delay execution
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const Tabs = async () => {
  console.log("Server component rendering started");
  
  // Wait for 5 seconds on the server
  await wait(5000);
  
  console.log("Server component rendering completed after waiting");
  
  return (
    <div className="bg-orange-700 p-6 rounded-lg">
      <p className="text-white mb-4">Hello there - I appeared after 5 seconds</p>
      <h1 className="font-bold text-4xl text-center text-white">
        This server component waited 5 seconds before rendering
      </h1>
      <p className="text-white mt-4 text-center">
        Current server time: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
};

// Add default export for dynamic import compatibility
