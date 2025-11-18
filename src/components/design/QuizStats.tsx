interface QuizStatsProps {
	timeRemaining?: number;
	showTimer: boolean;
	stars: number;
}

const StatPill = ({ children }: { children: React.ReactNode }) => (
	<div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-button">
		{children}
	</div>
);

const QuizStats = ({ timeRemaining, showTimer, stars }: QuizStatsProps) => {
	return (
		<div className="flex items-center gap-2 sm:gap-4">
			{showTimer && (
				<StatPill>
					<span className="text-xl sm:text-2xl">⏰</span>
					<span className="text-lg sm:text-xl font-bold">{timeRemaining}</span>
				</StatPill>
			)}
			<StatPill>
				<span className="text-xl sm:text-2xl">⭐</span>
				<span className="text-lg sm:text-xl font-bold">{stars}</span>
			</StatPill>
		</div>
	);
};

export default QuizStats;


