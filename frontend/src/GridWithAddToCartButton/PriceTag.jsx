
import React from "react";
import { Typography, Stack, useTheme } from "@mui/material";

export function formatPrice(value, opts = {}) {
  const { locale = "en-US", currency = "USD" } = opts;
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: "currency",
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

export const PriceTag = (props) => {
  const { price, currency, salePrice, rootProps, priceProps, salePriceProps } =
    props;
  const theme = useTheme();

  return (
    <Stack spacing={1} {...rootProps}>
      <Price isOnSale={!!salePrice} textProps={priceProps} theme={theme}>
        {formatPrice(price, {
          currency,
        })}
      </Price>
      {salePrice && (
        <SalePrice {...salePriceProps} theme={theme}>
          {formatPrice(salePrice, {
            currency,
          })}
        </SalePrice>
      )}
    </Stack>
  );
};

const Price = (props) => {
  const { isOnSale, children, textProps, theme } = props;
  const defaultColor = theme.palette.mode === "light" ? "gray.700" : "gray.400";
  const onSaleColor = theme.palette.mode === "light" ? "gray.400" : "gray.700";
  const color = isOnSale ? onSaleColor : defaultColor;

  return (
    <Typography
      component="span"
      variant="body1"
      fontWeight="medium"
      color={color}
      sx={{
        textDecoration: isOnSale ? "line-through" : "none",
        ...textProps,
      }}
    >
      {children}
    </Typography>
  );
};

const SalePrice = (props) => {
  const { children, theme } = props;

  return (
    <Typography
      component="span"
      variant="body1"
      fontWeight="semibold"
      color={theme.palette.mode === "light" ? "gray.800" : "gray.100"}
      {...props}
    >
      {children}
    </Typography>
  );
};
