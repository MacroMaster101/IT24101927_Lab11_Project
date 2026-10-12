import { useState } from "react";

function OrderPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        qty: 1,
    });

    const [errors, setErrors] = useState({});
    const [done, setDone] = useState(false);

    function validate(values) {
        const newErrors = {};

        if (values.name.trim().length < 2) {
            newErrors.name = "Name too short";
        }

        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (Number(values.qty) < 1) {
            newErrors.qty = "Quantity must be at least 1";
        }

        return newErrors;
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const foundErrors = validate(form);
        setErrors(foundErrors);

        if (Object.keys(foundErrors).length === 0) {
            setDone(true);
        }
    }

    if (done) {
        return (
            <main className="simple-page">
                <div className="success-card">
                    <h1>Order received!</h1>
                    <p>Thanks, {form.name}! Your order has been submitted.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="simple-page">
            <form className="order-form" onSubmit={handleSubmit} noValidate>
                <h1>Place an Order</h1>
                <p>Enter your details below.</p>

                <div className="form-group">
                    <label htmlFor="name">Name</label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />

                    {errors.name && (
                        <span className="form-error">{errors.name}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />

                    {errors.email && (
                        <span className="form-error">{errors.email}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="qty">Quantity</label>

                    <input
                        id="qty"
                        name="qty"
                        type="number"
                        value={form.qty}
                        onChange={handleChange}
                    />

                    {errors.qty && (
                        <span className="form-error">{errors.qty}</span>
                    )}
                </div>

                <button className="order-button" type="submit">
                    Place order
                </button>
            </form>
        </main>
    );
}

export default OrderPage;