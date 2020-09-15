import * as React from 'react';
import { Card, CardHeader, CardBody, Brand, PageSection, PageSectionVariants, Title, Text, Grid, GridItem, Button, ClipboardCopy } from '@patternfly/react-core';
import { Table, TableHeader, TableBody, ICell, IRow } from '@patternfly/react-table';
import { KameletIconAnnotation, KameletCatalog, JSONSchema, isPropertyRequired } from '@app/models/kamelet';
import { useParams, } from 'react-router';
import { Catalog } from '@app/contexts/catalog'
import YAML from 'yaml'
import { Link } from 'react-router-dom';


export const KameletDetailPage: React.FunctionComponent = () => {
  const params = useParams<{id: string, mode?: string}>()
  const id = params.id
  
  const mode = params.mode

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
        title: "Default"
      },
      {
        title: "Example"
      }
    ]

    const rows: IRow[] = []
    if (value.spec.definition.properties) {
      for (let k in value.spec.definition.properties) {
        const v: JSONSchema = value.spec.definition.properties[k]
        rows.push({
          cells: [
            {
              title: k + (isPropertyRequired(value.spec.definition, k) ? "*" : ""),
              
            },
            {
              title: v.description || ""
            },
            {
              title: v.type || ""
            },
            {
              title: v.default || ""
            },
            {
              title: v.example || ""
            }
          ]
        })
      }
      
    }

    const content = YAML.stringify(value)
    const file = new Blob([content], {type: "application/x-yaml"})
    const objectURL = URL.createObjectURL(file)

    let endpointURI = "kamelet:" + id
    let params = 0
    for (let k in value.spec.definition.properties) {
      const v: JSONSchema = value.spec.definition.properties[k]

      if (isPropertyRequired(value.spec.definition, k)) {
        let prefix = "&"
        if (params == 0) {
          prefix="?"
        }
        params++
        let example = v.example || "value"
        endpointURI += prefix + encodeURIComponent(k) + "=" + encodeURIComponent(example)
      }
    }

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
            <GridItem md={12} lg={8}>
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
            <GridItem md={12} lg={4}>
              <Card>
                <CardHeader>
                  <Title headingLevel="h2">Actions</Title>
                </CardHeader>
                {mode=="hub" ? 
                  <CardBody>
                    <Link to={"/try/" + id}>
                      <Button variant="primary">Try Online</Button>
                    </Link>
                  </CardBody>
                  :
                  ""
                }
                <CardBody>
                  <Button component="a" variant={mode == "hub" ? "secondary" : "primary"} href={objectURL} download={id + ".kamelet.yaml"}>Download Kamelet</Button>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Title headingLevel="h2">Endpoint</Title>
                </CardHeader>
                <CardBody>
                  <ClipboardCopy>{endpointURI}</ClipboardCopy>
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
