import React from "react";
import ButtonAppBar from "./pages";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ButtonAppBar />
        {/* <p>{!data ? "Loading..." : data}</p> */}
      </header>
    </div>
  );
}

export default App;