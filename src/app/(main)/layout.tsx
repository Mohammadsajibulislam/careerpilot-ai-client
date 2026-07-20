import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ErrorBoundary from "@/app/_components/ErrorBoundary";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
      >
        Skip to content
      </a>
      <Navbar />
      <ErrorBoundary>
        <main id="main-content" className="min-h-screen outline-none" tabIndex={-1}>
          {children}
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
}