import { Page } from "rakkasjs";
import { api } from "../../convex/_generated/api";
import { useConvexQuery } from "src/useConvexQuery";

const HomePage: Page = function HomePage() {
  const tasks = useConvexQuery(api.tasks.get);

  return (
    <main>
      {tasks && (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>{task.text}</li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default HomePage;