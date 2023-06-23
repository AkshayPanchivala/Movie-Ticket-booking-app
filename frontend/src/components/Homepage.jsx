import React from "react";
import { Container, Stack, Box, Typography, Button } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import Movies from "../Movies/Movies";

export default function Homepage() {
  return (

      <>
        <Container>
          <Stack
            alignItems="center"
            spacing={{ xs: 8, md: 10 }}
            py={{ xs: 20, md: 5 }}
            direction={{ xs: "column", md: "row" }}
          >
            <Stack flex={1} spacing={{ xs: 5, md: 10 }}>
              <Typography
                variant="h2"
                sx={{
                  lineHeight: 1.1,
                  fontWeight: 600,
                  fontSize: { xs: "3xl", sm: "4xl", lg: "6xl" },
                }}
              >
                <Box
                  component="span"
                  position="relative"
                  _after={{
                    content: "''",
                    width: "full",
                    height: "30%",
                    position: "absolute",
                    bottom: 1,
                    left: 0,
                    bgcolor: "red.400",
                    zIndex: -1,
                  }}
                >
                  Gaddar 2
                </Box>
                <br />
              </Typography>
              <Typography color="gray.500">
                During the Indo-Pakistani War of 1971, Tara Singh returns to
                Pakistan in order to bring back his son Charanjeet, in the
                background of an anti-India campaign, "Crush India", in
                Pakistan. In the first film, set in 1947, a Sikh truck driver,
                Tara Singh, falls in love with a Muslim girl, Sakeena.
              </Typography>
              <Stack
                spacing={{ xs: 4, sm: 6 }}
                direction={{ xs: "column", sm: "row" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  fontWeight="normal"
                  color="inherit"
                  as={NavLink}
                  to={"/movies"}
                >
                  View All movies
                </Button>
              </Stack>
            </Stack>
            <Box
              flex={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="relative"
              width="100%"
            >
              <Box
                position="relative"
                height={350}
                borderRadius="2xl"
                boxShadow="2xl"
                width="100%"
                overflow="hidden"
              >
                <Button
                  aria-label="Play Button"
                  variant="ghost"
                  sx={{
                    "&:hover": { bgcolor: "transparent" },
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translateX(-50%) translateY(-50%)",
                    color: "white",
                  }}
                ></Button>
                <Box
                  component="img"
                  alt="Gaddar 2"
                  src="https://static.spotboye.com/uploads/SINGLE_IMAGE_(9)_2021-10-15-6-34-18_thumbnail.jpg"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  borderRadius={3}
                  align="center"
                />
              </Box>
            </Box>
          </Stack>
          <Movies />
        </Container>
      </>
    
  );
}
