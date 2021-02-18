import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import InfiniteScroll from '../InfiniteScroll';
import { View, NativeScrollEvent, Text } from 'react-native';

describe('# InfiniteScroll', () => {
  test('must render', () => {
    const mock = [
      {
        name: 'John',
      },
    ];

    const renderItem = jest.fn();

    const tree = render(<InfiniteScroll data={mock} renderItem={renderItem} />);
    expect(tree).toMatchSnapshot();
  });

  test('must render the items', async () => {
    const heightItem = 150;

    const mock = [
      {
        name: 'John 1',
      },
      {
        name: 'John 2',
      },
      {
        name: 'John 3',
      },
      {
        name: 'John 4',
      },
      {
        name: 'John 5',
      },
      {
        name: 'John 6',
      },
    ];

    const renderItem = ({ item, index }: any) => (
      <View
        testID={`item-${index + 1}`}
        key={index}
        style={{ height: heightItem }}
      >
        <Text>{item.name}</Text>
      </View>
    );

    const onLoadMore = jest.fn();

    const { getByTestId } = render(
      <InfiniteScroll
        data={mock}
        renderItem={renderItem}
        onLoadMore={onLoadMore}
        keyExtractor={(item) => item.name}
      />
    );

    const item1 = getByTestId('item-1');
    const item2 = getByTestId('item-2');
    const item3 = getByTestId('item-3');
    const item4 = getByTestId('item-4');
    const item5 = getByTestId('item-5');
    const item6 = getByTestId('item-6');

    expect(item1).not.toBeNull();
    expect(item2).not.toBeNull();
    expect(item3).not.toBeNull();
    expect(item4).not.toBeNull();
    expect(item5).not.toBeNull();
    expect(item6).not.toBeNull();
  });

  test('should call the load more function', async () => {
    const heightItem = 150;

    const mock = [
      {
        name: 'John 1',
      },
      {
        name: 'John 2',
      },
      {
        name: 'John 3',
      },
      {
        name: 'John 4',
      },
      {
        name: 'John 5',
      },
      {
        name: 'John 6',
      },
    ];

    const totalHeight = heightItem * mock.length;

    const renderItem = ({ item, index }: any) => (
      <View
        testID={`item-${index + 1}`}
        key={index}
        style={{ height: heightItem }}
      >
        <Text>{item.name}</Text>
      </View>
    );

    const onLoadMore = jest.fn();

    const { getByTestId } = render(
      <InfiniteScroll
        data={mock}
        renderItem={renderItem}
        onLoadMore={onLoadMore}
        keyExtractor={(item) => item.name}
      />
    );

    const flatList = getByTestId('flatlist-infinite-scroll');

    const scrollY = 768;

    const nativeEvent: NativeScrollEvent = {
      contentInset: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      contentOffset: {
        y: 0,
        x: 0,
      },
      contentSize: {
        height: totalHeight,
        width: 480,
      },
      layoutMeasurement: {
        height: scrollY,
        width: 480,
      },
      zoomScale: 1,
    };

    await fireEvent.scroll(flatList, {
      nativeEvent,
    });

    expect(onLoadMore).toHaveBeenCalled();
  });

  test('should not call the load more function', async () => {
    const heightItem = 150;

    const mock = [
      {
        name: 'John 1',
      },
      {
        name: 'John 2',
      },
      {
        name: 'John 3',
      },
      {
        name: 'John 4',
      },
      {
        name: 'John 5',
      },
      {
        name: 'John 6',
      },
    ];

    const totalHeight = heightItem * mock.length;

    const renderItem = ({ item, index }: any) => (
      <View
        testID={`item-${index + 1}`}
        key={index}
        style={{ height: heightItem }}
      >
        <Text>{item.name}</Text>
      </View>
    );

    const onLoadMore = jest.fn();

    const { getByTestId } = render(
      <InfiniteScroll
        data={mock}
        renderItem={renderItem}
        onLoadMore={onLoadMore}
        keyExtractor={(item) => item.name}
      />
    );

    const flatList = getByTestId('flatlist-infinite-scroll');

    const scrollY = 200;

    const nativeEvent: NativeScrollEvent = {
      contentInset: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      contentOffset: {
        y: 0,
        x: 0,
      },
      contentSize: {
        height: totalHeight,
        width: 480,
      },
      layoutMeasurement: {
        height: scrollY,
        width: 480,
      },
      zoomScale: 1,
    };

    await fireEvent.scroll(flatList, {
      nativeEvent,
    });

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  test('must present a loading', () => {
    const mock = [
      {
        name: 'John',
      },
    ];

    const renderItem = jest.fn();

    const { getByTestId } = render(
      <InfiniteScroll data={mock} loading={true} renderItem={renderItem} />
    );

    const loadingElement = getByTestId('loading-wrapper');

    expect(loadingElement).toBeDefined();
  });

  test('must display a loading text', () => {
    const renderItem = jest.fn();

    const { getByTestId } = render(
      <InfiniteScroll
        data={[]}
        loadingText="Loading"
        loading={true}
        renderItem={renderItem}
      />
    );

    const loadingTextElement = getByTestId('loading-text');

    expect(loadingTextElement).toBeDefined();
    expect(loadingTextElement.props.children).toBe('Loading');
  });
});
