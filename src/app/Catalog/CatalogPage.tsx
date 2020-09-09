import * as React from 'react';
import { PageSection, Title, PageSectionVariants, Text, Gallery, Button, Bullseye } from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { Kamelet } from '@app/Kamelet/Kamelet';
import { Catalog } from '@app/contexts/catalog';
import { Link } from 'react-router-dom';

const CatalogPage: React.FunctionComponent = () => (
  <>
    <PageSection variant={PageSectionVariants.light}>
      <Title headingLevel="h1">Kamelets</Title>
      <Text>
        List of Kamelets currently available.
      </Text>
    </PageSection>
    <PageSection>
        <Gallery hasGutter>
          <Catalog.Consumer>
            {
              (catalog) => {
                return catalog.items.map(kamelet => (
                  <Kamelet key={kamelet.metadata.name} value={kamelet} />
                ))
              }
            }
          </Catalog.Consumer>
        </Gallery>
    </PageSection>
  </>
)

export { CatalogPage };
