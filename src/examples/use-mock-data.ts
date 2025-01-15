import { useEffect, useState } from 'react';
import { mockData, TableData } from './mock-data';

type DataResponse<T> = {
  values: T[] | undefined;
  pageNumber: number;
  isLastPage: boolean;
  pageSize?: number;
};

// mimic an API call - get 1 more than the pageSize, so we can determine if we are on the last page
const getData = (
  pageNumber: number,
  pageSize: number,
): DataResponse<TableData> => {
  const result = [...mockData].slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize + 1,
  );

  return {
    values: result.length > pageSize ? [...result]?.slice(0, pageSize) : result,
    pageNumber,
    isLastPage: result.length <= pageSize,
    pageSize,
  };
};

// mocal API call
const getMockData = async (
  pageNumber: number,
  pageSize: number,
): Promise<DataResponse<TableData>> => {
  const data = getData(pageNumber, pageSize);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve(data);
      } else {
        reject({
          type: 'Error ❌',
          message: 'Failed to fetch data',
        });
      }
    }, 1000);
  });
};

export const useMockData = (pageSize: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DataResponse<TableData> | undefined>(
    undefined,
  );

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const result = await getMockData(1, pageSize);
      setData(result);
      setIsLoading(false);
    };

    fetchData();
  }, [pageSize]);

  const search = async (pageNumber: number, pageSize: number) => {
    setIsLoading(true);
    const result = await getMockData(pageNumber, pageSize);

    if (result) {
      setData(result);
      setIsLoading(false);
    }
  };

  return { data, search, isLoading };
};
