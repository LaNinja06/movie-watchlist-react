import React from "react"
import { useState } from 'react'

export default function Home(props) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [error, setError] = useState("")
    const [addedMovies, setAddedMovies] = useState([])

    const searchMovies = async (e) => {
        e.preventDefault()
        
        const error = "Unable to find what you are looking for. Please try another search."
        const apiKey = "7a331dbc"
        const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
      
        const res = await fetch(url)
        const data = await res.json()
        
               
        if (data.Response === "False") {
            setResults([])
            setError(error)
            setQuery("")
        }  else {
            setError("")
            // Fetching more details for each movie
            const moviesWithMoreDetails = await Promise.all(
              data.Search.map(async (movie) => {
                const movieUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`
                const movieRes = await fetch(movieUrl)
                const movieData = await movieRes.json()
                return { ...movie, ...movieData}
              })
            )
            setResults(moviesWithMoreDetails)
            console.log(results)
        }
    }

    const handleReset = () => {
        setQuery("")
        setResults([])
        setError("")
    }

    const handleAddToWatchlist = (movie) => {
      const newAddedMovies = [...addedMovies, movie]
      setAddedMovies(newAddedMovies)
      props.addToWatchList(movie)
    }

    const isMovieAdded = (movie) => {
      return addedMovies.some((addedMovie) => addedMovie.imdbID === movie.imdbID)
    }

    return (
        <>  
            <div className="form--container">
              <form className="form" onSubmit={searchMovies}>
                  <label className="label" htmlFor="query"></label>
                    <div className="inputSearchBtn">
                      <input 
                          type="text" 
                          className="form--input" 
                          placeholder="i.e. Batman"
                          name="searchMovies"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                      />
                        <button className="form--button">Search</button>
                    </div>
              </form>
            </div>
          
            <div>
                {error ? (
                  <p className="error">{error}</p>
                ) : results.length === 0 ? (
                    <h3 className="startExploring">
                      <img src="/filmIcon.png" className="movieIcon"/>
                      Start Exploring!
                    </h3>
                ) : (
                   results.map((movie) => (
                     <div key={movie.imdbID} className="movie--lists">
                       <img className='movie--poster' src={movie.Poster} alt={movie.Title} /> 
                            <div className="movie--container">
                                <div className="movie--heading">
                                <h2 className='movie--title'>{movie.Title}</h2>
                                {/* <span className='movie--year'>{movie.Year}</span> */}
                                <p className='movie--rating'>⭐ {movie.imdbRating}</p>
                                </div>
                                <span className="movie--genre"> {movie.Genre}</span>
                                <p className='movie--actors'>{movie.Actors}</p>
                                <p className="movie--plot">{movie.Plot}</p>

                                {isMovieAdded(movie) ? 
                                  (<button className="btn--added" disabled>Added to Watchlist</button>) 
                                  :
                                  (<button className="btn--add" onClick={() => handleAddToWatchlist(movie)}>
                                      Add to watchlist
                                    </button>
                                  )
                                }
                            </div>  
                      </div>
                    ))
                  )
                }
            </div> 
            {/* <footer className="footer">
              Copyright 2023 GC
            </footer>    */}
        </>
    )
}
