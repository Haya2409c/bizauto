'use client';
import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import AuthCard from "@/components/AuthCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const router = useRouter();
 // Redirect to dashboard if already signed in
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Fields",
        description: "Please enter email and password",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      toast({
        title: "Welcome Back!",
        description: "Signed in successfully",
      });

      if (formData.remember) {
        localStorage.setItem("user_email", formData.email);
      } else {
        localStorage.removeItem("user_email");
      }

      router.push("/dashboard");
      setLoading(false);
    }, 1500);
  };

  return (
    <AuthCard
      title="BizAuto"
      description="AI-Powered Business Automation Platform"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="trader@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-input"
          />
        </div>

        {/* Password */}
        <div className="space-y-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="bg-input pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-[38px] text-muted-foreground"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Remember me */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={formData.remember}
            onCheckedChange={(val: boolean) =>
              setFormData({ ...formData, remember: val })
            }
          />
          <Label htmlFor="remember" className="cursor-pointer">
            Remember me
          </Label>
        </div>

  <Button
  type="submit"
  disabled={loading}
  className={`w-full font-semibold py-2.5 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white
    ${loading
      ? "bg-gradient-to-r from-blue-500 to-indigo-500 opacity-80 cursor-not-allowed"
      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 focus:ring-indigo-500"
    }`}
  size="lg"
>
  {loading ? "Signing in..." : "Sign In"}
</Button>


        {/* Links */}
        <div className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/signUp")}
            className="text-primary font-medium hover:underline"
          >
            Sign Up
          </button>
        </div>

       <div className="mt-4 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 py-3 px-4 shadow-sm text-center transition hover:shadow-md">
  <p className="text-sm font-medium text-blue-700">
    Demo credentials: <span className="font-semibold text-indigo-600">any email / password</span>
  </p>
</div>

      </form>
    </AuthCard>
  );
};

export default SignIn;
