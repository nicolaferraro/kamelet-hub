import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardHeader, CardHeaderMain, CardTitle, CardBody, Brand, CardFooter } from '@patternfly/react-core';
import { Kamelet as KameletModel, KameletTitleAnnotation, KameletIconAnnotation } from '@app/models/kamelet';
import { StarIcon } from '@patternfly/react-icons';

interface IKamelet {
  value: KameletModel
  hasStars?: boolean
  mode?: string
}

export const Kamelet: React.FunctionComponent<IKamelet> = ({value, hasStars, mode}) => {

  const title = value.spec.definition.title || value.metadata.name

  let icon = <></>
  if (value.metadata.annotations[KameletIconAnnotation]) {
    icon = <Brand alt={title + " icon"} style={{height: "35px"}} src={value.metadata.annotations[KameletIconAnnotation]}></Brand>
  }

  const history = useHistory()
  const handleClick = (e: React.MouseEvent) => {
    if (mode == "hub") {
      history.push('/hub/kamelets/' + value.metadata.name)
    } else {
      history.push('/kamelets/' + value.metadata.name)
    }
  }

  let starNum = value.metadata.name.charCodeAt(0) % 6
  let stars = Array(starNum).fill(0).map((_, i) => <StarIcon color="#DDDD00" key={"star-" + i} />)

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
      {hasStars || false ? 
        <CardFooter>
          {stars}
        </CardFooter>
        :
        ""
      }
    </Card>
  )
}
