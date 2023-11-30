import React, { useRef } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import useStyles from './styles'
import { Actors, MovieInformation, Movies, NavBar, Profile } from './'
import useAlan from "./Alan";

const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef()
    useAlan();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
        <Routes>
          {/* Movies route */}
          <Route path="/" element={<Movies />} />
          <Route path="/approved" element={<Movies />} />
        </Routes>
        
        {/* Other routes */}
        <Routes>
          <Route path="/movie/:id" element={<MovieInformation />} />
        </Routes>
        <Routes>
          <Route path="/actors/:id" element={<Actors />} />
        </Routes>
        <Routes>
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
      <div ref={alanBtnContainer}/>
    </div>
  );
};

export default App;
