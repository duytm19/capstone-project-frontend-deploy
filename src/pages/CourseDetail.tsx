import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { courses } from '@/data/courses';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, Clock, Users, BookOpen, Award, PlayCircle, 
  CheckCircle, Globe, Download, MessageCircle 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const curriculum = [
    { title: 'Introduction to the Course', lessons: 5, duration: '45 min' },
    { title: 'Foundation Concepts', lessons: 8, duration: '2 hours' },
    { title: 'Intermediate Techniques', lessons: 12, duration: '3 hours' },
    { title: 'Advanced Strategies', lessons: 10, duration: '2.5 hours' },
    { title: 'Practice & Application', lessons: 8, duration: '2 hours' },
    { title: 'Final Assessment', lessons: 5, duration: '1 hour' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm mb-4 text-primary-foreground/70">
                <Link to="/courses" className="hover:text-primary-foreground">Courses</Link>
                <span>/</span>
                <span>{course.category}</span>
              </div>

              {/* Title & Badges */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20">
                    {course.level}
                  </Badge>
                  {course.isPopular && <Badge className="bg-secondary">Popular</Badge>}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']">
                  {course.title}
                </h1>
                <p className="text-xl text-primary-foreground/80 mb-6">
                  {course.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-secondary fill-secondary" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-primary-foreground/70">({course.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/70">
                  <Users className="w-5 h-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/70">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/70">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4">
                <img
                  src={course.instructorImage}
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-foreground/20"
                />
                <div>
                  <div className="text-sm text-primary-foreground/70">Instructor</div>
                  <div className="font-semibold">{course.instructor}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  {/* What You'll Learn */}
                  <div className="bg-card rounded-2xl p-8 border border-border">
                    <h3 className="text-2xl font-semibold mb-6 font-['Poppins']">What You'll Learn</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Course Description */}
                  <div className="bg-card rounded-2xl p-8 border border-border">
                    <h3 className="text-2xl font-semibold mb-4 font-['Poppins']">Course Description</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      This comprehensive course is designed to help you master English from the ground up. 
                      Whether you're a beginner or looking to refine your skills, this course provides 
                      everything you need to succeed.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Through a combination of video lessons, interactive exercises, and real-world 
                      practice, you'll develop the confidence and skills needed to communicate effectively 
                      in English. Our expert instructors bring years of teaching experience and proven 
                      methodologies to ensure your success.
                    </p>
                  </div>

                  {/* Requirements */}
                  <div className="bg-card rounded-2xl p-8 border border-border">
                    <h3 className="text-2xl font-semibold mb-4 font-['Poppins']">Requirements</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Basic understanding of English alphabet and sounds</li>
                      <li>• Access to a computer or mobile device with internet</li>
                      <li>• Willingness to practice regularly</li>
                      <li>• Notebook for taking notes (recommended)</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-4 mt-6">
                  {curriculum.map((section, index) => (
                    <div key={index} className="bg-card rounded-xl p-6 border border-border hover:border-primary/20 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold">Section {index + 1}: {section.title}</h4>
                        <Badge variant="outline">{section.lessons} lessons</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{section.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <PlayCircle className="w-4 h-4" />
                          <span>{section.lessons} videos</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="instructor" className="mt-6">
                  <div className="bg-card rounded-2xl p-8 border border-border">
                    <div className="flex items-start gap-6 mb-6">
                      <img
                        src={course.instructorImage}
                        alt={course.instructor}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-2xl font-semibold mb-2 font-['Poppins']">{course.instructor}</h3>
                        <p className="text-muted-foreground mb-4">Expert English Instructor</p>
                        <div className="flex gap-6 text-sm">
                          <div>
                            <div className="font-semibold">{course.rating}</div>
                            <div className="text-muted-foreground">Instructor Rating</div>
                          </div>
                          <div>
                            <div className="font-semibold">{course.students.toLocaleString()}</div>
                            <div className="text-muted-foreground">Students</div>
                          </div>
                          <div>
                            <div className="font-semibold">15</div>
                            <div className="text-muted-foreground">Courses</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      With over 10 years of teaching experience and thousands of satisfied students, 
                      our instructor brings expertise and passion to every lesson. Certified in TESOL 
                      and holding advanced degrees in linguistics, they are dedicated to helping students 
                      achieve their English learning goals.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Course Card */}
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-6 space-y-4">
                    <div className="flex items-baseline justify-center gap-2">
                      {course.originalPrice && (
                        <span className="text-xl text-muted-foreground line-through">
                          ${course.originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold text-primary">
                        ${course.price}
                      </span>
                    </div>
                    
                    <Button size="lg" className="w-full bg-gradient-primary shadow-accent text-lg">
                      Enroll Now
                    </Button>
                    
                    <div className="text-center text-sm text-muted-foreground">
                      30-Day Money-Back Guarantee
                    </div>

                    <div className="border-t border-border pt-4 space-y-3">
                      <h4 className="font-semibold mb-3">This course includes:</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3">
                          <PlayCircle className="w-5 h-5 text-primary" />
                          <span>{course.lessons} video lessons</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Download className="w-5 h-5 text-primary" />
                          <span>Downloadable resources</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-primary" />
                          <span>Lifetime access</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MessageCircle className="w-5 h-5 text-primary" />
                          <span>Q&A support</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-primary" />
                          <span>Certificate of completion</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
