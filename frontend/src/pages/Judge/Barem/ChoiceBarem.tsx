import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

const ChoiceBarem = ({
    barem,
    setBarem,
}: {
    barem: "personal" | "team";
    setBarem: React.Dispatch<React.SetStateAction<"personal" | "team">>;
}) => {
    return (
        <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-4">
            <RadioGroup
                value={barem}
                onValueChange={(value) => setBarem(value as "personal" | "team")}
                className="flex flex-row gap-2"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="personal" id="personal" className="peer hidden" />
                    <label
                        htmlFor="personal"
                        className={`text-primary cursor-pointer rounded-md border-2 border-gray-200 px-4 py-2 font-semibold transition-colors duration-150 ${barem === "personal" ? "border-primary bg-primary/10 text-primary" : ""} hover:border-primary focus:outline-none`}
                    >
                        1. Bảng điểm cá nhân
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="team" id="team" className="peer hidden" />
                    <label
                        htmlFor="team"
                        className={`text-primary cursor-pointer rounded-md border-2 border-gray-200 px-4 py-2 font-semibold transition-colors duration-150 ${barem === "team" ? "border-primary bg-primary/10 text-primary" : ""} hover:border-primary focus:outline-none`}
                    >
                        2. Bảng điểm cả nhóm
                    </label>
                </div>
            </RadioGroup>
            <span className="text-sm text-gray-600">Chọn loại bảng điểm để chấm.</span>
        </div>
    );
};

export default ChoiceBarem;
