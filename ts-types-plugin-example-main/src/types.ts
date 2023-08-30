import { IPluginConfig } from '@fraytools/plugin-core/lib/types';
import { ILibraryAssetMetadata } from '@fraytools/plugin-core/lib/types/fraytools';


export interface IFraymakersApiTypesConfig extends IPluginConfig {
    disableForFrameScripts:boolean;
}

export interface IFraymakersAssetMetadata extends ILibraryAssetMetadata {
    pluginMetadata:{
      [key:string]:any,
      'my.example.type.definition.plugin'?: {
      }
    }
  }