import { useRecoilCallback } from 'recoil';
import { ChangeEvent, useState } from 'react';
import { editorFileSchema } from '@/schemas/editorFileSchema';
import { edgesAtom, hasLoadedDataAtom, nodesAtom } from '@/store/editor';
import { useRouter } from 'next/navigation';
import { PagesEnum } from '@/enums/PagesEnum';
import { DEFAULT_DATA } from '@/data/editor';

export function useEditorFile() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const fillFileData = useRecoilCallback((recoil) => (data: any) => {
    recoil.set(nodesAtom, data.nodes);
    recoil.set(edgesAtom, data.edges);
    recoil.set(hasLoadedDataAtom, true);
  });

  async function processFile(file: File) {
    const rawValue = await file.text();
    const parsedValue = JSON.parse(rawValue);

    try {
      const validationResult = editorFileSchema.parse(parsedValue);

      if (validationResult instanceof Error) {
        throw validationResult;
      }

      fillFileData(parsedValue);
      push(PagesEnum.EDITOR);
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

    fillFileData(DEFAULT_DATA)

    setIsLoading(false);

    push(PagesEnum.EDITOR);
  }

  return {
    isLoading,
    onFileChange,
    createNew
  };
}
