import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateCourse } from '@/hooks/api';
import { CourseLevel } from '@/types/type';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const COURSE_LEVELS: CourseLevel[] = [
  CourseLevel.A1,
  CourseLevel.A2,
  CourseLevel.B1,
  CourseLevel.B2,
  CourseLevel.C1,
  CourseLevel.C2,
];

export default function CreateCourseDialog({ open, onOpenChange, onSuccess }: Props) {
  const createCourseMutation = useCreateCourse();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    courseLevel: undefined as CourseLevel | undefined,
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề khóa học là bắt buộc';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Tiêu đề không được vượt quá 100 ký tự';
    }

    if (formData.price === '') {
      newErrors.price = 'Giá khóa học là bắt buộc';
    } else {
      const priceNum = parseFloat(formData.price);
      if (isNaN(priceNum) || priceNum < 0) {
        newErrors.price = 'Giá phải là số không âm';
      }
    }

    if (formData.courseLevel !== undefined && !COURSE_LEVELS.includes(formData.courseLevel)) {
      newErrors.courseLevel = 'Level không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form field changes
  const handleChange = (field: string, value: string | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Prepare payload
    const payload = {
      title: formData.title.trim(),
      price: parseFloat(formData.price),
      ...(formData.description.trim() && { description: formData.description.trim() }),
      ...(formData.category.trim() && { category: formData.category.trim() }),
      ...(formData.courseLevel && { courseLevel: formData.courseLevel as CourseLevel }),
    };

    // Submit
    createCourseMutation.mutate(payload, {
      onSuccess: () => {
        // Reset form
        setFormData({
          title: '',
          description: '',
          price: '',
          category: '',
          courseLevel: undefined,
        });
        setErrors({});
        onOpenChange(false);
        onSuccess?.();
      },
    });
  };

  // Reset form when dialog closes
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        courseLevel: undefined,
      });
      setErrors({});
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo khóa học mới</DialogTitle>
          <DialogDescription>
            Điền thông tin để tạo khóa học mới. Khóa học sẽ ở trạng thái DRAFT sau khi tạo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Tiêu đề khóa học <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="VD: IELTS Speaking Masterclass"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              disabled={createCourseMutation.isPending}
              maxLength={100}
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              placeholder="Mô tả chi tiết về khóa học..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              disabled={createCourseMutation.isPending}
              rows={4}
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">
              Giá (VNĐ) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="VD: 500000"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              disabled={createCourseMutation.isPending}
              min="0"
              step="1000"
              className={errors.price ? 'border-destructive' : ''}
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Danh mục</Label>
            <Input
              id="category"
              placeholder="VD: IELTS, TOEFL, Business English"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              disabled={createCourseMutation.isPending}
              maxLength={100}
            />
          </div>

          {/* Course Level */}
          <div className="space-y-2">
            <Label htmlFor="courseLevel">Level</Label>
            <Select
              {...(formData.courseLevel && { value: formData.courseLevel })}
              onValueChange={(value) => handleChange('courseLevel', value)}
              disabled={createCourseMutation.isPending}
            >
              <SelectTrigger id="courseLevel" className={errors.courseLevel ? 'border-destructive' : ''}>
                <SelectValue placeholder="Chọn level (tùy chọn)" />
              </SelectTrigger>
              <SelectContent>
                {COURSE_LEVELS.map((level) => (
                  <SelectItem key={level} value={level as string}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.courseLevel && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleChange('courseLevel', undefined)}
                disabled={createCourseMutation.isPending}
                className="h-8 text-xs"
              >
                Xóa level
              </Button>
            )}
            {errors.courseLevel && (
              <p className="text-sm text-destructive">{errors.courseLevel}</p>
            )}
          </div>

          {/* Submit buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={createCourseMutation.isPending}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={createCourseMutation.isPending}>
              {createCourseMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Tạo khóa học
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

