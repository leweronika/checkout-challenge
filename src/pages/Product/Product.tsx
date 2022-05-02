import React, { useState } from "react";
import { Box, CircularProgress, Grid, Pagination, useTheme } from "@mui/material";
import ProductImage from "assets/mando.jpg";
import { useAppSelector } from "utils/hooks";
import { ProductDescription, ReviewContainer } from "components/product";

const noOfReviews = 5;

export const Product = (): JSX.Element  => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const theme = useTheme();
  const product = useAppSelector((state) => state.product.product); 

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
  };

  return (
    <Grid
      container
      justifyContent="center"
      sx={{ 
        bgcolor: theme.palette.background.default,
        rowGap: 3,
        minHeight: '100vh',
        height: '100%',
        width: '100%',
      }}
    >
      {product ? (
        <>
          <Grid
            container
            item
            sx={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.palette.primary.main,
              maxHeight: "1000",
              width: "100%",
              p: 6
            }}
            columnGap={6}
            rowGap={2}
          >
            <Grid item xs={10} md={6} xl={3}sx={{ display: 'flex', justifyContent :'flex-end'}}>
              <Box
                component="img"
                sx={{
                  height: "auto",
                  width: "100%",
                  maxWidth: '800px'
                }}
                alt="Mandalorian and Baby Yoda Lego Minifigures"
                src={ProductImage}
              />
            </Grid>
            <Grid item xs={10} md={4}>
              <ProductDescription
                name={product.name}
                seller={product.seller}
                description={product.description}
                stock={product.stock}
                averageRating={product.averageRating}
              />
            </Grid>
          </Grid>
          <Grid container item xs={10} md={6} sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <ReviewContainer reviews={product.reviews.slice((pageNumber-1)*noOfReviews, (pageNumber-1)*noOfReviews + noOfReviews)} />
            <Pagination count={Math.ceil(product.reviews.length / noOfReviews)} color="primary" onChange={handlePageChange}/>
          </Grid>
        </>
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};
