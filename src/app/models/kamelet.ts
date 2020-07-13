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
    description?: string
}
