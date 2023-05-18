import React, {useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';

import MyWatchlist from "./components/MyWatchlist";
import Navbar from "./components/Navbar"
import Home from "./components/Home"

export default function App() {
  const [watchlist, setWatchlist] = useState([])  
  console.log(watchlist)

  useEffect(() => {
    const storedWatchlist = JSON.parse(
        localStorage.getItem("movie-favorites")
      ) 
      if (storedWatchlist) {
        setWatchlist(storedWatchlist)
      }
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem("movie-favorites", JSON.stringify(items))
  }
  
  const addToWatchList = (movie) => {
    const newFavoriteList = [...watchlist, movie]
    setWatchlist(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
}

  const removeFromWatchlist = (movie) => {
      const updatedWatchlist = watchlist.filter(
        (watchlist) => watchlist.imdbID !== movie.imdbID
      )
      setWatchlist(updatedWatchlist)
      console.log(updatedWatchlist)
      saveToLocalStorage(updatedWatchlist)
}
  
  return (
    <div>
      <Navbar handleReset />
      <Routes>
        <Route exact path="/"
          element={<Home addToWatchList={addToWatchList} watchlist={watchlist}/>}>
        </Route>
        <Route path="/mywatchlist"
          element={<MyWatchlist watchlist={watchlist} removeFromWatchlist={removeFromWatchlist}/>}>
        </Route>
      </Routes>
    </div>
)}
