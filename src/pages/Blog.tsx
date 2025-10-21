import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: '10 Essential Tips for Learning English Faster',
      excerpt: 'Discover proven strategies to accelerate your English learning journey and achieve fluency faster than you thought possible.',
      author: 'Dr. Sarah Johnson',
      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      date: 'Jan 15, 2025',
      category: 'Learning Tips',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=450&fit=crop',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'The Power of Immersion: How to Create an English Environment',
      excerpt: 'Learn how to surround yourself with English in your daily life and accelerate your learning through immersion techniques.',
      author: 'Michael Chen',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      date: 'Jan 12, 2025',
      category: 'Study Methods',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop',
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'Mastering Business English: A Complete Guide',
      excerpt: 'Everything you need to know about professional English communication, from emails to presentations.',
      author: 'Emma Williams',
      authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      date: 'Jan 10, 2025',
      category: 'Business English',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
      readTime: '10 min read',
    },
    {
      id: 4,
      title: 'Common Grammar Mistakes and How to Avoid Them',
      excerpt: 'Identify and fix the most common grammar errors that English learners make, with practical examples.',
      author: 'David Martinez',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      date: 'Jan 8, 2025',
      category: 'Grammar',
      thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=450&fit=crop',
      readTime: '6 min read',
    },
    {
      id: 5,
      title: 'IELTS Speaking Test: Expert Strategies for Band 7+',
      excerpt: 'Insider tips from IELTS examiners on how to ace your speaking test and achieve your target band score.',
      author: 'Prof. Lisa Anderson',
      authorImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop',
      date: 'Jan 5, 2025',
      category: 'Test Prep',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop',
      readTime: '12 min read',
    },
    {
      id: 6,
      title: 'Building Vocabulary: The Right Way',
      excerpt: 'Effective techniques for expanding your English vocabulary and remembering new words long-term.',
      author: 'Rachel Green',
      authorImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
      date: 'Jan 3, 2025',
      category: 'Vocabulary',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop',
      readTime: '7 min read',
    },
  ];

  const featuredPost = posts[0];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-['Poppins']">
                Learning Resources & Tips
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Expert advice, study tips, and insights to help you master English
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-accent transition-all">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-video md:aspect-auto">
                    <img
                      src={featuredPost.thumbnail}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-secondary shadow-md">
                      Featured
                    </Badge>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge variant="outline" className="w-fit mb-4">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4 font-['Poppins']">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={featuredPost.authorImage}
                        alt={featuredPost.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{featuredPost.author}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {featuredPost.date}
                          </span>
                          <span>•</span>
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-fit bg-gradient-primary shadow-accent">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 font-['Poppins']">Latest Articles</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(1).map((post) => (
                <article
                  key={post.id}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-accent transition-all border border-border hover:border-primary/20 group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge variant="outline" className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors font-['Poppins']">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{post.author}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-primary">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-4xl font-bold text-primary-foreground font-['Poppins']">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-xl text-primary-foreground/80">
                Get the latest learning tips and resources delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-12 px-4 rounded-lg border-0 focus:ring-2 focus:ring-secondary"
                />
                <Button size="lg" variant="secondary" className="shadow-accent">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
