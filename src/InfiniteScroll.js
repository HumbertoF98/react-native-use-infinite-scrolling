import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {_} from 'lodash';

const ItemList = ({ showScroll=true, renderRow, data, onLoadMore = ()=> {} }) => {

  useEffect(() => {
    try {
    onLoadMore();
    } catch(error) {
      console.log(error);
    }
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={showScroll}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.2}
        renderItem={renderRow}
      />
    </View>
  );
};

export default ItemList;