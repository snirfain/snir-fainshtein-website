import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Download, Star, TrendingUp, Sparkles, Tag } from "lucide-react";

export default function ProductCard({ product, onAddToCart }) {
  const currencySymbol = product.currency === 'ILS' ? '₪' : product.currency === 'USD' ? '$' : '€';
  
  // Check if product is new (created in last 30 days)
  const isNew = product.created_at && 
    (new Date() - new Date(product.created_at)) / (1000 * 60 * 60 * 24) < 30;
  
  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group relative">
      <div className="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 p-4"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Download className="h-16 w-16" />
          </div>
        )}
        
        {/* Badges - Top Right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.featured && (
            <Badge className="bg-orange-400 text-white hover:bg-orange-500 shadow-lg">
              <Star className="h-3 w-3 ml-1 fill-white" />
              מומלץ
            </Badge>
          )}
          {product.bestseller && (
            <Badge className="bg-purple-600 hover:bg-purple-700 shadow-lg text-white">
              <TrendingUp className="h-3 w-3 ml-1" />
              הכי נמכר
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-green-500 hover:bg-green-600 shadow-lg">
              <Sparkles className="h-3 w-3 ml-1" />
              חדש!
            </Badge>
          )}
        </div>
        
        {/* Badges - Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_digital && (
            <Badge className="bg-blue-500 hover:bg-blue-600 shadow-lg text-white">
              <Download className="h-3 w-3 ml-1" />
              דיגיטלי
            </Badge>
          )}
          {hasDiscount && (
            <Badge className="bg-red-500 hover:bg-red-600 shadow-lg animate-pulse">
              <Tag className="h-3 w-3 ml-1" />
              -{discountPercent}%
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-2">
          <Badge variant="outline">{getCategoryName(product.category)}</Badge>
        </div>
        
        <Link to={`${createPageUrl("ProductDetails")}?id=${product.id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-blue-800 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-[#233071] mb-4 line-clamp-2">
          {product.short_description || product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            {hasDiscount && (
              <div className="text-sm text-gray-400 line-through mb-1">
                {currencySymbol}{product.original_price.toFixed(2)}
              </div>
            )}
            <div className="text-2xl font-bold text-blue-800">
              {currencySymbol}{product.price.toFixed(2)}
            </div>
            {hasDiscount && (
              <div className="text-xs text-green-600 font-medium">
                חסוך {currencySymbol}{(product.original_price - product.price).toFixed(2)}
              </div>
            )}
          </div>
          
          <Button 
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ShoppingCart className="h-4 w-4 ml-2" />
            הוסף לעגלה
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function getCategoryName(category) {
  const categories = {
    'checklists': 'צ\'קליסטים',
    'templates': 'תבניות',
    'courses': 'קורסים',
    'consulting': 'ייעוץ',
    'other': 'אחר'
  };
  return categories[category] || category;
}