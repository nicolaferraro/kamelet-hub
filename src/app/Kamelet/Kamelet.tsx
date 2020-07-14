import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardHeader, CardHeaderMain, CardTitle, CardBody, Brand } from '@patternfly/react-core';
import { Kamelet as KameletModel, KameletTitleAnnotation, KameletIconAnnotation } from '@app/models/kamelet';

interface IKamelet {
  value: KameletModel

}

export const Kamelet: React.FunctionComponent<IKamelet> = ({value}) => {

  const title = value.spec.definition.title || value.metadata.name

  let icon = <></>
  if (value.metadata.annotations[KameletIconAnnotation]) {
    icon = <Brand alt={title + " icon"} style={{height: "35px"}} src={value.metadata.annotations[KameletIconAnnotation]}></Brand>
  }

  const history = useHistory()
  const handleClick = (e: React.MouseEvent) => history.push('/kamelets/' + value.metadata.name)

  return (
    <Card isSelectable onClick={handleClick}>
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
