import rawPackageJSON from "@/../package.json";
import { Metadata } from 'next';
import { CrowIcon } from '@/components/icons/CrowIcon';
import { EditorFileLoader } from '@/components/EditorFileLoader';
import { NewDiagramCreator } from "@/components/NewDiagramCreator";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const packageJSON = rawPackageJSON as any

export const metadata: Metadata = {
  title: 'Dashboard - Crow ERD',
};

export default function Page(): JSX.Element {
  return (
    <main className="h-screen bg-background text-foreground flex flex-col justify-center items-center overflow-hidden bg-[url(/bg.jpg)] bg-cover p-6">
      <div className="max-w-[50rem] sm:max-h-[37.5rem] sm:h-full w-full grid sm:grid-cols-2 border border-border items-stretch rounded-md overflow-auto bg-background">
        <div className="bg-muted p-10 dark:text-white  flex flex-col justify-between">
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
          <Link href={packageJSON.repository.url} target="_blank" className="absolute top-2 right-2">
            <GitHubLogoIcon className="w-9 h-9 border border-muted p-1 rounded-sm hover:bg-muted transition-colors" />
          </Link>

          <div className="">
            <h1 className="text-2xl font-semibold tracking-tight">
              Start organizing your diagrams like a developer
            </h1>

            <div className="mt-10 flex justify-center gap-3 flex-col sm:flex-row">
              <NewDiagramCreator />
              <EditorFileLoader />
            </div>
          </div>

          <small
            className="absolute right-2 bottom-2"
          >
            Version: {packageJSON.version}
          </small>
        </div>
      </div>
    </main>
  );
}
