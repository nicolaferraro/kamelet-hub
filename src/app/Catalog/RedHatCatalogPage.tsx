import * as React from 'react';
import { PageSection, Title, PageSectionVariants, Text, Gallery, Button, Bullseye, Alert } from '@patternfly/react-core';
import { PlusCircleIcon, RedhatIcon } from '@patternfly/react-icons';
import { Kamelet } from '@app/Kamelet/Kamelet';
import { Catalog } from '@app/contexts/catalog';
import { Link } from 'react-router-dom';

const RedHatCatalogPage: React.FunctionComponent = () => (
  <>
    <PageSection variant={PageSectionVariants.light}>
      <Title headingLevel="h1">
        <RedhatIcon color="#EE0000"></RedhatIcon> Kamelets.io
      </Title>
      <Text>
        List of Kamelets currently available.
      </Text>
    </PageSection>
    <PageSection>
      <Alert title="Red Hat - Kamelet Hub" variant="info">
        Red Hat will host a (patternfly based) community hub like this one, with all the features we need.
      </Alert>
    </PageSection>
    <PageSection>
        <Gallery hasGutter>
          <Catalog.Consumer>
            {
              (catalog) => {
                return catalog.items.map(kamelet => (
                  <Kamelet hasStars={true} mode="hub" key={kamelet.metadata.name} value={kamelet} />
                ))
              }
            }
          </Catalog.Consumer>
        </Gallery>
    </PageSection>
  </>
)

export { RedHatCatalogPage };
