import React, { FC } from "react";
import { Button } from "@mui/material";
import { ProductTypes } from "../App";
import { Wrapper } from "./Product.styles";

type Props = {
	product: ProductTypes;
	addToCart: (clickedItem: ProductTypes) => void;
};

const Product: FC<Props> = ({ product, addToCart }) => {
	return (
		<Wrapper>
			<img src={product.image} alt={product.title} />
			<div>
				<h3>{product.title}</h3>
				<p>{product.description}</p>
				<h3>${product.price}</h3>
			</div>
			<Button onClick={() => addToCart(product)}>Add to Cart</Button>
		</Wrapper>
	);
};

export default Product;
