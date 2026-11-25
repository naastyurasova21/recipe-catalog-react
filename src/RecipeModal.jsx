import React, { useEffect, useRef } from 'react';

export default function RecipeModal({ recipe, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (recipe && !dialog.open) {
      dialog.showModal();
    } else if (!recipe && dialog.open) {
      dialog.close();
    }
  }, [recipe]);

  return (
    <dialog
      ref={dialogRef}
      className="recipe-dialog"
      aria-labelledby="dialog-title"
      onCancel={(event) => event.preventDefault()}
    >
      {recipe && (
        <div id="recipe-details">
          <button
            className="dialog-close"
            type="button"
            onClick={onClose}
          >
            Закрыть
          </button>

          <p className="eyebrow">
            {recipe.cuisine || 'Рецепт'}
          </p>

          <h2 id="dialog-title">{recipe.name}</h2>

          <img
            className="dialog-image"
            src={recipe.image}
            alt={recipe.name}
          />

          <div className="dialog-facts">
            <span>
              Подготовка: {recipe.prepTimeMinutes} мин.
            </span>
            <span>
              Приготовление: {recipe.cookTimeMinutes} мин.
            </span>
            <span>
              Порций: {recipe.servings ?? '—'}
            </span>
            <span>
              Калорий на порцию: {recipe.caloriesPerServing ?? '—'}
            </span>
          </div>

          <h3>Ингредиенты</h3>

          <ul className="detail-list">
            {(recipe.ingredients || ['Ингредиенты не указаны.'])
              .map((item, index) => (
                <li key={`${index}-${item}`}>{item}</li>
              ))}
          </ul>

          <h3>Приготовление</h3>

          <ol className="detail-list">
            {(recipe.instructions || ['Инструкция не указана.'])
              .map((step, index) => (
                <li key={`${index}-${step}`}>{step}</li>
              ))}
          </ol>
        </div>
      )}
    </dialog>
  );
}