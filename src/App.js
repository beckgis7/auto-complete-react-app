
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { map } from 'bluebird';
function App() {
  const [search, setSearch] = useState([])
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadItems = async() => {
      const response = await  axios.get('https://hn.algolia.com/api/v1/search_by_date?query=');
      console.log(response.data.hits);
      setSearch(response.data.hits)
    }
    loadItems();

  },[])
  const onChangeHandler =(query) => {
    setQuery(query);
    if (query.length>0){
      const loadAnItem = async() => {
        const response = await  axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&tags=story`);
        console.log(response.data.hits);
        setSearch(response.data.hits)
      }
      loadAnItem();

    }
  }
  const searchItems = Object.keys(search).map((ent,index) =>
    <li key={index}> {ent} </li>
  );
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
        </div>
      </div>
    </div>
  );
}

export default App;
