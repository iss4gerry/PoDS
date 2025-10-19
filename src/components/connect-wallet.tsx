import React from 'react';

interface WalletButtonProps {
	account: string | null | undefined;
	connectWallet: () => void;
	disconnectWallet: () => void;
}

export default function WalletButton({
	account,
	connectWallet,
	disconnectWallet,
}: WalletButtonProps) {
	return (
		<>
			{!account ? (
				<button
					onClick={connectWallet}
					className="fixed top-8 right-8 bg-black border-4 border-white px-6 py-3 flex items-center justify-center hover:bg-white hover:border-black group transition-all duration-200 z-50 hover:cursor-pointer"
					style={{
						boxShadow: '6px 6px 0px rgba(0,0,0,0.8)',
						fontFamily: 'monospace',
					}}
				>
					<span className="text-white font-bold text-sm uppercase group-hover:text-black">
						CONNECT WALLET
					</span>
				</button>
			) : (
				<div className="fixed top-8 right-8 z-50 flex items-center gap-3">
					<div
						className="bg-white border-4 border-black px-4 py-3"
						style={{
							boxShadow: '6px 6px 0px rgba(0,0,0,0.8)',
							fontFamily: 'monospace',
						}}
					>
						<div className="text-black font-bold text-xs">
							{account.slice(0, 6)}...{account.slice(-4)}
						</div>
					</div>
					<button
						onClick={disconnectWallet}
						className="bg-black border-4 border-white px-4 py-3 hover:bg-white hover:border-black group transition-all duration-200 hover:cursor-pointer"
						style={{
							boxShadow: '6px 6px 0px rgba(0,0,0,0.8)',
							fontFamily: 'monospace',
						}}
					>
						<span className="text-white font-bold text-xs uppercase group-hover:text-black">
							DISCONNECT
						</span>
					</button>
				</div>
			)}
		</>
	);
}
