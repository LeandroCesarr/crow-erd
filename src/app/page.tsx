import packageJSON from "@/../package.json";
import { Metadata } from 'next';
import { CrowIcon } from '@/components/icons/CrowIcon';
import { EditorFileLoader } from '@/components/EditorFileLoader';
import { NewDiagramCreator } from "@/components/NewDiagramCreator";

export const metadata: Metadata = {
  title: 'Dashboard - Crow ERD',
};

export default function Page(): JSX.Element {
  return (
    <main className="h-screen bg-background text-foreground flex flex-col justify-center items-center overflow-hidden bg-[url(/bg.jpg)] bg-cover ">
      <div className="max-w-[800px] max-h-[600px] h-full w-full grid grid-cols-2 border border-border items-stretch rounded-md overflow-hidden bg-background">
        <div className="bg-muted p-10 text-white flex flex-col justify-between">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <CrowIcon className="mr-2 h-10 w-10 fill-current" />
            Crow ERD
          </div>

          <blockquote className="space-y-2">
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at
              scelerisque massa. Nullam iaculis commodo ex sit amet
              pellentesque.
            </p>
            <footer className="text-sm">Cesinha</footer>
          </blockquote>
        </div>

        <div className="flex items-center justify-center p-10 text-center relative">
          <div className="">
            <h1 className="text-2xl font-semibold tracking-tight">
              Start organizing your diagrams like a developer
            </h1>

            <div className="mt-10 flex justify-center gap-3">
              <NewDiagramCreator />
              <EditorFileLoader />
            </div>
          </div>

          <small
            className="absolute right-4 bottom-4"
          >
            Version: {packageJSON.version}
          </small>
        </div>
      </div>
    </main>
  );
}
