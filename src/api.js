const API_URL = "https://dummyjson.com";
const DEFAULT_LIMIT = 12;
let cuisinesCache = null;

async function request(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }
  return response.json();
}

export async function getRecipes({
  q = "",
  cuisine = "",
  skip = 0,
  limit = DEFAULT_LIMIT,
} = {}) {
  const query = q.trim().toLowerCase();

  const data = await request(
    `${API_URL}/recipes?limit=0`
  );

  let filtered = data.recipes;

  if (query) {
    filtered = filtered.filter((recipe) => {
      const name = recipe.name.toLowerCase();
      const words = name.split(/\s+/);

      return words.some((_, index) =>
        words.slice(index).join(" ").startsWith(query)
      );
    });
  }

  if (cuisine) {
    filtered = filtered.filter(
      (recipe) =>
        (recipe.cuisine || "").toLowerCase() ===
        cuisine.toLowerCase()
    );
  }

  return {
    recipes: filtered.slice(skip, skip + limit),
    total: filtered.length,
  };
}

export async function getCuisines() {
  if (cuisinesCache) {
    return cuisinesCache;
  }

  const data = await request(`${API_URL}/recipes?limit=0`);
  cuisinesCache = [
    ...new Set(data.recipes.map((recipe) => recipe.cuisine).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b));

  return cuisinesCache;
}

export function randomSkip(total) {
  const pageCount = Math.ceil(total / DEFAULT_LIMIT);
  if (pageCount <= 1) {
    return 0;
  }
  return Math.floor(Math.random() * pageCount) * DEFAULT_LIMIT;
}

export async function getRandomRecipe() {
  const data = await request(`${API_URL}/recipes?limit=1`);
  const total = data.total;
  const randomId = Math.floor(Math.random() * total) + 1;
  const recipe = await request(`${API_URL}/recipes/${randomId}`);
  return recipe;
}
