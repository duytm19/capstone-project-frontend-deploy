import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import CourseCard from '@/components/course/CourseCard';
import { courses } from '@/data/courses';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const popularCourses = courses.filter(course => course.isPopular).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        <Features />

        {/* Popular Courses Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']">
                Most Popular <span className="text-primary">Courses</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of students already learning with our top-rated courses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {popularCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            <div className="text-center">
              <Link to="/courses">
                <Button size="lg" className="bg-gradient-primary shadow-accent">
                  View All Courses
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']">
                How It Works
              </h2>
              <p className="text-lg text-primary-foreground/80">
                Start your learning journey in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: '01',
                  title: 'Choose Your Course',
                  description: 'Browse our extensive catalog and select the perfect course for your goals',
                },
                {
                  step: '02',
                  title: 'Learn at Your Pace',
                  description: 'Access video lessons, exercises, and materials anytime, anywhere',
                },
                {
                  step: '03',
                  title: 'Earn Certificate',
                  description: 'Complete the course and receive a recognized certificate of achievement',
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20 backdrop-blur-sm border-2 border-secondary mb-6">
                    <span className="text-3xl font-bold text-secondary">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 font-['Poppins']">{item.title}</h3>
                  <p className="text-primary-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']">
                What Students Say
              </h2>
              <p className="text-lg text-muted-foreground">
                Real stories from real students who transformed their English skills
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Maria Rodriguez',
                  role: 'Business Professional',
                  image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
                  content: 'SkillBoost helped me land my dream job! The Business English course was exactly what I needed.',
                },
                {
                  name: 'Ahmed Hassan',
                  role: 'University Student',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                  content: 'The IELTS preparation course was comprehensive and helped me achieve my target score.',
                },
                {
                  name: 'Jennifer Kim',
                  role: 'English Teacher',
                  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
                  content: 'As a teacher myself, I\'m impressed by the quality of instruction and course materials.',
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-accent transition-all border border-border"
                >
                  <Quote className="w-10 h-10 text-secondary mb-4" />
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground font-['Poppins']">
                Ready to Start Learning?
              </h2>
              <p className="text-xl text-primary-foreground/80">
                Join thousands of students and begin your journey to English fluency today
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Link to="/courses">
                  <Button size="lg" variant="secondary" className="shadow-accent text-lg h-14 px-8">
                    Browse All Courses
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-2 border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground text-lg h-14 px-8">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
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

export default Index;
