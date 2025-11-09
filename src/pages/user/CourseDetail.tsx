import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/user/layout/Navbar';
import Footer from '@/components/user/layout/Footer';
import { mockCourses } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatVND } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const CourseDetail = () => {
  const { id } = useParams();
  const course = mockCourses.find(c => c.id === id);
  const { addItem } = useCart();

  if (!course) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Không tìm thấy khóa học</h1>
          <Link to="/courses">
            <Button>Quay lại Khóa học</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // No curriculum mock in data/mock; page focuses on basic course info

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
                <Link to="/courses" className="hover:text-primary-foreground">Khóa học</Link>
                <span>/</span>
                <span>{course.title}</span>
              </div>

              {/* Title & Badges */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.courseLevel && (
                    <Badge variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20">
                      {course.courseLevel}
                    </Badge>
                  )}
                </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Be Vietnam Pro']">
                {course.title}
              </h1>
                {course.description && (
                  <p className="text-xl text-primary-foreground/80 mb-6">
                    {course.description}
                  </p>
                )}
              </div>

              {/* Stats: rating only */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-secondary fill-secondary" />
                  <span className="font-semibold">{course.averageRating ?? 'N/A'}</span>
                  <span className="text-primary-foreground/70">({course.ratingCount ?? 0} đánh giá)</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4">
                {course.courseSeller?.profilePicture && (
                  <img
                    src={course.courseSeller.profilePicture}
                    alt={course.courseSeller.fullName}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-foreground/20"
                  />
                )}
                <div>
                  <div className="text-sm text-primary-foreground/70">Giảng viên</div>
                  <div className="font-semibold">{course.courseSeller.fullName}</div>
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
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                  <TabsTrigger value="instructor">Giảng viên</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  {/* Course Description from data */}
                  {course.description && (
                    <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="text-2xl font-semibold mb-4 font-['Be Vietnam Pro']">Mô tả khóa học</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {course.description}
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="instructor" className="mt-6">
                  <div className="bg-card rounded-2xl p-8 border border-border">
                    <div className="flex items-start gap-6 mb-6">
                      {course.courseSeller?.profilePicture && (
                        <img
                          src={course.courseSeller.profilePicture}
                          alt={course.courseSeller.fullName}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      )}
                      <div>
              <h3 className="text-2xl font-semibold mb-2 font-['Be Vietnam Pro']">{course.courseSeller.fullName}</h3>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Course Card */}
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
                    <div className="p-6 space-y-4">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-bold text-primary">
                          {formatVND(course.price)}
                        </span>
                      </div>

                    <Button
                      size="lg"
                      className="w-full bg-gradient-primary shadow-accent text-lg"
                      onClick={() => addItem(course)}
                    >
                      Thêm vào giỏ
                    </Button>
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
