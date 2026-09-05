import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, onToggleFavorite, onDelete }) {
  // TODO: if recipes.length === 0, render a friendly empty-state message
  //       (e.g., "No recipes match this filter.").
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg font-medium">No recipes match this filter.</p>
        <p className="text-sm">Try clearing your filters or adding a new recipe!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* TODO: map over recipes and render a <RecipeCard /> for each.
          - Pass recipe, onToggleFavorite, onDelete as props.
          - Use recipe.id as the key. */}
          {recipe.map((recipes) => (
            <RecipeCard
            key={recipes.id}
            {...recipes}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
            />
          ))}
    </div>
  );
}
