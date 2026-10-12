import { useState } from "react";
import MenuList from "../components/MenuList";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { MENU_URL, IS_DEMO } from "../api";

function MenuPage() {
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 400);

    const {
        data: dishes,
        isLoading,
        error,
    } = useFetch(MENU_URL);

    if (isLoading) {
        return (
            <main className="page-container">
                <p className="status-message">Loading menu...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="page-container">
                <p className="error-message">
                    Could not load menu: {error}
                </p>
            </main>
        );
    }

    const filteredDishes = dishes.filter((dish) =>
        dish.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    return (
        <main className="page-container">
            <header className="page-header">
                <h1>CampusEats Menu</h1>
                <p>Choose your favourite campus meal.</p>
                {IS_DEMO && <p className="status-message">Demo menu. Live API is not configured.</p>}
            </header>

            <div className="search-container">
                <input
                    className="search-input"
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search dishes..."
                />
            </div>

            <MenuList dishes={filteredDishes} />
        </main>
    );
}

export default MenuPage;
