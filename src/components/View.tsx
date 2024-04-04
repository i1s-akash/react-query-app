import React from "react";
import { Typography, Grid, Card, CardContent, Box } from "@mui/material";
import { fetchProducts } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../product.interface";

const View: React.FC = () => {
  const { data, status, error } = useQuery<any>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (status === "pending")
    return <Typography align="center">Loading...</Typography>;
  if (status === "error")
    return <Typography align="center">{error?.message}</Typography>;

  return (
    <Box maxHeight={750} overflow="auto">
      <Grid container spacing={2}>
        {data &&
          data?.products?.length > 0 &&
          data?.products?.map((product: Product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4}>
              <Card style={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography>{product.description}</Typography>
                  <Typography>Price: {product.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default View;
