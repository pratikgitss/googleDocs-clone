import { Editor } from "./Editor";
import { Toolbar } from "./Toolbar";

interface DocumentIdPageProps {
  params: Promise<{ documentId: String }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Toolbar></Toolbar>
      <Editor></Editor>
    </div>
  );
};

export default DocumentIdPage;
