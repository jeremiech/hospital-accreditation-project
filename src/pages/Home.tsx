import { useState } from "react";
import Navbar from "@/components/Navbar";

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <h1>Vite + React</h1>
      <div className="card">
        <button
          className="ui button"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default Home;
