import { Button } from "@/components/ui/button";

interface QuizOptionProps {
	label: string;
	isSelected: boolean;
	isAnswer: boolean;
	showFeedback: boolean;
	isCorrect: boolean;
	disabled?: boolean;
	onSelect: () => void;
}

const QuizOption = ({ label, isSelected, isAnswer, showFeedback, isCorrect, disabled, onSelect }: QuizOptionProps) => {
	let buttonClass = 'h-24 text-2xl sm:text-3xl font-bold shadow-button btn-bounce';
	if (showFeedback) {
		if (isAnswer) {
			buttonClass += ' bg-success text-white';
		} else if (isSelected && !isCorrect) {
			buttonClass += ' bg-destructive text-white';
		} else {
			buttonClass += ' opacity-50';
		}
	} else if (isSelected) {
		buttonClass += ' bg-primary text-white';
	} else {
		buttonClass += ' bg-gradient-to-br from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30';
	}

	return (
		<Button size="lg" className={buttonClass} onClick={onSelect} disabled={disabled}>
			{label}
		</Button>
	);
};

export default QuizOption;


