export default function CreateActivity({
	isOpen,
	onClose,
	newActivity,
	setNewActivity,
	handleKeyPress,
	addActivity,
}: {
	isOpen: boolean;
	onClose: () => void;
	newActivity: string;
	setNewActivity: React.Dispatch<React.SetStateAction<string>>;
	handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	addActivity: () => void;
}) {
	return (
		<>
			{isOpen && (
				<>
					<div
						className="fixed inset-0 bg-opacity-50 z-40"
						onClick={onClose}
						style={{
							backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.3) 2px, rgba(0,0,0,.3) 4px),
							repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.3) 2px, rgba(0,0,0,.3) 4px)`,
						}}
					/>

					<div className="fixed inset-0 flex items-center justify-center z-50 p-4">
						<div
							className="bg-white border-8 border-black p-8 max-w-2xl w-full relative"
							style={{ boxShadow: '12px 12px 0px rgba(0,0,0,0.8)' }}
						>
							<button
								onClick={onClose}
								className="absolute top-4 right-4 bg-black text-white hover:bg-white hover:text-black border-4 border-black w-10 h-10 flex items-center justify-center font-bold text-xl transition-colors hover:cursor-pointer"
								style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
							>
								×
							</button>

							<h1
								className="text-4xl font-bold text-black mb-6 text-center uppercase"
								style={{ fontFamily: 'monospace', letterSpacing: '3px' }}
							>
								Add Activity
							</h1>

							<div className="space-y-4">
								<div>
									<label
										className="block text-black font-bold mb-2 uppercase text-sm"
										style={{ fontFamily: 'monospace' }}
									>
										Activity Name
									</label>
									<input
										type="text"
										value={newActivity}
										onChange={(e) => setNewActivity(e.target.value)}
										onKeyDown={handleKeyPress}
										placeholder="What activity do you want others to do?"
										className="w-full px-4 py-3 bg-gray-100 border-4 border-black text-black font-bold focus:outline-none focus:bg-white text-base"
										style={{ fontFamily: 'monospace' }}
										autoFocus
									/>
								</div>

								<button
									onClick={addActivity}
									className="w-full bg-black hover:bg-white text-white hover:text-black border-4 border-black px-6 py-4 font-bold transition-all duration-200 uppercase text-lg mt-6 cursor-pointer"
									style={{
										fontFamily: 'monospace',
										boxShadow: '6px 6px 0px rgba(0,0,0,0.5)',
									}}
								>
									Create Activity
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
