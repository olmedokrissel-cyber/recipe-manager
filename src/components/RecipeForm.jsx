import { useState } from "react";

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert"];

export default function RecipeForm({ onAdd }) {
  // TODO: create controlled state for title, category, and time.
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Breakfast");
  const [time, setTime] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: reject if title is empty (after .trim()).
    // TODO: call onAdd({ title, category, time: Number(time) || 0 }).
    // TODO: clear the form fields.
    if (!after.trim() || !time) return;
    onAdd({
      title,
      category,
      time,
    })
    
    setTitle("");
    setCategory("");
    setTime("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 shadow p-4 grid grid-cols-1 md:grid-cols-4 gap-3"
    >
      {/* TODO: title input (text) — must be controlled */}
      <label>Title:</label>
      <input
        type="text"
        placeholder="Recipe title"
        className="input input-bordered md:col-span-2"
      />

      {/* TODO: category dropdown — must be controlled. Map over CATEGORIES for the options. */}
      <select className="select select-bordered">
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        <option value="">Select category</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
            </option>
        ))}
      </select>

      {/* TODO: time input (number) — must be controlled */}
      <input
        type="number"
        placeholder="Time (min)"
        min="0"
        className="input input-bordered"
        value={time}
        onChange={(e) => setTime(e.terget.value)}
      />

      <button type="submit" className="btn btn-primary md:col-span-4">
        Add Recipe
      </button>
    </form>
  );
}
