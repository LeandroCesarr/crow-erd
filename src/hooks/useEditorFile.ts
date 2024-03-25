import { v4 as uuid } from "uuid";
import { useRecoilCallback } from 'recoil';
import { ChangeEvent, useState } from 'react';
import { editorFileSchema } from '@/schemas/editorFileSchema';
import { edgesAtom, loadedFileIdAtom, nodesAtom } from '@/store/editor';
import { useRouter } from 'next/navigation';
import { PagesEnum } from '@/enums/PagesEnum';
import { DEFAULT_DATA } from '@/data/editor';
import { populateRouteParams } from "@/utils/routes";

export function useEditorFile() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const fillFileData = useRecoilCallback((recoil) => (data: any) => {
    const id = uuid();

    recoil.set(nodesAtom, data.nodes);
    recoil.set(edgesAtom, data.edges);
    recoil.set(loadedFileIdAtom, id);

    return id
  });

  function navigateToEditor(id: string) {
    push(populateRouteParams(PagesEnum.EDITOR, { id }));
  }

  async function processFile(file: File) {
    const rawValue = await file.text();
    const parsedValue = JSON.parse(rawValue);

    try {
      const validationResult = editorFileSchema.parse(parsedValue);

      if (validationResult instanceof Error) {
        throw validationResult;
      }

      const fileId = fillFileData(parsedValue);
      navigateToEditor(fileId)
    } catch (error) {
      alert("Error on load file");
    }
  }

  async function onFileChange(evt: ChangeEvent<HTMLInputElement>) {
    if (!evt.currentTarget.files) return;

    setIsLoading(true);

    await processFile(
      evt.currentTarget.files[evt.currentTarget.files.length - 1]
    );

    setIsLoading(false);
  }

  function createNew() {
    setIsLoading(true);

    const fileId = fillFileData(DEFAULT_DATA)

    setIsLoading(false);

    navigateToEditor(fileId)
  }

  return {
    isLoading,
    onFileChange,
    createNew
  };
}
