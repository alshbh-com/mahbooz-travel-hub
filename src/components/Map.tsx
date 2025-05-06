
import React, { useState } from 'react';
import { Search, MapPin, Clock, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from '@/components/ui/card';

const Map = () => {
  const [viewType, setViewType] = useState<'default' | 'satellite'>('default');
  const [distance, setDistance] = useState(5); // كم
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // بيانات مثال للفنادق على الخريطة
  const locations = [
    { id: 1, type: 'hotel', name: 'فندق القمة', rating: 4.8, distance: 1.2, time: 8, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945' },
    { id: 2, type: 'hotel', name: 'استراحة النخيل', rating: 4.6, distance: 2.5, time: 15, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b' },
    { id: 3, type: 'hotel', name: 'فندق روز جاردن', rating: 4.9, distance: 3.8, time: 22, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4' },
    { id: 4, type: 'hotel', name: 'فندق الخليج', rating: 4.5, distance: 4.1, time: 25, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa' },
    { id: 5, type: 'hotel', name: 'منتجع الواحة', rating: 4.7, distance: 5.2, time: 30, image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a' },
  ];

  const filteredLocations = locations.filter(loc => 
    (activeFilter === 'all' || loc.type === activeFilter) && 
    loc.distance <= distance
  );

  const toggleMapType = () => {
    setViewType(viewType === 'default' ? 'satellite' : 'default');
  };

  const handleDistanceChange = (value: number[]) => {
    setDistance(value[0]);
  };

  return (
    <section className="py-16 bg-gray-50" id="locations">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">الفنادق القريبة منك</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            استخدم الخريطة التفاعلية لاكتشاف الفنادق القريبة من موقعك مع معلومات المسافة والوقت المتوقع للوصول
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 relative">
          {/* أدوات البحث والتصفية */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Input 
                  placeholder="ابحث عن فندق..." 
                  className="pl-10 pr-4 py-2"
                  dir="rtl"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                <span>{showFilters ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}</span>
              </Button>
            </div>
            
            <div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleMapType}
              >
                {viewType === 'default' ? 'عرض صناعي' : 'عرض الخريطة'}
              </Button>
            </div>
          </div>
          
          {/* فلاتر البحث */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex flex-wrap gap-4 mb-4">
                <Badge 
                  className={`cursor-pointer ${activeFilter === 'all' ? 'bg-primary' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setActiveFilter('all')}
                >
                  الكل
                </Badge>
                <Badge 
                  className={`cursor-pointer ${activeFilter === 'hotel' ? 'bg-primary' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setActiveFilter('hotel')}
                >
                  فنادق 5 نجوم
                </Badge>
                <Badge 
                  className={`cursor-pointer ${activeFilter === 'resort' ? 'bg-primary' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setActiveFilter('resort')}
                >
                  منتجعات
                </Badge>
                <Badge 
                  className={`cursor-pointer ${activeFilter === 'apartment' ? 'bg-primary' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setActiveFilter('apartment')}
                >
                  شقق فندقية
                </Badge>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="whitespace-nowrap">المسافة: حتى {distance} كم</span>
                <div className="flex-1">
                  <Slider
                    defaultValue={[5]}
                    max={20}
                    min={1}
                    step={1}
                    onValueChange={handleDistanceChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* الخريطة */}
          <div className="h-[500px] relative overflow-hidden rounded-xl mb-6">
            {/* هذا سيتم استبداله بخريطة حقيقية مثل Google Maps */}
            <div className={`absolute inset-0 flex items-center justify-center ${viewType === 'satellite' ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <div className="text-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-24 w-24 mx-auto mb-4 ${viewType === 'satellite' ? 'text-white/50' : 'text-primary/50'}`}
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
                <h3 className={`text-xl font-medium mb-2 ${viewType === 'satellite' ? 'text-white' : 'text-gray-700'}`}>خريطة تفاعلية</h3>
                <p className={viewType === 'satellite' ? 'text-white/70' : 'text-gray-500'}>
                  في الإصدار النهائي، ستظهر هنا خريطة Google تعرض جميع المواقع المتاحة
                </p>
              </div>
            </div>
            
            {/* علامات المواقع - سيتم وضعها بشكل ديناميكي على الخريطة الحقيقية */}
            {filteredLocations.map((location, index) => (
              <div 
                key={location.id}
                className="absolute bg-primary text-white p-3 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                style={{ 
                  top: `${20 + (index * 15)}%`, 
                  left: `${20 + (index * 15)}%`,
                  zIndex: 10
                }}
              >
                <MapPin className="h-6 w-6" />
                
                {/* معلومات الموقع عند التحويم */}
                <div className="absolute bottom-full right-0 mb-2 opacity-0 hover:opacity-100 transition-opacity w-64">
                  <Card className="border shadow-lg">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                          <img 
                            src={location.image}
                            alt={location.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{location.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{location.distance} كم</span>
                            <Clock className="h-3 w-3 mr-2" />
                            <span>{location.time} دقيقة</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className={`h-3 w-3 ${i < Math.floor(location.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                            ))}
                            <span className="text-xs ml-1">{location.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full mt-2" size="sm">عرض التفاصيل</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
          
          {/* قائمة المواقع - عرض مبسط */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredLocations.map(location => (
              <div key={location.id} className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
                <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                  <img 
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{location.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{location.distance} كم</span>
                    <Clock className="h-3 w-3 mr-2" />
                    <span>{location.time} دقيقة</span>
                  </div>
                  <Button className="mt-2" size="sm" variant="outline">عرض على الخريطة</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center mt-6 gap-6">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-primary rounded-full mr-2"></span>
            <span>فنادق واستراحات</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-secondary rounded-full mr-2"></span>
            <span>منتجعات فاخرة</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-accent rounded-full mr-2"></span>
            <span>شقق فندقية</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
