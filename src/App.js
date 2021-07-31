
// import React from "react";
import './App.css';
import axios from 'axios';
import { 
  // useEffect, 
  useState 
} from 'react';
function App() {
  const [search, setSearch] = useState([])
  const [query, setQuery] = useState('');
  const [empty, setEmpty] = useState("Nothing is been searched right now")
  console.log(empty);

  // const [matches, setMatches] = useState([]);

  // useEffect(() => {
  //   const loadItems = async() => {
  //     const response = await  axios.get('https://hn.algolia.com/api/v1/search?query=?query=');
  //     console.log("result",response.data.hits);
  //     setSearch(response.data.hits)
  //   }
  //   loadItems();

  // },[])
  const onChangeHandler =(query) => {
    setQuery(query);
    // let word_match = [];
    if (query.length>0){
      // word_match = search.filter(ent=>{
      //   const regrex = new RegExp(`${query}`,"gi");
      //   return search.title.match(regrex); 
      // })
      // console("matches", word_match);
      // setMatches(word_match);]

      setEmpty(null);
      const loadAnItem = async() => {
        const response = await  axios.get(`https://hn.algolia.com/api/v1/search?query=${query}&tags=(story,poll)`);
        console.log(response.data.hits);
        setSearch(response.data.hits)
      }
      loadAnItem();
    } else {
      setEmpty("Nothing is been searched right now");
    }
    console.log(empty);
  }
  // console.log('ObjectKeys', Object.keys(search));
  // console.log('ObjectValues', Object.values(search));

  const searchItems = search.map((ent,index) => {
    const d = new Date(ent.created_at);
    // const time = `${d.getUTCHours()}:${d.getUTCMinutes()}`
    const time = `${d.toLocaleString()}`
    // console.log(d.getUTCHours()); // Hours
    // console.log(d.getUTCMinutes());
    // console.log(d.getUTCSeconds());
    // console.log(d.toLocaleString());
    return (
      <div key={index} className="search">
        <div className="search-header">
          <h3 className="title">{ent.title}</h3>
          {time && <div className="dateTime">{time}</div>}
        </div>
        {/* <p className="article">{ent.comment_text}</p> */}
        {/* <link className="url" href=""/> */}
        <div className="search-footer">
        <a className="url" href={ent.url}>{ent.url}</a>
          <div className="points">scored: {ent.points} points by <span className="author">{ent.author}</span></div>
        </div>
      </div>
    );
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
        <div className="results">
          <h2>Results:</h2>
          <div>{query && searchItems}</div>
          <div>{!query && 
            <div className="search">
              <div className="search-header">
                <h3 className="title">{empty}</h3>
              </div>
            </div>
          }</div>
        </div>
      </div>
    </div>
  );
}

export default App;
