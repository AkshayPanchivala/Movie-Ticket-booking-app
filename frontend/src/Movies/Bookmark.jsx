import React, { useEffect, useState } from "react";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { IconButton } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { createbookmark, getbookmarkbyuser } from "../api-helpers/api-helper";
function Bookmark(props) {
  const [bookmark, setbookmark] = useState(false);
  const handleBookmarkClick = (movieId, movietitle) => {
    createbookmark(movieId, movietitle).then(setbookmark(!bookmark));
  };

  return (
    <>
      {!bookmark ? (
        <IconButton
          // variant="plain"
          // color="neutral"
          style={{ color: bookmark ? "black" : "neutral", marginBottom: "0px" }}
          size="sm"
          onClick={() => handleBookmarkClick(props.id, props.name)}
        >
          <BookmarkBorderRoundedIcon />
        </IconButton>
      ) : (
        <IconButton>
          <BookmarkIcon />
        </IconButton>
      )}
    </>
  );
}

export default Bookmark;
