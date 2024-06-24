import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Wrapper } from './styled';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useFileUploader } from '../../../providers/file-uploader';
import { useSettings } from '../../../http/query-hooks';

interface Props {
  initialHTMLValue?: string;
  onChange?(newContent: string): void;
}

export const Html = ({ initialHTMLValue, onChange }: Props) => {
  const [value, setValue] = useState(() => {
    if (initialHTMLValue) {
      const contentBlock = htmlToDraft(initialHTMLValue);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        return EditorState.createWithContent(contentState);
      }
    }

    return EditorState.createEmpty();
  });

  const handleBlur = () => {
    const html = draftToHtml(convertToRaw(value.getCurrentContent()));
    if (onChange) onChange(html);
  };

  const { upload } = useFileUploader();

  const { data: appSettings } = useSettings();

  const handleUploadImage = async (file: File) => {
    const image = await upload({
      file,
      getApiParams: () => {
        return {
          subject: {
            subjectField: 'image',
          },
        };
      },
    });

    return new Promise(resolve => {
      resolve({ data: { link: (appSettings?.uploadStaticPath || '') + image.path } });
    });
  };

  return (
    <Wrapper>
      <Editor
        editorState={value}
        onBlur={handleBlur}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setValue}
        toolbar={{
          textAlign: { inDropdown: true },
          image: { uploadCallback: handleUploadImage },
        }}
        mention={{
          separator: ' ',
          trigger: '@',
          suggestions: [
            { text: 'APPLE', value: 'apple', url: 'apple' },
            { text: 'BANANA', value: 'banana', url: 'banana' },
            { text: 'CHERRY', value: 'cherry', url: 'cherry' },
            { text: 'DURIAN', value: 'durian', url: 'durian' },
            { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
            { text: 'FIG', value: 'fig', url: 'fig' },
            { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
            { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
          ],
        }}
      />
    </Wrapper>
  );
};
