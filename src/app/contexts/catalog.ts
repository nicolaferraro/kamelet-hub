import React from 'react';
import { KameletCatalog } from '@app/models/kamelet';

export const Catalog = React.createContext<KameletCatalog>({items: []})
