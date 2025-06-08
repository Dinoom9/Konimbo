import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Props interface for ErrorMessage component
 * @interface ErrorMessageProps
 */
interface ErrorMessageProps {
  message: string;      // Error message text to display
  onRetry?: () => void; // Optional retry callback function
}

/**
 * ErrorMessage Component
 * 
 * A reusable error display component that provides:
 * - Consistent error message styling
 * - Alert icon for visual recognition
 * - Optional retry functionality
 * - Accessible error presentation
 * 
 * Used throughout the application for displaying error states
 * with consistent UI and behavior.
 * 
 * @param message - The error message text to display to the user
 * @param onRetry - Optional callback function for retry functionality
 */
export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3 space-x-reverse">
          {/* Alert icon for visual indication */}
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            {/* Error title */}
            <h3 className="text-sm font-medium text-destructive">
              אירעה שגיאה
            </h3>
            {/* Error message content */}
            <p className="text-sm text-destructive/80">
              {message}
            </p>
            {/* Optional retry button - only shown if onRetry callback provided */}
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="mt-3 border-destructive/20 hover:bg-destructive/10"
              >
                נסה שוב
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 