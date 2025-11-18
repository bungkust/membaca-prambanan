import { ReactNode } from "react";

const QuizCard = ({ children }: { children: ReactNode }) => {
	return (
		<div className="bg-card rounded-3xl shadow-playful p-4 sm:p-6 md:p-8 mb-6">
			{children}
		</div>
	);
};

export default QuizCard;


