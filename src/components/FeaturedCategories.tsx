
import { Hotel, CalendarClock, Car } from "lucide-react";
import { useState, useEffect } from 'react';

interface CategoryProps {
  title: string;
  icon: JSX.Element;
  description: string;
  href: string;
  color: string;
  active?: boolean;
  onClick?: () => void;
}

const CategoryCard = ({ title, icon, description, href, color, active, onClick }: CategoryProps) => {
  return (
    <div 
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
        <p className="text-gray-600">{description}</p>
        <a 
          href={href} 
          className="mt-4 inline-flex items-center text-primary font-medium"
        >
          استعرض الخدمات
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-2 rtl:rotate-180" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 5l7 7m0 0l-7 7m7-7H3" 
            />
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
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">خدماتنا المتميزة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اختر من بين خدماتنا المتنوعة التي تلبي احتياجاتك من الفنادق والمواعيد الطبية وتأجير السيارات
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <CategoryCard
            title="فنادق واستراحات"
            icon={<Hotel size={32} className="text-white" />}
            description="اكتشف مجموعة متنوعة من الفنادق والاستراحات بأسعار مناسبة وخدمات متميزة"
            href="#hotels"
            color="bg-primary"
            active={activeCategory === "hotels"}
            onClick={() => handleCategoryClick("hotels")}
          />
          
          <CategoryCard
            title="مواعيد طبية"
            icon={<CalendarClock size={32} className="text-white" />}
            description="احجز موعدك مع نخبة من الأطباء المتخصصين في مختلف المجالات الطبية"
            href="#appointments"
            color="bg-secondary"
            active={activeCategory === "appointments"}
            onClick={() => handleCategoryClick("appointments")}
          />
          
          <CategoryCard
            title="تأجير سيارات"
            icon={<Car size={32} className="text-white" />}
            description="استأجر سيارة تناسب احتياجاتك من مجموعة متنوعة من السيارات الاقتصادية والفاخرة"
            href="#cars"
            color="bg-accent"
            active={activeCategory === "cars"}
            onClick={() => handleCategoryClick("cars")}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
