import { useState, useEffect } from "react";
import { Button } from "@/components/ui/lovable/button";
import { Heart, ArrowRight } from "lucide-react";

const NewBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-primary border-b-8 border-terracotta">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[70vh]">
          {/* Left Section - Product Story */}
          <div
            className={`relative flex items-center transform transition-all duration-1200 ease-out ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <div className="absolute inset-0">
              <img
                src="https://exclusivelane.com/cdn/shop/collections/EL-005-670_C_21b94a9a-9a6c-4cda-95c3-25e69ff3c443_480x.jpg?v=1736166058"
                alt="Traditional handicrafts"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-heritage-orange/80 to-heritage-red/60"></div>
            </div>
            <div className="relative z-10 p-8 lg:p-12 text-white">
              <div className="mb-6">
                <span className="text-heritage-gold text-sm font-medium tracking-wide uppercase">
                  Authentic Heritage
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold mt-2 leading-tight">
                  Where Every Thread
                  <br />
                  <span className="text-heritage-gold">Tells a Story</span>
                </h1>
              </div>
              <p className="text-lg opacity-95 mb-8 leading-relaxed">
                Each piece carries the dreams of artisans who've mastered their
                craft through generations of love and dedication.
              </p>
            </div>
          </div>

          {/* Right Section - Artisan Story */}
          <div
            className={`relative flex items-center transform transition-all duration-1200 ease-out ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="absolute inset-0">
              <img
                src="https://thumbs.dreamstime.com/b/women-empowerment-pottery-village-dhamrai-pottery-industry-most-renowned-village-pottery-bangladesh-there-177090409.jpg"
                alt="Skilled artisan at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-heritage-red/80 to-heritage-orange/60"></div>
            </div>
            <div className="relative z-10 p-8 lg:p-12 text-white">
              <div className="mb-6">
                <span className="text-heritage-gold text-sm font-medium tracking-wide uppercase">
                  Master Craftspeople
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold mt-2 leading-tight">
                  Hands That Create
                  <br />
                  <span className="text-heritage-gold">Magic</span>
                </h2>
              </div>
              <p className="text-lg opacity-95 mb-8 leading-relaxed">
                Behind every masterpiece is an artisan whose skill transforms
                raw materials into treasures that last lifetimes.
              </p>
            </div>
          </div>
        </div>

        {/* Unified CTA Section */}
        <div
          className={`relative -mt-20 z-20 transform transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-mega mx-4 lg:mx-12 p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-heritage-brown mb-4">
                Discover Authentic Bundelkhand Crafts
              </h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Support local artisans and bring home pieces of living heritage
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-accent-hover text-white font-semibold px-8 py-3 rounded-full shadow-elegant group"
                >
                  Explore Collection
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-terracotta hover:bg-terracotta  hover:text-white rounded-full px-8 py-3"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Support Artisans
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full animate-pulse"></div>
      <div
        className="absolute bottom-20 left-10 w-16 h-16 border border-heritage-gold/30 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/3 left-1/4 w-2 h-2 bg-heritage-gold rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-white/40 rounded-full animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>
    </div>
  );
};

export default NewBanner;
