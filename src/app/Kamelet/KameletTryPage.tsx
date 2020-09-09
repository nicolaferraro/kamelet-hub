import * as React from 'react';
import { Card, CardHeader, CardBody, Brand, PageSection, PageSectionVariants, Title, Text, Grid, GridItem, Button, ClipboardCopy, TextInput, CardFooter, Form, ActionGroup } from '@patternfly/react-core';
import { Table, TableHeader, TableBody, ICell, IRow } from '@patternfly/react-table';
import { KameletIconAnnotation, KameletCatalog, JSONSchema } from '@app/models/kamelet';
import { useParams, } from 'react-router';
import { Catalog } from '@app/contexts/catalog'
import YAML from 'yaml'
import { InfoIcon, InfoAltIcon } from '@patternfly/react-icons';
import { Link } from 'react-router-dom';

export const KameletTryPage: React.FunctionComponent = () => {
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
        title: ""
      },
      {
        title: "Value"
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
              title: <label htmlFor={"parameter-" + k}>{(v.title || k) + (isRequired(k) ? "*" : "") + ":"}</label>
            },
            {
              title: <InfoAltIcon title={v.description}></InfoAltIcon>
            },
            {
            title: <TextInput id={"parameter-" + k} value={v.example || ""}></TextInput>
            }
          ]
        })
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
          <Form>
            <Grid hasGutter>
              <GridItem span={6}>
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
                  <CardFooter>
                    <ActionGroup>
                      <Button variant="primary">Run</Button>
                      <Link to={"/kamelets/" + id}>
                        <Button variant="plain">Back</Button>
                      </Link>
                    </ActionGroup>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem span={6}>
                <Card>
                  <CardHeader>
                    <Title headingLevel="h2">Logs</Title>
                  </CardHeader>
                  
                </Card>
              
              </GridItem>
            </Grid>
          </Form>
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
