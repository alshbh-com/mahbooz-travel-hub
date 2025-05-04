
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu, User } from 'lucide-react';

interface NavbarProps {
  siteName?: string;
}

const Navbar = ({ siteName = "محجوز" }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {siteName}
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 rtl:space-x-reverse">
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            الرئيسية
          </a>
          <a href="#hotels" className="text-foreground hover:text-primary transition-colors">
            الفنادق
          </a>
          <a href="#appointments" className="text-foreground hover:text-primary transition-colors">
            المواعيد الطبية
          </a>
          <a href="#cars" className="text-foreground hover:text-primary transition-colors">
            تأجير سيارات
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            عن محجوز
          </a>
        </nav>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
          
          <div className="block md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="arabic">
                <div className="mt-8 flex flex-col space-y-4">
                  <a href="#" className="text-foreground hover:text-primary transition-colors py-2">
                    الرئيسية
                  </a>
                  <a href="#hotels" className="text-foreground hover:text-primary transition-colors py-2">
                    الفنادق
                  </a>
                  <a href="#appointments" className="text-foreground hover:text-primary transition-colors py-2">
                    المواعيد الطبية
                  </a>
                  <a href="#cars" className="text-foreground hover:text-primary transition-colors py-2">
                    تأجير سيارات
                  </a>
                  <a href="#about" className="text-foreground hover:text-primary transition-colors py-2">
                    عن محجوز
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
