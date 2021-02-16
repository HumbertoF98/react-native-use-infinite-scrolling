<h1>react-native-infinitescroll</h1>

A react native package developed to implement infinite scrolling in any react-native app.

<h1>Getting Started</h1>

**Install via npm**

```shell
npm i react-native-infinitescroll
```

**Install via YARN**
```shell
yarn add react-native-infinitescroll
```

<h1>Usage</h1>

Import the **InfiniteScroll** component from **react-native-infinitescroll**: 

```shell
import InfiniteScroll from 'react-native-infinitescroll'
```

This component accepts 4 parameters / props:

1. **data**: It contains data in form of an array which will be mapped.
2. **renderRow**: It accepts a function which returns the mapped data. It accepts a single parameter which indicates a single element of the data array.
3. **onLoadMore**: It also accepts a function which will load more data once the bottom of the page is reached while scrolling.
4. **showScroll**: It accepts a boolean that determines whether the vertical scroll bar will appear (standard value = true).

<h1>Usage Example:</h1>

```shell
import React, {useState} from "react";
import { View, Text } from "react-native";
import {ListItem} from 'native-base';
import axios from 'axios';

import InfiniteScroll from 'react-native-infinitescroll';

const TestNuvemInfiniteScroll = () => {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);  
  const perPage = 10;
  const url = 'https://api.punkapi.com/v2/beers'; // this is a public api 

  const renderRow = ({item}) => {
    return (
      <ListItem>
        <Text style={{color: 'red'}}>{item.description}</Text>
      </ListItem>
    );
  };
  
  const loadIncidents = async () => {
    try {
    const response = await axios.get(`${url}?page=${page}&per_page=${perPage}`);
    setIncidents([...incidents, ...response.data]);
    setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <InfiniteScroll showScroll={false} data={incidents} renderRow={renderRow} onLoadMore={loadIncidents} />
    </View>
  );
};

export default TestNuvemInfiniteScroll;

```

<h1>Build with: </h1>

1. React
2. react-native
3. Hooks
