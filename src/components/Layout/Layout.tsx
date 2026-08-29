import { useOutlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';

export const Layout = () => {
  const outlet = useOutlet();

  return (
    <div className="flex min-h-screen font-sans text-slate-900 dark:text-slate-100 relative antialiased p-3 gap-3 bg-[var(--background)] dark:bg-slate-950">
      <div className="hidden md:block sticky top-3 h-[calc(100vh-24px)] shrink-0 z-20">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 z-10 relative min-h-[calc(100vh-24px)]">
        {/* Nền Header đồng bộ với nền chung */}
        <div className="sticky top-0 z-30 pt-1 pb-2 bg-[var(--background)] dark:bg-slate-950">
          <Header />
        </div>
        <main id="layout-main" className="flex-1 px-4 md:px-8 pb-8 relative">
          <div>
            <div className="max-w-[1600px] mx-auto min-h-full w-full">
              {outlet}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
