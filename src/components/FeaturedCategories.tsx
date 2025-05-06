
import { Hotel, CalendarClock, Car, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
          استعرض الخدمات
          <ChevronRight className="mr-1 h-4 w-4 rtl:rotate-180" />
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
  const navigate = useNavigate();
  const categoriesRef = useRef<HTMLDivElement>(null);
  
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
      title: "فنادق واستراحات",
      icon: <Hotel size={32} className="text-white" />,
      description: "اكتشف مجموعة متنوعة من الفنادق والاستراحات بأسعار مناسبة وخدمات متميزة",
      features: [
        "حجز فوري بضمان أفضل الأسعار",
        "عروض حصرية للمستخدمين",
        "تصنيفات ومراجعات من النزلاء السابقين"
      ],
      href: "#hotels",
      color: "bg-primary",
      active: activeCategory === "hotels",
      onClick: () => handleCategoryClick("hotels")
    },
    {
      id: "appointments",
      title: "مواعيد طبية",
      icon: <CalendarClock size={32} className="text-white" />,
      description: "احجز موعدك مع نخبة من الأطباء المتخصصين في مختلف المجالات الطبية",
      features: [
        "أكثر من 150 طبيب متخصص",
        "تذكير آلي قبل موعدك",
        "استشارات طبية عن بعد"
      ],
      href: "#appointments",
      color: "bg-secondary",
      active: activeCategory === "appointments",
      onClick: () => handleCategoryClick("appointments")
    },
    {
      id: "cars",
      title: "تأجير سيارات",
      icon: <Car size={32} className="text-white" />,
      description: "استأجر سيارة تناسب احتياجاتك من مجموعة متنوعة من السيارات الاقتصادية والفاخرة",
      features: [
        "خيارات متنوعة من جميع الفئات",
        "توصيل السيارة إلى موقعك",
        "تأمين شامل وخدمة طوارئ 24/7"
      ],
      href: "#cars",
      color: "bg-accent",
      active: activeCategory === "cars",
      onClick: () => handleCategoryClick("cars")
    }
  ];
  
  // تأثير عند التمرير للأقسام
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveCategory(id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('#hotels, #appointments, #cars');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white" ref={categoriesRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
            خدماتنا
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">خدماتنا المتميزة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اختر من بين خدماتنا المتنوعة التي تلبي احتياجاتك من الفنادق والمواعيد الطبية وتأجير السيارات،
            كل ذلك من خلال منصة واحدة سهلة الاستخدام
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
          <h3 className="text-2xl font-semibold mb-4">لماذا محجوز؟</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">سهولة وسرعة الحجز</h4>
              <p className="text-gray-600 text-sm">حجز سريع بخطوات بسيطة ودون تعقيدات، مع تأكيد فوري لحجزك</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">تعدد الخدمات في منصة واحدة</h4>
              <p className="text-gray-600 text-sm">كل ما تحتاجه من حجوزات للفنادق والمواعيد الطبية وتأجير السيارات في مكان واحد</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">مساعدة ذكية في اتخاذ القرار</h4>
              <p className="text-gray-600 text-sm">نظام ذكي يقدم لك توصيات مخصصة بناءً على تفضيلاتك واحتياجاتك</p>
            </div>
          </div>

          <div className="mt-10">
            <Button className="mx-auto bg-primary text-white hover:bg-primary/90">
              انطلاقة من عدن.. وانطلاقة نحو المستقبل!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
