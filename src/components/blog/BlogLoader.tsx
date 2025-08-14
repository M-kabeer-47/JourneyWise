import Spinner from "../ui/Spinner";

export default function BlogLoader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center flex flex-col items-center">
        <Spinner size="small" />
        <p className="mt-4 text-gray-600">Loading blog...</p>
      </div>
    </div>
  );
}
