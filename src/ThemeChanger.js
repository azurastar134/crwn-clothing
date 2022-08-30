import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const ThemeChanger = () => {
  const [themeState, setThemeState] = useState(false);

  useEffect(() => {
    const getTheme = localStorage.getItem("Theme");
    if (getTheme === "dark") {
      setThemeState(true);
    }
  }, []);

  useEffect(() => {
    if (themeState) {
      localStorage.setItem("Theme", "dark");
      document.body.classList.add("dark-mode");
    } else {
      localStorage.setItem("Theme", "light");
      document.body.classList.remove("dark-mode");
    }
  }, [themeState]);

  return (
    <div>
      <IconButton
        sx={{
          "&:hover": {
            backgroundColor: "rgb(255, 0, 0, 0.2)",
            transition: "all 0.5s ease-in",
          },
        }}
        className="icon-button"
        style={{ marginTop: "16px", transition: "ease-in-out 0.5s" }}
        onClick={() => {
          setThemeState(!themeState);
        }}
      >
        {themeState ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </div>
  );
};

export default ThemeChanger;
