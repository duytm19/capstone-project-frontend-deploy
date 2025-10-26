import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  MoreHorizontal, 
  Eye, 
  Send, 
  Bell,
  Plus,
  Users,
  MessageCircle
} from 'lucide-react';
import { mockNotifications } from '@/data/admin-mock';
import { Notification } from '@/types/admin';
import StatCard from '@/components/admin/StatCard';
import FilterSection from '@/components/admin/FilterSection';
import DataTable from '@/components/admin/DataTable';

export default function NotificationsManagement() {
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    content: '',
    notificationTypeId: ''
  });

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || notification.notificationType.name === typeFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'seen' && notification.seen) ||
      (statusFilter === 'unseen' && !notification.seen);
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    totalNotifications: notifications.length,
    unreadNotifications: notifications.filter(n => !n.seen).length,
    systemNotifications: notifications.filter(n => n.notificationType.name === 'SYSTEM').length,
    userNotifications: notifications.filter(n => n.notificationType.name === 'USER').length
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (seen: boolean) => {
    return seen ? 
      <Badge variant="outline">Đã xem</Badge> : 
      <Badge variant="default">Chưa xem</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const typeMap = {
      'SYSTEM': { label: 'Hệ thống', variant: 'default' as const },
      'USER': { label: 'Người dùng', variant: 'secondary' as const },
      'ADMIN': { label: 'Quản trị', variant: 'destructive' as const }
    };
    
    const typeInfo = typeMap[type as keyof typeof typeMap] || { label: type, variant: 'outline' as const };
    return <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>;
  };

  const handleCreateNotification = () => {
    // In a real app, this would make an API call
    console.log('Creating notification:', newNotification);
    setIsCreateDialogOpen(false);
    setNewNotification({ title: '', content: '', notificationTypeId: '' });
  };

  const columns = [
    {
      key: 'notification',
      header: 'Thông báo',
      render: (notification: Notification) => (
        <div className="max-w-xs">
          <div className="font-medium truncate">{notification.title}</div>
          <div className="text-sm text-muted-foreground truncate">
            {notification.content}
          </div>
        </div>
      )
    },
    {
      key: 'type',
      header: 'Loại',
      render: (notification: Notification) => getTypeBadge(notification.notificationType.name)
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (notification: Notification) => getStatusBadge(notification.seen)
    },
    {
      key: 'createdAt',
      header: 'Ngày tạo',
      render: (notification: Notification) => (
        <div className="text-sm">{formatDate(notification.createdAt)}</div>
      )
    },
    {
      key: 'actions',
      header: 'Thao tác',
      render: (notification: Notification) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Mở menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setSelectedNotification(notification)}>
              <Eye className="mr-2 h-4 w-4" />
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Send className="mr-2 h-4 w-4" />
              Gửi lại
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  const typeOptions = [
    { value: 'all', label: 'Tất cả loại' },
    { value: 'SYSTEM', label: 'Hệ thống' },
    { value: 'USER', label: 'Người dùng' },
    { value: 'ADMIN', label: 'Quản trị' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'seen', label: 'Đã xem' },
    { value: 'unseen', label: 'Chưa xem' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý thông báo</h1>
        <p className="text-muted-foreground">
          Quản lý và gửi thông báo đến người dùng
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng thông báo"
          value={stats.totalNotifications.toString()}
          description="Tất cả thông báo"
          icon={Bell}
        />
        <StatCard
          title="Chưa xem"
          value={stats.unreadNotifications.toString()}
          description="Thông báo chưa xem"
          icon={MessageCircle}
        />
        <StatCard
          title="Hệ thống"
          value={stats.systemNotifications.toString()}
          description="Thông báo hệ thống"
          icon={Bell}
        />
        <StatCard
          title="Người dùng"
          value={stats.userNotifications.toString()}
          description="Thông báo người dùng"
          icon={Users}
        />
      </div>

      <FilterSection
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Tìm kiếm theo tiêu đề hoặc nội dung..."
        filters={[
          {
            value: typeFilter,
            onChange: setTypeFilter,
            options: typeOptions,
            placeholder: "Lọc theo loại"
          },
          {
            value: statusFilter,
            onChange: setStatusFilter,
            options: statusOptions,
            placeholder: "Lọc theo trạng thái"
          }
        ]}
        showAddButton={true}
        onAddClick={() => setIsCreateDialogOpen(true)}
        addButtonText="Tạo thông báo"
      />

      <DataTable
        title="Danh sách thông báo"
        description={`Tổng cộng ${notifications.length} thông báo`}
        data={filteredNotifications}
        columns={columns}
        emptyMessage="Không tìm thấy thông báo nào"
      />

      {/* Create Notification Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tạo thông báo mới</DialogTitle>
            <DialogDescription>
              Tạo và gửi thông báo đến người dùng
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Tiêu đề</label>
              <input
                type="text"
                value={newNotification.title}
                onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-input rounded-md text-sm mt-1"
                placeholder="Nhập tiêu đề thông báo"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Nội dung</label>
              <Textarea
                value={newNotification.content}
                onChange={(e) => setNewNotification(prev => ({ ...prev, content: e.target.value }))}
                className="mt-1"
                placeholder="Nhập nội dung thông báo"
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Loại thông báo</label>
              <select
                value={newNotification.notificationTypeId}
                onChange={(e) => setNewNotification(prev => ({ ...prev, notificationTypeId: e.target.value }))}
                className="w-full px-3 py-2 border border-input rounded-md text-sm mt-1"
                title="Chọn loại thông báo"
              >
                <option value="">Chọn loại thông báo</option>
                <option value="system">Hệ thống</option>
                <option value="user">Người dùng</option>
                <option value="admin">Quản trị</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleCreateNotification}>
                <Send className="mr-2 h-4 w-4" />
                Tạo và gửi
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Detail Dialog */}
      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết thông báo</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về thông báo
            </DialogDescription>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tiêu đề</label>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedNotification.title}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Nội dung</label>
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                  {selectedNotification.content}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Loại thông báo</label>
                  <div className="mt-1">
                    {getTypeBadge(selectedNotification.notificationType.name)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Trạng thái</label>
                  <div className="mt-1">
                    {getStatusBadge(selectedNotification.seen)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Ngày tạo</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(selectedNotification.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">ID</label>
                  <p className="text-sm text-muted-foreground font-mono mt-1">
                    {selectedNotification.id}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}