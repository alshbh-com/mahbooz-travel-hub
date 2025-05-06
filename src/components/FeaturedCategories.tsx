
import { Hotel, Star, MapPin, Shield } from "lucide-react";
import { useState } from 'react';
import { Button } from "@/components/ui/button";

interface CategoryProps {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  href: string;
  color: string;
  features: string[];
  active?: boolean;
  onClick?: () => void;
}

const CategoryCard = ({ 
  id,
  title, 
  icon, 
  description, 
  href, 
  color, 
  features,
  active, 
  onClick 
}: CategoryProps) => {
  return (
    <div 
      id={`category-${id}`}
      onClick={onClick}
      className={`relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ${
        active 
          ? 'bg-white shadow-xl scale-105 border-2 border-primary' 
          : 'bg-white/80 hover:shadow-lg hover:scale-102'
      }`}
    >
      <div className="p-6">
        <div 
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${color}`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {/* قائمة المميزات */}
        <ul className="mb-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
        
        <a 
          href={href} 
          className="mt-4 inline-flex items-center text-primary font-medium"
        >
          استعرض الفنادق
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1 rtl:rotate-180" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      {active && (
        <div className="absolute bottom-0 right-0 left-0 h-1 bg-primary"></div>
      )}
    </div>
  );
};

const FeaturedCategories = () => {
  const [activeCategory, setActiveCategory] = useState("hotels");
  
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    // التمرير إلى القسم المختار
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // معلومات الفئات
  const categories: CategoryProps[] = [
    {
      id: "hotels",
      title: "فنادق فاخرة",
      icon: <Hotel size={32} className="text-white" />,
      description: "اكتشف مجموعة متنوعة من الفنادق الفاخرة من فئة 5 نجوم بأسعار مناسبة وخدمات متميزة",
      features: [
        "أفضل المرافق والخدمات الفاخرة",
        "فطور مجاني وخدمة الغرف على مدار الساعة",
        "موقع متميز في قلب المدينة"
      ],
      href: "#hotels",
      color: "bg-primary",
      active: activeCategory === "hotels",
      onClick: () => handleCategoryClick("hotels")
    },
    {
      id: "midrange",
      title: "فنادق متوسطة",
      icon: <Star size={32} className="text-white" />,
      description: "خيارات اقتصادية مريحة بمواقع مميزة وخدمات أساسية ممتازة بأسعار معقولة",
      features: [
        "غرف مريحة ونظيفة",
        "موقع جيد بالقرب من وسط المدينة",
        "خدمة واي فاي مجانية ووجبة فطور"
      ],
      href: "#hotels",
      color: "bg-secondary",
      active: activeCategory === "midrange",
      onClick: () => handleCategoryClick("hotels")
    },
    {
      id: "resorts",
      title: "منتجعات واستراحات",
      icon: <MapPin size={32} className="text-white" />,
      description: "استمتع بإقامة مميزة في منتجعات فاخرة مع مناظر طبيعية خلابة وخدمات ترفيهية",
      features: [
        "مسابح فاخرة ومناطق استجمام",
        "أنشطة ترفيهية للعائلات والأطفال",
        "مطاعم متنوعة وبوفيه مفتوح"
      ],
      href: "#hotels",
      color: "bg-accent",
      active: activeCategory === "resorts",
      onClick: () => handleCategoryClick("hotels")
    }
  ];
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
            أفضل الفنادق
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">أماكن إقامة متميزة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اختر من بين تشكيلة متنوعة من الفنادق الحاصلة على أعلى تقييمات من النزلاء،
            مع خدمات استثنائية وأسعار منافسة
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              {...category}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6">التزامنا تجاهك</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">ضمان أفضل سعر</h4>
              <p className="text-gray-600 text-sm">
                نضمن لك الحصول على أفضل سعر ممكن مع خدماتنا، وإذا وجدت سعرًا أفضل سنعوضك الفرق
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="text-lg font-medium mb-2">حجز آمن 100%</h4>
              <p className="text-gray-600 text-sm">
                بيانات الحجز والمعلومات الشخصية محمية بتقنيات تشفير متطورة تضمن أمان معلوماتك
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">دعم سريع على مدار الساعة</h4>
              <p className="text-gray-600 text-sm">
                فريق متخصص متواجد لمساعدتك 24/7 عبر المساعد الذكي أو تواصل مباشر عبر واتساب
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Button
              onClick={() => document.getElementById('hotels')?.scrollIntoView({ behavior: 'smooth' })}
              className="mx-auto bg-primary text-white hover:bg-primary/90 text-lg px-6 py-2"
            >
              استكشف جميع الفنادق المتاحة
            </Button>
          </div>
          
          <div className="mt-8">
            <p className="text-xl font-medium text-primary">انطلاقة من عدن.. وانطلاقة نحو المستقبل!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
