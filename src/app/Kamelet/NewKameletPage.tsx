import * as React from 'react';
import { PageSection, PageSectionVariants, Title, Tabs, Tab, Card, Form, FormGroup, TextInput, CardTitle, CardHeader, CardBody, FileUpload, GridItem, Grid, Button, Bullseye, Stack, StackItem, ActionGroup, Divider } from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import { KameletEditor } from '@app/Common/KameletEditor';


export const NewKameletPage: React.FunctionComponent = () => {
  const [value, setValue] = React.useState('from:\n  uri: timer:tick\n  parameters:\n      period: 1000\n  steps:\n      - set-body:\n          constant: Hello\n      - log: "${body}"\n      - to: "direct:#property:routeId"');

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1">New Kamelet</Title>
        </PageSection>
        <PageSection>
          <Card>
            <CardBody>
              <Form>
                <Stack hasGutter>
                  <StackItem>
                    <Tabs>
                      <Tab eventKey={0} title="Form">
                        <Grid hasGutter>
                          <GridItem span={8}>
                            <KameletEditor value={value} onChange={setValue} />
                          </GridItem>
                          <GridItem span={4}>
                            <Card>
                              <CardBody>
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
                                <FormGroup label="Group" fieldId="kamelet-group">
                                  <TextInput
                                    type="text"
                                    id="kamelet-group"
                                    name="kamelet-group"
                                  />
                                </FormGroup>
                              </CardBody>
                            </Card>
                          </GridItem>
                        </Grid>
                        
                      </Tab>
                      <Tab eventKey={1} title="Yaml"></Tab>
                    </Tabs>
                  </StackItem>
                  <StackItem>
                    <Divider />
                    <ActionGroup >
                      <Button variant="primary">Save</Button>
                      <Link to="/">
                        <Button variant="plain">Cancel</Button>
                      </Link>
                    </ActionGroup>
                  </StackItem>
                </Stack>
              </Form>
            </CardBody>
          </Card>
        </PageSection>
    </>
  )
  
}
