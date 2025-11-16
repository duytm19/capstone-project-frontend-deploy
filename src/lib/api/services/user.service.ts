import apiClient from '../config';
// Giả-định-ApiResponse-và-User-được-export-từ-file-types-chung
import type { ApiResponse } from '../types'; 
import type {User} from '@/types/type'

class UserService {
  /**
   * Lấy-thông-tin-người-dùng-hiện-tại-(đã-xác-thực)
   */
  
  async getProfile():Promise<ApiResponse<User>>{
    const response = await apiClient.get<ApiResponse<User>>('/users/me');
    return response.data;
  }
  async getMe(): Promise<ApiResponse<User>> {
    // Endpoint-này-bạn-cần-có-ở-backend
    // Nó-sẽ-đọc-token-từ-header-và-trả-về-user-tương-ứng
    const response = await apiClient.get<ApiResponse<User>>('/users/me');
    return response.data;
  }
}

export const userService = new UserService();