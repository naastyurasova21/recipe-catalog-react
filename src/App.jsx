import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import { getCuisines, getRecipes, getRandomRecipe, randomSkip } from './api.js';

import Header from './Header.jsx';
import Toolbar from './Toolbar.jsx';
import RecipeList from './RecipeList.jsx';
import RecipeModal from './RecipeModal.jsx';

export default function App() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [randomLoading, setRandomLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');

    return saved || (
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    );
  });

  const requestId = useRef(0);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedQuery(query.trim()),
      600
    );

    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    getCuisines()
      .then(setCuisines)
      .catch((reason) =>
        console.warn('Не удалось загрузить список кухонь:', reason)
      );
  }, []);

  const load = useCallback(async () => {
    const currentRequest = ++requestId.current;

    setLoading(true);
    setError('');

    try {
      const result = await getRecipes({
        q: debouncedQuery,
        cuisine,
        skip,
        limit: 12
      });

      if (currentRequest !== requestId.current) return;

      setRecipes(result.recipes);
      setTotal(result.total);

    } catch (reason) {
      if (currentRequest !== requestId.current) return;

      console.error('Ошибка загрузки рецептов:', reason);

      setError(
        reason instanceof Error
          ? reason.message
          : 'Неизвестная ошибка'
      );

    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
      }
    }
  }, [debouncedQuery, cuisine, skip]);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const changeQuery = (value) => {
    setQuery(value);
    setSkip(0);
  };

  const changeCuisine = (value) => {
    setCuisine(value);
    setSkip(0);
  };

  const handleRefresh = () => {
    setSkip(randomSkip(total));
    setRefreshKey((value) => value + 1);
  };

  const handleRandom = async () => {
    setRandomLoading(true);

    try {
      setSelectedRecipe(await getRandomRecipe());

    } catch (reason) {
      console.error(
        'Не удалось загрузить случайный рецепт:',
        reason
      );

      window.alert(
        'Не удалось загрузить случайный рецепт. Проверьте интернет.'
      );

    } finally {
      setRandomLoading(false);
    }
  };

  return (
    <>
      <main className="container">

        <Header
          theme={theme}
          onToggleTheme={() =>
            setTheme((value) =>
              value === 'dark' ? 'light' : 'dark'
            )
          }
        />

        <Toolbar
          query={query}
          setQuery={changeQuery}
          cuisine={cuisine}
          setCuisine={changeCuisine}
          cuisines={cuisines}
          onRefresh={handleRefresh}
          onRandom={handleRandom}
          randomLoading={randomLoading}
          loading={loading}
        />

        <RecipeList
          recipes={recipes}
          loading={loading}
          error={error}
          onRetry={load}
          onDetails={setSelectedRecipe}
        />

      </main>

      <button
        id="scroll-top"
        className={`scroll-top${showScrollTop ? ' is-visible' : ''}`}
        type="button"
        aria-label="Наверх"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }
      >
        ↑
      </button>

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </>
  );
}