import { Button, Flex } from "@/components";
import { Card, CardContent, CardHeader } from "@/components/Card";
import { usePreservedCallback, useStackState } from "@/hooks";
import { cn } from "@/utils/cn";
import { useRef } from "react";

type Status = "pending" | "success" | "error" | "aborted";

const getMessage = (status: Status) => {
	switch (status) {
		case "success":
			return "데이터 요청 성공";
		case "error":
			return "데이터 요청 실패";
		case "aborted":
			return "데이터 요청 취소";
		default:
			return "데이터 요청 중...";
	}
};

const getEmoji = (status: Status) => {
	switch (status) {
		case "success":
			return "✅";
		case "error":
			return "❌";
		case "aborted":
			return "⚠️";
		default:
			return "⌛";
	}
};

export const AbortControllerDemo = () => {
	const { stack: logs, push, clear } = useStackState<Status>();
	const abortController = useRef<AbortController | null>();

	const handleFetch = usePreservedCallback(async () => {
		abortController.current = new AbortController();
		push("pending");

		await fetch("https://httpstat.us/200?sleep=5000", {
			signal: abortController.current?.signal,
		})
			.then((response) => {
				if (response.ok) {
					push("success");
				}
			})
			.catch((error) => {
				if (error instanceof Error && error.name === "AbortError") {
					push("aborted");
					return;
				}

				if (error instanceof Error) {
					push("error");
					return;
				}

				throw error;
			});
	});

	const handleAbort = usePreservedCallback(() => {
		if (abortController.current) {
			abortController.current.abort();
			abortController.current = null;
		}
	});

	return (
		<Card className="w-full">
			<CardHeader className="justify-center items-center">
				<Flex direction="horizontal" className="gap-4 p-4">
					<Button variant="outline" onClick={handleFetch}>
						데이터 요청하기
					</Button>
					<Button variant="outline" onClick={handleAbort}>
						데이터 요청 취소하기
					</Button>
					<Button variant="outline" onClick={clear}>
						로그 초기화
					</Button>
				</Flex>
			</CardHeader>
			<CardContent className="justify-start items-end">
				<Flex direction="vertical" className="gap-2">
					{logs.map((status, index) => {
						return (
							<p
								// biome-ignore lint/suspicious/noArrayIndexKey: there is no key
								key={`${status}-${index}`}
								className={cn({
									"!text-green-500": status === "success",
									"!text-red-500": status === "error",
									"!text-yellow-500": status === "aborted",
									"!text-blue-500": status === "pending",
								})}
							>{`${getEmoji(status)} ${getMessage(status)}`}</p>
						);
					})}
				</Flex>
			</CardContent>
		</Card>
	);
};
