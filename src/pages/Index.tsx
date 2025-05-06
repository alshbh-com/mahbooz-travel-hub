
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookingOptions from "@/components/BookingOptions";
import Map from "@/components/Map";
import Chatbot from "@/components/Chatbot";
import HotelCard from "@/components/HotelCard";
import Footer from "@/components/Footer";
import FeaturedCategories from "@/components/FeaturedCategories";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowDown, Star } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  // قسم الفنادق
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([100, 500]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string | undefined>(undefined);

  // بيانات الفنادق المعروضة
  const hotels = [
    // السعودية
    {
      id: 1,
      name: "فندق رويال الرياض",
      location: "الرياض، السعودية",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      price: 350,
      rating: 4.8,
      reviewCount: 124,
      amenities: ["واي فاي", "مسبح", "موقف سيارات", "مطعم"],
      label: "الأكثر طلباً",
      country: "السعودية"
    },
    {
      id: 2,
      name: "برج الفيصلية للأجنحة الفندقية",
      location: "جدة، السعودية",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      price: 420,
      rating: 4.9,
      reviewCount: 201,
      amenities: ["واي فاي", "مسبح", "مطعم", "صالة رياضية", "منتجع صحي"],
      country: "السعودية"
    },
    // اليمن
    {
      id: 3,
      name: "فندق القمة",
      location: "صنعاء، اليمن",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      price: 220,
      rating: 4.6,
      reviewCount: 86,
      amenities: ["واي فاي", "حديقة", "منطقة شواء"],
      country: "اليمن"
    },
    {
      id: 4,
      name: "استراحة النخيل",
      location: "عدن، اليمن",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      price: 180,
      rating: 4.5,
      reviewCount: 65,
      amenities: ["واي فاي", "مطعم", "قاعة اجتماعات"],
      country: "اليمن"
    },
    // مصر
    {
      id: 5,
      name: "فندق الماسة القاهرة",
      location: "القاهرة، مصر",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      price: 280,
      rating: 4.7,
      reviewCount: 150,
      amenities: ["واي فاي", "مسبح", "إطلالة نهر النيل", "مطعم"],
      country: "مصر"
    },
    // الإمارات
    {
      id: 6,
      name: "برج العرب",
      location: "دبي، الإمارات",
      image: "https://images.unsplash.com/photo-1590073844006-33379778ae09",
      price: 950,
      rating: 5.0,
      reviewCount: 320,
      amenities: ["واي فاي", "مسبح", "سبا", "إطلالة بحر", "مطعم فاخر"],
      label: "الأعلى تقييماً",
      country: "الإمارات"
    },
    {
      id: 7,
      name: "قصر الإمارات",
      location: "أبو ظبي، الإمارات",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
      price: 850,
      rating: 4.9,
      reviewCount: 280,
      amenities: ["واي فاي", "مسبح", "شاطئ خاص", "سبا", "مطاعم متعددة"],
      country: "الإمارات"
    },
    // قطر
    {
      id: 8,
      name: "مندرين أورينتال الدوحة",
      location: "الدوحة، قطر",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
      price: 780,
      rating: 4.8,
      reviewCount: 175,
      amenities: ["واي فاي", "مسبح", "سبا", "مطاعم فاخرة", "خدمة الكونسيرج"],
      country: "قطر"
    },
    {
      id: 9,
      name: "فندق الشعلة الدوحة",
      location: "الدوحة، قطر",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      price: 650,
      rating: 4.7,
      reviewCount: 130,
      amenities: ["واي فاي", "مسبح", "سبا", "نادي صحي", "مطعم"],
      country: "قطر"
    },
    // عمان
    {
      id: 10,
      name: "فندق الجبل الأخضر",
      location: "مسقط، عمان",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      price: 320,
      rating: 4.6,
      reviewCount: 110,
      amenities: ["واي فاي", "مسبح", "إطلالة جبلية", "مطعم"],
      country: "عمان"
    },
  ];

  // تطبيق الفلاتر على الفنادق
  const filteredHotels = hotels.filter(hotel => {
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(hotel.country);
    const matchesRating = !selectedRating || hotel.rating >= parseFloat(selectedRating);
    
    return matchesPrice && matchesCountry && matchesRating;
  });

  const countries = [...new Set(hotels.map(hotel => hotel.country))];

  const toggleCountryFilter = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const resetFilters = () => {
    setPriceRange([100, 500]);
    setSelectedCountries([]);
    setSelectedRating(undefined);
  };

  return (
    <div className="min-h-screen arabic" dir="rtl">
      <Navbar siteName="محجوز" />
      <Hero />
      <BookingOptions />
      
      {/* إضافة قسم الأقسام المميزة */}
      <FeaturedCategories />
      
      {/* بحث وفلاتر متقدمة */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 flex-grow">
              <div className="relative flex-grow max-w-md">
                <Input 
                  placeholder="ابحث عن فندق..." 
                  className="pl-10 pr-4 py-2"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                <span>{showFilters ? "إخفاء الفلاتر" : "فلاتر البحث"}</span>
              </Button>
              <Select 
                value={selectedRating} 
                onValueChange={(value) => setSelectedRating(value)}
              >
                <SelectTrigger className="w-[180px]">
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
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <h3 className="font-medium mb-4">الدولة</h3>
                    <div className="flex flex-wrap gap-2">
                      {countries.map(country => (
                        <Badge 
                          key={country}
                          variant={selectedCountries.includes(country) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleCountryFilter(country)}
                        >
                          {country}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">المرافق</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="wifi" className="ml-2" />
                        <label htmlFor="wifi">واي فاي</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="pool" className="ml-2" />
                        <label htmlFor="pool">مسبح</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="parking" className="ml-2" />
                        <label htmlFor="parking">موقف سيارات</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="restaurant" className="ml-2" />
                        <label htmlFor="restaurant">مطعم</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="gym" className="ml-2" />
                        <label htmlFor="gym">صالة رياضية</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="spa" className="ml-2" />
                        <label htmlFor="spa">سبا</label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* التصنيف حسب التقييم */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-2">
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
      <section className="py-16" id="hotels">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">فنادق مميزة</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اختر من بين مجموعة متنوعة من الفنادق الفاخرة والاقتصادية في مختلف المناطق
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map(hotel => (
              <Link key={hotel.id} to={`/hotels/${hotel.id}`}>
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
              <Button variant="outline" className="text-lg px-8 py-6">
                عرض المزيد من الفنادق
                <ArrowDown className="mr-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* قسم لماذا محجوز */}
      <section className="py-16 bg-primary/5" id="why-mahbooz">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">لماذا محجوز؟</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نقدم لك تجربة حجز فريدة تجمع بين سهولة الاستخدام والذكاء الاصطناعي والدعم الفوري
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">سرعة وسهولة الحجز</h3>
              <p className="text-gray-600">
                احجز فندقك المفضل بخطوات بسيطة وسريعة مع تأكيد فوري للحجز
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">خيارات متنوعة</h3>
              <p className="text-gray-600">
                مجموعة واسعة من الفنادق من مختلف الفئات والأسعار لتناسب جميع الميزانيات
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
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
            <div className="inline-block bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-2xl font-bold mb-2">انطلاقة من عدن.. وانطلاقة نحو المستقبل!</h3>
              <p>نهدف لتقديم أفضل خدمة حجوزات في اليمن والمنطقة العربية</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <p className="text-gray-600">فندق واستراحة</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-primary mb-2">5</div>
                <div className="text-gray-600">دول عربية</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-600">دعم فوري</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-gray-600">عميل سعيد</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الخريطة */}
      <Map />
      
      {/* قسم عن محجوز */}
      <section className="py-16 bg-white" id="about">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">عن منصة محجوز</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "محجوز" هي منصة شاملة للحجوزات تنطلق من مدينة عدن في اليمن، تجمع خدمات حجز الفنادق والاستراحات في مكان واحد.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                نسعى لتقديم تجربة حجز سلسة وسهلة الاستخدام معززة بالذكاء الاصطناعي والخرائط التفاعلية، مع أنظمة دفع آمنة ومتعددة الخيارات.
              </p>
              <p className="text-gray-700 leading-relaxed">
                رؤيتنا هي أن نصبح المنصة الأولى للحجوزات في اليمن ثم التوسع إلى المملكة العربية السعودية والإمارات العربية المتحدة.
              </p>
              
              <div className="mt-8 flex gap-4">
                <Button>تعرف علينا أكثر</Button>
                <Button variant="outline">تواصل معنا</Button>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="About Mahbooz" 
                className="rounded-xl shadow-lg w-full h-auto"
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
