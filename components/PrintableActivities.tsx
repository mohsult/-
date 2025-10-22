import React from 'react';
import { ColoringActivity } from '../types';

interface PrintableActivitiesProps {
  activity: ColoringActivity;
  images: { theme: string; url: string }[];
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

const PrintableActivities: React.FC<PrintableActivitiesProps> = ({
  activity,
  images,
  isLoading,
  error,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printable-component">
      <div className="fixed inset-0 bg-black bg-opacity-60 z-40 screen-only" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:p-0 print:block" dir="rtl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col print:shadow-none print:rounded-none print:max-h-full print:max-w-full print:h-full print:w-full">
          <header className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center screen-only">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{activity.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <main id="printable-area" className="p-6 overflow-y-auto">
            <div className="text-center mb-6 hidden print:block">
              <h1 className="text-3xl font-bold">{activity.title}</h1>
              <p className="text-lg">نشاط تلوين مقدم من بصريات علياء</p>
            </div>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64 screen-only">
                <svg className="animate-spin h-10 w-10 text-alia-dark-blue mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-lg font-semibold dark:text-white">جاري تحضير صفحات التلوين...</p>
              </div>
            )}
            {error && !isLoading && (
              <div className="flex flex-col items-center justify-center h-64 text-center screen-only">
                <p className="text-lg font-semibold text-red-500">{error}</p>
              </div>
            )}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 print:block">
                {images.map((image, index) => (
                  <div key={index} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 page-break print:border-none print:p-0 print:mb-8 print:w-full">
                    <img src={image.url} alt={image.theme} className="w-full h-auto object-contain" />
                    <p className="text-center font-semibold mt-2 dark:text-gray-300 print:text-black">{image.theme}</p>
                  </div>
                ))}
              </div>
            )}
          </main>
          
          <footer className="p-5 border-t border-gray-200 dark:border-gray-700 screen-only">
            <button
              onClick={handlePrint}
              disabled={isLoading || !!error || images.length === 0}
              className="w-full bg-alia-dark-pink text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v-2a1 1 0 011-1h8a1 1 0 011 1v2h1a2 2 0 002-2v-3a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
              </svg>
              طباعة الصفحات
            </button>
          </footer>
        </div>
      </div>
      <style>{`
        @media screen {
            .print-only {
                display: none;
            }
        }
        @media print {
          body > *:not(.printable-component) {
            display: none !important;
          }
          .printable-component {
            display: block !important;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            overflow: visible;
          }
          .screen-only {
            display: none !important;
          }
          .page-break {
            page-break-inside: avoid;
            page-break-after: always;
          }
          .page-break:last-child {
            page-break-after: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintableActivities;
