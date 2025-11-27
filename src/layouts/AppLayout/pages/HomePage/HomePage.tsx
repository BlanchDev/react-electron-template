import { useEffect, useState } from "react";

function HomePage() {
  const [count, setCount] = useState<number>(21);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      const savedCount = await window.elapi.count.get();
      setCount(savedCount);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleIncrement = async () => {
    const newCount = count + 1;
    setCount(newCount);

    await window.elapi.count.set(newCount);
  };

  const handleDecrement = async () => {
    const newCount = count - 1;
    setCount(newCount);

    await window.elapi.count.set(newCount);
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
      <p>
        (Note: The number is preserved and continues from the last value when
        the application is closed and reopened.)
      </p>
      <h2>Don't forget to check that package.json versions are up to date</h2>
    </div>
  );
}

export default HomePage;
