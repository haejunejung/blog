import { notFound } from "next/navigation";

interface PageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function Page({ params }: PageProps) {
	const { slug } = await params;

	try {
		const { default: Component } = await import(`@/__articles__/${slug}.mdx`);

		return (
			<div>
				<Component />
			</div>
		);
	} catch (_) {
		notFound();
	}
}
