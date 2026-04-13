// import { Eye, Star } from "lucide-react";
// import React, { useState } from "react";

// const ProductReview = ({ initialRating, initialTotalReviews }) => {
//   const [rating, setRating] = useState(initialRating);
//   const [totalReviews, setTotalReviews] = useState(initialTotalReviews);

//   const renderStars = () => {
//     return [...Array(5)].map((_, i) => {
//       const starValue = i + 1;
//       if (rating >= starValue) {
//         // full star
//         return <Star key={i} className="h-5 w-5 fill-current text-accent" />;
//       } else if (rating >= starValue - 0.5) {
//         // half star
//         return (
//           <Star
//             key={i}
//             className="h-5 w-5 text-accent"
//             style={{
//               fill: "url(#half-gradient)",
//             }}
//           />
//         );
//       } else {
//         // empty star
//         return <Star key={i} className="h-5 w-5 text-gray-300" />;
//       }
//     });
//   };

//   return (
//     <div className="flex flex-col items-start gap-1 ">
//       <div className="md:flex items-center md:space-x-4 mb-4 ">
//         <div className="flex items-center space-x-1 mb-2 md:mb-0 relative">
//           <svg width="0" height="0">
//             <defs>
//               <linearGradient id="half-gradient">
//                 <stop offset="50%" stopColor="#facc15" />
//                 <stop offset="50%" stopColor="transparent" />
//               </linearGradient>
//             </defs>
//           </svg>

//           {/* {renderStars()}

//           <span className="text-sm text-muted-foreground ml-2">
//             {rating.toFixed(1)} ({totalReviews} reviews)
//           </span> */}

//           <div className="flex items-center gap-2 mt-2">
//   <div className="flex items-center text-yellow-500">
//     {renderStars()}
//   </div>
//   <span className="text-sm text-gray-600">
//     {rating.toFixed(1)} ({totalReviews} reviews)
//   </span>
// </div>
//         </div>
//         {/* Optional: recent views */}
//         {/* <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//           <Eye className="h-4 w-4" />
//           <span>2,340 people viewed this recently</span>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default ProductReview;


import { Star } from "lucide-react";

const ProductReview = ({ initialRating, initialTotalReviews }) => {
  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
    ));
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex">{renderStars()}</div>
      <span className="text-sm text-gray-600">
        {initialRating} ({initialTotalReviews} reviews)
      </span>
    </div>
  );
};

export default ProductReview;