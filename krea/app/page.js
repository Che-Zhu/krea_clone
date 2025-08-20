import Image from "next/image";
import ModelSelect from "./components/ModelSelect";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <div className="fixed bottom-4 left-4 z-50">
        <ModelSelect />
      </div>
    </div>
  );
}
