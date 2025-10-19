export default function () {
	return (
		<div
			className="fixed inset-0 bg-white flex items-center justify-center p-4"
			style={{
				backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.3) 2px, rgba(0,0,0,.3) 4px),
							repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.3) 2px, rgba(0,0,0,.3) 4px)`,
			}}
		>
			<div
				className="bg-white border-8 border-black p-8 max-w-md w-full"
				style={{ boxShadow: '12px 12px 0px rgba(0,0,0,0.8)' }}
			>
				<div className="text-center">
					<div className="text-6xl mb-6">🖥️</div>

					<h1
						className="text-3xl font-bold text-black mb-4 uppercase"
						style={{ fontFamily: 'monospace', letterSpacing: '3px' }}
					>
						Desktop Only
					</h1>

					<p
						className="text-black font-bold text-lg mb-2"
						style={{ fontFamily: 'monospace' }}
					>
						Mobile not supported yet.
					</p>

					<p
						className="text-black font-bold text-base"
						style={{ fontFamily: 'monospace' }}
					>
						Please open on desktop.
					</p>
				</div>
			</div>
		</div>
	);
}
