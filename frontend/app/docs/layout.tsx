import DocsNav from "@/components/docs/DocsNav";
import DocsSidebar from "@/components/docs/DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DocsNav />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:py-14">
        <DocsSidebar />
        <main className="min-w-0 flex-1 docs-prose">{children}</main>
      </div>
    </>
  );
}
