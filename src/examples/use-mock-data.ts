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
          message: 'Failed to fetch data',
        });
      }
    }, 500);
  });
};

export const useMockData = (pageSize: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DataResponse<TableData> | undefined>(
    undefined,
  );

  async function search(pageNumber: number, pageSize: number) {
    setIsLoading(true);

    const result = await getMockData(pageNumber, pageSize);

    setIsLoading(false);

    if (result) {
      setData(result);
    }
  }

  useEffect(() => {
    async function initialSearch() {
      await search(1, pageSize);
    }

    initialSearch();
  }, [pageSize]);

  return { data, search, isLoading };
};
