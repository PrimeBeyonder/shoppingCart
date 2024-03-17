import { useState } from "react";
import { useQuery } from "react-query";

import { Drawer } from "@mui/material";
import LinearProgress from "@mui/material";
import Grid from "@mui/material";
import Badge from "@mui/material";


import { Wrapper, StyledButton } from "./App.style";
import Laoder from "./loader/Laoder";


export type CardItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}


const getProducts = async (): Promise<CardItemType[]> => {
  await (await fetch("https://fakestoreapi.com/products")).json();
}

const App = () => {
  const [cartOpne, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CardItemType[]);
  const { data, isLoading, error } = useQuery<CardItemType[]>(
    'products',
    getProducts
  );
  console.log(data);


  const getTotalItems = (items: CardItemType[]) => {
    items.reduce((ack: number, item) => ack + item.amount, 0)
  }

  const handleAddToCart = (clickedItem: CardItemType) => {
    setCartItems(prev => {
      const isItemInCard = prev.find(item => item.id === clickedItem.id);

      if (isItemInCard) {
        return prev.map(item => item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }]
    });
  };


  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => {
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CardItemType[])
    });
  };
  if (isLoading) return <Laoder />;
  if (error) return <div>Something Went Wrong....</div>
  return (
    <div></div>
  )
}

export default App
