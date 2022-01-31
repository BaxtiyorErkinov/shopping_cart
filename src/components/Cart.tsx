import React, { FC } from "react";
import CartItem from "./CartItem";
import { Wrapper } from "./Cart.styles";
import { ProductTypes } from "../App";

type Props = {
	cartItems: ProductTypes[];
	addToCart: (clickedItem: ProductTypes) => void;
	removeFromCart: (id: number) => void;
};

const Cart: FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
	const totalSumOfCart = (items: ProductTypes[]) =>
		items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

	return (
		<Wrapper>
			<h3>Your Cart</h3>
			{cartItems.length === 0 ? <p>No Item in cart</p> : null}
			{cartItems.map((item) => (
				<CartItem
					key={item.id}
					item={item}
					addToCart={addToCart}
					removeFromCart={removeFromCart}
				/>
			))}
			<h3>Total: ${totalSumOfCart(cartItems).toFixed(2)}</h3>
		</Wrapper>
	);
};

export default Cart;
