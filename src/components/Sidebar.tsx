
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Hotel, MapPin } from "lucide-react";
import {
  SidebarProvider,
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset
} from "@/components/ui/sidebar";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-svh w-full">
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export function AppSidebar() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("home");
  
  // الدول المتاحة
  const countries = [
    { id: "saudi", name: "السعودية" },
    { id: "yemen", name: "اليمن" },
    { id: "egypt", name: "مصر" },
    { id: "uae", name: "الإمارات" },
    { id: "qatar", name: "قطر" },
    { id: "oman", name: "عمان" }
  ];

  const menuItems = [
    {
      id: "home",
      title: "الرئيسية",
      icon: Home,
      action: () => navigate("/")
    },
    {
      id: "hotels",
      title: "الفنادق",
      icon: Hotel,
      action: () => navigate("/#hotels")
    }
  ];

  // انتقال للرئيسية مع فلترة الفنادق حسب الدولة
  const handleCountryClick = (country: string) => {
    navigate(`/?country=${country}`);
    setActiveItem(country);
  };

  return (
    <ShadcnSidebar>
      <SidebarContent>
        <div className="flex items-center p-4">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            محجوز
          </span>
          <SidebarTrigger className="ml-auto rtl:mr-auto" />
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>القائمة</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeItem === item.id}
                    onClick={() => {
                      setActiveItem(item.id);
                      item.action();
                    }}
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>الدول</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {countries.map((country) => (
                <SidebarMenuItem key={country.id}>
                  <SidebarMenuButton
                    isActive={activeItem === country.id}
                    onClick={() => handleCountryClick(country.id)}
                    tooltip={country.name}
                  >
                    <MapPin className="h-4 w-4" />
                    <span>{country.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
}
