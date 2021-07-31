
// import React from "react";
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
function App() {
  const [search, setSearch] = useState([])
  const [query, setQuery] = useState('');
  // const [matches, setMatches] = useState([]);

  useEffect(() => {
    const loadItems = async() => {
      const response = await  axios.get('https://hn.algolia.com/api/v1/search?query=?query=');
      console.log("result",response.data.hits);
      setSearch(response.data.hits)
    }
    loadItems();

  },[])
  const onChangeHandler =(query) => {
    setQuery(query);
    // let word_match = [];
    if (query.length>0){
      // word_match = search.filter(ent=>{
      //   const regrex = new RegExp(`${query}`,"gi");
      //   return search.title.match(regrex); 
      // })
      // console("matches", word_match);
      // setMatches(word_match);

      const loadAnItem = async() => {
        const response = await  axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=?query=${query}`);
        console.log(response.data.hits);
        setSearch(response.data.hits)
      }
      loadAnItem();

    }
  }
  // console.log('ObjectKeys', Object.keys(search));
  // console.log('ObjectValues', Object.values(search));

  const searchItems = search.map((ent,index) => {
    return (
    <div key={index} className="card">
      <div className="card-header">
        <h3 className="title">{ent.title}</h3>
        <div className="dateTime"> <span>{ent.created_at}</span>3 days ago</div>
      </div>
      <pre className="article">{ent.comment_text}</pre>
      <link className="url" href=""/>
      <a className="discussionUrl" href={ent.story_url}>Link ...</a>
    </div>);
  }

  // <li>{JSON.stringify(ent)}</li>
  );

  return (
    <div className="App">
      <div className="container">
        <input className="col-md-12 input" type="text" placeholder="Search ..." 
        onChange={e => onChangeHandler(e.target.value)}
        value={query} 
        />
        <div>{searchItems}</div>
        <div>
        
        </div>
      </div>
    </div>
  );
}

export default App;
