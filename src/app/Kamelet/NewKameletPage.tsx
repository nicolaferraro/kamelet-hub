import * as React from 'react';
import { PageSection, PageSectionVariants, Title, Tabs, Tab, Card, Form, FormGroup, TextInput, CardTitle, CardHeader, CardBody, FileUpload, GridItem, Grid, Button, Bullseye, Stack, StackItem, ActionGroup, Divider, Alert, TextArea } from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import { KameletEditor } from '@app/Common/KameletEditor';
import { RedhatIcon } from '@patternfly/react-icons';
import MonacoEditor from 'react-monaco-editor';


export const NewKameletPage: React.FunctionComponent = () => {
  const [value, setValue] = React.useState('from:\n  uri: timer:tick\n  parameters:\n      period: 1000\n  steps:\n      - set-body:\n          constant: Hello\n      - log: "${body}"\n      - to: "direct:#property:routeId"');

  const [tab, setTab] = React.useState(0)

  const handleTabClick = (e, idx) => {
    setTab(idx)
  }

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1">
          <RedhatIcon color="#EE0000"></RedhatIcon> Kamelets.io: Designer
        </Title>
        </PageSection>
        <PageSection>
          <Alert title="Red Hat - Kamelet Designer" variant="info">
            The Kamelet designer allows a developer to define a new Kamelet from scratch or by changing an existing one.
          </Alert>
        </PageSection>
        <PageSection>
          <Card>
            <CardBody>
              <Stack>
                <StackItem>
                  <Tabs activeKey={tab} onSelect={handleTabClick}>
                    <Tab eventKey={0} title="Form">
                      <Form>
                        <Grid hasGutter>
                          <GridItem md={12} lg={6}>
                            <KameletEditor value={value} onChange={setValue} />
                          </GridItem>
                          <GridItem md={12} lg={6}>

                            <FormGroup label="Kamelet ID" isRequired fieldId="kamelet-id">
                              <TextInput
                                isRequired
                                type="text"
                                id="kamelet-id"
                                name="kamelet-id"
                              />
                            </FormGroup>
                            <FormGroup label="Name" isRequired fieldId="kamelet-name">
                              <TextInput
                                isRequired
                                type="text"
                                id="kamelet-name"
                                name="kamelet-name"
                              />
                            </FormGroup>
                            <FormGroup label="Icon" fieldId="kamelet-icon">
                              <FileUpload
                                id="kamelet-icon"
                                type="dataURL"
                              />
                            </FormGroup>
                          </GridItem>
                        </Grid>
                      </Form>
                    </Tab>
                    <Tab eventKey={1} title="YAML">
                      <TextArea label="YAML" id="kamelet-yaml" style={{height: 300, color: "#777777", fontWeight: "bold"}} value={"# Here there'll be the full Kubernetes resource as YAML\n\nkind: Kamelet\napiVersion: camel.apache.org/v1alpha1\nmetadata:\n  name: the-name\nspec:\n  definition: {}\n"}></TextArea>
                    </Tab>
                  </Tabs>
                </StackItem>
                <StackItem>
                  <Divider />
                  <ActionGroup >
                    <Button variant="primary">Save</Button>
                    <Link to="/hub">
                      <Button variant="plain">Cancel</Button>
                    </Link>
                  </ActionGroup>
                </StackItem>
              </Stack>
            </CardBody>
          </Card>
        </PageSection>
    </>
  )
  
}
