import { StrictMode, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function useFetch(uri) {
  const [data, setData] = useState([]);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(false);

  useEffect(() => {
    if (!uri) return;

    fetch(uri)
        .then((data) => data.json())
        .then(setData)
        .then(() => setLoading(false))
        .catch((error) => setError);   
  }, [uri]); 
    
    var result = { loading, data, error };
    return result;
}

function App() {
  const { loading, data, error } = useFetch("https://api.github.com/users/timeonator/repos"
    //   "https://api.github.com/users/timeonator"
      );
  if (loading) return <h1>loading ...</h1>;
  if (error) return <pre>Error: {JSON.stringify(error, null, 2)}</pre>;
  console.log(data);
  return (
    <div>
      <pre>Success: {JSON.stringify(data)}</pre>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

