import { Link } from 'react-router-dom';
import { Star, Clock, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/types/course';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link to={`/courses/${course.id}`}>
      <div className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-accent transition-all duration-300 border border-border hover:border-primary/20 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {course.isPopular && (
            <Badge className="absolute top-4 left-4 bg-secondary shadow-md">
              Popular
            </Badge>
          )}
          {course.level && (
            <Badge variant="outline" className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm">
              {course.level}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Category */}
          <div className="text-sm font-medium text-primary mb-2">{course.category}</div>

          {/* Title */}
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors font-['Poppins']">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
            {course.description}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
            <img
              src={course.instructorImage}
              alt={course.instructor}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-muted-foreground">{course.instructor}</span>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{course.lessons} Lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
          </div>

          {/* Rating & Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-secondary fill-secondary" />
              <span className="font-semibold">{course.rating}</span>
              <span className="text-sm text-muted-foreground">({course.reviewCount})</span>
            </div>
            <div className="flex items-baseline gap-2">
              {course.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${course.originalPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-primary">
                ${course.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
