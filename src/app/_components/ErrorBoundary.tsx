"use client";

import { Component, ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="px-6 py-24 max-w-2xl mx-auto text-center">
            <h1 className="font-display text-2xl font-semibold">Something went wrong</h1>
            <p className="text-sm mt-3" style={{ color: "var(--cp-text-muted)" }}>
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg text-sm font-medium"
              style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
            >
              Go home
            </Link>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
