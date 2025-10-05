import { useToast as useToastOriginal } from '@/components/ui/use-toast';

/**
 * Enhanced toast hook with preset configurations
 */
export const useToast = () => {
  const { toast } = useToastOriginal();

  const showSuccess = (title, description) => {
    toast({
      title,
      description,
      variant: 'default',
      className: 'bg-green-50 border-green-200 text-green-900',
      duration: 5000, // Auto-dismiss after 5 seconds
    });
  };

  const showError = (title, description) => {
    toast({
      title: title || 'שגיאה',
      description: description || 'אירעה שגיאה. אנא נסה שוב.',
      variant: 'destructive',
      className: 'bg-red-50 border-red-200 text-red-900',
      duration: 5000,
    });
  };

  const showWarning = (title, description) => {
    toast({
      title,
      description,
      className: 'bg-orange-50 border-orange-200 text-orange-900',
    });
  };

  const showInfo = (title, description) => {
    toast({
      title,
      description,
      className: 'bg-blue-50 border-blue-200 text-blue-900',
    });
  };

  return {
    toast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

