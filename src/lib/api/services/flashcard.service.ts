import apiClient from '../config';
import type { ApiResponse } from '../types';
import type { FlashcardDeck, Flashcard } from '@/types/type'; // Giả sử type của bạn đã có

// === TYPES ===
// (Đây là các DTO - Data Transfer Objects cho form)
export interface DeckFormDTO {
  title: string;
  description?: string;
  isPublic: boolean;
}

export interface CardFormDTO {
  frontContent: string;
  backContent: string;
  exampleSentence?: string;
  deckId: string; // Cần thiết khi tạo thẻ
}

// === SERVICE CLASS ===

class FlashcardService {
  // --- Deck API ---
  async getMyDecks(): Promise<ApiResponse<FlashcardDeck[]>> {
    const response = await apiClient.get<ApiResponse<FlashcardDeck[]>>('/flashcard-decks/my-decks');
    return response.data;
  }

  async createDeck(data: DeckFormDTO): Promise<ApiResponse<FlashcardDeck>> {
    const response = await apiClient.post<ApiResponse<FlashcardDeck>>('/flashcard-decks', data);
    return response.data;
  }

  async updateDeck(deckId: string, data: Partial<DeckFormDTO>): Promise<ApiResponse<FlashcardDeck>> {
    const response = await apiClient.put<ApiResponse<FlashcardDeck>>(`/flashcard-decks/${deckId}`, data);
    return response.data;
  }

  async deleteDeck(deckId: string): Promise<ApiResponse<any>> {
    const response = await apiClient.delete(`/flashcard-decks/${deckId}`);
    return response.data;
  }

  // --- Card API ---
  async getCardsByDeck(deckId: string): Promise<ApiResponse<Flashcard[]>> {
    const response = await apiClient.get<ApiResponse<Flashcard[]>>(`/flashcards?deckId=${deckId}`);
    return response.data;
  }

  async createCard(data: CardFormDTO): Promise<ApiResponse<Flashcard>> {
    const response = await apiClient.post<ApiResponse<Flashcard>>('/flashcards', data);
    return response.data;
  }

  async updateCard(cardId: string, data: Partial<CardFormDTO>): Promise<ApiResponse<Flashcard>> {
    const response = await apiClient.patch<ApiResponse<Flashcard>>(`/flashcards/${cardId}`, data);
    return response.data;
  }

  async deleteCard(cardId: string): Promise<ApiResponse<any>> {
    const response = await apiClient.delete(`/flashcards/${cardId}`);
    return response.data;
  }
}

export const flashcardService = new FlashcardService();