import Link from 'next/link';

export default function BackButton() {
  return (
    <div className="mb-6">
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        חזרה לרשימת הפריטים
      </Link>
    </div>
  );
} 