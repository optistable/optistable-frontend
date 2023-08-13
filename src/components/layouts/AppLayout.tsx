import Navbar from 'components/ui/Navbar';
import type { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <>
                <Navbar />
                <main className="flex flex-1 flex-col items-center">
                    {children}
                </main>
        </>
    );
}
