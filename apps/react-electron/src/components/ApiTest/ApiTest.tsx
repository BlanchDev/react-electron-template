import { useEffect, useState } from "react";
import { type User } from "@app/shared"; // The power of sharing types!
import { api } from "src/lib/api";

function ApiTest() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // As soon as you type .get(), routes from Elysia should be suggested
      const { data, error } = await api.user.me.get();

      if (error) {
        console.error("An error occurred:", error);
      } else if (data?.success) {
        // When you access data.data, you should see fields like 'username', 'stats', etc.
        setUser(data.data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h1>Hello, {user.username}!</h1>
      <p>Role: {user.role}</p>
      <div style={{ border: "1px solid #333", padding: 10, marginTop: 10 }}>
        <h3>Statistics</h3>
        <p>Projects: {user.stats.projects}</p>
        <p>Fixed bugs: {user.stats.bugsFixed}</p>
      </div>

      <button
        onClick={() =>
          api.user["update-status"].post({
            status: "coding",
            mood: "focused",
          })
        }
      >
        Update Status (Check Console)
      </button>
    </div>
  );
}

export default ApiTest;
