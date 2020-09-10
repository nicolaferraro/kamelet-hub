import * as React from 'react';
import { Card, CardHeader, CardBody, Brand, PageSection, PageSectionVariants, Title, Text, Grid, GridItem, Button, ClipboardCopy, TextInput, CardFooter, Form, ActionGroup, TextArea } from '@patternfly/react-core';
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

  const [running, setRunning] = React.useState(false)

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

    let instanceData = <></>
    if (running) {
      instanceData = <div style={{backgroundColor: "#000", color: "#fff", fontSize: "14px", height: "400px"}}>
        routes 16:37:26.953 INFO  [main] AbstractCamelContext - Apache Camel 3.5.0 (camel-k) is starting<br/>
        routes 16:37:26.955 INFO  [main] AbstractCamelContext - StreamCaching is not in use. If using streams then its recommended to enable stream caching. See more details at http://camel.apache.org/stream-caching.html<br/>
        routes 16:37:26.965 INFO  [main] InternalRouteStartupManager - Route: route1 started and consuming from: timer://tick<br/>
        routes 16:37:26.976 INFO  [main] AbstractCamelContext - Total 1 routes, of which 1 are started<br/>
        routes 16:37:26.976 INFO  [main] AbstractCamelContext - Apache Camel 3.4.0 (camel-k) started in 0.023 seconds<br/>
        routes 16:37:28.087 INFO  [Camel (camel-k) thread #0 - timer://tick] info - Exchange[ExchangePattern: InOnly, BodyType: String, Body: Hello]<br/>
        routes 16:37:32.977 INFO  [Camel (camel-k) thread #0 - timer://tick] info - Exchange[ExchangePattern: InOnly, BodyType: String, Body: Hello]<br/>
        routes 16:37:37.978 INFO  [Camel (camel-k) thread #0 - timer://tick] info - Exchange[ExchangePattern: InOnly, BodyType: String, Body: Hello]<br/>
        <br/>
        <br/>
        <b>Hey, this is just a POC. It doesn't run for real!</b>
      </div>
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
                      <Button isDisabled={running} variant="primary" onClick={() => setRunning(true)}>Run</Button>
                      {running ? 
                        <Button isDisabled={running} variant="plain">Back</Button>
                        : 
                        <Link to={"/kamelets/" + id}>
                          <Button isDisabled={running} variant="plain">Back</Button>
                        </Link>
                      }
                      
                    </ActionGroup>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem span={6}>
                <Card>
                  <CardHeader>
                    <Title headingLevel="h2">Instance</Title>
                  </CardHeader>
                  <CardBody>
                    {instanceData}
                  </CardBody>
                  <CardFooter>
                    {running ?
                      <Button variant="primary" onClick={() => setRunning(false)}>Close</Button>
                      : ""
                    }
                  </CardFooter>
                  
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
