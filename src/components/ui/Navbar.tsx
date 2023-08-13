import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import OptistableLogo from '../../../public/logo.svg';

export default function Navbar() {
    return (
        <header className="bg-secondary sticky top-0 z-10">
            <div className="mx-auto flex w-4/5 items-center justify-between border-b border-b-neutral-800 px-4 py-2">
                <div className="flex items-center space-x-1.5">
                    <Link href="/" className="flex h-full space-x-1.5">
                        <Image
                            src={OptistableLogo}
                            alt="Optistable"
                            height={45}
                        />
                        <div className="title text-uppercase flex items-center">
                            <p className="font-bold text-optimism-color">OP</p>
                            <p className="font-bold text-white">TISTABLE</p>
                        </div>
                    </Link>
                    <div className="nav-link flex items-center p-2">
                        <Link href="/subscribe">Get Insured</Link>
                    </div>
                </div>

                <ConnectButton showBalance={false} />
            </div>
        </header>
    );
}
