import React from "react"
import {Link} from "react-router-dom";

export default function Navbar(props) {
    return (
        <div className="navbar--container">
            <h1 className="navbar--title">
                Find your movie
            </h1>
              <Link to="/mywatchlist" className="links--watchlist">
                <p>My Watchlist</p>    
              </Link>   
        </div>
    ) 
}