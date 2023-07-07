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
