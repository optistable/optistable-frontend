import {ConnectButton} from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import OptistableLogo from '../../../public/logo.svg';

export default function Navbar() {
    return (
        <header className="bg-secondary sticky  top-0 z-10">
            <div className="mx-auto flex w-4/5 h-full items-center justify-between border-b border-b-neutral-800 px-4 py-2">
                <div className="flex items-center h-full space-x-4">
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

                    <div className="nav-link flex items-center p-2 ml-4 rounded font-bold text-xl"
                         style={{backgroundColor: "white", color: "#8014a4"}}>
                        <Link href="/">Dashboard</Link>
                    </div>
                    <div className="nav-link flex items-center p-2 ml-4 rounded font-bold text-xl"
                    style={{backgroundColor: "white", color: "#8014a4"}}>
                        <Link href="/subscribe-insured">Get Insured</Link>
                    </div>
                </div>

                <ConnectButton showBalance={false}/>
            </div>
        </header>
    );
}
