import * as React from 'react';
import { Card, CardHeader, CardBody, Brand, PageSection, PageSectionVariants, Title, Text, Grid, GridItem, Button } from '@patternfly/react-core';
import { Table, TableHeader, TableBody, ICell, IRow } from '@patternfly/react-table';
import { KameletIconAnnotation, KameletCatalog, JSONSchema } from '@app/models/kamelet';
import { useParams, } from 'react-router';
import { Catalog } from '@app/contexts/catalog'
import YAML from 'yaml'

export const KameletDetailPage: React.FunctionComponent = () => {
  const params = useParams<{id: string}>()
  const id = params.id

  const catalogContext = React.useContext<KameletCatalog>(Catalog)
  
  const value = catalogContext.items.find(k => k.metadata.name == id)

  if (value) {

    const title = value.spec.definition.title || value.metadata.name

    let icon = <></>
    if (value.metadata.annotations[KameletIconAnnotation]) {
      icon = <Brand alt={title + " icon"} style={{height: "35px"}} src={value.metadata.annotations[KameletIconAnnotation]}></Brand>
    }

    const columns: ICell[] = [
      {
        title: "Name"
      },
      {
        title: "Description"
      },
      {
        title: "Type"
      },
      {
        title: "Required"
      }
    ]

    const rows: IRow[] = []
    if (value.spec.definition.properties) {

      const isRequired = (p: string): boolean => {
        for (let k in value.spec.definition.required) {
          if (p == value.spec.definition.required[k]) {
            return true
          }
        }
        return false
      }

      for (let k in value.spec.definition.properties) {
        const v: JSONSchema = value.spec.definition.properties[k]
        rows.push({
          cells: [
            {
              title: k,
              
            },
            {
              title: v.description || ""
            },
            {
              title: v.type || ""
            },
            {
              title: isRequired(k) + ""
            }
          ]
        })
      }
      
    }

    const content = YAML.stringify(value)
    const file = new Blob([content], {type: "application/x-yaml"})
    const objectURL = URL.createObjectURL(file)

    return (
      <>
        <PageSection variant={PageSectionVariants.light}>
        {icon}
        <Title headingLevel="h1">{title} Kamelet</Title>
          <Text>
            {value.spec.definition.description || ""}
          </Text>
        </PageSection>
        <PageSection>
          <Grid hasGutter>
            <GridItem span={8}>
              <Card>
                <CardHeader>
                  <Title headingLevel="h2">Parameters</Title>
                </CardHeader>
                <CardBody>
                  <Table aria-label="Parameters" cells={columns} rows={rows}>
                    <TableHeader />
                    <TableBody />
                  </Table>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem span={4}>
              <Card>
                <CardHeader>
                  <Title headingLevel="h2">Actions</Title>
                </CardHeader>
                <CardBody>
                  <Button component="a" variant="primary" href={objectURL} download={id + ".kamelet.yaml"}>Download Kamelet</Button>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </PageSection>
      </>
    )
  } else {
    return (
      <>
        <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1">...</Title>
        </PageSection>
        <PageSection>
            ...
        </PageSection>
      </>
    )
  }
  
}
