import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = ({ product }) => {
  return (
    <div className="bg-background/80 backdrop-blur-sm border-b border-heritage/20 mb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-1 text-xs md:text-sm text-muted-foreground">
          {/* Home */}
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />

          {/* Category */}
          <Link
            href={`/category/${product?.category?._id}`}
            className="hover:text-primary capitalize"
          >
            {product?.category?.name.replace(/-/g, " ")}
          </Link>
          <ChevronRight className="h-4 w-4" />

          {/* Product Name */}
          <span className="text-primary font-medium">{product?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
