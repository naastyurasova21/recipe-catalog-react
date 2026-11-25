import React from 'react';

export default function RecipeCard({ recipe, onDetails }) {
  return (
    <article className="recipe-card">
      <img
        className="recipe-image"
        src={recipe.image}
        alt={recipe.name}
        loading="lazy"
      />

      <div className="recipe-content">
        <div className="card-topline">
          <span className="cuisine">{recipe.cuisine}</span>
          <span className="rating">Рейтинг: {recipe.rating}</span>
        </div>

        <h2>{recipe.name}</h2>
        <p className="difficulty">{recipe.difficulty}</p>

        <div className="recipe-meta">
          <span>Подготовка: {recipe.prepTimeMinutes} мин.</span>
          <span>Готовка: {recipe.cookTimeMinutes} мин.</span>
        </div>

        <div className="tags">
          {(recipe.tags || []).map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <button
          className="details-button"
          type="button"
          onClick={() => onDetails(recipe)}
        >
          Подробнее
        </button>
      </div>
    </article>
  );
}