import type { SavedRecipe, NewRecipe, RecipePatch } from "./recipes.types";

const KEY = "saved-recipes";

const read = (): SavedRecipe[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as SavedRecipe[];
  } catch {
    return [];
  }
};

const write = (rows: SavedRecipe[]) => 
  localStorage.setItem(KEY, JSON.stringify(rows));

// ---------------------------------------------------------------------------
// Your saved recipes, on json-server. The half we are allowed to write to.
//
// Four functions, four HTTP verbs. Note what they are NOT: they are not React.
// They know nothing about hooks or components. Arguments in, promises out.
// ---------------------------------------------------------------------------

// WORKED EXAMPLE — read.
export const getRecipes = async (): Promise<SavedRecipe[]> => {
  return read();
};

// WORKED EXAMPLE — delete.
// Study these two and TODO 4 and TODO 5 are the same shape with a different verb.
export const deleteRecipe = async (id: string): Promise<{ id: string }> => {
  write(read().filter((r) => r.id !== id));
  return { id };
};

// TODO 4 — Create.
export const createRecipe = async (recipe: NewRecipe): Promise<SavedRecipe> => {
  const row: SavedRecipe = { ...recipe, id: crypto.randomUUID() };
  write([...read(), row]);
  return row;
};

//
//   POST /recipes  + the recipe object as the body
//
// json-server replies 201 with the saved object, and it has assigned an `id`.
// Return the server's copy, not the one you sent — note the types say so:
// you pass a NewRecipe (no id) and get back a SavedRecipe (id).

// TODO 5 — Update part of a recipe.
export const updateRecipe = async ({ id, ...patch }: RecipePatch): Promise<SavedRecipe> => {
  const rows = read().map((r) => (r.id === id ? { ...r, ...patch } : r));
  write(rows);
  
  const updated = rows.find((r) => r.id === id);
  if (!updated) {
    throw new Error(`Recipe with id ${id} not found`);
  }
  return updated;
};

//
//   PATCH /recipes/<id>  + only the fields that changed
//
// PATCH, not PUT. PUT replaces the whole object, so a PUT missing `title`
// would wipe the title. RecipePatch is `{ id } & Partial<...>` for exactly
// this reason: the id says which row, the rest are optional.