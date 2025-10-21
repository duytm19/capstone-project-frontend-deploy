import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { BookOpen, Mail, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: isLogin ? "You've successfully logged in." : "Your account has been created successfully.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-hero text-primary-foreground p-12">
        <div className="max-w-md space-y-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center shadow-accent transition-transform group-hover:scale-105">
              <BookOpen className="w-8 h-8" />
            </div>
            <span className="text-4xl font-bold font-['Poppins']">SkillBoost</span>
          </Link>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight font-['Poppins']">
              Transform Your English Skills
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Join thousands of learners mastering English with expert-led courses
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary">50K+</div>
              <div className="text-sm text-primary-foreground/70">Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary">200+</div>
              <div className="text-sm text-primary-foreground/70">Courses</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary">98%</div>
              <div className="text-sm text-primary-foreground/70">Success</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 justify-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-accent">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent font-['Poppins']">
              SkillBoost
            </span>
          </Link>

          {/* Form Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold font-['Poppins']">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-muted-foreground">
              {isLogin ? 'Login to continue your learning journey' : 'Start your journey to English fluency'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="pl-10 h-12"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm cursor-pointer">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full bg-gradient-primary shadow-accent text-lg h-12">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Toggle Form */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="font-semibold text-primary">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </span>
            </button>
          </div>

          {/* Back to Home */}
          <div className="text-center pt-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
