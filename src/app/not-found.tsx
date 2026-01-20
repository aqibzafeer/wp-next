import { notFoundData } from '@/lib/allData';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">{notFoundData.title}</h1>
        <p className="text-2xl text-gray-600 mb-8">{notFoundData.subtitle}</p>
        <p className="text-gray-500 mb-8">{notFoundData.description}</p>
        <a
          href={notFoundData.buttonHref}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
        >
          {notFoundData.buttonText}
        </a>
      </div>
    </div>
  );
}
