import React from 'react';

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="page-header">
      <div className="header-top">
        <div className="header-brand">
          <span className="brand-dot" />
          <span className="brand-name">
            Кулинарная коллекция
          </span>
        </div>

        <button
          id="theme-toggle"
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label="Переключить тему"
          title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>

      <h1 className="page-title">
        Каталог <span className="title-accent">рецептов</span>
      </h1>

      <p className="subtitle">
        Находите идеи для завтрака, обеда и ужина.
        Более 50 проверенных рецептов со всего мира.
      </p>
    </header>
  );
}