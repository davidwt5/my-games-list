import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GameCard from "./GameCard";
import config from "../config";

function Search() {
  const [searchParams] = useSearchParams();
  const [searchResult, setsearchResult] = useState(null);
  const searchTitle = searchParams.get("title");

  function urlGenerator({ domain = "", endpoint = "", queryStrings = {} }) {
    if (!domain) return "";
    let url = new URL(endpoint, domain);
    for (let key of Object.keys(queryStrings)) {
      url.searchParams.append(key, queryStrings[key]);
    }
    return url;
  }

  async function searchGames(title = "", offset = 0) {
    if (title.length < 3) {
      return Promise.reject(
        new Error("search query must be at least 3 characters long")
      );
    }

    const { giantBomb } = config;
    const url = urlGenerator({
      domain: "http://localhost:8080/",
      endpoint: "giantbomb.com/api/search",
      queryStrings: {
        api_key: giantBomb.apiKey,
        format: "json",
        field_list: "id,name,image",
        resources: "game",
        query: title,
        offset: offset,
        limit: 12,
      },
    });
    const response = await fetch(url);
    return response.json();
  }

  useEffect(() => {
    searchGames(searchTitle)
      .then((res) => setsearchResult(res))
      .catch((e) => setsearchResult(e));
  }, []);

  if (searchResult === null) {
    return <p>loading</p>;
  } else if (searchResult instanceof Error) {
    return <p>{searchResult.message}</p>;
  } else {
    console.log(searchResult);
    const gameCards = [];
    for (let result of searchResult.results) {
      gameCards.push(<GameCard key={result.id} game={result} />);
    }
    return <div>{gameCards}</div>;
  }
}

export default Search;
