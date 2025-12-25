export default function Footer() {
  return (
    <footer className="border-t border-borderSoft bg-white/60">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center">
        <div className="text-sm font-semibold text-slate-600">
          © {new Date().getFullYear()} MMO Blogs — Knowledge • Tools • Growth
        </div>
      </div>
    </footer>
  );
}
