import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import OptistableLogo from '../../../public/logo.svg';
import Withdraw from '../Withdraw';

export default function Navbar() {
    return (
        <header className="bg-secondary sticky  top-0 z-10">
            <div className="mx-auto flex h-full w-4/5 items-center justify-between border-b border-b-neutral-800 px-4 py-2">
                <div className="flex h-full items-center space-x-4">
                    <Link href="/" className="flex  space-x-1.5">
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

                    <div
                        className="nav-link ml-4 flex items-center rounded p-2 text-xl font-bold"
                        style={{ backgroundColor: 'white', color: '#8014a4' }}
                    >
                        <Link href="/">Dashboard</Link>
                    </div>
                    <div
                        className="nav-link ml-4 flex items-center rounded p-2 text-xl font-bold"
                        style={{ backgroundColor: 'white', color: '#8014a4' }}
                    >
                        <Link href="/subscribe-insured">Get Insured</Link>
                    </div>
                </div>
                <Withdraw />
                <ConnectButton showBalance={false} />
            </div>
        </header>
    );
}
