import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center space-x-2 space-x-reverse">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <span className="text-muted-foreground">טוען...</span>
      </div>
    </div>
  );
} 