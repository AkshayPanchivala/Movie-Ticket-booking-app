import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { getUpcommingmovie } from "../api-helpers/api-helper";

export default function UpcomingMovie() {
  const [movie, Setmovie] = React.useState("");
  React.useEffect(() => {
    getUpcommingmovie().then((res) => {
      Setmovie(res);
    });
  }, []);

  return (
    <>
      {console.log(movie)}
      {movie &&
        movie.map((e) => (
          <Box sx={{ minHeight: 350 }}>
            <Card
              variant="outlined"
              sx={(theme) => ({
                width: 300,
                gridColumn: "span 2",
                flexDirection: "row",
                flexWrap: "wrap",
                resize: "horizontal",
                overflow: "hidden",
                gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
                transition: "transform 0.3s, border 0.3s",
                "&:hover": {
                  borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                  transform: "translateY(-2px)",
                },
                "& > *": { minWidth: "clamp(0px, (360px - 100%) * 999,100%)" },
              })}
            >
              <AspectRatio
                variant="soft"
                sx={{
                  flexGrow: 1,
                  display: "contents",
                  "--AspectRatio-paddingBottom":
                    "clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))",
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  maxWidth: 200,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <div>
                    <Typography level="h2" sx={{ fontSize: "md" }} mb={0.5}>
                      <Link
                        href="#container-responsive"
                        overlay
                        underline="none"
                        sx={{
                          color: "text.primary",
                          "&.Mui-focusVisible:after": { outlineOffset: "-4px" },
                        }}
                      >
                        {e.title}
                      </Link>
                    </Typography>
                    <Typography level="body2">{e.original_language}</Typography>
                  </div>
                  <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    sx={{ ml: "auto", alignSelf: "flex-start" }}
                  >
                    <FavoriteBorderRoundedIcon color="danger" />
                  </IconButton>
                </Box>

                <AspectRatio ratio="3/4">
                  <img
                    alt=""
                    src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                  />
                </AspectRatio>
                <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
                  <Avatar variant="soft" color="neutral">
                    Y
                  </Avatar>
                  <div>
                    <Typography level="body2">Designed by</Typography>
                    <Typography fontWeight="lg" level="body2">
                      Nature itself
                    </Typography>
                  </div>
                </Box>
              </Box>
            </Card>
          </Box>
        ))}
    </>
  );
}
