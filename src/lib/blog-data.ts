export interface BlogPost {
  title: string;
  slug: string;
  image: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "From Figma to Code: My Approach to Pixel-Perfect UIs",
    slug: "figma-to-code-pixel-perfect-uis",
    image: "/blogs/figma-to-code-pixel-perfect-uis.png",
    date: "April 3, 2025",
    category: "Frontend",
    excerpt:
      "Learn how to transform Figma designs into responsive and pixel-perfect websites while maintaining code quality and accessibility.",
    readTime: "5 min read",
    content: `As a full-stack developer with a strong focus on front-end precision, transforming Figma designs into responsive and pixel-perfect websites is one of the most satisfying parts of my workflow. In this blog post, I'm going to walk you through my step-by-step process that ensures design fidelity, responsiveness, and performance — all while keeping the codebase maintainable.

## 1. Understanding the Design Intent
Before I write a single line of code, I spend time inside Figma dissecting the layout:
- What's the typography scale?
- How do spacing and padding behave across components?
- What is the color system?
- How do breakpoints work in this design?

I often communicate with the designer (or sometimes, myself!) to clarify interactive elements, hover states, or missing mobile views.

## 2. Setting Up the Right Tech Stack
I usually stick to React (or Next.js) for front-end apps. My go-to stack includes:
- **Tailwind CSS** or **Styled Components** for styling
- **Framer Motion** for smooth animations
- **Jotai** or **Zustand** for simple state management

I also ensure tools like Prettier, ESLint, and Husky are in place from the start to maintain code quality.

## 3. Setting Up a Global Design System
I extract recurring Figma values (font sizes, line heights, spacing) and set them as:
- CSS variables
- Tailwind config tokens
- Theme objects (for Styled Components)

This step is *critical* for consistent design implementation.

## 4. Using Layout Grids and Dev Tools
I open the Figma file side-by-side with my browser and use layout grids and measurement tools.

For precision:
- I use Chrome DevTools or extensions like **PerfectPixel** to overlay the design.
- I zoom in, compare pixel-to-pixel, and tweak paddings/margins until it aligns perfectly.

## 5. Responsive Breakpoints
Designs often don't include *every* breakpoint, so I fill in the gaps logically:
- Mobile-first approach
- Use of \`clamp()\` for fluid typography
- Tailwind's responsive utilities or media queries if custom styling

## 6. Accessibility & Semantic HTML
Pixel-perfect doesn't mean you ignore the invisible stuff:
- Proper heading hierarchy (\`h1\` to \`h6\`)
- ARIA attributes when necessary
- \`alt\` text for images

I use Lighthouse audits and screen reader checks occasionally.

## 7. Final Polish & Animation
Once the static design is implemented, I:
- Add micro-interactions (hover effects, button feedback)
- Apply entry animations with Framer Motion
- Test across devices and browsers

This is where the UI starts to feel *alive*.

## Final Thoughts
Going from Figma to code is not just about copying dimensions and colors — it's about **understanding the design language** and **translating it responsibly** into interactive code. Pixel-perfection is a mindset, not a checkbox.

If you're just getting started, start small. Clone a simple Figma landing page, focus on margins, fonts, and responsiveness. You'll get better every time you do it.`,
  },
  {
    title: "Essential Techniques for Optimizing React Performance",
    slug: "essential-techniques-for-optimizing-react-performance",
    image: "/blogs/essential-techniques-for-optimizing-react-performance.png",
    date: "April 10, 2025",
    category: "React",
    excerpt:
      "Learn essential techniques to optimize your React applications, from preventing unnecessary re-renders to implementing lazy loading and code splitting.",
    readTime: "8 min read",
    content: `
React, with its component-based architecture and virtual DOM, provides a powerful and efficient way to build user interfaces. However, as your application grows in complexity, performance bottlenecks can creep in, leading to a sluggish user experience. Fear not, fellow developers! Optimizing your React application is an achievable goal, and this blog post will equip you with essential techniques to supercharge your UI.

## Understanding the Culprits: Why React Apps Can Slow Down

Before diving into solutions, it's crucial to understand why performance issues arise in React applications:

* **Unnecessary Re-renders:** This is often the biggest culprit. When a component re-renders, all its child components also re-render by default, even if their props haven't changed. This can lead to a cascade of unnecessary updates.
* **Inefficient Data Structures:** Working with large, complex data structures without proper optimization can lead to slow lookups and updates.
* **Expensive Computations:** Performing heavy calculations directly within the render cycle can block the main thread, causing UI freezes.
* **Large Component Trees:** Deeply nested component trees can increase the overhead of reconciliation (React's process of comparing the virtual DOM with the actual DOM).
* **Unoptimized Event Handlers:** Attaching numerous or computationally intensive event handlers can impact responsiveness.
* **Blocking Operations:** Performing synchronous operations (like heavy file processing or network requests without proper handling) in the main thread will freeze the UI.

Now, let's explore the strategies you can employ to optimize your React applications:

## 1. Mastering \`React.memo\`

This is your first line of defense against unnecessary re-renders.

**\`React.memo(Component, [arePropsEqual])\`:** This higher-order component for functional components provides similar functionality. It memoizes the rendering of the component and will only re-render if its props have changed. You can optionally provide a custom \`arePropsEqual\` function for more fine-grained control.

\`\`\`javascript
const MyFunctionalComponent = React.memo((props) => {
  // ... component rendering logic
}, (prevProps, nextProps) => prevProps.data === nextProps.data);
\`\`\`

## 2. Leveraging \`useCallback\` and \`useMemo\` Hooks

These hooks are essential for optimizing functional components by memoizing functions and values.

* **\`useCallback(callback, dependencies)\`:** Returns a memoized callback function. The callback will only be recreated if one of the dependencies has changed. This is crucial for preventing unnecessary re-renders of child components that receive callbacks as props.

    \`\`\`javascript
    const handleClick = useCallback(() => {
      // ... some logic
    }, [dependency1, dependency2]);

    // Pass handleClick as a prop to a child component
    <ChildComponent onClick={handleClick} />
    \`\`\`

* **\`useMemo(create, dependencies)\`:** Returns a memoized value. The \`create\` function will only re-run and the value will only be recalculated if one of the dependencies has changed. This is useful for expensive computations or creating expensive objects within the render cycle.

    \`\`\`javascript
    const expensiveValue = useMemo(() => {
      // Perform an expensive calculation based on dependencies
      return computeExpensiveValue(dependencyA, dependencyB);
    }, [dependencyA, dependencyB]);

    // Use expensiveValue in your component
    <div>{expensiveValue}</div>
    \`\`\`

## 3. Optimizing Data Structures

Choosing the right data structure can significantly impact performance, especially when dealing with large datasets.

* **Use Keys Effectively:** When rendering lists with \`map()\`, always provide a stable and unique \`key\` prop to each item. This helps React efficiently identify which items have changed, been added, or removed. Avoid using array indices as keys if the order of items can change.
* **Consider Immutable Data Structures:** Libraries like Immutable.js can help optimize change detection. When data is immutable, any change creates a new object instead of modifying the existing one. This makes it easier to detect if props have actually changed with a simple reference comparison.

## 4. Lazy Loading Components with \`React.lazy\` and \`Suspense\`

For applications with many routes or large components that are not immediately needed, lazy loading can significantly improve initial load time.

* **\`React.lazy(() => import('./MyComponent'))\`:** This function allows you to dynamically import components, loading them only when they are about to be rendered.
* **\`<Suspense fallback={<div>Loading...</div>}>\`:** This component wraps the lazily loaded component and displays a fallback UI (like a loading indicator) while the component is being loaded.

    \`\`\`javascript
    import React, { Suspense, lazy } from 'react';

    const MyLazyComponent = lazy(() => import('./MyComponent'));

    function MyPage() {
      return (
        <Suspense fallback={<div>Loading component...</div>}>
          <MyLazyComponent />
        </Suspense>
      );
    }
    \`\`\`

## 5. Code Splitting

Similar to lazy loading components, code splitting involves dividing your application's code into smaller bundles that can be loaded on demand. This reduces the initial bundle size and improves load time. Tools like Webpack and Parcel offer built-in support for code splitting.

## 6. Windowing or Virtualization for Large Lists

When rendering very long lists, rendering all items at once can be extremely inefficient. Windowing (or virtualization) techniques only render the items that are currently visible in the viewport, significantly improving performance. Libraries like \`react-window\` and \`react-virtualized\` provide efficient implementations of this pattern.

## 7. Debouncing and Throttling Event Handlers

For events that fire rapidly (like \`scroll\`, \`resize\`, or \`input\`), consider using debouncing or throttling to limit the frequency of your event handlers.

* **Debouncing:** Delays the execution of a function until a certain amount of time has passed without the event being triggered again.
* **Throttling:** Limits the execution of a function to a maximum of once per specified time interval.

Libraries like Lodash provide \`debounce\` and \`throttle\` functions.

## 8. Avoiding Inline Styles and Functions in Render

Defining styles and functions directly within the \`render\` method can lead to unnecessary re-renders because new object references are created on each render. Define styles as variables outside the component or use CSS classes. Define functions using \`useCallback\` or as class methods.

## 9. Profiling Your Application

React DevTools is an invaluable tool for identifying performance bottlenecks in your application. The Profiler tab allows you to record component interactions and analyze rendering performance, helping you pinpoint which components are re-rendering unnecessarily or taking too long to render.

## Conclusion

Optimizing React performance is an ongoing process, and the best strategies will depend on the specific needs of your application. By understanding the common causes of performance issues and implementing the techniques discussed in this blog post, you can significantly improve the responsiveness and overall user experience of your React applications. Remember to profile your application regularly to identify and address any emerging bottlenecks. Happy optimizing!`,
  },
  {
    title: "Managing Multiple GitHub Accounts on Windows: A Complete Guide",
    slug: "managing-multiple-github-accounts-on-windows",
    image: "/blogs/managing-multiple-github-accounts-on-windows.png",
    date: "April 17, 2025",
    category: "Git & GitHub",
    excerpt:
      "Learn how to efficiently manage multiple GitHub accounts on a single Windows machine using SSH keys and configuration files.",
    readTime: "6 min read",
    content: `Ah, juggling multiple GitHub accounts on a single Windows machine! It's a common scenario for developers working on personal projects, client work, or contributing to different organizations. Let's walk through how to set this up smoothly so you can push and pull code without constantly re-authenticating.

The key to managing multiple GitHub accounts lies in configuring SSH keys and leveraging the \`ssh-config\` file. This allows you to associate different SSH keys with different GitHub accounts, and then tell Git which key to use for which repository.

## Step 1: Generating SSH Keys for Each Account

First things first, you'll need a unique SSH key pair for each GitHub account you intend to use. If you already have keys, you can generate new ones to keep things clean.

1.  **Open Git Bash:** This provides a Unix-like environment on Windows, perfect for SSH key generation. You can usually find it in your Start Menu after installing Git.

2.  **Generate a new SSH key:** Use the \`ssh-keygen\` command. For each account, make sure to provide a descriptive filename to help you identify it later.

    \`\`\`bash
    ssh-keygen -t ed25519 -C "your_email@account1.com" -f ~/.ssh/id_ed25519_account1
    ssh-keygen -t ed25519 -C "your_email@account2.com" -f ~/.ssh/id_ed25519_account2
    # ... and so on for other accounts
    \`\`\`

    * \`-t ed25519\`: Specifies the EdDSA algorithm, a modern and secure choice. You can also use \`rsa\` if you prefer.
    * \`-C "your_email@account.com"\`: Adds a comment to the key, typically your email address associated with the GitHub account.
    * \`-f ~/.ssh/id_ed25519_account1\`: Specifies the filename for this key. Make sure to choose a name that clearly indicates the account.

3.  **Set a strong passphrase (optional but highly recommended):** You'll be prompted to enter a passphrase for each key. This adds an extra layer of security.

## Step 2: Adding SSH Keys to the SSH Agent

The SSH agent is a program that holds your private keys in memory, so you don't have to enter the passphrase every time you use them.

1.  **Start the SSH agent (if it's not already running):**

    \`\`\`bash
    eval "$(ssh-agent -s)"
    \`\`\`

2.  **Add your private keys to the agent:** Use the \`ssh-add\` command followed by the path to your private key files.

    \`\`\`bash
    ssh-add ~/.ssh/id_ed25519_account1
    ssh-add ~/.ssh/id_ed25519_account2
    # ... and so on
    \`\`\`

    If you set a passphrase, you'll be prompted to enter it for each key you add.

## Step 3: Configuring the \`ssh-config\` File

This is where the magic happens! The \`ssh-config\` file allows you to define different configurations for different hosts (in this case, \`github.com\`).

1.  **Open the \`config\` file:** Navigate to the \`.ssh\` directory in your user profile (\`C:\\Users\\YourUsername\\.ssh\`) and open the \`config\` file with a text editor. If the file doesn't exist, create it.

2.  **Add configurations for each GitHub account:** For each account, you'll define a \`Host\` alias and associate it with the corresponding SSH key.

    \`\`\`
    # Account 1
    Host github.com-account1
        Hostname github.com
        User git
        IdentityFile ~/.ssh/id_ed25519_account1

    # Account 2
    Host github.com-account2
        Hostname github.com
        User git
        IdentityFile ~/.ssh/id_ed25519_account2

    # ... and so on for other accounts
    \`\`\`

    * \`Host github.com-account1\`: This is an arbitrary alias you'll use in your Git repository URLs. Make it descriptive.
    * \`Hostname github.com\`: This specifies the actual GitHub server.
    * \`User git\`: This is the standard username for Git over SSH with GitHub.
    * \`IdentityFile ~/.ssh/id_ed25519_account1\`: This points to the private key file for this specific account.

## Step 4: Adding the Public Keys to Your GitHub Accounts

For each SSH key you generated, you need to add the corresponding public key to your respective GitHub account settings.

1.  **Copy the public key:** Open the \`.pub\` file for each key (e.g., \`id_ed25519_account1.pub\`) in a text editor and copy its entire content.

2.  **Add the public key to GitHub:**
    * Go to your GitHub account settings.
    * Click on "SSH and GPG keys."
    * Click on "New SSH key" or "Add SSH key."
    * Give your key a descriptive title so you know which machine and account it belongs to.
    * Paste the public key into the "Key" field.
    * Click "Add SSH key."
    * Repeat this process for each of your GitHub accounts and their corresponding public keys.

## Step 5: Updating Remote URLs in Your Git Repositories

Now, you need to update the remote URLs of your local Git repositories to use the aliases you defined in the \`ssh-config\` file.

1.  **Navigate to your local repository in Git Bash.**

2.  **Check the current remote URL:**

    \`\`\`bash
    git remote -v
    \`\`\`

    You'll likely see something like:

    \`\`\`
    origin  git@github.com:YourUsername/your-repo.git (fetch)
    origin  git@github.com:YourUsername/your-repo.git (push)
    \`\`\`

3.  **Update the remote URL to use the alias:** Replace \`github.com\` with the alias you created in your \`ssh-config\` for the appropriate account.

    For a repository associated with \`account1\`:

    \`\`\`bash
    git remote set-url origin git@github.com-account1:YourUsername1/your-repo.git
    \`\`\`

    For a repository associated with \`account2\`:

    \`\`\`bash
    git remote set-url origin git@github.com-account2:YourUsername2/another-repo.git
    \`\`\`

    **Important:** Make sure to replace \`YourUsername1\` and \`YourUsername2\` with the actual usernames of your respective GitHub accounts.

## Step 6: Testing Your Configuration

To verify that everything is set up correctly, try to connect to GitHub using SSH with each of your configured hosts.

\`\`\`bash
ssh -T git@github.com-account1
ssh -T git@github.com-account2
# ... and so on
\`\`\`

If the configuration is correct, you should see a message like:

\`\`\`
Hi YourUsername1! You've successfully authenticated, but GitHub does not provide shell access.
\`\`\`

Repeat this for each of your aliases.

**Now you're all set!** Git will now use the appropriate SSH key based on the hostname specified in the remote URL of your repository. You can seamlessly work with multiple GitHub accounts on your Windows system without any authentication headaches.

**Pro Tip:** When cloning a new repository, make sure to use the SSH URL with the correct alias right from the start:

\`\`\`bash
git clone git@github.com-account1:YourUsername1/new-repo.git
\`\`\`

By following these steps, you can effectively manage multiple GitHub identities on your Windows machine, keeping your personal and professional work separate and organized. Happy coding!`,
  },
  {
    title: "Real-Time Apps with Socket.IO: A Complete Guide (Node.js + React)",
    slug: "real-time-apps-with-socket-io-complete-guide",
    image: "/placeholder.svg",
    date: "August 21, 2025",
    category: "Socket.IO",
    excerpt:
      "From basics to production: events, rooms, auth, scaling with Redis, TypeScript types, and deployment tips for Socket.IO.",
    readTime: "12 min read",
    content: `Socket.IO makes real-time features approachable with a high-level API built on top of WebSocket + fallbacks. In this guide, we'll cover fundamentals, best practices, and production patterns you can ship today.

## Why Socket.IO (vs WebSocket)?
- Automatic reconnection + heartbeat
- Rooms & namespaces for broadcast patterns
- Binary support, acks, middlewares
- Cross-browser transport fallbacks
- Ecosystem (adapters, tooling)

If you need raw perf for streaming large binaries, vanilla WebSocket may win. For product features like chat, presence, notifications—Socket.IO is pragmatic and fast to build.

## Setup (Node.js server)
Install:

\`\`\`bash
npm i socket.io express cors
npm i -D typescript @types/node ts-node-dev
\`\`\`

Minimal server:

\`\`\`ts
// server.ts
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ["http://localhost:5173"], credentials: true },
});

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

  socket.on("ping", (data, ack) => {
    console.log("ping", data);
    ack?.({ ok: true, ts: Date.now() });
  });

  socket.on("disconnect", (reason) => {
    console.log("disconnected:", socket.id, reason);
  });
});

server.listen(3001, () => console.log("socket server on :3001"));
\`\`\`

## Client (React + Vite)
\`\`\`bash
npm i socket.io-client
\`\`\`

\`\`\`tsx
// App.tsx
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type ServerToClient = {
  // example: "notice": (msg: string) => void
};
type ClientToServer = {
  ping: (payload: { who: string }, ack?: (res: { ok: boolean; ts: number }) => void) => void;
};

export default function App() {
  const socketRef = useRef<Socket<ServerToClient, ClientToServer> | null>(null);
  const [status, setStatus] = useState("disconnected");
  const [lastAck, setLastAck] = useState<number | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:3001", {
      transports: ["websocket"],
      withCredentials: true,
      reconnectionAttempts: 5,
      timeout: 10000,
    });
    socketRef.current = socket;

    socket.on("connect", () => setStatus("connected"));
    socket.on("disconnect", () => setStatus("disconnected"));

    return () => socket.disconnect();
  }, []);

  const sendPing = () => {
    socketRef.current?.emit("ping", { who: "client" }, (res) => setLastAck(res.ts));
  };

  return (
    <div>
      <p>Status: {status}</p>
      <button onClick={sendPing}>Ping</button>
      {lastAck && <p>Last ack: {new Date(lastAck).toLocaleTimeString()}</p>}
    </div>
  );
}
\`\`\`

## Events, Acknowledgements, and Error Handling
- **Events**: free-form names, payloads are JSON or binary.
- **Acks**: pass a function as the last arg to receive a server response.
- **Errors**: prefer structured objects.

\`\`\`ts
// server
io.on("connection", (socket) => {
  socket.on("create:message", async (payload, ack) => {
    try {
      // ...persist
      ack?.({ ok: true, id: "123" });
      socket.to(payload.roomId).emit("message:new", payload);
    } catch (e) {
      ack?.({ ok: false, error: "DB_WRITE_FAILED" });
    }
  });
});
\`\`\`

## Rooms and Namespaces
- **Rooms**: lightweight channels per socket.
- **Namespaces**: separate logical endpoints (auth, rate limits, middleware).

\`\`\`ts
// rooms
io.on("connection", (socket) => {
  socket.on("room:join", (roomId) => socket.join(roomId));
  socket.on("room:leave", (roomId) => socket.leave(roomId));
  socket.on("chat:send", ({ roomId, text }) => {
    socket.to(roomId).emit("chat:new", { from: socket.id, text });
  });
});

// namespaces
const admin = io.of("/admin");
admin.use((socket, next) => {
  // verify admin token
  next();
});
admin.on("connection", (socket) => {
  socket.emit("admin:hello", { id: socket.id });
});
\`\`\`

## Authentication (JWT in handshake)
- Send token via \`auth\` or query.
- Verify in middleware before \`connection\`.

\`\`\`ts
// server auth
io.use(async (socket, next) => {
  const token = socket.handshake.auth?.token || socket.handshake.headers["x-auth-token"];
  try {
    // const user = verifyJWT(token as string)
    (socket as any).userId = "u_123";
    next();
  } catch {
    next(new Error("UNAUTHORIZED"));
  }
});

io.on("connection", (socket) => {
  // access with (socket as any).userId
});
\`\`\`

Client:

\`\`\`ts
io("http://localhost:3001", { auth: { token: "JWT_HERE" } });
\`\`\`

## CORS, Rate Limiting, and Safety
- Set explicit CORS origins.
- Throttle chatty events.
- Sanitize payloads and cap sizes.

\`\`\`ts
import rateLimit from "express-rate-limit";
// For HTTP endpoints; for WS, build a simple in-memory token bucket per socket.id
\`\`\`

## Scaling Horizontally (Redis Adapter)
To broadcast across multiple Node.js instances, add the Redis adapter.

\`\`\`bash
npm i @socket.io/redis-adapter ioredis
\`\`\`

\`\`\`ts
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "ioredis";

const pub = new createClient(process.env.REDIS_URL!);
const sub = new createClient(process.env.REDIS_URL!);
await Promise.all([pub.connect(), sub.connect()]);

io.adapter(createAdapter(pub, sub));
\`\`\`

Notes:
- Use **sticky sessions** on your load balancer or session affinity.
- Health-check Redis; auto-retry with backoff.

## TypeScript: Strongly-Typed Events
Define shared interfaces for event names and payloads:

\`\`\`ts
type ServerToClient = {
  "chat:new": (msg: { from: string; text: string }) => void;
};
type ClientToServer = {
  "chat:send": (input: { roomId: string; text: string }) => void;
  "room:join": (roomId: string) => void;
};

const ioServer = new Server<ClientToServer, ServerToClient>(server, { /* ... */ });
\`\`\`

## Presence and Heartbeats
Track online users with join/leave + \`disconnect\`. For durability, store presence in Redis with TTLs, refresh on \`ping\`.

## Deployment Tips
- Reverse proxy (Nginx) must support WebSocket upgrade (\`Upgrade\`, \`Connection\` headers).
- Enable sticky sessions with cookies or IP hash.
- Set timeouts: LB \u003e Node.js \u003e Socket.IO pingInterval.
- Consider autoscaling and Redis adapter.

## Common Pitfalls
- Missing sticky sessions: clients connect to different nodes, miss events.
- Overusing \`io.emit\`: prefer room-targeted emissions.
- Large payloads: chunk or move to HTTP upload + socket event for completion.
- Silent failures: always ack with status and errors.

## Example: Small Chat Flow
\`\`\`ts
// server
io.on("connection", (socket) => {
  socket.on("room:join", (roomId) => socket.join(roomId));
  socket.on("chat:send", ({ roomId, text }) => {
    const msg = { id: Date.now().toString(), from: socket.id, text };
    io.to(roomId).emit("chat:new", msg);
  });
});
\`\`\`

\`\`\`tsx
// client
socket.emit("room:join", "room-1");
socket.on("chat:new", (msg) => setMessages((m) => [...m, msg]));
socket.emit("chat:send", { roomId: "room-1", text: "hello" });
\`\`\`

## Final Thoughts
Socket.IO accelerates real-time product features without forcing you to reinvent reliability. Start small—events, rooms, acks—then add auth and scaling as your traffic grows.`,
  },
].sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
});
