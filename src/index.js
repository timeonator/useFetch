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

  const result = { loading, data, error };
  return result;
}

function App() {
  const { loading, data, error } = useFetch("api.github.com/users/timeonator");
  if (loading) return <h1>loading ...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  return (
    <div>
      <pre>{JSON.stringify(data)}</pre>
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
