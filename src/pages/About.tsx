import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Target, Users, Award, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { value: '50,000+', label: 'Active Students' },
    { value: '200+', label: 'Expert Courses' },
    { value: '98%', label: 'Success Rate' },
    { value: '50+', label: 'Countries' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To make quality English education accessible to everyone, everywhere, and empower learners to achieve their goals.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our instructors are certified professionals with years of experience and passion for teaching.',
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'We maintain the highest standards in course content, delivery, and student support.',
    },
    {
      icon: Heart,
      title: 'Student Success',
      description: 'Your success is our priority. We provide comprehensive support throughout your learning journey.',
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Lead Instructor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      name: 'Michael Chen',
      role: 'Business English Expert',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    },
    {
      name: 'Emma Williams',
      role: 'IELTS Specialist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
    {
      name: 'David Martinez',
      role: 'Speaking Coach',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-['Poppins']">
                About SkillBoost
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Empowering learners worldwide to master English and achieve their dreams
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 font-['Poppins']">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2020, SkillBoost was born from a simple yet powerful vision: 
                    to make high-quality English education accessible to everyone, regardless 
                    of their location or background.
                  </p>
                  <p>
                    What started as a small team of passionate educators has grown into a 
                    global platform serving thousands of students across 50+ countries. Our 
                    commitment to excellence and student success has remained unchanged.
                  </p>
                  <p>
                    Today, we continue to innovate and improve our courses, ensuring that 
                    every student receives the best possible learning experience. Join us 
                    on this journey to English fluency.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop"
                  alt="Our story"
                  className="rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
                <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-accent transition-all border border-border"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 shadow-md">
                    <value.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 font-['Poppins']">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']">
                Meet Our Instructors
              </h2>
              <p className="text-lg text-muted-foreground">
                Learn from experienced professionals dedicated to your success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="group text-center"
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1 font-['Poppins']">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
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
                Join Our Growing Community
              </h2>
              <p className="text-xl text-primary-foreground/80">
                Start your journey to English fluency with expert guidance and support
              </p>
              <Link to="/courses">
                <Button size="lg" variant="secondary" className="shadow-accent text-lg h-14 px-8">
                  Explore Courses
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
