
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarWrapper } from "./components/Sidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HotelDetail from "./pages/HotelDetail";

const queryClient = new QueryClient();

const App = () => (
  <TooltipPrimitive.Provider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SidebarWrapper>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hotels/:id" element={<HotelDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarWrapper>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </QueryClientProvider>
  </TooltipPrimitive.Provider>
);

export default App;
