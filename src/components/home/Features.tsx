import { Award, Clock, Users, Globe, BookOpen, Trophy } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Expert-Led Courses',
      description: 'Learn from native English speakers with years of teaching experience',
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Study at your own pace with 24/7 access to course materials',
    },
    {
      icon: Users,
      title: 'Interactive Learning',
      description: 'Engage with peers and instructors in live sessions and forums',
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connect with learners from around the world and practice together',
    },
    {
      icon: Award,
      title: 'Certified Programs',
      description: 'Earn recognized certificates upon course completion',
    },
    {
      icon: Trophy,
      title: 'Proven Results',
      description: '98% of our students report significant improvement',
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']">
            Why Choose <span className="text-primary">SkillBoost</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide everything you need to master English and achieve your learning goals
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-sm hover:shadow-accent transition-all duration-300 border border-border hover:border-primary/20"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-['Poppins']">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
