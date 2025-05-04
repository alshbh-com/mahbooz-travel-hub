
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookingOptions from "@/components/BookingOptions";
import Map from "@/components/Map";
import Chatbot from "@/components/Chatbot";
import HotelCard from "@/components/HotelCard";
import Footer from "@/components/Footer";

const Index = () => {
  // Sample hotel data
  const hotels = [
    {
      id: 1,
      name: "فندق القمة",
      location: "وسط مدينة عدل، اليمن",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      price: 350,
      rating: 4.8,
      reviewCount: 124,
      amenities: ["واي فاي", "مسبح", "موقف سيارات", "مطعم"],
      label: "الأكثر طلباً"
    },
    {
      id: 2,
      name: "استراحة النخيل",
      location: "شمال مدينة عدل، اليمن",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      price: 220,
      rating: 4.6,
      reviewCount: 86,
      amenities: ["واي فاي", "حديقة", "منطقة شواء"]
    },
    {
      id: 3,
      name: "فندق روز جاردن",
      location: "جنوب مدينة عدل، اليمن",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      price: 420,
      rating: 4.9,
      reviewCount: 201,
      amenities: ["واي فاي", "مسبح", "مطعم", "صالة رياضية", "منتجع صحي"]
    },
  ];

  // Medical appointments data
  const specialists = [
    {
      id: 1,
      name: "د. عبدالرحمن العليمي",
      specialization: "طب عام",
      location: "مستشفى السلام، عدل",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
      price: 120,
      rating: 4.7,
      reviewCount: 93,
      amenities: ["استشارة", "متابعة مجانية"],
    },
    {
      id: 2,
      name: "د. سمية الجابري",
      specialization: "طب أطفال",
      location: "عيادات النور، عدل",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
      price: 150,
      rating: 4.9,
      reviewCount: 158,
      amenities: ["استشارة", "متابعة مجانية", "خصم للأطفال"],
      label: "الأعلى تقييماً"
    },
  ];

  // Cars rental data
  const cars = [
    {
      id: 1,
      name: "تويوتا كامري 2023",
      location: "وكالة السلام، عدل",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027",
      price: 180,
      rating: 4.5,
      reviewCount: 76,
      amenities: ["تأمين شامل", "كيلومترات مفتوحة", "توصيل مجاني"]
    },
    {
      id: 2,
      name: "نيسان التيما 2022",
      location: "مركز الإيجار الدولي، عدل",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
      price: 150,
      rating: 4.3,
      reviewCount: 52,
      amenities: ["تأمين شامل", "GPS", "بلوتوث"]
    },
  ];

  return (
    <div className="min-h-screen arabic" dir="rtl">
      <Navbar />
      <Hero />
      <BookingOptions />
      
      {/* Hotels Section */}
      <section className="py-16" id="hotels">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">فنادق واستراحات مميزة</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اختر من بين مجموعة متنوعة من الفنادق والاستراحات الفاخرة والاقتصادية في مختلف المناطق
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map(hotel => (
              <HotelCard key={hotel.id} {...hotel} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" className="text-lg px-8 py-6">
              عرض جميع الفنادق
            </Button>
          </div>
        </div>
      </section>
      
      {/* Medical Appointments Section */}
      <section className="py-16 bg-gray-50" id="appointments">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">أطباء متخصصون</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              احجز موعدك مع نخبة من الأطباء المتخصصين في مختلف المجالات الطبية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialists.map(specialist => (
              <HotelCard key={specialist.id} {...specialist} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" className="text-lg px-8 py-6">
              عرض جميع التخصصات
            </Button>
          </div>
        </div>
      </section>
      
      {/* Car Rental Section */}
      <section className="py-16" id="cars">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">سيارات للإيجار</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اختر من بين مجموعة متنوعة من السيارات الاقتصادية والفاخرة بأسعار تنافسية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {cars.map(car => (
              <HotelCard key={car.id} {...car} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" className="text-lg px-8 py-6">
              عرض جميع السيارات
            </Button>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <Map />
      
      {/* About Section */}
      <section className="py-16 bg-primary/5" id="about">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">عن منصة محبوز</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "محبوز" هي منصة شاملة للحجوزات تنطلق من مدينة عدل في اليمن، تجمع بين خدمات حجز الفنادق والاستراحات، المواعيد الطبية، وتأجير السيارات في مكان واحد.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                نسعى لتقديم تجربة حجز سلسة وسهلة الاستخدام معززة بالذكاء الاصطناعي والخرائط التفاعلية، مع أنظمة دفع آمنة ومتعددة الخيارات.
              </p>
              <p className="text-gray-700 leading-relaxed">
                رؤيتنا هي أن نصبح المنصة الأولى للحجوزات في اليمن ثم التوسع إلى المملكة العربية السعودية والإمارات العربية المتحدة.
              </p>
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

const Button = ({ children, className, ...props }) => {
  return (
    <button 
      className={`px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Index;
