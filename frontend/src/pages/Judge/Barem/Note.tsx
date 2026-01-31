import { Check, NotebookPen } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

import { Textarea } from "~/components/ui/textarea";

type NoteProps = {
    note?: string;
    candidateId: string;
    codeBarem: string;
    keyId: string;
    handleNoteChange?: (keyId: string, note: string) => void;
    disabled?: boolean;
};

export function Note({ note, keyId, handleNoteChange, disabled }: NoteProps) {
    const [noteValue, setNoteValue] = useState(note || "");
    const debounceTimerRef = useRef<number | null>(null);
    const isUserEditingRef = useRef(false);

    useEffect(() => {
        if (!isUserEditingRef.current && note !== undefined) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setNoteValue(note || "");
        }
    }, [note]);

    useEffect(() => {
        if (!isUserEditingRef.current) return;

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = window.setTimeout(() => {
            handleNoteChange?.(keyId, noteValue);
            isUserEditingRef.current = false;
        }, 500);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [noteValue, keyId, handleNoteChange]);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div
                    className={`relative rounded-xl border-2 bg-white p-2 ${disabled ? "pointer-events-none opacity-50" : ""}`}
                    aria-disabled={disabled}
                >
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div>
                                {note ? (
                                    <div className="absolute -top-2 -right-2 flex h-3 w-3 items-center justify-center rounded-full bg-green-500 text-white">
                                        <Check />
                                    </div>
                                ) : null}
                                <NotebookPen size={20} />
                            </div>
                        </TooltipTrigger>
                        {note && <TooltipContent>{note}</TooltipContent>}
                    </Tooltip>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Ghi chú</AlertDialogTitle>

                    <Textarea
                        disabled={disabled}
                        placeholder="Ghi chú ...."
                        onChange={(e) => {
                            isUserEditingRef.current = true;
                            setNoteValue(e.target.value);
                        }}
                        value={noteValue}
                        className="min-h-[120px] text-base"
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                    <AlertDialogAction className="bg-black text-white">Xác nhận</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
