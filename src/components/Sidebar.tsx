
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Hotel } from "lucide-react";
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
  const [activeItem, setActiveItem] = useState("home");
  
  const menuItems = [
    {
      id: "home",
      title: "الرئيسية",
      icon: Home,
      url: "/"
    },
    {
      id: "hotels",
      title: "الفنادق",
      icon: Hotel,
      url: "#hotels"
    }
  ];

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
                    onClick={() => setActiveItem(item.id)}
                    tooltip={item.title}
                    asChild
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
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
