<h1>react-native-use-infinite-scrolling</h1>

A react native package developed to implement infinite scrolling in any react-native app.

<h1>Getting Started</h1>

**Install via npm**

```shell
npm i react-native-use-infinite-scrolling
```

**Install via YARN**
```shell
yarn add react-native-use-infinite-scrolling
```

<h1>Usage</h1>

Import the **InfiniteScroll** component from **react-native-use-infinite-scrolling**: 

```shell
import InfiniteScroll from 'react-native-use-infinite-scrolling'
```

This component accepts 4 parameters / props:

1. **data**: It contains data in form of an array which will be mapped.
2. **renderItem**: It accepts a function which returns the mapped data. It accepts a single parameter which indicates a single element of the data array.
3. **onLoadMore**: It also accepts a function which will load more data once the bottom of the page is reached while scrolling.
4. **loading**: Accepts true or false. If true it shows a load at the end of the scroll.
5. **loadingText**: Receive text to be displayed when loading.
6. **renderLoading**: Receives a function to customize the loading component.

<h1>Usage Example:</h1>

```tsx
import React, {useState} from "react";
import { View, Text } from "react-native";
import {ListItem} from 'native-base';
import axios from 'axios';

import InfiniteScroll from 'react-native-use-infinite-scrolling';

const ExampleInfiniteScroll = () => {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);  
  const perPage = 10;
  const url = 'https://api.punkapi.com/v2/beers'; // this is a public api 

  const renderItem = ({item}) => {
    return (
      <ListItem>
        <Text style={{color: 'red'}}>{item.description}</Text>
      </ListItem>
    );
  };
  
  const loadIncidents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}?page=${page}&per_page=${perPage}`);
      setIncidents([...incidents, ...response.data]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <View>
      <InfiniteScroll 
        loading={loading}
        loadingText="Loading..."
        data={incidents} 
        renderItem={renderItem} 
        onLoadMore={loadIncidents} />
    </View>
  );
};

export default ExampleInfiniteScroll;

```

<h1>Build with: </h1>

1. React
2. react-native
3. Hooks
