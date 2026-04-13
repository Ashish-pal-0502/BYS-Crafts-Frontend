// import React from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; //
// import { Carousel } from "react-responsive-carousel";

// const ProductDetailsCarousel = ({ images }) => {
//   return (
//     <div className="w-full max-w-[1360px] mx-auto sticky top-40">
//       <Carousel
//         infiniteLoop={true}
//         showIndicators={false}
//         showStatus={false}
//         thumbWidth={60}
//         className="productCarousel"
//       >
//         {images?.map((img, index) => (
//           <div
//             key={index}
//             className="w-full h-[280px] md:h-[300px] mx-auto  lg:h-full"
//           >
//             <img
//               src={img}
//               alt={`Image ${index + 1}`}
//               className="w-full h-full object-cover "
//               style={{ borderRadius: "0" }}
//             />
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default ProductDetailsCarousel;


import React, { useState } from "react";

const ProductDetailsCarousel = ({ images }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      {/* MAIN IMAGE */}
      <div className="bg-[#e9e1d3] rounded-2xl overflow-hidden h-[420px] flex items-center justify-center">
        <img
          src={images?.[active]}
          className="w-full h-full object-cover"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-3 mt-4">
        {images?.map((img, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            className={`w-20 h-20 rounded-md overflow-hidden border cursor-pointer ${
              active === i ? "border-black" : "border-gray-200"
            }`}
          >
            <img src={img} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsCarousel;