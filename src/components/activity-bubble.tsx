import type { Activity, Position } from '../types/activity';

export default function ActivityBubble({
	activities,
	positions,
	incrementActivity,
}: {
	activities: Activity[];
	positions: Record<number, Position>;
	incrementActivity: (id: number) => void;
}) {
	if (!activities) {
		return (
			<div
				className="flex items-center justify-center min-h-screen bg-white"
				style={{
					backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.05) 2px, rgba(0,0,0,.05) 4px),
                           repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.05) 2px, rgba(0,0,0,.05) 4px)`,
				}}
			>
				<style>
					{`
			@keyframes float {
				0% { transform: translateY(0); }
				50% { transform: translateY(-8px); }
				100% { transform: translateY(0); }
			}
		`}
				</style>
				<div
					className="text-center"
					style={{
						animation: 'float 1.2s ease-in-out infinite',
						fontFamily: 'monospace',
					}}
				>
					<h1
						className="text-4xl font-bold text-black"
						style={{ fontFamily: 'monospace' }}
					>
						PLEASE WAIT
					</h1>
				</div>
			</div>
		);
	}
	return (
		<div className="flex-1 relative overflow-hidden">
			{activities.map((activity) => {
				const pos = positions[activity.id] || { x: 50, y: 50 };
				return (
					<div
						key={activity.id}
						onClick={() => incrementActivity(activity.id)}
						className="absolute cursor-pointer group z-10 hover:z-50"
						style={{
							left: `${pos.x}%`,
							top: `${pos.y}%`,
							transform: 'translate(-50%, -50%)',
							animation: `float-${activity.id % 3} ${
								3 + (activity.id % 3)
							}s ease-in-out infinite`,
							fontFamily: 'monospace',
						}}
					>
						<div
							className="bg-white border-4 border-black px-6 py-3 hover:bg-black hover:text-white transition-all duration-200"
							style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.8)' }}
						>
							<div className="font-bold text-sm whitespace-nowrap">
								{activity.name}
							</div>
						</div>

						<div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
							<div
								className="bg-black border-4 border-white px-4 py-2 whitespace-nowrap"
								style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.8)' }}
							>
								<div className="text-white font-bold text-xs">
									👥 {activity.participantCount} people have done this
								</div>
								<div className="text-gray-400 font-bold text-xs">
									created by {activity.owner}
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
