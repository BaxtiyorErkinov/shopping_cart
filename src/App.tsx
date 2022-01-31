import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFetching } from "./hooks/useFetching";
import { Drawer, LinearProgress, Grid, Badge } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { Wrapper, StyledButton } from "./App.styled";
import Product from "./components/Product";
import Cart from "./components/Cart";

export type ProductTypes = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

function App() {
  const [data, setData] = useState<ProductTypes[]>([]);
  const [openCart, setOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductTypes[]>([]);

  const [fetchProducts, isLoading, isError] = useFetching(async () => {
    await axios
      .get<ProductTypes[]>("https://fakestoreapi.com/products")
      .then((res) => setData(res.data));
  });

  const addToCart = (clickedItem: ProductTypes) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const getTotalItems = (items: ProductTypes[]) =>
    items.reduce((acc: number, items) => acc + items.amount, 0);

  const removeFormCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as ProductTypes[])
    );
  };

  console.log(data);
  useEffect((): void => {
    fetchProducts();
  }, []);

  if (isLoading) return <LinearProgress />;
  if (isError) return <div>Error 404</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={openCart} onClose={() => setOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={addToCart}
          removeFromCart={removeFormCart}
        />
      </Drawer>
      <StyledButton onClick={() => setOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((product) => (
          <Grid item xs={12} sm={4} key={product.id}>
            <Product product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
