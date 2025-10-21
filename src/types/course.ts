export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorImage: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  students: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  thumbnail: string;
  lessons: number;
  features: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  rating: number;
  students: number;
  courses: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  date: string;
  category: string;
  thumbnail: string;
  readTime: string;
}
