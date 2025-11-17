import apiClient from '../config';
import type { ApiResponse } from '../types';
import type { FlashcardDeck, Flashcard ,UserFlashcardProgress} from '@/types/type';

export type ReviewQuality = 1 | 3 | 4 | 5; // Dựa theo backend service

export interface SubmitReviewDTO {
  quality: ReviewQuality;
}
class FlashcardService {
  /**
   * Lấy tất cả bộ thẻ (decks) của user đang đăng nhập
   */
  async getMyDecks(): Promise<ApiResponse<FlashcardDeck[]>> {
    const response = await apiClient.get<ApiResponse<FlashcardDeck[]>>('/flashcard-decks');
    return response.data;
  }

  /**
   * Lấy tất cả thẻ (cards) của một bộ thẻ cụ thể
   */
  async getCardsByDeck(deckId: string): Promise<ApiResponse<Flashcard[]>> {
    const response = await apiClient.get<ApiResponse<Flashcard[]>>(`/flashcards/${deckId}`);
    return response.data;
  }

  /**
   * Lấy tiến độ học của tất cả thẻ trong một bộ (cho StudyMode)
   */
async getReviewQueue(deckId: string): Promise<ApiResponse<Flashcard[]>> {
    // Gọi route mới: /flashcard-review/queue/:deckId
    const response = await apiClient.get<ApiResponse<Flashcard[]>>(`/flashcard-review/queue/${deckId}`);
    return response.data;
  }
  async submitReview(flashcardId: string, data: SubmitReviewDTO): Promise<ApiResponse<UserFlashcardProgress>> {
    // Gọi route mới: /flashcard-review/submit/:flashcardId
    const response = await apiClient.post<ApiResponse<UserFlashcardProgress>>(
      `/flashcard-review/submit/${flashcardId}`,
      data
    );
    return response.data;
  }
}

export const flashcardService = new FlashcardService();