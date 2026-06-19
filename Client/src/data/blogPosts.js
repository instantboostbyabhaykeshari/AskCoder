export const BLOG_CATEGORIES = [
  'All',
  'Artificial Intelligence',
  'Web Development',
  'Backend',
  'Databases',
  'Career',
  'Projects',
  'Trending Tech',
];

export const blogPosts = [
  {
    slug: 'how-ai-is-changing-software-development',
    title: 'How AI Is Changing Software Development',
    category: 'Artificial Intelligence',
    excerpt:
      'From code completion to automated testing, AI tools are reshaping how developers write, review, and ship software.',
    author: 'Abhay',
    date: '2026-03-18',
    readTime: '6 min read',
    tags: ['AI', 'Productivity', 'Developer Tools'],
    content: [
      'Artificial intelligence is no longer a futuristic concept for software teams. It is already embedded in everyday workflows through code assistants, documentation generators, and smarter debugging tools.',
      'Developers are using AI to reduce repetitive work, explore unfamiliar APIs faster, and draft test cases. The biggest gains come when AI supports human judgment instead of replacing it.',
      'Teams that adopt AI thoughtfully focus on three areas: faster prototyping, better code review coverage, and improved onboarding for junior developers. The goal is not to write less code blindly, but to spend more time on architecture, product decisions, and quality.',
      'As these tools mature, the developers who thrive will be the ones who learn how to prompt effectively, validate outputs critically, and integrate AI into reliable engineering practices.',
    ],
  },
  {
    slug: 'best-react-practices-for-modern-apps',
    title: 'Best React Practices for Modern Apps',
    category: 'Web Development',
    excerpt:
      'Practical patterns for building maintainable React applications with clearer state, better components, and smoother performance.',
    author: 'Abhay',
    date: '2026-03-12',
    readTime: '7 min read',
    tags: ['React', 'JavaScript', 'Frontend'],
    content: [
      'Modern React development is less about memorizing APIs and more about structuring applications so they stay understandable as they grow.',
      'Start by keeping components focused. Presentational components should render UI, while hooks and service modules handle data fetching and business logic. This separation makes testing and refactoring much easier.',
      'State should live at the lowest useful level. Lifting state too early creates unnecessary coupling, while global state for everything creates hard-to-trace bugs. Use local state first, then context or Redux only when multiple distant components truly need the same data.',
      'Performance improvements should be measured, not guessed. Profile first, then apply memoization, lazy loading, or list virtualization where bottlenecks actually exist.',
      'Consistent folder structure, typed props where possible, and predictable naming conventions will save more time than any single optimization trick.',
    ],
  },
  {
    slug: 'why-nodejs-is-still-popular-for-backend-apis',
    title: 'Why Node.js Is Still Popular for Backend APIs',
    category: 'Backend',
    excerpt:
      'Node.js remains a strong choice for REST APIs thanks to its ecosystem, JavaScript consistency, and fast iteration speed.',
    author: 'Abhay',
    date: '2026-03-05',
    readTime: '5 min read',
    tags: ['Node.js', 'Express', 'APIs'],
    content: [
      'Node.js continues to power a large share of backend services because it lets full-stack teams work in one language while still accessing a mature package ecosystem.',
      'For API development, Express.js and similar frameworks make it straightforward to define routes, middleware, authentication, and validation layers. That speed matters especially for startups and portfolio projects.',
      'Node.js performs well for I/O-heavy workloads such as authentication services, content APIs, and real-time features. It is not the best fit for every problem, but it is an excellent default for many web backends.',
      'When combined with JWT authentication, ORM tools, and structured project layouts, Node.js backends are easy to deploy, maintain, and extend over time.',
    ],
  },
  {
    slug: 'how-to-build-better-full-stack-projects',
    title: 'How to Build Better Full-Stack Projects',
    category: 'Projects',
    excerpt:
      'A practical approach to planning, building, and presenting full-stack projects that stand out in portfolios and interviews.',
    author: 'Abhay',
    date: '2026-02-26',
    readTime: '8 min read',
    tags: ['Full Stack', 'Portfolio', 'Next.js'],
    content: [
      'Strong full-stack projects solve a clear problem, not just demonstrate a list of technologies. Start with a focused use case such as a Q&A platform, task manager, or developer blog.',
      'Define your core features early: authentication, CRUD operations, search, and a polished UI. Build the happy path first, then add validation, error states, and responsive design.',
      'Separate frontend and backend concerns cleanly. REST APIs with predictable endpoints make the project easier to explain and extend. Document your routes and database schema.',
      'Polish matters. Loading states, empty states, form validation, and consistent styling signal that you understand real product development—not just tutorial completion.',
      'Finally, write a strong README with setup steps, architecture notes, and screenshots. Recruiters and interviewers often review projects quickly, so clarity wins.',
    ],
  },
  {
    slug: 'mysql-vs-mongodb-which-one-should-you-choose',
    title: 'MySQL vs MongoDB: Which One Should You Choose?',
    category: 'Databases',
    excerpt:
      'A balanced comparison of relational and document databases to help you pick the right data store for your next project.',
    author: 'Abhay',
    date: '2026-02-18',
    readTime: '6 min read',
    tags: ['MySQL', 'MongoDB', 'SQL'],
    content: [
      'Choosing between MySQL and MongoDB depends on your data shape, consistency needs, and query patterns—not hype.',
      'MySQL is a strong fit when relationships matter. Applications with users, posts, tags, comments, and join tables benefit from relational modeling, constraints, and predictable transactions.',
      'MongoDB works well for flexible schemas, rapid prototyping, and document-shaped data where nested structures are common and relationships are simpler.',
      'For learning and many production web apps, SQL databases remain an excellent default because they teach foundational data modeling skills that transfer across systems.',
      'The best engineers understand both paradigms and choose based on requirements rather than trends.',
    ],
  },
  {
    slug: 'how-to-prepare-for-developer-interviews',
    title: 'How to Prepare for Developer Interviews',
    category: 'Career',
    excerpt:
      'A structured plan for reviewing fundamentals, building confidence, and presenting your projects effectively in technical interviews.',
    author: 'Abhay',
    date: '2026-02-10',
    readTime: '7 min read',
    tags: ['Career', 'Interviews', 'Learning'],
    content: [
      'Interview preparation works best when it is consistent and project-driven, not a last-minute cram session.',
      'Review core topics relevant to your stack: JavaScript fundamentals, React lifecycle and hooks, HTTP and REST, authentication basics, and database queries. Explain these concepts out loud as if teaching someone else.',
      'Your projects are evidence of real ability. Be ready to walk through architecture decisions, trade-offs, bugs you fixed, and features you would add next.',
      'Practice coding problems at a moderate pace, but do not ignore system thinking. Employers often care as much about how you reason through problems as whether you memorize algorithms.',
      'Finally, prepare questions for the interviewer. Curiosity about team practices, code quality, and growth opportunities leaves a strong impression.',
    ],
  },
  {
    slug: 'top-programming-trends-developers-should-know',
    title: 'Top Programming Trends Developers Should Know',
    category: 'Trending Tech',
    excerpt:
      'From AI-assisted development to modern full-stack frameworks, these trends are shaping how developers build software in 2026.',
    author: 'Abhay',
    date: '2026-02-02',
    readTime: '5 min read',
    tags: ['Trends', 'AI', 'Web Development'],
    content: [
      'The developer landscape changes quickly, but a few trends are clearly influencing how teams build and ship software right now.',
      'AI-assisted coding tools are becoming standard in daily workflows. Developers use them for scaffolding, refactoring suggestions, and documentation drafts.',
      'Full-stack frameworks like Next.js continue to grow because they simplify routing, rendering strategies, and deployment for React applications.',
      'API-first design remains essential. Even frontend-heavy products depend on clean backend contracts, authentication, and predictable data models.',
      'Cloud deployment, containerization, and platform services lower the barrier to launching real projects—which means developers who can build complete products end-to-end are more valuable than ever.',
    ],
  },
];

export const getBlogPostBySlug = (slug) =>
  blogPosts.find((post) => post.slug === slug);

export const getRelatedPosts = (post, limit = 3) =>
  blogPosts
    .filter(
      (item) => item.slug !== post.slug && item.category === post.category
    )
    .slice(0, limit);

export const formatBlogDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const getFeaturedBlogPosts = (limit = 3) => blogPosts.slice(0, limit);
