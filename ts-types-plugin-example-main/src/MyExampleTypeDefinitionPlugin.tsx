// Imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import './MyExampleTypeDefinitionPlugin.scss';
import BaseTypeDefinitionPlugin, { ITypeDefinitionPluginProps, ITypeDefinitionPluginState } from '@fraytools/plugin-core/lib/base/BaseTypeDefinitionPlugin';
import FrayToolsPluginCore from '@fraytools/plugin-core';
import { IManifestJson } from '@fraytools/plugin-core/lib/types';
import { IFraymakersAssetMetadata, IFraymakersApiTypesConfig } from './types';

declare var MANIFEST_JSON:IManifestJson;
/**
 * Example view for the script types plugin.
 * Note: Types plugins run hidden in the background and thus will not be visible.
 */

interface IFraymakersApiTypesProps extends ITypeDefinitionPluginProps {
  configMetadata:IFraymakersApiTypesConfig;
  assetMetadata:IFraymakersAssetMetadata;
}
interface IFraymakersApiTypesState extends ITypeDefinitionPluginState {
}

export default class MyTypeDefinitionPlugin extends BaseTypeDefinitionPlugin<IFraymakersApiTypesProps, IFraymakersApiTypesState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * Force this component to re-render when parent window sends new props
   */
  onPropsUpdated(props) {
    ReactDOM.render(<MyTypeDefinitionPlugin {...props} />, document.querySelector('.MyTypeDefinitionPluginWrapper'));
  }

  /**
   * Provide type definition data to inject here. This function will be called automatically when a 'getTypes' message is received via postMessage().
   * @returns 
   */ 
   onTypeDefinitionRequest() {
    if (this.props.configMetadata.disableForFrameScripts && this.props.filename === null) {
      // If user sets disableForFrameScripts to true and this is a frame script (i.e. filename is null), don't return types
      FrayToolsPluginCore.sendTypeDefinitions([]);

      return;
    }

    let types:{filename:string; contents:string}[] = [];

    types.push({
      contents: 'declare class IMyTypeDefinitionPluginInterface { protected constructor(); static foo:number; static bar:"some really cool test string"; }',
      filename: 'global.d.ts'
    })
    // Return typedef file contents
    FrayToolsPluginCore.sendTypeDefinitions(types);
  }

  render() {
    if (this.props.configMode) {
      // If configMode is enabled, display a different view specifically for configuring plugin metadata
      return (
        <div style={{ color: '#ffffff', background: '#000000' }}>
          <p>{JSON.stringify(MANIFEST_JSON)}</p>
          <p>Hello world! This is an example configuration view for a TypeDefinition plugin.</p>
          <p>Here you would provide a UI for assigning custom settings to persist between sessions using \'pluginConfigSyncRequest\' postMessage() commands sent to the parent window. This data will then be persisted within the current FrayTools project settings file.</p>
          <p>Below demonstrates how to persist configuration changes. Toggle the checkbox below and navigate away from the plugin view to see the change persist. When checked, observe that the types plugin is not applied to frame script after reloading the app.</p>
          <div>
            <input
              type="checkbox"
              checked={this.props.configMetadata.disableForFrameScripts}
              onChange={
                (event) => {
                  // Clone config
                  var configMetadata:IFraymakersApiTypesConfig = {
                    version:this.props.configMetadata.version,
                    disableForFrameScripts:this.props.configMetadata.disableForFrameScripts
                  };

                  for (var key in this.props.configMetadata) {
                    if (!this.props.configMetadata.hasOwnProperty(key)) {
                      continue;
                    }
                    configMetadata[key] = this.props.configMetadata[key];
                  }
                  // Assign updated value
                  configMetadata.disableForFrameScripts = event.target.checked;
    
                  FrayToolsPluginCore.configMetadataSync(configMetadata);
                }
              }
              /> Disable for frame scripts
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      );
    }

    // Note: TypeDefinitionPlugins that aren't in config mode run in the background and thus do not display a view while active
    return <div/>;
  }
}
