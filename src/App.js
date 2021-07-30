
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
  console.log('ObjectKeys', Object.keys(search));
  console.log('ObjectValues', Object.values(search));
  const searchItems = Object.keys(search).map((ent,index) =>
    <li key={index}> {ent} </li>
  );

  // const searchItems = search.map((ent,index) =>
  //   <li key={Object.keys(index)}> {Object.values(ent)} </li>
  // );

  // const searchItems = search.map((ent,index) =>
  //     <li key={index}> {ent} </li>
  //   );

  return (
    <div className="App">
      <div className="container">
        <input className="col-md-12 input" type="text" placeholder="Search ..." 
        onChange={e => onChangeHandler(e.target.value)}
        value={query} 
        />
        <div>
          <ul>{searchItems}</ul>

          {/* <ul>{search && search.map((now,i)=>{
                <li key={i}> {now} </li>
          })}</ul> */}

          {/* <ul>{matches && matches.map((now,i)=>{
                return(<li key={i}> {now} </li>)
          })}</ul> */}
        </div>
      </div>
    </div>
  );
}

export default App;
