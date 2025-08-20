import Image from "next/image";
import ModelSelect from "./components/ModelSelect";
import UploadFile from "./components/UploadFile";

export default function Home() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="fixed bottom-4 left-4 z-50">
        <ModelSelect />
      </div>

      <UploadFile />
    </div>
  );
}
