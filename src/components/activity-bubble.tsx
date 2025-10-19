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
