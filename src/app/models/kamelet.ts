import { Metadata } from './kubernetes'

export const KameletIconAnnotation = "camel.apache.org/kamelet.icon"
export const KameletTitleAnnotation = "camel.apache.org/kamelet.title"

export interface KameletCatalog {
    items: Array<Kamelet>
}

export interface Kamelet {
    apiVersion: string
    kind: string
    metadata: Metadata
    spec: KameletSpec
}

export interface KameletSpec {
    definition: JSONSchema
}

export interface JSONSchema {
    title?: string
    description?: string
    type?: string
    properties?: Map<string, JSONSchema>
    required?: Array<string>
    example?: string
    default?: string
}

export function isPropertyRequired(schema: JSONSchema, name: string): boolean {
    for (let k in schema.required) {
        if (name == schema.required[k]) {
          return true
        }
      }
      return false
}