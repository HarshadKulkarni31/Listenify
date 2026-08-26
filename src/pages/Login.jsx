import { useState } from "react";
import { Link, useNavigate } from "react-router";

import {
  AudioLines,
  Disc3,
  Eye,
  EyeOff,
  Headphones,
  ListMusic,
  Mic2,
  Music2,
  Volume2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import PixelBackground from "../components/PixelBackground";

function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="flex min-h-screen">
        {/* ================================================= */}
        {/* LEFT BRANDING */}
        {/* ================================================= */}

        <section className="relative hidden min-h-screen w-1/2 items-center justify-center overflow-hidden border-r border-white/10 bg-[#050505] lg:flex">
          <PixelBackground />

          <div className="absolute inset-0 z-[1] bg-black/20" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#1ed760]/40 bg-black/60">
              {" "}
              <Music2 size={38} strokewidth={1.5} className="text-green-500" />
            </div>

            <h1 className="text-5xl font-bold tracking-[0.2em] text-white xl:text-6xl">
              LISTENIFY
            </h1>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-green-500">
              Your music. Your world.
            </p>
          </div>
        </section>

        {/* ================================================= */}
        {/* LOGIN */}
        {/* ================================================= */}

        <section className="flex min-h-screen w-full items-center justify-center bg-[#090909] px-6 py-12 sm:px-10 lg:w-1/2 lg:px-16">
          <div className="w-full max-w-md">
            {/* Header */}

            <div className="mb-10">
              <h2 className="text-4xl font-bold tracking-tight">
                Welcome back
              </h2>

              <p className="mt-3 leading-relaxed text-white/45">
                Log in to continue listening to your favorite music.
              </p>
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white/80"
                >
                  Email
                </label>

                <div className="login-input-wrapper">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="login-input"
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-white/80"
                >
                  Password
                </label>

                <div className="relative login-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="login-input pr-12"
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

              {/* Forgot password */}

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-white/40 transition hover:text-white"
                >
                  Forgot password?
                </button>
              </div>

              {/* Error */}

              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Login */}

              <button
                type="submit"
                disabled={loading}
                className="login-button w-full"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            {/* Divider */}

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs uppercase tracking-wider text-white/30">
                or continue with
              </span>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Social buttons */}

            <div className="flex justify-center gap-4">
              <button
                type="button"
                disabled
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/50"
                title="Google login coming later"
              >
                G
              </button>

              <button
                type="button"
                disabled
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xs text-white/50"
                title="GitHub login coming later"
              >
                GH
              </button>
            </div>

            {/* Signup */}

            <p className="mt-8 text-center text-sm text-white/40">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-white transition hover:text-white/60"
              >
                Sign up
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
