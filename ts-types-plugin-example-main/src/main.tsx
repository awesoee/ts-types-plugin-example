
// Styles
import 'mini.css/dist/mini-dark.css';

// Other imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FrayToolsPluginCore from '@fraytools/plugin-core';
import MyTypeDefinitionPlugin from './MyExampleTypeDefinitionPlugin';
import { IManifestJson } from '@fraytools/plugin-core/lib/types';

declare var MANIFEST_JSON:IManifestJson;

// Informs FrayToolsPluginCore the default config metadata for MyTypeDefinitionPlugin when it first gets initialized
FrayToolsPluginCore.PLUGIN_CONFIG_METADATA_DEFAULTS = {
    version: MANIFEST_JSON.version,
    disableForFrameScripts: false, // Demonstrates a custom field. We use above to prevent returning the custom types while inside a frame script
  };
  
  FrayToolsPluginCore.migrationHandler = (configMetadata) => {
    // Compare configMetadata.version here with your latest manifest version and perform any necessary migrations for compatibility
  };
  FrayToolsPluginCore.setupHandler = (props) => {
    // Create a new container for the plugin
    var appContainer = document.createElement('div');
    appContainer.className = 'MyTypeDefinitionPluginWrapper';
    document.body.appendChild(appContainer);
  
    // Load the component with its props into the document body
    ReactDOM.render(<MyTypeDefinitionPlugin {...props}/>, appContainer);
  };