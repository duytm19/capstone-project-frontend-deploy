import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  UserPlus,
  Users,
  UserCheck,
  UserX,
  DollarSign
} from 'lucide-react';
import { mockUsers } from '@/data/admin-mock';
import { User } from '@/types/admin';
import DataTable from '@/components/admin/DataTable';
import FilterSection from '@/components/admin/FilterSection';
import StatCard from '@/components/admin/StatCard';

export default function UsersManagement() {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.courseSellerProfile?.isActive) ||
      (statusFilter === 'inactive' && !user.courseSellerProfile?.isActive);
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.courseSellerProfile?.isActive).length,
    inactiveUsers: users.filter(user => !user.courseSellerProfile?.isActive).length,
    totalWalletBalance: users.reduce((sum, user) => sum + (user.wallet?.allowance || 0), 0)
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
      case 'course_seller':
        return <Badge className="bg-blue-100 text-blue-800">Giảng viên</Badge>;
      case 'student':
        return <Badge className="bg-green-100 text-green-800">Học viên</Badge>;
      default:
        return <Badge variant="outline">Không xác định</Badge>;
    }
  };

  const getStatusBadge = (user: User) => {
    const isActive = user.courseSellerProfile?.isActive;
    return isActive ? 
      <Badge className="bg-green-100 text-green-800">Hoạt động</Badge> :
      <Badge className="bg-gray-100 text-gray-800">Không hoạt động</Badge>;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Không hoạt động' }
  ];

  const roleOptions = [
    { value: 'all', label: 'Tất cả vai trò' },
    { value: 'student', label: 'Học viên' },
    { value: 'course_seller', label: 'Giảng viên' },
    { value: 'admin', label: 'Admin' }
  ];

  const columns = [
    {
      key: 'user',
      header: 'Người dùng',
      render: (user: User) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profilePicture} />
            <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.fullName}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Vai trò',
      render: (user: User) => getRoleBadge(user.role)
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (user: User) => getStatusBadge(user)
    },
    {
      key: 'wallet',
      header: 'Số dư ví',
      render: (user: User) => (
        <div className="font-medium">
          {user.wallet ? formatCurrency(user.wallet.allowance) : 'Chưa có ví'}
        </div>
      )
    },
    {
      key: 'createdAt',
      header: 'Ngày tạo',
      render: (user: User) => (
        <div className="text-sm">{formatDate(user.createdAt)}</div>
      )
    },
    {
      key: 'actions',
      header: 'Thao tác',
      render: (user: User) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Mở menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setSelectedUser(user)}>
              <Eye className="mr-2 h-4 w-4" />
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa người dùng
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  const filters = [
    {
      key: 'status',
      label: 'Trạng thái',
      value: statusFilter,
      onChange: setStatusFilter,
      options: statusOptions,
      placeholder: 'Chọn trạng thái'
    },
    {
      key: 'role',
      label: 'Vai trò',
      value: roleFilter,
      onChange: setRoleFilter,
      options: roleOptions,
      placeholder: 'Chọn vai trò'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý người dùng</h1>
        <p className="text-muted-foreground">
          Quản lý tất cả người dùng trong hệ thống
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng người dùng"
          value={stats.totalUsers.toString()}
          description="Tất cả người dùng"
          icon={Users}
        />
        <StatCard
          title="Đang hoạt động"
          value={stats.activeUsers.toString()}
          description="Người dùng hoạt động"
          icon={UserCheck}
          trend={{
            value: Math.round((stats.activeUsers / stats.totalUsers) * 100),
            label: "% tổng số",
            isPositive: true
          }}
        />
        <StatCard
          title="Không hoạt động"
          value={stats.inactiveUsers.toString()}
          description="Người dùng không hoạt động"
          icon={UserX}
        />
        <StatCard
          title="Tổng số dư ví"
          value={formatCurrency(stats.totalWalletBalance)}
          description="Tổng tiền trong hệ thống"
          icon={DollarSign}
        />
      </div>

      <FilterSection
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Tìm kiếm theo tên hoặc email..."
        filters={filters}
        showAddButton={true}
        onAddClick={() => console.log('Add user')}
        addButtonText="Thêm người dùng"
      />

      <DataTable
        title="Danh sách người dùng"
        description={`Hiển thị ${filteredUsers.length} trong tổng số ${users.length} người dùng`}
        data={filteredUsers}
        columns={columns}
        emptyMessage="Không tìm thấy người dùng nào"
      />

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết người dùng</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về người dùng
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.profilePicture} />
                  <AvatarFallback className="text-lg">
                    {selectedUser.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.fullName}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {getRoleBadge(selectedUser.role)}
                    {getStatusBadge(selectedUser)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">ID người dùng</label>
                  <p className="text-sm text-muted-foreground font-mono mt-1">
                    {selectedUser.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Số điện thoại</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedUser.phoneNumber || 'Chưa cập nhật'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Ngày tạo</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(selectedUser.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Ngày sinh</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(selectedUser.dateOfBirth)}
                  </p>
                </div>
              </div>

              {selectedUser.wallet && (
                <div>
                  <label className="text-sm font-medium">Thông tin ví</label>
                  <div className="mt-2 p-3 bg-muted rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">ID ví</p>
                        <p className="text-sm font-mono">{selectedUser.wallet.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Số dư</p>
                        <p className="text-sm font-medium">
                          {formatCurrency(selectedUser.wallet.allowance)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Chỉnh sửa
                </Button>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Xóa người dùng
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}