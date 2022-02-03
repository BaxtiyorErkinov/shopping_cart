import React, { FC } from "react";
import { IconButton, Badge, Button } from "@mui/material";
import { AddShoppingCart, Man, Woman, Diamond } from "@mui/icons-material";
import { ProductTypes } from "../App";
import "./Toolbar.css";
interface IToolbarProps {
	setOpen: (arg: boolean) => void;
	cartItems: ProductTypes[];
	getTotalItems: (cartItems: ProductTypes[]) => number;
	setCategory: (arg: string) => void;
}

const Toolbar: FC<IToolbarProps> = ({
	setOpen,
	getTotalItems,
	cartItems,
	setCategory,
}) => {
	return (
		<>
			<div className="container">
				<div className="left-side">
					<IconButton onClick={() => setCategory("")}>All</IconButton>
					<IconButton onClick={() => setCategory("men's clothing")}>
						<Man />
					</IconButton>
					<IconButton onClick={() => setCategory("women's clothing")}>
						<Woman />
					</IconButton>
					<IconButton onClick={() => setCategory("jewelery")}>
						<Diamond />
					</IconButton>
				</div>
				<div className="right-side">
					<IconButton onClick={() => setOpen(true)}>
						<Badge badgeContent={getTotalItems(cartItems)} color="error">
							<AddShoppingCart />
						</Badge>
					</IconButton>
				</div>
			</div>
		</>
	);
};

export default Toolbar;
