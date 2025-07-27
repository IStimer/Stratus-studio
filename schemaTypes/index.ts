import {postType} from './postType'
import {postTypeMultilang} from './postType-multilang'
import project from './project'
import {projectMultilang} from './project-multilang'
import service from './service'
import {serviceMultilang} from './service-multilang'
import {contactImages} from './contactImages'
import process from './process'
import {localeString, localeText, localeBlockContent} from './locale'

export const schemaTypes = [
  // Types de base pour multilangue
  localeString,
  localeText, 
  localeBlockContent,
  
  // Types multilingues (nouveaux)
  postTypeMultilang,
  projectMultilang,
  serviceMultilang,
  
  // Types existants (garder pour la migration)
  postType, 
  project, 
  service, 
  contactImages, 
  process
]
