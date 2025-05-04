
import React from 'react';

const Map = () => {
  return (
    <section className="py-16 bg-gray-50" id="locations">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">خريطة تفاعلية</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            استكشف الفنادق، العيادات، ومراكز تأجير السيارات القريبة منك على خريطتنا التفاعلية
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 h-[500px] relative overflow-hidden">
          {/* This would be replaced with an actual map like Google Maps */}
          <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
            <div className="text-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-24 w-24 mx-auto text-primary/50 mb-4"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-700 mb-2">خريطة تفاعلية</h3>
              <p className="text-gray-500">
                في الإصدار النهائي، ستظهر هنا خريطة Google تعرض جميع المواقع المتاحة
              </p>
            </div>
          </div>
          
          {/* Map markers - these would be dynamically positioned on a real map */}
          <div className="absolute top-1/4 left-1/4 bg-primary text-white p-2 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
          
          <div className="absolute top-2/3 left-2/3 bg-secondary text-white p-2 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
          
          <div className="absolute top-1/3 left-3/4 bg-accent text-white p-2 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center mt-6 gap-6">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-primary rounded-full mr-2"></span>
            <span>فنادق واستراحات</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-secondary rounded-full mr-2"></span>
            <span>عيادات طبية</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-accent rounded-full mr-2"></span>
            <span>تأجير سيارات</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
