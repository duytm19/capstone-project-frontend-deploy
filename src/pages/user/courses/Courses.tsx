import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // 👈 IMPORT QUAN TRỌNG
import Navbar from '@/components/user/layout/Navbar';
import Footer from '@/components/user/layout/Footer';
import CourseCard from '@/components/user/course/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, ChevronLeft, ChevronRight, XCircle, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Hooks
import { useGetCourses } from '@/hooks/api/use-courses';
import { useUser } from '@/hooks/api/use-user';

const levels = ['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const Courses = () => {
  // === 1. URL PARAMS QUẢN LÝ FILTER (Nguồn sự thật duy nhất) ===
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Lấy giá trị hiện tại từ URL
  const currentMinPrice = searchParams.get('minPrice');
  const currentMaxPrice = searchParams.get('maxPrice');
  const currentLevel = searchParams.get('level') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  // === 2. LOCAL STATE (Chỉ dùng cho UI input khi người dùng đang gõ) ===
  // Khi component mount, khởi tạo giá trị input từ URL
  const [priceInput, setPriceInput] = useState({ 
    min: currentMinPrice || '', 
    max: currentMaxPrice || '' 
  });
  
  // Cập nhật lại input nếu URL thay đổi (ví dụ user back lại trang)
  useEffect(() => {
    setPriceInput({
      min: currentMinPrice || '',
      max: currentMaxPrice || ''
    });
  }, [currentMinPrice, currentMaxPrice]);

  const limit = 9;
  const { user } = useUser();

  // === FETCH 1: KHÓA HỌC CỦA TÔI ===
  const { data: myCoursesRes, isLoading: isLoadingMy } = useGetCourses({
    page: 1,
    limit: 100,
    search: currentSearch || undefined, // Lấy từ URL
    level: currentLevel,                // Lấy từ URL
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
    page: currentPage,                  // Lấy từ URL
    limit: limit,
    search: currentSearch || undefined, // Lấy từ URL
    level: currentLevel,                // Lấy từ URL
    // 👇 Lấy trực tiếp từ URL Param để gọi API
    minPrice: currentMinPrice ? Number(currentMinPrice) : undefined,
    maxPrice: currentMaxPrice ? Number(currentMaxPrice) : undefined,
    enrollmentStatus: user ? 'not_enrolled' : undefined,
    sortBy: 'ratingCount',
    sortOrder: 'desc',
  });

  const myCourses = user ? myCoursesRes?.data || [] : [];
  const availableCourses = availableRes?.data || [];
  const pagination = availableRes?.pagination;

  const isLoading = (!!user && isLoadingMy) || isLoadingAvailable;

  // === HELPER: Cập nhật URL ===
  const updateParams = (newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  // === HANDLERS ===
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Với search, thường ta update URL luôn hoặc dùng debounce, ở đây update luôn nhưng reset page
    updateParams({ search: e.target.value, page: '1' });
  };

  const handleLevel = (val: string) => {
    updateParams({ level: val, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: newPage.toString() });
  };

  // 1. Chỉ cập nhật state hiển thị khi gõ (không gọi API, không đổi URL)
  const handlePriceInputChange = (field: 'min' | 'max', value: string) => {
    if (!/^\d*$/.test(value)) return;
    setPriceInput(prev => ({ ...prev, [field]: value }));
  };

  // 2. KHI ẤN NÚT LỌC -> ĐẨY LÊN URL
  const handleApplyPriceFilter = () => {
    updateParams({
      minPrice: priceInput.min,
      maxPrice: priceInput.max,
      page: '1' // Reset về trang 1 khi lọc
    });
  };

  // Hàm reset
  const clearFilters = () => {
    setPriceInput({ min: '', max: '' });
    setSearchParams({}); // Xóa sạch URL params -> Về mặc định
  };

  // Logic hiển thị nút xóa bộ lọc
  const isFiltering = currentSearch || currentLevel !== 'all' || currentMinPrice || currentMaxPrice;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="pt-20 flex-grow">
        <section className="bg-gradient-hero text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-8 font-['Be Vietnam Pro']">Khám phá khóa học</h1>
            
            <div className="max-w-5xl mx-auto bg-background/10 p-5 rounded-xl backdrop-blur-md border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                
                {/* 1. Search */}
                <div className="lg:col-span-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                  <Input
                    placeholder="Tìm kiếm khóa học..."
                    className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 h-10"
                    value={currentSearch} // Binding từ URL
                    onChange={handleSearch}
                  />
                </div>

                {/* 2. Level */}
                <div className="lg:col-span-3">
                  <Select value={currentLevel} onValueChange={handleLevel}>
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

                {/* 3. Price Filter */}
                <div className="lg:col-span-5 flex gap-2 items-center">
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="Min"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 h-10 w-full"
                    value={priceInput.min} 
                    onChange={(e) => handlePriceInputChange('min', e.target.value)}
                  />
                  <span className="text-white/50">-</span>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="Max"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 h-10 w-full"
                    value={priceInput.max}
                    onChange={(e) => handlePriceInputChange('max', e.target.value)}
                  />
                  
                  {/* Nút bấm sẽ đẩy params lên URL */}
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

        {/* ... CONTENT ... */}
        <section className="py-12 container mx-auto px-4 space-y-16">
          {isLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
          ) : (
            <>
               {/* My Courses giữ nguyên logic hiển thị */}
               {/* ... */}

               {/* Available Courses */}
               <div>
                 {/* Header... */}
                {availableCourses.length > 0 ? (
                  <div className="space-y-8">
                    {/* Grid CourseCards... */}
                    
                    {/* Pagination dùng hàm handlePageChange mới */}
                    {pagination && pagination.totalPages > 1 && (
                      <div className="flex justify-center items-center gap-4">
                        <Button
                          variant="outline"
                          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" /> Trước
                        </Button>
                        <span className="text-sm font-medium">Trang {currentPage} / {pagination.totalPages}</span>
                        <Button
                          variant="outline"
                          onClick={() => {
                            if (!isPlaceholderData && currentPage < pagination.totalPages) 
                              handlePageChange(currentPage + 1);
                          }}
                          disabled={isPlaceholderData || currentPage >= pagination.totalPages}
                        >
                           Sau <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                   // Empty state...
                   <></>
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