import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

const AuthCard = ({ title, description, children }: AuthCardProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#e8eef5] to-[#f0f4f8] px-4 sm:px-6 py-10">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="space-y-3 text-center pb-4">
          {/* Logo / Title */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              {title}
            </CardTitle>
          </div>

          {/* Description */}
          <CardDescription className="text-sm sm:text-base text-gray-500 leading-relaxed px-2 sm:px-4">
            {description}
          </CardDescription>
        </CardHeader>

        {/* Form / Child Content */}
        <CardContent className="space-y-4 sm:space-y-5 px-3 sm:px-6 pb-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCard;
