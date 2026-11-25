import React from 'react';

export default function Toolbar({
  query,
  setQuery,
  cuisine,
  setCuisine,
  cuisines,
  onRefresh,
  onRandom,
  randomLoading,
  loading
}) {
  return (
    <section className="toolbar" aria-label="Фильтры рецептов">
      <label className="search-field" htmlFor="search">
        <span>Поиск рецепта</span>
        <input
          id="search"
          type="search"
          placeholder="Например, pasta"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <label className="select-field" htmlFor="cuisine">
        <span>Кухня</span>
        <select
          id="cuisine"
          value={cuisine}
          onChange={(event) => setCuisine(event.target.value)}
          disabled={loading}
        >
          <option value="">Все кухни</option>
          {cuisines.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <div className="toolbar-actions">
        <button
          id="refresh"
          className="refresh-button"
          type="button"
          onClick={onRefresh}
          disabled={loading}
        >
          Обновить
        </button>

        <button
          id="random"
          className="random-button"
          type="button"
          onClick={onRandom}
          disabled={randomLoading}
          title="Случайный рецепт"
          aria-label="Случайный рецепт"
        >
          {randomLoading ? '⏳' : '🎲'}
        </button>
      </div>
    </section>
  );
}