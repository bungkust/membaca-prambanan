import { ReactNode } from "react";

const QuizCard = ({ children }: { children: ReactNode }) => {
	return (
		<div className="bg-card rounded-3xl shadow-playful p-8 mb-6">
			{children}
		</div>
	);
};

export default QuizCard;


