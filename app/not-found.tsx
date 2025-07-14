import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <h2 className="text-5xl font-bold text-purple-700 mb-4 animate-bounce">
        Not Found
      </h2>
      <p className="text-lg text-gray-700 mb-8 animate-pulse">
        Could not find requested resource
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg hover:scale-110 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 font-semibold"
      >
        Return Home
      </Link>
    </div>
  );
}
