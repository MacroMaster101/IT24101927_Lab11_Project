import { Link } from "react-router-dom";

function DishCard({ dish }) {
    return (
        <div className="dish-card">
            <div className="dish-card-header">
                <h3>{dish.name}</h3>

                {!dish.available && (
                    <span className="sold-out-badge">
                        Sold out
                    </span>
                )}
            </div>

            <p className="dish-category">{dish.category}</p>
            <p className="dish-price">
                Rs. {dish.price.toFixed(2)}
            </p>

            <Link
                className="details-link"
                to={`/dish/${dish.id}`}
            >
                View details
            </Link>
        </div>
    );
}

export default DishCard;