"use client"

import { ProductCard } from "@/components/product-card"
import { products } from "@/data/products" // Assuming products data is imported from a separate file

export function ProductGrid() {
  return (
    <div className="container px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}
