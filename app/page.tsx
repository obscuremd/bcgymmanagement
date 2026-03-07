"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/localComponents/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle email submission (request OTP)
  const handleRequestOTP = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Verification Code Sent!", {
          description: "Check your email for the 6-digit code",
        });
        setStep("otp");
      } else {
        toast.error("Unable to Send Code", {
          description: data.message || "Please check your email and try again",
        });
      }
    } catch (error) {
      toast.error("Connection Error", {
        description: "Unable to connect to the server",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Access Granted!", {
          description: `Welcome back, ${data.data.user.username}`,
        });

        // Redirect to dashboard
        setTimeout(() => {
          router.push("/home");
        }, 800);
      } else {
        toast.error("Invalid Code", {
          description: data.message || "Please check your code and try again",
        });
      }
    } catch (error) {
      toast.error("Verification Failed", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-950/50 backdrop-blur-xl shadow-xl p-8 space-y-8">
        {/* Brand */}
        <div className="flex flex-col items-center space-y-4">
          <Logo />

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              BC Gym Management
            </h1>
            <p className="text-sm opacity-70">
              Gym Membership & Trainer Management Portal
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

        {/* Content */}
        {step === "email" ? (
          <form onSubmit={handleRequestOTP} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-medium">Sign in to continue</h2>
              <p className="text-sm opacity-70">
                Enter your registered email address to receive a one-time
                verification code and access your gym dashboard.
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="bg-neutral-900 border-neutral-800 focus:border-[#d4af37]"
              />

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending Code..." : "Continue"}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-medium">Enter verification code</h2>
              <p className="text-sm opacity-70">
                We sent a 6-digit code to{" "}
                <span className="text-[#d4af37] font-medium">{email}</span>
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
                required
                disabled={isLoading}
                className="bg-neutral-900 border-neutral-800 focus:border-[#d4af37] text-center text-2xl tracking-[0.5em] font-mono"
                autoFocus
              />

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="flex-1 border-neutral-800"
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                  }}
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="flex-1"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    handleRequestOTP({ preventDefault: () => {} } as FormEvent);
                  }}
                  disabled={isLoading}
                  className="text-sm text-[#d4af37] hover:text-[#e6c76a] transition-colors disabled:opacity-50"
                >
                  Didn&apos;t receive a code? Resend
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="space-y-3 text-center">
          <p className="text-xs opacity-70">
            {step === "email"
              ? "One-time passwords are sent only to verified gym members."
              : "Code expires in 10 minutes. Do not share this code with anyone."}
          </p>

          <p className="text-[11px]">
            © {new Date().getFullYear()} BC Gym Management
          </p>
        </div>
      </div>
    </div>
  );
}
