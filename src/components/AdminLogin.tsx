import { Shield, Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { loginAdmin } from "../authService";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setIsLoggingIn(true);
    setError(null);

    try {
      await loginAdmin(email, password);
      onLoginSuccess();
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || "Authentication failed. Please verify your credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#F6F8FB] flex flex-col justify-center items-center px-4 py-12" id="admin_login_view">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto bg-[#EAF3FF] p-4 rounded-2xl text-[#1E5EFF] w-fit shadow-md shadow-blue-500/5">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#222222]">Secure Admin Portal</h2>
          <p className="text-xs text-[#666666]">
            Enter your credentials to manage Vijay Consultancy CRM
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-xs font-semibold border border-rose-100 leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5" id="login_form">
          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="login_email" className="text-[10px] font-bold text-[#222222] uppercase tracking-wide flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>Admin Email</span>
            </label>
            <input
              type="email"
              id="login_email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vijayconsultancy.com"
              className="w-full bg-white border border-gray-200 focus:border-[#1E5EFF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="login_password" className="text-[10px] font-bold text-[#222222] uppercase tracking-wide flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="login_password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white border border-gray-200 focus:border-[#1E5EFF] rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none transition-colors shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#666666] hover:text-[#222222] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-[#1E5EFF] hover:bg-[#1E5EFF]/90 disabled:bg-blue-300 text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In to CRM</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
