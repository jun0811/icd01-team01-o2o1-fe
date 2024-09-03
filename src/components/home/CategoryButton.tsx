import React from 'react'

interface CategoryButtonProps {
  category: string
  isSelected: boolean
  onClick: () => void
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`mr-2 inline-block rounded-lg border px-4 py-2 ${
        isSelected ? 'bg-black text-white' : 'border-black text-black'
      }`}
    >
      {category}
    </button>
  )
}

export default CategoryButton
