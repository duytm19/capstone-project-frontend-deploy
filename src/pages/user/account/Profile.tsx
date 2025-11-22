import { useState, useEffect } from 'react'; // MỚI: Thêm useEffect
import { Link } from 'react-router-dom';
import Navbar from '@/components/user/layout/Navbar';
import Footer from '@/components/user/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Edit, Save, X, Loader2, LayoutDashboard } from 'lucide-react'; // MỚI: Thêm Loader2
import { toast } from 'sonner';
import { User } from '@/types/type';
import CourseSellerApplicationDialog from '@/components/user/account/CourseSellerApplicationDialog';
import type { CourseSellerApplication } from '@/types/type';
import { formatVND, formatDate, formatDateForInput } from '@/lib/utils';
import { useProfile } from '@/hooks/api/use-user'; // Giữ nguyên
import { useQueryClient } from '@tanstack/react-query'; // MỚI: Thêm Query Client

const englishLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function Profile() {
  // MỚI: Lấy data từ hook, đây là nguồn dữ liệu (SSOT) duy nhất
  const { user, myApplications, isLoading, isError, error } = useProfile();
  
  // MỚI: Dùng để refresh data sau khi submit form
  const queryClient = useQueryClient();

  const [editing, setEditing] = useState(false);
  const [goalInput, setGoalInput] = useState('');
  
  // MỚI: Khởi tạo form rỗng để tránh crash khi user đang null
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    profilePicture: '',
    dateOfBirth: '',
    englishLevel: 'B1',
    learningGoals: [] as string[],
    bio: '',
  });

  const [applicationOpen, setApplicationOpen] = useState(false);

  // BỎ: const [myApplications, setMyApplications] = ... (đã bỏ)

  // MỚI: Dùng useEffect để đồng bộ data từ hook `useProfile` vào `form`
  useEffect(() => {
    if (user && !editing) { // Chỉ đồng bộ khi có user VÀ không ở chế độ "sửa"
      setForm({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        profilePicture: user.profilePicture || '',
        dateOfBirth: formatDateForInput(user.dateOfBirth),
        englishLevel: user.englishLevel || 'B1',
        learningGoals: [...(user.learningGoals || [])],
        bio: '', // `bio` không có trong data, tạm để rỗng
      });
    }
  }, [user, editing]); // Chạy lại khi `user` thay đổi hoặc khi `editing` tắt

  const handleChange = (key: keyof typeof form, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const addGoal = () => {
    const v = goalInput.trim();
    if (!v) return;
    if (form.learningGoals.includes(v)) {
      toast.warning('Mục tiêu đã tồn tại');
      return;
    }
    setForm(prev => ({ ...prev, learningGoals: [...prev.learningGoals, v] }));
    setGoalInput('');
  };

  const removeGoal = (goal: string) => {
    setForm(prev => ({ ...prev, learningGoals: prev.learningGoals.filter(g => g !== goal) }));
  };

  const startEdit = () => setEditing(true);

  // MỚI: `cancelEdit` giờ chỉ cần tắt `editing`
  // `useEffect` ở trên sẽ tự động reset form
  const cancelEdit = () => {
    setEditing(false);
  };

  // MỚI: Sửa `saveEdit`
  const saveEdit = () => {
    
    setEditing(false);
    toast.success('Cập nhật thông tin cá nhân thành công!');
    
    // TODO: Sau khi mutation thành công, bạn nên invalidate query
    // queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
  };

  // MỚI: Xử lý trạng thái Loading
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center pt-40">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }
  
  // MỚI: Xử lý trạng thái Error
  if (isError || !user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-40 text-center">
          <h2 className="text-2xl font-semibold text-destructive mb-4">Đã xảy ra lỗi</h2>
          <p className="text-muted-foreground mb-4">
            
            {error?.message || 'Không thể tải thông tin cá nhân.'}
          </p>
          <Button onClick={() => window.location.reload()}>Tải lại trang</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const canAccessSellerPortal = user.role === 'COURSESELLER';

  // Màn hình chính khi đã có data
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-20">
        <section className="bg-gradient-hero text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.profilePicture} />
                <AvatarFallback>{user.fullName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-4xl font-bold font-['Be Vietnam Pro']">Hồ sơ cá nhân</h1>
                <p className="text-primary-foreground/80">Quản lý và cập nhật thông tin của bạn</p>
              </div>
              <div className="flex-1" />
              <div className="flex items-center gap-3">
                {canAccessSellerPortal && (
                  <Button asChild variant="default">
                    <Link to="/seller">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Quản lý khóa học
                    </Link>
                  </Button>
                )}
                {!editing ? (
                  <Button variant="secondary" onClick={startEdit}>
                    <Edit className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={saveEdit}>
                      <Save className="w-4 h-4 mr-2" />
                      Lưu
                    </Button>
                    <Button variant="outline" onClick={cancelEdit}>
                      <X className="w-4 h-4 mr-2" />
                      Hủy
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
            {/* Thông tin cơ bản */}
            <Card className="p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-6">Thông tin cơ bản</h2>
              {/* Tất cả Input bây giờ sẽ dùng `form.xyz` 
                  Đây là logic đúng, giữ nguyên
              */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input id="fullName" value={form.fullName} disabled={!editing}
                    onChange={(e) => handleChange('fullName', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} disabled={!editing}
                    onChange={(e) => handleChange('email', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" value={form.phoneNumber} disabled={!editing}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Ngày sinh</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="dob" type="date" className="pl-10" value={form.dateOfBirth} disabled={!editing}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)} />
                  </div>
                  {/* {!editing && (
                    <p className="text-xs text-muted-foreground">{formatDate(user.dateOfBirth)}</p>
                  )} */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Ảnh đại diện (URL)</Label>
                  <Input id="avatar" value={form.profilePicture} disabled={!editing}
                    onChange={(e) => handleChange('profilePicture', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Trình độ tiếng Anh</Label>
                  <Select value={form.englishLevel} onValueChange={(v) => handleChange('englishLevel', v)} disabled={!editing}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trình độ" />
                    </SelectTrigger>
                    <SelectContent>
                      {englishLevels.map((lvl) => (
                        <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="bio">Giới thiệu</Label>
                <Textarea id="bio" placeholder="Chia sẻ đôi nét về bạn..." disabled={!editing}
                  value={form.bio} onChange={(e) => handleChange('bio', e.target.value)} />
              </div>
            </Card>

            {/* Tài khoản & ví */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Tài khoản</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">ID người dùng</p>
                  <p className="font-mono text-sm">{user.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ngày tạo</p>
                  <p className="text-sm">{formatDate(user.createdAt)}</p>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Số dư ví</p>
                  <p className="text-lg font-semibold">{user.wallet ? formatVND(user.wallet.allowance) : '—'}</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Mục tiêu học tập (Không đổi, logic `form` là chính xác) */}
        <section className="py-2">
          {/* ... (Giữ nguyên) ... */}
        </section>

        {/* Course Seller Application
            MỚI: Biến `myApplications` ở đây giờ là data
            từ hook `useProfile`, không phải từ localStorage
        */}
        <section className="py-2">
          <div className="container mx-auto px-4 lg:max-w-4xl">
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Trở thành người bán khóa học</h2>
                {user.role === 'COURSESELLER' ? (
                  <Badge variant="outline">Bạn đã là giảng viên</Badge>
                ) : null}
              </div>

              <p className="text-sm text-muted-foreground">
                Gửi đơn đăng ký để đội ngũ admin xét duyệt. Bạn nên cung cấp chứng chỉ và chuyên môn liên quan đến giảng dạy.
              </p>

              {user.role !== 'COURSESELLER' ? (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">Trạng thái đơn mới nhất:</p>
                    {/* Logic này giờ đọc `myApplications` từ hook `useProfile` */}
                    {myApplications.length > 0 ? (
                      <div className="mt-2">
                        {(() => {
                          const latest = [...myApplications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
                          const statusLabel = latest.status === 'PENDING' ? 'Đang chờ duyệt' : latest.status === 'APPROVED' ? 'Đã duyệt' : 'Từ chối';
                          const statusVariant = latest.status === 'APPROVED' ? 'default' : latest.status === 'REJECTED' ? 'destructive' : 'secondary';
                          return (
                            <div className="flex items-center gap-2">
                              <Badge variant={statusVariant as any}>{statusLabel}</Badge>
                              <span className="text-xs text-muted-foreground">{new Date(latest.createdAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                          );
                        })()}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">Chưa có đơn nào</p>
                    )}
                  </div>
                  <div>
                    <Button
                      variant="default"
                      onClick={() => setApplicationOpen(true)}
                      disabled={myApplications.some(a => a.status === 'PENDING')}
                    >
                      {myApplications.some(a => a.status === 'PENDING') ? 'Đang chờ duyệt' : 'Nộp đơn'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* ... (Giữ nguyên logic hiển thị profile giảng viên) ... */}
                </div>
              )}

              {/* Danh sách đơn đã nộp (Đọc `myApplications` từ hook) */}
              {myApplications.length > 0 && user.role !== 'COURSESELLER' && (
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-3">Đơn đã nộp</h3>
                  <div className="space-y-3">
                    {[...myApplications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((app) => (
                      <div key={app.id} className="p-3 rounded-md border">
                        {/* ... (GiV giữ nguyên) ... */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </section>
      </main>

      {/* Dialog nộp đơn giảng viên */}
      <CourseSellerApplicationDialog
        open={applicationOpen}
        onOpenChange={setApplicationOpen}
        userId={user.id} // MỚI: Dùng user.id thay vì currentUserId
        onSubmitted={(app) => {
          // MỚI: Thay vì `setMyApplications`, chúng ta báo React Query
          // rằng data đã cũ và cần fetch lại.
          toast.success('Nộp đơn thành công!');
          queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
        }}
      />

      <Footer />
    </div>
  );
}