import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3 space-x-reverse">
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <h3 className="text-sm font-medium text-destructive">
              אירעה שגיאה
            </h3>
            <p className="text-sm text-destructive/80">
              {message}
            </p>
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