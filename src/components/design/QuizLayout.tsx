import { ReactNode } from "react";

interface QuizLayoutProps {
	topBar?: ReactNode;
	children: ReactNode;
}

const QuizLayout = ({ topBar, children }: QuizLayoutProps) => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-2 sm:p-4 py-4 sm:py-6 md:py-8">
			<div className="max-w-3xl mx-auto">
				{topBar}
				{children}
			</div>
		</div>
	);
};

export default QuizLayout;


