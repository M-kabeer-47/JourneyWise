import { Toaster } from "react-hot-toast"

export function Toast() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: "",
        duration: 5000,
        style: {
          background: "white",
          color: "midnight-blue",
          padding: "10px",
          borderRadius: "8px",
          fontSize: "14px",
          maxWidth: "500px",
          fontWeight: 500,

        },
        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  )
}

export { toast } from "react-hot-toast"

