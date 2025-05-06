
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HotelDetail from "./pages/HotelDetail";
import DoctorDetail from "./pages/DoctorDetail";
import CarDetail from "./pages/CarDetail";

const queryClient = new QueryClient();

const App = () => (
  <TooltipPrimitive.Provider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hotels/:id" element={<HotelDetail />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </QueryClientProvider>
  </TooltipPrimitive.Provider>
);

export default App;
