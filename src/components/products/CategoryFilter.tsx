'use client'

import { categories } from '@/data/products'

interface CategoryFilterProps {
    selectedCategory: string
    onCategoryChange: (category: string) => void
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="w-full overflow-x-auto hide-scrollbar py-2">
            <div className="flex gap-3 px-1 min-w-max">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${selectedCategory === category.id
                                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-dark-900 shadow-glow-gold'
                                : 'bg-dark-800/50 text-dark-300 border border-dark-700 hover:border-primary-500/30 hover:text-white'
                            }`}
                    >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
