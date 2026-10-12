import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { MENU_URL } from "../api";

function DishDetailPage() {
    const { id } = useParams();

    const {
        data: dishes,
        isLoading,
        error,
    } = useFetch(MENU_URL);

    if (isLoading) {
        return (
            <main className="simple-page">
                <div className="page-card">
                    <p>Loading dish details...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="simple-page">
                <div className="page-card">
                    <p>Could not load dish details: {error}</p>

                    <Link className="back-link" to="/">
                        ← Back to menu
                    </Link>
                </div>
            </main>
        );
    }

    const dish = dishes.find(
        (item) => item.id === Number(id)
    );

    if (!dish) {
        return (
            <main className="simple-page">
                <div className="page-card">
                    <h1>Dish not found</h1>
                    <p>No dish exists with ID #{id}.</p>

                    <Link className="back-link" to="/">
                        ← Back to menu
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="simple-page">
            <div className="page-card dish-detail-card">
                <div className="detail-heading">
                    <div>
                        <p className="detail-label">Dish #{dish.id}</p>
                        <h1>{dish.name}</h1>
                    </div>

                    {!dish.available && (
                        <span className="sold-out-badge">
                            Sold out
                        </span>
                    )}
                </div>

                <div className="detail-row">
                    <span>Category</span>
                    <strong>{dish.category}</strong>
                </div>

                <div className="detail-row">
                    <span>Price</span>
                    <strong className="detail-price">
                        Rs. {dish.price.toFixed(2)}
                    </strong>
                </div>

                <div className="detail-row">
                    <span>Availability</span>
                    <strong>
                        {dish.available ? "Available" : "Currently unavailable"}
                    </strong>
                </div>

                {dish.available && (
                    <Link className="order-detail-button" to="/order">
                        Order this dish
                    </Link>
                )}

                <Link className="back-link" to="/">
                    ← Back to menu
                </Link>
            </div>
        </main>
    );
}

export default DishDetailPage;
