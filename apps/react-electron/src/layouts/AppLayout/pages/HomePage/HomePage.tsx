import { useEffect, useState } from "react";
import { elapi } from "../../../../lib/elapi";
import ApiTest from "src/components/ApiTest/ApiTest";

function HomePage() {
  const [count, setCount] = useState<number>(21);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      const savedCount = await elapi.count.get();
      setCount(savedCount);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleIncrement = async () => {
    const newCount = count + 1;
    setCount(newCount);

    await elapi.count.set(newCount);
  };

  const handleDecrement = async () => {
    const newCount = count - 1;
    setCount(newCount);

    await elapi.count.set(newCount);
  };

  const handleReset = async () => {
    setCount(21);
    await elapi.count.reset();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Electron Template</h1>
      <div style={{ fontSize: "4rem", fontWeight: "bold" }}>{count}</div>
      <button
        onClick={handleIncrement}
        style={{ padding: "10px 20px", fontSize: "1.2rem", cursor: "pointer" }}
      >
        Increase (+1)
      </button>
      <button
        onClick={handleDecrement}
        style={{
          padding: "10px 20px",
          fontSize: "1.2rem",
          cursor: "pointer",
          marginLeft: "10px",
        }}
      >
        Decrease (-1)
      </button>
      <button
        onClick={handleReset}
        style={{
          padding: "10px 20px",
          fontSize: "1.2rem",
          cursor: "pointer",
          marginLeft: "10px",
        }}
      >
        Reset
      </button>
      <p>
        (Note: The number is preserved and continues from the last value when
        the application is closed and reopened.)
      </p>
      <h2>Don't forget to check that package.json versions are up to date</h2>

      <ApiTest />
    </div>
  );
}

export default HomePage;
