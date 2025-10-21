import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, BookOpen, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-accent transition-transform group-hover:scale-105">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent font-['Poppins']">
              SkillBoost
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'text-primary bg-primary/5'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="default">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-gradient-primary shadow-accent hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? 'text-primary bg-primary/5'
                        : 'text-foreground hover:bg-muted'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border mt-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button size="lg" className="w-full bg-gradient-primary shadow-accent">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
