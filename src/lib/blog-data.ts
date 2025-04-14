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
    title: "Building Scalable Microservices with Node.js and Docker",
        slug: "building-scalable-microservices-with-nodejs-and-docker",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    date: "April 8, 2025",
    category: "DevOps",
    excerpt:
      "Learn how to architect and deploy scalable microservices using Node.js and Docker containers with practical examples and best practices.",
    readTime: "8 min read",
    content: `
Microservices architecture has become the go-to solution for building scalable, maintainable applications. In this comprehensive guide, we'll explore how to leverage Node.js and Docker to create robust microservices.

## Why Microservices?

Microservices offer several advantages:
- Independent deployment
- Technology flexibility
- Improved scalability
- Better fault isolation

## Getting Started with Docker

Docker containers provide consistency across different environments. Here's how to get started:

1. Create a Dockerfile
2. Build your images
3. Deploy containers
4. Manage with Docker Compose

## Best Practices

- Keep services small and focused
- Implement proper error handling
- Use container orchestration
- Monitor service health

Remember to always consider the trade-offs when choosing a microservices architecture.
    `,
  },
  {
    title: "GraphQL vs REST: Making the Right Choice for Your API",
    slug: "graphql-vs-rest-making-the-right-choice-for-your-api",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    date: "March 22, 2025",
    category: "Backend",
    excerpt:
      "A comprehensive comparison of GraphQL and REST APIs, exploring their strengths, weaknesses, and ideal use cases to help you make the right choice.",
    readTime: "6 min read",
    content: `
When building modern applications, choosing the right API architecture is crucial. Let's compare GraphQL and REST to help you make an informed decision.

## REST: The Traditional Approach

REST has been the standard for years, offering:
- Simplicity and familiarity
- Caching capabilities
- Stateless operations

## GraphQL: The New Contender

GraphQL brings innovative features:
- Flexible data fetching
- Strong typing
- Reduced over-fetching

## Making the Choice

Consider these factors:
1. Project requirements
2. Team expertise
3. Client needs
4. Performance requirements

Both approaches have their place in modern development.
    `,
  },
  {
    title: "Optimizing React Performance: Advanced Techniques",
    slug: "optimizing-react-performance-advanced-techniques",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop",
    date: "March 5, 2025",
    category: "Frontend",
    excerpt:
      "Discover practical strategies to significantly improve your React application's performance, from code splitting to advanced hooks usage.",
    readTime: "10 min read",
    content: `
Performance optimization is crucial for delivering a great user experience. Let's explore advanced techniques to make your React applications faster.

## Code Splitting

Learn how to implement:
- Dynamic imports
- Route-based splitting
- Component-based splitting

## Memoization Techniques

Optimize renders with:
- useMemo
- useCallback
- React.memo

## State Management Optimization

Best practices for:
- Context optimization
- Redux performance
- Local state management

Remember that premature optimization is the root of all evil. Profile first, optimize second.
    `,
  },
];
