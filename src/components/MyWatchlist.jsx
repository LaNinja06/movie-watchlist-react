import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"

export default function MyWatchlist(props) {
    const watchlist = props.watchlist
    const removeFromWatchlist = props.removeFromWatchlist

  return (
    <div>
          {watchlist.length > 0 ?
            (
              watchlist.map((movie, index) => (
                <div className="watchlist--lists">
                  <img className='movie--poster' src={movie.Poster} />
                  <div className="watchlist--container">
                      <div className="movie--heading">
                        <h2 className='movie--title'>{movie.Title}</h2>
                        {/* <span className='movie--year'>{movie.Year}</span> */}
                        <p className='movie--rating'>⭐ {movie.imdbRating}</p>
                      </div>
                        <span className="movie--genre"> {movie.Genre}</span>
                        <p className='movie--actors'>{movie.Actors}</p>
                        <p className="movie--plot">{movie.Plot}</p>
                        <button className="btn--delete" onClick={() => removeFromWatchlist(movie)}>Delete from watchlist</button>
                </div>
                </div>
              ))
            )
            :
            (
              <div>
                <h2 className="watchlist--empty">
                  Your watchlist is looking a little empty...
                </h2>
                <p className="watchlist--addMovies">
                  <img src="../public/plus-icon.png" className="watchListIcon"/>
                  <Link to="/" className="links--home">
                    Let's add some movies!
                  </Link>
                </p>
              </div>
            )
          }
    </div>
  )
}
