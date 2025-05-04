
import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar, Car } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
      <div className="container mx-auto px-4 pt-20 pb-16 flex flex-col md:flex-row items-center">
        {/* Hero Text */}
        <div className="w-full md:w-1/2 text-right arabic animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            احجز<span className="text-primary"> بسهولة </span>وسرعة
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
            منصة شاملة لحجز الفنادق، المواعيد الطبية، وتأجير السيارات. 
            خدمات متكاملة مع مساعد ذكي وخريطة تفاعلية.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
            <Button className="text-lg px-8 py-6">
              <Search className="ml-2 h-5 w-5" />
              ابدأ البحث
            </Button>
            <Button variant="outline" className="text-lg px-8 py-6">
              تعرف علينا
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap gap-6 justify-center md:justify-start rtl:justify-end">
            <div className="flex items-center">
              <div className="mr-3 bg-primary/10 p-2 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">أكثر من</p>
                <p className="font-bold">100+ موقع</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3 bg-secondary/10 p-2 rounded-full">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">أكثر من</p>
                <p className="font-bold">150+ طبيب</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3 bg-accent/10 p-2 rounded-full">
                <Car className="h-6 w-6 text-accent" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">أكثر من</p>
                <p className="font-bold">200+ سيارة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
            alt="Mahbooz App Preview" 
            className="max-w-full h-auto rounded-3xl shadow-2xl"
          />
        </div>
      </div>

      {/* Wave design */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
