import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface QuizHeaderProps {
	onBack: () => void;
	right?: ReactNode;
}

const QuizHeader = ({ onBack, right }: QuizHeaderProps) => {
	return (
		<div className="flex items-center justify-between mb-6">
			<Button variant="ghost" size="lg" onClick={onBack}>
				<ArrowLeft className="w-5 h-5 mr-2" />
				Kembali
			</Button>
			{right ? <div className="flex items-center gap-2 sm:gap-4">{right}</div> : null}
		</div>
	);
};

export default QuizHeader;


