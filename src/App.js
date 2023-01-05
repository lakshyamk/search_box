import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";


function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
 

  useEffect(() => {
   
      const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/Usertable"
      );
      setPosts(response.data);
      setLoading(false);
       
    };
    const timer = setTimeout(() => {
      loadPosts();
    }, 1000);
    }, []);
return (
    <div className="App">
      <h1>React Search</h1>
      <input
        style={{ width: "30%", height: "25px" }}
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      {loading ? (
        <h4>Loading ...</h4>
      ) : (
        posts
          .filter((value) => {
            if (searchTitle === "") {
              return false;
            } 
            else if (
              value.title.toLowerCase().includes(searchTitle.toLowerCase()) && searchTitle.length>=3
            ) {

              return value;
            }
            
          })
          .map((item) => <h5 key={item.id}>{item.title}</h5>)
      )}
    </div>
  );
}

export default App;