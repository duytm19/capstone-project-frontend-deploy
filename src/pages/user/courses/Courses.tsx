import { useState } from 'react';
import Navbar from '@/components/user/layout/Navbar';
import Footer from '@/components/user/layout/Footer';
import CourseCard from '@/components/user/course/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, ChevronLeft, ChevronRight, XCircle, Filter } from 'lucide-react'; // Thêm icon Filter
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Hooks
import { useGetCourses } from '@/hooks/api/use-courses';
import { useUser } from '@/hooks/api/use-user';

const levels = ['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const Courses = () => {
  // === 1. STATE QUẢN LÝ FILTER ===
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // ⭐️ TÁCH STATE GIÁ:
  // 1. priceInput: Lưu giá trị người dùng đang gõ (UI only)
  const [priceInput, setPriceInput] = useState({ min: '', max: '' });
  // 2. priceRange: Lưu giá trị thực sự dùng để gọi API (Param only)
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const [page, setPage] = useState(1);
  const limit = 9;

  const { user } = useUser();

  // === FETCH 1: KHÓA HỌC CỦA TÔI ===
  const { data: myCoursesRes, isLoading: isLoadingMy } = useGetCourses({
    page: 1,
    limit: 100,
    search: searchQuery || undefined,
    level: selectedLevel,
    enrollmentStatus: 'enrolled',
    sortBy: 'ratingCount',
    sortOrder: 'desc',
  });

  // === FETCH 2: KHÓA HỌC CÓ SẴN ===
  const {
    data: availableRes,
    isLoading: isLoadingAvailable,
    isPlaceholderData,
  } = useGetCourses({
    page: page,
    limit: limit,
    search: searchQuery || undefined,
    level: selectedLevel,
    // 👇 Ở đây dùng priceRange (đã được ấn nút Apply) chứ không dùng priceInput
    minPrice: priceRange.min ? Number(priceRange.min) : undefined,
    maxPrice: priceRange.max ? Number(priceRange.max) : undefined,
    enrollmentStatus: user ? 'not_enrolled' : undefined,
    sortBy: 'ratingCount',
    sortOrder: 'desc',
  });

  const myCourses = user ? myCoursesRes?.data || [] : [];
  const availableCourses = availableRes?.data || [];
  const pagination = availableRes?.pagination;

  const isLoading = (!!user && isLoadingMy) || isLoadingAvailable;

  // === HANDLERS ===
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleLevel = (val: string) => {
    setSelectedLevel(val);
    setPage(1);
  };

  // 1. Chỉ cập nhật state hiển thị khi gõ
  const handlePriceInputChange = (field: 'min' | 'max', value: string) => {
    if (!/^\d*$/.test(value)) return;
    setPriceInput(prev => ({ ...prev, [field]: value }));
  };

  // 2. Hàm mới: Khi ấn nút thì mới cập nhật state gọi API
  const handleApplyPriceFilter = () => {
    setPriceRange(priceInput); // Copy từ input sang range thật
    setPage(1);
  };

  // Hàm reset: Xóa sạch cả 2 state giá
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLevel('all');
    setPriceInput({ min: '', max: '' }); // Reset ô nhập
    setPriceRange({ min: '', max: '' }); // Reset API params
    setPage(1);
  };

  // Kiểm tra điều kiện hiển thị nút Reset (dùng priceRange để check logic filter, dùng priceInput để check UX)
  const isFiltering = searchQuery || selectedLevel !== 'all' || priceRange.min || priceRange.max || priceInput.min || priceInput.max;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="pt-20 flex-grow">
        <section className="bg-gradient-hero text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-8 font-['Be Vietnam Pro']">Khám phá khóa học</h1>
            
            <div className="max-w-5xl mx-auto bg-background/10 p-5 rounded-xl backdrop-blur-md border border-white/20">
              {/* Grid Layout được điều chỉnh lại để chứa nút Apply */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                
                {/* 1. Search (4 cột) */}
                <div className="lg:col-span-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                  <Input
                    placeholder="Tìm kiếm khóa học..."
                    className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 h-10"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>

                {/* 2. Level (3 cột) */}
                <div className="lg:col-span-3">
                  <Select value={selectedLevel} onValueChange={handleLevel}>
                    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white h-10">
                      <SelectValue placeholder="Trình độ" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((l) => (
                        <SelectItem key={l} value={l}>
                          {l === 'all' ? 'Tất cả trình độ' : l}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 3. Price Filter (5 cột) - Bao gồm 2 input + Nút Apply */}
                <div className="lg:col-span-5 flex gap-2 items-center">
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="Min"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 h-10 w-full"
                    // 👇 Binding vào priceInput
                    value={priceInput.min} 
                    onChange={(e) => handlePriceInputChange('min', e.target.value)}
                  />
                  <span className="text-white/50">-</span>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="Max"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 h-10 w-full"
                    // 👇 Binding vào priceInput
                    value={priceInput.max}
                    onChange={(e) => handlePriceInputChange('max', e.target.value)}
                  />
                  
                  {/* 👇 NÚT BUTTON MỚI ĐỂ GỬI PARAMS */}
                  <Button 
                    onClick={handleApplyPriceFilter}
                    className="h-10 px-3 bg-white/20 hover:bg-white/30 border border-white/10 text-white"
                    title="Áp dụng giá"
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {isFiltering && (
                <div className="mt-4 flex justify-end">
                    <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-white/80 hover:text-white hover:bg-white/10 h-8 px-2"
                    >
                      <XCircle className="w-4 h-4 mr-2" /> Xóa bộ lọc
                    </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ... (Phần Content bên dưới giữ nguyên) ... */}
         <section className="py-12 container mx-auto px-4 space-y-16">
          {isLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
          ) : (
            <>
              {/* Phần 1: My Courses */}
              {user && myCourses.length > 0 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-green-700">Khóa học của bạn</h2>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{myCourses.length}</span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {myCourses.map(course => (
                      <CourseCard key={course.id} course={course} purchased hideAddToCart />
                    ))}
                  </div>
                  <div className="my-12 border-b border-border/50" />
                </div>
              )}

              {/* Phần 2: Available Courses */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary">
                    {user ? 'Khám phá thêm' : 'Danh sách khóa học'}
                  </h2>
                  <span className="text-muted-foreground text-sm">
                    {pagination?.total || 0} kết quả
                  </span>
                </div>

                {availableCourses.length > 0 ? (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {availableCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>

                    {pagination && pagination.totalPages > 1 && (
                      <div className="flex justify-center items-center gap-4">
                        <Button
                          variant="outline"
                          onClick={() => setPage(old => Math.max(old - 1, 1))}
                          disabled={page === 1}
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" /> Trước
                        </Button>
                        <span className="text-sm font-medium">Trang {page} / {pagination.totalPages}</span>
                        <Button
                          variant="outline"
                          onClick={() => {
                            if (!isPlaceholderData && page < pagination.totalPages) setPage(old => old + 1);
                          }}
                          disabled={isPlaceholderData || page >= pagination.totalPages}
                        >
                          Sau <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
                    <p className="text-muted-foreground">Không tìm thấy khóa học nào trong khoảng giá này.</p>
                    <Button variant="link" onClick={clearFilters} className="mt-2 text-primary">
                      Xóa bộ lọc để xem tất cả
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;