import { Page } from "rakkasjs";
import { api } from "../../convex/_generated/api";
import { useConvexQuery } from "src/useConvexQuery";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";

function Content() {
  const messages = useConvexQuery(api.messages.getForCurrentUser);
  return <div>Authenticated content: {messages?.length}</div>;
}

const HomePage: Page = function HomePage() {
  const tasks = useConvexQuery(api.tasks.get);

  return (
    <main>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <Content />
        {tasks && (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>{task.text}</li>
          ))}
        </ul>
      )}
      </Authenticated>
      
    </main>
  );
};

export default HomePage;