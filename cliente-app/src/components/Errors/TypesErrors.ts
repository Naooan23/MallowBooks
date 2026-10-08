
export interface ErrorData {
  message: string;
  success: boolean;
}

export interface ErrorContextType {
  showError: (data: ErrorData) => void;
  hideError: () => void;
}