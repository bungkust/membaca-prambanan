import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
	current: number;
	total: number;
	level?: string;
}

const QuizProgress = ({ current, total, level }: QuizProgressProps) => {
	const value = (current / total) * 100;
	return (
		<div className="mb-6">
			<div className="flex items-center justify-between mb-2">
				<span className="text-sm font-semibold text-muted-foreground">
					Soal {current} dari {total}
				</span>
				{level && (
					<span className="text-sm font-semibold text-muted-foreground">Level: {level}</span>
				)}
			</div>
			<Progress value={value} className="h-3" />
		</div>
	);
};

export default QuizProgress;


