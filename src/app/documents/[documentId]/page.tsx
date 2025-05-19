import { Editor } from "./Editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./Toolbar";

interface DocumentIdPageProps {
  params: Promise<{ documentId: String }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Navbar/>
      <Toolbar></Toolbar>
      <Editor></Editor>
    </div>
  );
};

export default DocumentIdPage;
