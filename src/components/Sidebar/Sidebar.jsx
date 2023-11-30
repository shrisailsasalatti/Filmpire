import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyles from "./styles";
//import { Upcoming } from "@mui/icons-material";
import { useGetGenresQuery } from "../../services/TMDB";
import { useDispatch, useSelector } from "react-redux";

import genreIcons from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

//const blackLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxb8A7Ra_XhFcf845bg1ksefJliQSTlVsmA&usqp=CAU";
  
const whiteLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzpnqH7Kxlp__Jl7PDIqWKYJFSEqlLyH75XA&usqp=CAU";

 const blackLogo = "https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png" 

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const Sidebar = ({ setMobileOpen }) => {
  const {genreIdOrCategoryName} = useSelector((state)=> state.currentGenreOrCategory)
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  useEffect(()=>{
    setMobileOpen(false)
  },[genreIdOrCategoryName])
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? blackLogo : whiteLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            {/* <ListItem onClick={()=>dispatch(selectGenreOrCategory(value))} button> */}
            <ListItem
              onClick={() => {
                const payload = value; // Replace this with your actual payload
                // console.log("Payload:", payload);
                dispatch(selectGenreOrCategory(payload));
              }}
              button
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  className={classes.genreImage}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItem
                onClick={() => {
                  const payload = id; // Replace this with your actual payload
                  dispatch(selectGenreOrCategory(payload));
                }}
                button
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    className={classes.genreImage}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
