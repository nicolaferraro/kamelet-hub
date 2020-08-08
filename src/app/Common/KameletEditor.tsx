import React, { useEffect, useState, FunctionComponent } from 'react';
import MonacoEditor, { ChangeHandler } from 'react-monaco-editor';
import 'monaco-yaml/lib/esm/monaco.contribution';
import { languages } from 'monaco-editor/esm/vs/editor/editor.api';
import camelKSchema from './camel-k-object-schema.json';


// NOTE: This will give you all editor featues. If you would prefer to limit to only the editor
// features you want to use, import them each individually. See this example: (https://github.com/microsoft/monaco-editor-samples/blob/master/browser-esm-webpack-small/index.js#L1-L91)
import 'monaco-editor';

import EditorWorker from 'worker-loader!monaco-editor/esm/vs/editor/editor.worker';
import YamlWorker from 'worker-loader!monaco-yaml/lib/esm/yaml.worker';

window['MonacoEnvironment'] = {
  getWorker(workerId, label) {
    if (label === 'yaml') {
      return new YamlWorker();
    }
    return new EditorWorker();
  },
};

const { yaml } = languages || {};

class KameletEditorProps {
    value?: String
    onChange?: ChangeHandler
}

export const KameletEditor : FunctionComponent<KameletEditorProps> = (props) => {
  useEffect(() => {
    yaml &&
      yaml.yamlDefaults.setDiagnosticsOptions({
        validate: true,
        enableSchemaRequest: true,
        hover: true,
        completion: true,
        schemas: [
            {
                uri: 'http://camel.apache.org/camel-k/schema',
                fileMatch: ['*'],
                schema: camelKSchema
            }
        ],
      });
  }, []);

  return (
    <MonacoEditor
      language="yaml"
      width="900"
      height="600"
      value={props.value}
      onChange={props.onChange}
      options={{minimap: {enabled: false}}}
    />
  );
};
