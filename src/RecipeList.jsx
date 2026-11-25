import React from 'react';
import RecipeCard from './RecipeCard.jsx';

export default function RecipeList({
  recipes,
  loading,
  error,
  onRetry,
  onDetails
}) {
  if (loading) {
    return (
      <section
        className="recipes-grid"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="state-message loading-state">
          <span className="spinner" aria-hidden="true" />
          <p>Загрузка…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="recipes-grid" aria-live="polite">
        <div className="state-message error-state">
          <h2>Не удалось загрузить рецепты</h2>
          <p>Проверьте подключение к интернету или попробуйте позже.</p>
          <p>{error}</p>
          <button
            className="retry-button"
            type="button"
            onClick={onRetry}
          >
            Повторить
          </button>
        </div>
      </section>
    );
  }

  if (!recipes.length) {
    return (
      <section className="recipes-grid" aria-live="polite">
        <div className="state-message empty-state">
          <h2>Ничего не найдено</h2>
          <p>Попробуйте изменить поисковый запрос или выбрать другую кухню.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="recipes"
      className="recipes-grid"
      aria-live="polite"
      aria-busy="false"
    >
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDetails={onDetails}
        />
      ))}
    </section>
  );
}