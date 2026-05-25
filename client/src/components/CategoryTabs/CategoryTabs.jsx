import './CategoryTabs.css'

function CategoryTabs({ categories, activeCategory, onSelect }) {
  return (
    <div className="category-tabs">
      <div className="category-tabs__scroll">
        <button
          className={`category-tabs__item ${activeCategory === 'all' ? 'category-tabs__item--active' : ''}`}
          onClick={() => onSelect('all')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            className={`category-tabs__item ${activeCategory === cat._id ? 'category-tabs__item--active' : ''}`}
            onClick={() => onSelect(cat._id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryTabs
