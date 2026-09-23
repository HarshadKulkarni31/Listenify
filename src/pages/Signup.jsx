import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Music2 } from "lucide-react";

import { useAuth } from "../context/useAuth";
import PixelBackground from "../components/PixelBackground";

function Signup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { data, error } = await signUp(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);

    if (data?.session) {
      navigate("/");
      return;
    }

    setMessage(
      "Account created successfully. Please check your email to verify your account.",
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="flex min-h-screen">
        {/* LEFT BRANDING */}

        <section className="relative hidden min-h-screen w-1/2 items-center justify-center overflow-hidden border-r border-white/10 bg-[#050505] lg:flex">
          <PixelBackground />

          <div className="absolute inset-0 z-[1] bg-black/20" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#1ed760]/40 bg-black/60">
              <Music2 size={38} strokeWidth={1.5} className="text-green-500" />
            </div>

            <h1 className="text-5xl font-bold tracking-[0.2em] text-white xl:text-6xl">
              LISTENIFY
            </h1>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-green-500">
              Your music. Your world.
            </p>
          </div>
        </section>

        {/* SIGNUP */}

        <section className="flex min-h-screen w-full items-center justify-center bg-[#090909] px-6 py-12 sm:px-10 lg:w-1/2 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h2 className="text-4xl font-bold tracking-tight">
                Create account
              </h2>

              <p className="mt-3 leading-relaxed text-white/45">
                Join Listenify and start building your music library.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white/80"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="login-input w-full"
                />
              </div>

              {/* Password */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-white/80"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="login-input w-full pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-white/80"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="login-input w-full pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((previous) => !previous)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}

              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Success */}

              {message && (
                <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                  {message}
                </div>
              )}

              {/* Signup button */}

              <button
                type="submit"
                disabled={loading}
                className="login-button w-full"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-white/40">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-white transition hover:text-white/60"
              >
                Log in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Signup;
