import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const MovieList = () => {
  // state = {
  //   items: [],
  //   search: "",
  // };
  const [itemsState, setItemsState] = useState({ items: [] });
  const [searchState, setSearchState] = useState({ search: "" });
  const getMovies = () => {
    //async await
    const loadData = async () => {
      const res = await axios.get(
        `https://jsonmock.hackerrank.com/api/movies?Year=${searchState.search}`
      );
      console.log(res.data.data);
      setItemsState({ items: res.data.data });
    };

    loadData();
  };

  const changeHandler = (e) => {
    console.log(e.target.value);
    setSearchState({ search: e.target.value });
  };

  const { items } = itemsState;
  const itemsLength = itemsState.items.length;

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input
          type="number"
          className="large"
          placeholder="Enter Year eg 2015"
          data-testid="app-input"
          onChange={(e) => changeHandler(e)}
        />
        <button className="" data-testid="submit-button" onClick={getMovies}>
          Search
        </button>
      </section>
      <ul className="mt-50 styled" data-testid="movieList">
        {itemsLength ? (
          items.map((item) => {
            return (
              <li className="slide-up-fade-in py-10" key={item.imdbID}>
                {item.Title}
              </li>
            );
          })
        ) : (
          <div className="mt-50 slide-up-fade-in" data-testid="no-result">
            "No Results Found"
          </div>
        )}
      </ul>
    </div>
  );
};

export default MovieList;
