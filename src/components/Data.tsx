import {Icon, SemanticICONS, Statistic} from "semantic-ui-react";
import React, {FC} from "react";

interface DataWithIconProps {
  icon?: SemanticICONS
  data: string | number
  kpi: string
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'huge'
}

export const Data: FC<DataWithIconProps> = ({icon, data, kpi, size}) => (
  <Statistic size={size || 'small'}>
    <Statistic.Value>
      {!!icon && <Icon name={icon} />}
      <span style={{marginLeft: !!icon ? '8px': '0'}}>
        {data}
      </span>
    </Statistic.Value>
    <Statistic.Label>{kpi}</Statistic.Label>
  </Statistic>
);
