import { useFileUploader } from '../../../providers/file-uploader';
import {
  FilePickerBrowserFile,
  FilePickerMixedFile,
  FilePickerServerFile,
} from '../../formik-field-resolver/file-picker';
import { FileSubject } from '../../../http/models/api';
import { fileApiDelete } from '../../../http/endpoints';

interface ReturnProps {
  update(uploads: FilePickerMixedFile[], subject?: FileSubject): Promise<void>;
  cleanupUnused(uploads: FilePickerMixedFile[], listToCheck: FilePickerServerFile[]): Promise<void>;
}

export const useCrudFiles = (): ReturnProps => {
  const uploader = useFileUploader();

  const update: ReturnProps['update'] = async (uploads, subject) => {
    if (uploads.length > 0) {
      const forCreate: FilePickerBrowserFile[] = uploads.filter(
        (x: FilePickerMixedFile): x is FilePickerBrowserFile => x.type === 'browser-file'
      );

      await Promise.all(
        forCreate.map(item =>
          uploader.upload({
            file: item.data,
            getApiParams: () => ({
              subject: {
                subjectId: subject?.subjectId,
                subjectField: item.entityFieldName,
                subjectEntityName: subject?.subjectEntityName,
              },
            }),
          })
        )
      );
    }
  };

  const cleanupUnused: ReturnProps['cleanupUnused'] = async (uploads, listToCheck) => {
    if (listToCheck?.length && listToCheck.length > 0) {
      const forDelete: FilePickerServerFile[] = listToCheck.filter(
        iu => !uploads.find(upload => upload.type === 'server-file' && upload.data.id === iu.data.id)
      );
      await Promise.all(forDelete.map(item => fileApiDelete(item.data.id)));
    }
  };

  return {
    update,
    cleanupUnused,
  };
};
