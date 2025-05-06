import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookingOptions from "@/components/BookingOptions";
import Map from "@/components/Map";
import Chatbot from "@/components/Chatbot";
import HotelCard from "@/components/HotelCard";
import Footer from "@/components/Footer";
import FeaturedCategories from "@/components/FeaturedCategories";
import { Button } from "@/components/ui/button";
import { ArrowDown, Star } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const location = useLocation();
  
  // قسم الفنادق
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([100, 500]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string | undefined>(undefined);

  // استخدام معلومات URL لتحديد المدينة المختارة
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const cityParam = urlParams.get('city');
    
    if (cityParam) {
      setSelectedCities([cityParam]);
    } else {
      setSelectedCities([]);
    }
  }, [location.search]);

  // بيانات الفنادق اليمنية
  const hotels = [
    {
      id: 1,
      name: "فندق القمة صنعاء",
      location: "شارع الزبيري، صنعاء، اليمن",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      price: 220,
      rating: 4.6,
      reviewCount: 86,
      amenities: ["واي فاي", "مطعم", "موقف سيارات", "قاعة اجتماعات"],
      label: "الأكثر طلباً",
      city: "صنعاء"
    },
    {
      id: 2,
      name: "استراحة النخيل عدن",
      location: "شارع الساحل، عدن، اليمن",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      price: 180,
      rating: 4.5,
      reviewCount: 65,
      amenities: ["واي فاي", "مطعم", "قاعة اجتماعات", "إطلالة بحرية"],
      city: "عدن"
    },
    {
      id: 3,
      name: "فندق قصر سبأ",
      location: "منطقة الروضة، صنعاء، اليمن",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      price: 250,
      rating: 4.7,
      reviewCount: 130,
      amenities: ["واي فاي", "مطعم تقليدي", "صالة شاي", "جلسات تراثية"],
      city: "صنعاء"
    },
    {
      id: 4,
      name: "منتجع الشاطئ الذهبي",
      location: "خليج التواهي، عدن، اليمن",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
      price: 300,
      rating: 4.8,
      reviewCount: 110,
      amenities: ["مسبح", "شاطئ خاص", "سبا", "مطاعم متعددة"],
      label: "الأعلى تقييماً",
      city: "عدن"
    },
    {
      id: 5,
      name: "فندق تراث حضرموت",
      location: "وادي حضرموت، اليمن",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      price: 190,
      rating: 4.5,
      reviewCount: 75,
      amenities: ["واي فاي", "مطعم محلي", "جولات سياحية", "حديقة"],
      city: "حضرموت"
    },
    {
      id: 6,
      name: "فندق جزيرة سقطرى",
      location: "جزيرة سقطرى، اليمن",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      price: 220,
      rating: 4.4,
      reviewCount: 60,
      amenities: ["وجبات محلية", "تنظيم رحلات استكشافية", "منطقة استرخاء"],
      city: "سقطرى"
    },
    {
      id: 7,
      name: "فندق باب اليمن",
      location: "شارع الستين، صنعاء، اليمن",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      price: 210,
      rating: 4.3,
      reviewCount: 95,
      amenities: ["واي فاي", "مطعم", "جلسة سطح", "خدمة استقبال 24 ساعة"],
      city: "صنعاء"
    },
    {
      id: 8,
      name: "منتجع جبل الشرق",
      location: "تعز، اليمن",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      price: 240,
      rating: 4.6,
      reviewCount: 82,
      amenities: ["واي فاي", "مطعم", "حديقة", "تدفئة"],
      city: "تعز"
    },
    {
      id: 9,
      name: "فندق عدن بلازا",
      location: "كريتر، عدن، اليمن",
      image: "https://images.unsplash.com/photo-1590073844006-33379778ae09",
      price: 260,
      rating: 4.7,
      reviewCount: 105,
      amenities: ["واي فاي", "مسبح", "مطعم فاخر", "قاعة اجتماعات"],
      city: "عدن"
    },
    {
      id: 10,
      name: "شاليهات تعز الخضراء",
      location: "جبل صبر، تعز، اليمن",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      price: 160,
      rating: 4.2,
      reviewCount: 55,
      amenities: ["إطلالة جبلية", "مكان للشواء", "جلسات خارجية"],
      city: "تعز"
    },
  ];

  // تطبيق الفلاتر على الفنادق
  const filteredHotels = hotels.filter(hotel => {
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    const matchesCity = selectedCities.length === 0 || selectedCities.includes(hotel.city.toLowerCase());
    const matchesRating = !selectedRating || hotel.rating >= parseFloat(selectedRating);
    
    return matchesPrice && matchesCity && matchesRating;
  });

  const cities = [...new Set(hotels.map(hotel => hotel.city))];

  const toggleCityFilter = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter(c => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const resetFilters = () => {
    setPriceRange([100, 500]);
    setSelectedCities([]);
    setSelectedRating(undefined);
  };

  return (
    <div className="min-h-screen arabic" dir="rtl">
      <Navbar siteName="محجوز" />
      <Hero />
      <BookingOptions />
      
      {/* إضافة قسم الأقسام المميزة */}
      <FeaturedCategories />
      
      {/* فلاتر متقدمة */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 flex-grow flex-wrap">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white hover:bg-gray-50"
              >
                <span>{showFilters ? "إخفاء الفلاتر" : "فلاتر البحث"}</span>
              </Button>
              <Select 
                value={selectedRating} 
                onValueChange={(value) => setSelectedRating(value)}
              >
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="التقييم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التقييمات</SelectItem>
                  <SelectItem value="5">5 نجوم</SelectItem>
                  <SelectItem value="4.5">4.5+ نجوم</SelectItem>
                  <SelectItem value="4">4+ نجوم</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button onClick={resetFilters} variant="ghost">إعادة ضبط</Button>
            </div>
          </div>
          
          {/* فلاتر البحث المتقدمة */}
          {showFilters && (
            <Card className="mb-8 overflow-hidden border-0 shadow-md">
              <CardContent className="p-6 bg-white bg-opacity-95 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">نطاق السعر</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span>{priceRange[0]} ر.س</span>
                      <span>{priceRange[1]} ر.س</span>
                    </div>
                    <Slider
                      defaultValue={priceRange}
                      min={100}
                      max={1000}
                      step={50}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">المدينة</h3>
                    <div className="flex flex-wrap gap-2">
                      {cities.map(city => (
                        <Badge 
                          key={city}
                          variant={selectedCities.includes(city.toLowerCase()) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleCityFilter(city.toLowerCase())}
                        >
                          {city}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* التصنيف حسب التقييم */}
          <div className="flex justify-center mb-8 overflow-x-auto py-2">
            <div className="flex flex-nowrap gap-2 min-w-max">
              <Button variant="outline" className="bg-white" onClick={() => setSelectedRating(undefined)}>
                جميع الفنادق
              </Button>
              <Button variant="outline" className="bg-white" onClick={() => setSelectedRating("5")}>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-2" />
                5 نجوم
              </Button>
              <Button variant="outline" className="bg-white" onClick={() => setSelectedRating("4.5")}>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-2" />
                4.5+ نجوم
              </Button>
              <Button variant="outline" className="bg-white" onClick={() => setSelectedRating("4")}>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-2" />
                4+ نجوم
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الفنادق */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50" id="hotels">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {selectedCities.length > 0 
                ? `فنادق ${cities.find(c => c.toLowerCase() === selectedCities[0])?.toString() || ''}`
                : 'فنادق مميزة'
              }
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اختر من بين مجموعة متنوعة من الفنادق الفاخرة والاقتصادية في مختلف المدن
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map(hotel => (
              <Link key={hotel.id} to={`/hotels/${hotel.id}`} className="transform hover:scale-105 transition-transform duration-300">
                <HotelCard {...hotel} />
              </Link>
            ))}
          </div>
          
          {filteredHotels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">لم يتم العثور على فنادق تطابق معايير البحث</p>
              <Button onClick={resetFilters}>إعادة ضبط الفلاتر</Button>
            </div>
          )}
          
          {filteredHotels.length > 0 && (
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
              >
                عرض المزيد من الفنادق
                <ArrowDown className="mr-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* قسم لماذا محجوز */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5" id="why-mahbooz">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">لماذا محجوز؟</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نقدم لك تجربة حجز فريدة تجمع بين سهولة الاستخدام والذكاء الاصطناعي والدعم الفوري
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">سرعة وسهولة الحجز</h3>
              <p className="text-gray-600">
                احجز فندقك المفضل بخطوات بسيطة وسريعة مع تأكيد فوري للحجز
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/10 to-secondary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">فنادق يمنية متنوعة</h3>
              <p className="text-gray-600">
                مجموعة واسعة من الفنادق في مختلف مدن اليمن تناسب جميع الميزانيات والاحتياجات
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-accent/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">دعم فوري على مدار الساعة</h3>
              <p className="text-gray-600">
                فريق دعم متخصص متواجد لمساعدتك على مدار الساعة عبر المساعد الذكي أو واتساب
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg p-6 mb-8 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-2">انطلاقة واسعة.. نحو آفاق السياحة!</h3>
              <p>نهدف لتقديم أفضل خدمة حجوزات فندقية</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">100+</div>
                <p className="text-gray-600">فندق واستراحة</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">5</div>
                <div className="text-gray-600">مدن يمنية</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-gray-600">دعم فوري</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">1000+</div>
                <div className="text-gray-600">عميل سعيد</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الخريطة */}
      <Map />
      
      {/* قسم عن محجوز */}
      <section className="py-16 bg-gradient-to-r from-white to-gray-50" id="about">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">عن منصة محجوز</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "محجوز" هي منصة شاملة للحجوزات الفندقية، تجمع خدمات حجز الفنادق والاستراحات في مكان واحد.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                نسعى لتقديم تجربة حجز سلسة وسهلة الاستخدام معززة بالذكاء الاصطناعي والخرائط التفاعلية، مع أنظمة دفع آمنة ومتعددة الخيارات.
              </p>
              <p className="text-gray-700 leading-relaxed">
                رؤيتنا هي أن نصبح المنصة الأولى للحجوزات الفندقية وتقديم خدمات سياحية متكاملة للزوار المحليين والدوليين.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">تعرف علينا أكثر</Button>
                <Button variant="outline">تواصل معنا</Button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="About Mahbooz" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
