import { useEffect, useState } from 'react';
import { mockData, TableData } from './mock-data';

type DataResponse<T> = {
  values: T[] | undefined;
  pageNumber: number;
  isLastPage: boolean;
  pageSize?: number;
};

const getData = (pageNumber: number, pageSize: number) =>
  [...mockData].slice((pageNumber - 1) * pageSize, pageNumber * pageSize + 1);

export const useMockData = () => {
  const [data, setData] = useState<DataResponse<TableData> | undefined>(
    undefined,
  );

  useEffect(() => {
    const result = getData(1, 5);
    console.log('EFFECT', result);

    setData({
      values: result.length > 5 ? [...result]?.slice(0, 5) : result,
      pageNumber: 1,
      isLastPage: result.length <= 5,
    });
  }, []);

  const search = (pageNumber: number, pageSize: number) => {
    const result = getData(pageNumber, pageSize);

    console.log('Hello', result);

    if (result) {
      setData({
        values:
          result.length > pageSize
            ? [...result]?.slice(pageNumber - 1, pageSize)
            : result,
        pageNumber,
        pageSize,
        isLastPage: result.length <= pageSize,
      });
    }
  };

  return { data, search };
};
