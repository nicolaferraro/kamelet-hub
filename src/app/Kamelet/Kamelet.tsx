import * as React from 'react';
import { Card, CardHeader, CardHeaderMain, CardTitle, CardBody, Brand } from '@patternfly/react-core';
import { Kamelet as KameletModel, KameletTitleAnnotation, KameletIconAnnotation } from '@app/models/kamelet';

interface IKamelet {
  value: KameletModel

}

const Kamelet: React.FunctionComponent<IKamelet> = ({value}) => {

  const title = value.metadata.annotations[KameletTitleAnnotation] || value.metadata.name

  let icon = <></>
  if (value.metadata.annotations[KameletIconAnnotation]) {
    icon = <Brand alt={title + " icon"} style={{height: "35px"}} src={value.metadata.annotations[KameletIconAnnotation]}></Brand>
  }

  return (
    <Card isHoverable>
      <CardHeader>
        <CardHeaderMain>
          {icon}
        </CardHeaderMain>
      </CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardBody>
        {value.spec.definition.description || ""}
      </CardBody>
    </Card>
  )
}

export { Kamelet };
